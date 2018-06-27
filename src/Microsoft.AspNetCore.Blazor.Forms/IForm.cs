using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Blazor.RenderTree;

namespace Microsoft.AspNetCore.Blazor.Forms
{
    /// <summary>
    /// </summary>
    public interface IForm<T>
    {
        /// <summary>
        /// </summary>
        ModelStateDictionary<T> ModelState { get; set; }
    }

    /// <summary>
    /// </summary>
    public interface ICustomValidationMessage
	{
		/// <summary>
		/// </summary>
		void WriteValidationMessage( RenderTreeBuilder builder, string PropertyName, string Message, object htmlAttributes );
	}
}
