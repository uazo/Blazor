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
        /// 
        /// </summary>
        internal static int DropZoneComponentId { get; private set; }

        /// <summary>
        /// Register custom DOMComponent
        /// </summary>
        public static IServiceCollection AddForms(this IServiceCollection services)
        {
            DropZoneComponentId = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(Components.DropZone));
            Blazor.Browser.Interop.RegisteredFunction.Invoke<bool>("RegisterDropZoneComponentId", DropZoneComponentId);
            return services;
        }
    }
}
