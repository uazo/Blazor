// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using Microsoft.JSInterop;

namespace Microsoft.AspNetCore.Blazor.Server.Circuits
{
    internal class DefaultJSRuntimeAccessor : IJSRuntimeAccessor
    {
        public IJSRuntime JSRuntime { get; set; }
    }
}
