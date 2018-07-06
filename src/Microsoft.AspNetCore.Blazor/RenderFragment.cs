// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using Microsoft.AspNetCore.Blazor.RenderTree;

namespace Microsoft.AspNetCore.Blazor
{
    /// <summary>
    /// Represents a segment of UI content, implemented as a delegate that
    /// writes the content to a <see cref="RenderTreeBuilder"/>.
    /// </summary>
    /// <param name="builder">The <see cref="RenderTreeBuilder"/> to which the content should be written.</param>
    public delegate void RenderFragment(RenderTreeBuilder builder);

    /// <summary>
    /// </summary>
    public delegate void RenderFragment<X>(RenderTreeBuilder builder, X parameter1);

    ///// <summary>
    ///// </summary>
    //public delegate void RenderFragment<X,Y>(RenderTreeBuilder builder, X parameter1, Y parameter2);

    /// <summary>
    /// </summary>
    public static class TemplatedComponentExtensions
    {
        /// <summary>
        /// </summary>
        public static RenderFragment RenderFragment<X>(this Components.BlazorComponent component, RenderFragment<X> fragment, X value)
        {
            return (RenderFragment)(builder => fragment?.Invoke(builder, value));
        }

        ///// <summary>
        ///// </summary>
        //public static RenderFragment RenderFragment<X,Y>(this Components.BlazorComponent component, RenderFragment<X,Y> fragment, X value1, Y value2)
        //{
        //    return (RenderFragment)(builder => fragment?.Invoke(builder, value1, value2));
        //}
    }
}
