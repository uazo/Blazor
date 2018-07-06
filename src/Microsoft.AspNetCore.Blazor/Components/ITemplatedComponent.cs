using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Components
{
	/// <summary>
	/// </summary>
	public interface ITemplatedComponent
	{
	}

      /// <summary>
	/// </summary>
	public static class ITemplatedComponentExtensions
	{
        /// <summary>
		/// </summary>
		public static RenderFragment RenderFragment<X>(this ITemplatedComponent component, RenderFragment<X> fragment, X value)
		{
			return (RenderFragment)(builder => fragment?.Invoke(builder, value));
		}
	}
}
