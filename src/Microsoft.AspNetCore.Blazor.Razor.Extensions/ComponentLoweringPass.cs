// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.AspNetCore.Razor.Language.Intermediate;

namespace Microsoft.AspNetCore.Blazor.Razor
{
    internal class ComponentLoweringPass : IntermediateNodePassBase, IRazorOptimizationPass
    {
        static Regex rxWS = new Regex( @"^[ \t\n\r]*$");

        // This pass runs earlier than our other passes that 'lower' specific kinds of attributes.
        public override int Order => 0;

        protected override void ExecuteCore(RazorCodeDocument codeDocument, DocumentIntermediateNode documentNode)
        {
            var @namespace = documentNode.FindPrimaryNamespace();
            var @class = documentNode.FindPrimaryClass();
            if (@namespace == null || @class == null)
            {
                // Nothing to do, bail. We can't function without the standard structure.
                return;
            }

            // For each component *usage* we need to rewrite the tag helper node to map to the relevant component
            // APIs.
            var references = documentNode.FindDescendantReferences<TagHelperIntermediateNode>();
            for (var i = 0; i < references.Count; i++)
            {
                var reference = references[i];
                var node = (TagHelperIntermediateNode)reference.Node;

                var count = 0;
                for (var j = 0; j < node.TagHelpers.Count; j++)
                {
                    if (node.TagHelpers[j].IsComponentTagHelper())
                    {
                        // Only allow a single component tag helper per element. If there are multiple, we'll just consider
                        // the first one and ignore the others.
                        if (count++ > 1)
                        {
                            node.Diagnostics.Add(BlazorDiagnosticFactory.Create_MultipleComponents(node.Source, node.TagName, node.TagHelpers));
                            break;
                        }
                    }
                }

                if (count >= 1)
                {
                    var tagHelper = node.TagHelpers.First(t => t.IsComponentTagHelper());
                    if (tagHelper.IsTemplatedComponentPropTagHelper())
                    {
                        reference.Replace(RewriteAsComponentTemplateProp(node, tagHelper));
                    }
                    else
                    {
                        reference.Replace(RewriteAsComponent(node, tagHelper));
                    }
                }
                else
                {
                    reference.Replace(RewriteAsElement(node));
                }
            }
        }

        private ComponentExtensionNode RewriteAsComponent(TagHelperIntermediateNode node, TagHelperDescriptor tagHelper)
        {
            var result = new ComponentExtensionNode()
            {
                Component = tagHelper,
                Source = node.Source,
                TagName = node.TagName
            };

            for (var i = 0; i < node.Diagnostics.Count; i++)
            {
                result.Diagnostics.Add(node.Diagnostics[i]);
            }

            // we need to reorder, first TemplateComponentPropExtensionNode then others
            //
            // assume we have
            //  1: <ComponentTemplateTest>
            //  2:   <ComponentTemplateTest.Template>
            //  3:       test simple template
            //  4:   </ComponentTemplateTest.Template>
            //  5:
            //  6:   <ComponentTemplateTest.TemplateWithInt WithParams="param1">
            //  7:       @param1
            //  8:   </ComponentTemplateTest.TemplateWithInt>
            //  9:
            // 10:   <div>this is childcontent (1)</div>
            // 11:   <div>this is childcontent (2)</div>
            // 12: </ComponentTemplateTest>
            //
            // we need to move lines 10,11 on top of Children collection,
            // cause ScopeStack.IncrementCurrentScopeChildCount currently need it on top
            var firstChild = node.Children.FirstOrDefault();
            if (firstChild != null)
            {
                var templatePropNodes = firstChild.Children.OfType<TemplateComponentAttributeExtensionNode>().ToList();
                foreach (var propNode in templatePropNodes) firstChild.Children.Remove(propNode);
                foreach (var propNode in templatePropNodes)
                    firstChild.Children.Insert(firstChild.Children.Count, propNode); // must be the last, see ScopeStack.IncrementCurrentScopeChildCount

                if (templatePropNodes.Count() != 0)
                {
                    // and also, remove all lines with only space, \n, \t, \r, stop first content found
                    // (lines 5 and 9 on the example above will be removed)
                    // cause if a BlazorComponent doesn't have ChildContent property we don't want to add the attribute
                    // but if a line contains others values, we need to provide it (so they will not be removed)
                    var htmlContent = firstChild.Children.OfType<HtmlContentIntermediateNode>().ToList();
                    foreach (var htmlNode in htmlContent)
                    {
                        if( htmlNode.Children.OfType<IntermediateToken>().All(x => rxWS.Match(x.Content).Success) )
                            firstChild.Children.Remove(htmlNode);
                        else
                            break;
                    }

                    foreach( var propNode in templatePropNodes)
                    {
                        if(templatePropNodes.Count(x=>x.TemplatePropName == propNode.TemplatePropName) >1 )
                        {
                            // only one properties!
                            propNode.Diagnostics.Add(BlazorDiagnosticFactory.CreateRenderFragmentAttribute_Duplicates(
                                propNode.Source,
                                propNode.TemplatePropName));
                        }
                    }
                }
            }

            var visitor = new ComponentRewriteVisitor(result.Children);
            visitor.Visit(node);

            return result;
        }

