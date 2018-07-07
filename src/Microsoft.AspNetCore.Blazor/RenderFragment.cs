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
    /// Represents a segment of UI content, implemented as a generic delegate that
    /// writes the content to a <see cref="RenderTreeBuilder"/>.
    /// </summary>
    /// <typeparam name="T">The type of the value.</typeparam>
    /// <param name="builder">The <see cref="RenderFragment"/> to which the content should be written.</param>
    /// <param name="value">The value passed as argument to the Fragment.</param>
    public delegate void RenderFragment<T>(RenderTreeBuilder builder, T value);

    // we can have the form <X,Y>, code supports it, but maybe it's useless
    //public delegate void RenderFragment<X,Y>(RenderTreeBuilder builder, X parameter1, Y parameter2);

    /// <summary>
    /// </summary>
    public static class TemplatedComponentExtensions
    {
        /// <summary>
        /// Render the fragment with the value of type T
        /// </summary>
        /// <typeparam name="T">The type of the value.</typeparam>
        /// <param name="fragment">The <see cref="RenderFragment{T}"/> of UI content to be written.</param>
        /// <param name="value">The value passed as argument to the Fragment.</param>
        /// <returns>A <see cref="RenderFragment"/> ready to render.</returns>
        public static RenderFragment Render<T>(this RenderFragment<T> fragment, T value)
        {
            return (RenderFragment)(builder => fragment.Invoke(builder, value));
        }
    }
}
