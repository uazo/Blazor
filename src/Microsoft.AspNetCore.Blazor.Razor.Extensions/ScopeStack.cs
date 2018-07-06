// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using Microsoft.AspNetCore.Blazor.Shared;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.AspNetCore.Razor.Language.CodeGeneration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Microsoft.AspNetCore.Blazor.Razor
{
    /// <summary>
    /// Keeps track of the nesting of elements/containers while writing out the C# source code
    /// for a component. This allows us to detect mismatched start/end tags, as well as inject
    /// additional C# source to capture component descendants in a lambda.
    /// </summary>
    internal class ScopeStack
    {
        private readonly Stack<ScopeEntry> _stack = new Stack<ScopeEntry>();
        private int _builderVarNumber = 1;

        public string BuilderVarName { get; private set; } = "builder";

        public void OpenScope(string tagName, bool isComponent)
        {
            _stack.Push(new ScopeEntry(tagName, isComponent));
        }

        public void CloseScope(CodeRenderingContext context)
        {
            var currentScope = _stack.Pop();
            CloseLambda(currentScope, context);
        }

        public void CloseLambda(CodeRenderingContext context)
        {
            var currentScope = _stack.Peek();
            CloseLambda(currentScope, context);
        }

        private void CloseLambda(ScopeEntry currentScope, CodeRenderingContext context)
        {
            // When closing the scope for a component with children, it's time to close the lambda
            if (currentScope.LambdaScope != null)
            {
                currentScope.LambdaScope.Dispose();
                context.CodeWriter.Write(")");
                context.CodeWriter.WriteEndMethodInvocation();
                OffsetBuilderVarNumber(-1);
            }
        }

        public void IncrementCurrentScopeChildCount(CodeRenderingContext context,
                                                    string FullTypeName = null,
                                                    string AttributeName = null,
                                                    string[] ParametersName = null)
        {
            if (_stack.Count > 0)
            {
                var currentScope = _stack.Peek();

                if (currentScope.IsComponent && (currentScope.ChildCount == 0 || AttributeName != null))
                {
                    // When we're about to insert the first child into a component,
                    // it's time to open a new lambda
                    var blazorNodeWriter = (BlazorNodeWriter)context.NodeWriter;
                    blazorNodeWriter.BeginWriteAttribute(
                        context.CodeWriter,
                        AttributeName == null ? BlazorApi.RenderTreeBuilder.ChildContent : AttributeName);
                    OffsetBuilderVarNumber(1);
                    context.CodeWriter.Write($"({(FullTypeName == null ? BlazorApi.RenderFragment.FullTypeName : FullTypeName)})(");

                    var names = new string[] { BuilderVarName };
                    if (ParametersName != null)
                    {
                        names = names.Concat(ParametersName).ToArray();
                    }
                    currentScope.LambdaScope = context.CodeWriter.BuildLambda(names);
                }

                currentScope.ChildCount++;
            }
        }

        private void OffsetBuilderVarNumber(int delta)
        {
            _builderVarNumber += delta;
            BuilderVarName = _builderVarNumber == 1
                ? "builder"
                : $"builder{_builderVarNumber}";
        }

        private class ScopeEntry
        {
            public readonly string TagName;
            public readonly bool IsComponent;
            public int ChildCount;
            public IDisposable LambdaScope;

            public ScopeEntry(string tagName, bool isComponent)
            {
                TagName = tagName;
                IsComponent = isComponent;
                ChildCount = 0;
            }
        }
    }
}