        private TemplateComponentAttributeExtensionNode RewriteAsComponentTemplateProp(TagHelperIntermediateNode node, TagHelperDescriptor tagHelper)
        {
            var result = new TemplateComponentAttributeExtensionNode()
            {
                Component = tagHelper,
                Source = node.Source,
                TagName = node.TagName,

                TemplatePropName = tagHelper.GetTemplatedComponentPropNameTagHelper(),
                TemplatePropTypeName = tagHelper.GetTemplatedComponentPropTypeNameTagHelper()
            };

            for (var i = 0; i < node.Diagnostics.Count; i++)
            {
                result.Diagnostics.Add(node.Diagnostics[i]);
            }

            var visitor = new TemplateComponentRewriteVisitor(result, result.Children);
            visitor.Visit(node);

            if (tagHelper.IsTemplatedComponentPropWithGenericsTagHelper() && string.IsNullOrEmpty(result.TemplatePropArgs))
            {
                // WithParams empty!
                result.Diagnostics.Add(BlazorDiagnosticFactory.CreateWithParamsAttribute_MustDefined(
                    result.Source,
                    result.TemplatePropName));
            }

            return result;
        }

        private HtmlElementIntermediateNode RewriteAsElement(TagHelperIntermediateNode node)
        {
            var result = new HtmlElementIntermediateNode()
            {
                Source = node.Source,
                TagName = node.TagName,
            };

            for (var i = 0; i < node.Diagnostics.Count; i++)
            {
                result.Diagnostics.Add(node.Diagnostics[i]);
            }

            var visitor = new ElementRewriteVisitor(result.Children);
            visitor.Visit(node);

            return result;
        }

        private class ComponentRewriteVisitor : IntermediateNodeWalker
        {
            private readonly IntermediateNodeCollection _children;

            public ComponentRewriteVisitor(IntermediateNodeCollection children)
            {
                _children = children;
            }

            public override void VisitTagHelper(TagHelperIntermediateNode node)
            {
                // Visit children, we're replacing this node.
                for (var i = 0; i < node.Children.Count; i++)
                {
                    Visit(node.Children[i]);
                }
            }

            public override void VisitTagHelperBody(TagHelperBodyIntermediateNode node)
            {
                for (var i = 0; i < node.Children.Count; i++)
                {
                    _children.Add(node.Children[i]);
                }
            }

            public override void VisitTagHelperHtmlAttribute(TagHelperHtmlAttributeIntermediateNode node)
            {
                var attribute = new ComponentAttributeExtensionNode(node);
                _children.Add(attribute);

                // Since we don't support complex content, we can rewrite the inside of this
                // node to the rather simpler form that property nodes usually have.
                for (var i = 0; i < attribute.Children.Count; i++)
                {
                    if (attribute.Children[i] is HtmlAttributeValueIntermediateNode htmlValue)
                    {
                        attribute.Children[i] = new HtmlContentIntermediateNode()
                        {
                            Children =
                            {
                                htmlValue.Children.Single(),
                            },
                            Source = htmlValue.Source,
                        };
                    }
                    else if (attribute.Children[i] is CSharpExpressionAttributeValueIntermediateNode expressionValue)
                    {
                        attribute.Children[i] = new CSharpExpressionIntermediateNode()
                        {
                            Children =
                            {
                                expressionValue.Children.Single(),
                            },
                            Source = expressionValue.Source,
                        };
                    }
                    else if (attribute.Children[i] is CSharpCodeAttributeValueIntermediateNode codeValue)
                    {
                        attribute.Children[i] = new CSharpExpressionIntermediateNode()
                        {
                            Children =
                            {
                                codeValue.Children.Single(),
                            },
                            Source = codeValue.Source,
                        };
                    }
                }
            }

