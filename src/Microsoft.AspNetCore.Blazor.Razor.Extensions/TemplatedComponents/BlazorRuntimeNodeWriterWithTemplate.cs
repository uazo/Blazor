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
    internal class BlazorRuntimeNodeWriterWithTemplate: BlazorRuntimeNodeWriter
    {
        public override void WriteComponent(CodeRenderingContext context, ComponentExtensionNode node)
        {
            if (WriteComponentWithTemplate.WriteComponent(_scopeStack, context, node, ref _sourceSequence))
                base.WriteComponent(context, node);
        }
    }
}
