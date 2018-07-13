using Microsoft.AspNetCore.Blazor.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Forms
{
    /// <summary>
    /// 
    /// </summary>
    public static class Factory
    {
        /// <summary>
        /// Register custom DOMComponent
        /// </summary>
        public static IBlazorApplicationBuilder AddForms(this IBlazorApplicationBuilder services)
        {
            return services;
        }
    }
}
