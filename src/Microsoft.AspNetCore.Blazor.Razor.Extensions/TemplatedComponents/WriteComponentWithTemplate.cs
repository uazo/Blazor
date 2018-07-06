// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Blazor.Shared;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.AspNetCore.Razor.Language.CodeGeneration;
using Microsoft.AspNetCore.Razor.Language.Intermediate;

namespace Microsoft.AspNetCore.Blazor.Razor.TemplatedComponents
{
    internal static class WriteComponentWithTemplate
    {
        static System.Text.RegularExpressions.Regex checkForGeneric = new System.Text.RegularExpressions.Regex($"{BlazorApi.RenderFragment.FullTypeName}<(.*)>");
        static bool enableLog = false;

        internal static bool WriteComponent(ScopeStack scopeStack, CodeRenderingContext context, ComponentExtensionNode node, ref int _sourceSequence)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (node == null)
            {
                throw new ArgumentNullException(nameof(node));
            }

            if (node.Component.Metadata.ContainsKey(BlazorMetadata.Component.IsTemplatedComponent) == false ||
                node.Component.Metadata[BlazorMetadata.Component.IsTemplatedComponent] != bool.TrueString)
                return true;

            if (enableLog)
            {
                foreach (var i in node.Component.BoundAttributes)
                {
                    context.CodeWriter.WriteLine($"// {i.Name} {i.TypeName} {i.Kind}");
                }
            }

            // The start tag counts as a child from a markup point of view.
            scopeStack.IncrementCurrentScopeChildCount(context);

            // builder.OpenComponent<TComponent>(42);
            context.CodeWriter.Write(scopeStack.BuilderVarName);
            context.CodeWriter.Write(".");
            context.CodeWriter.Write(BlazorApi.RenderTreeBuilder.OpenComponent);
            context.CodeWriter.Write("<");
            context.CodeWriter.Write(node.TypeName);
            context.CodeWriter.Write(">(");
            context.CodeWriter.Write((_sourceSequence++).ToString());
            context.CodeWriter.Write(");");
            context.CodeWriter.WriteLine();

            foreach (var attribute in node.Attributes)
            {
                context.RenderNode(attribute);
            }

            scopeStack.OpenScope(node.TagName, isComponent: true);

            foreach (var child in node.Body)
            {
                HtmlElementIntermediateNode htmlNode = child as HtmlElementIntermediateNode;
                if (htmlNode != null)
                {
                    if (enableLog) context.CodeWriter.WriteLine($"// {htmlNode.TagName} {htmlNode.Body?.Count()}");

                    var boundAttribute = node.Component.BoundAttributes.FirstOrDefault(x => x.Name.ToUpper() == htmlNode.TagName.ToUpper());
                    if (boundAttribute != null)
                    {
                        string[] namedParameters = null;

                        if (boundAttribute.TypeName.Contains(BlazorApi.RenderFragment.FullTypeName))
                        {
                            // check if is in form "RenderFragment<T>"
                            var info = checkForGeneric.Match(boundAttribute.TypeName);
                            if (info.Success)
                            {
                                var namedParameter = htmlNode.Attributes.FirstOrDefault(x => x.AttributeName.ToLower() == "params");
                                if (namedParameter != null)
                                {
                                    var htmlAttributeValueIntermediateNode = namedParameter.Children[0] as HtmlAttributeValueIntermediateNode;
                                    if (htmlAttributeValueIntermediateNode != null)
                                    {
                                        var nameCollection = ((IntermediateToken)htmlAttributeValueIntermediateNode.Children.Single()).Content;
                                        namedParameters = new string[] { nameCollection };
                                    }
                                }

                                if (namedParameter == null)
                                    namedParameters = new string[] { "{builder}_Param1" };
                            }
                        }
                        scopeStack.CloseLambda(context);
                        scopeStack.IncrementCurrentScopeChildCount(context,
                            FullTypeName: boundAttribute.TypeName,
                            AttributeName: htmlNode.TagName,
                            ParametersName: namedParameters);

                        foreach (var childOfChild in htmlNode.Body)
                            context.RenderNode(childOfChild);
                    }
                }
            }

            scopeStack.CloseScope(context);

            foreach (var capture in node.Captures)
            {
                context.RenderNode(capture);
            }

            // The close tag counts as a child from a markup point of view.
            scopeStack.IncrementCurrentScopeChildCount(context);

            // builder.OpenComponent<TComponent>(42);
            context.CodeWriter.Write(scopeStack.BuilderVarName);
            context.CodeWriter.Write(".");
            context.CodeWriter.Write(BlazorApi.RenderTreeBuilder.CloseComponent);
            context.CodeWriter.Write("();");
            context.CodeWriter.WriteLine();

            return false;
        }
    }
}