            public override void VisitTagHelperProperty(TagHelperPropertyIntermediateNode node)
            {
                // Each 'tag helper property' belongs to a specific tag helper. We want to handle
                // the cases for components, but leave others alone. This allows our other passes
                // to handle those cases.
                _children.Add(node.TagHelper.IsComponentTagHelper() ? (IntermediateNode)new ComponentAttributeExtensionNode(node) : node);
            }

            public override void VisitDefault(IntermediateNode node)
            {
                _children.Add(node);
            }
        }

        private class TemplateComponentRewriteVisitor : ComponentRewriteVisitor
        {
            private TemplateComponentAttributeExtensionNode _component;

            public TemplateComponentRewriteVisitor(TemplateComponentAttributeExtensionNode component, IntermediateNodeCollection children) : base(children)
            {
                _component = component;
            }

            public override void VisitTagHelperProperty(TagHelperPropertyIntermediateNode node)
            {
                if( node.AttributeName == Shared.BlazorApi.ITemplatedComponent.WithParamsAttibuteName )
                {
                    _component.TemplatePropArgs = node.FindDescendantNodes<IntermediateToken>()?.FirstOrDefault()?.Content;
                }
            }
        }

        private class ElementRewriteVisitor : IntermediateNodeWalker
        {
            private readonly IntermediateNodeCollection _children;

            public ElementRewriteVisitor(IntermediateNodeCollection children)
            {
                _children = children;
            }

            public override void VisitTagHelper(TagHelperIntermediateNode node)
            {
                // Visit children, we're replacing this node.
                for (var i = 0; i < node.Children.Count; i++)
                {
                    Visit(node.Children[i]);
                }
            }

            public override void VisitTagHelperBody(TagHelperBodyIntermediateNode node)
            {
                for (var i = 0; i < node.Children.Count; i++)
                {
                    _children.Add(node.Children[i]);
                }
            }

            public override void VisitTagHelperHtmlAttribute(TagHelperHtmlAttributeIntermediateNode node)
            {
                var attribute = new HtmlAttributeIntermediateNode()
                {
                    AttributeName = node.AttributeName,
                    Source = node.Source,
                };
                _children.Add(attribute);

                for (var i = 0; i < node.Diagnostics.Count; i++)
                {
                    attribute.Diagnostics.Add(node.Diagnostics[i]);
                }

                switch (node.AttributeStructure)
                {
                    case AttributeStructure.Minimized:

                        attribute.Prefix = node.AttributeName;
                        attribute.Suffix = string.Empty;
                        break;

                    case AttributeStructure.NoQuotes:
                    case AttributeStructure.SingleQuotes:
                    case AttributeStructure.DoubleQuotes:

                        // We're ignoring attribute structure here for simplicity, it doesn't effect us.
                        attribute.Prefix = node.AttributeName + "=\"";
                        attribute.Suffix = "\"";

                        for (var i = 0; i < node.Children.Count; i++)
                        {
                            attribute.Children.Add(RewriteAttributeContent(node.Children[i]));
                        }

                        break;
                }

                IntermediateNode RewriteAttributeContent(IntermediateNode content)
                {
                    if (content is HtmlContentIntermediateNode html)
                    {
                        var value = new HtmlAttributeValueIntermediateNode()
                        {
                            Source = content.Source,
                        };

                        for (var i = 0; i < html.Children.Count; i++)
                        {
                            value.Children.Add(html.Children[i]);
                        }

                        for (var i = 0; i < html.Diagnostics.Count; i++)
                        {
                            value.Diagnostics.Add(html.Diagnostics[i]);
                        }

                        return value;
                    }


                    return content;
                }
            }

            public override void VisitTagHelperProperty(TagHelperPropertyIntermediateNode node)
            {
                // Each 'tag helper property' belongs to a specific tag helper. We want to handle
                // the cases for components, but leave others alone. This allows our other passes
                // to handle those cases.
                _children.Add(node.TagHelper.IsComponentTagHelper() ? (IntermediateNode)new ComponentAttributeExtensionNode(node) : node);
            }

            public override void VisitDefault(IntermediateNode node)
            {
                _children.Add(node);
            }
        }
    }
}
