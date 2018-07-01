using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Forms
{
    /// <summary>
    /// 
    /// </summary>
    public static class DropZoneFactory
    {
        private static int DropZoneComponentId { get; set; }

        /// <summary>
        /// Register custom DOMComponent
        /// </summary>
        public static IServiceCollection AddDropZone(this IServiceCollection services)
        {
            DropZoneComponentId = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(Components.DropZone));
            Blazor.Browser.Interop.RegisteredFunction.Invoke<bool>("RegisterDropZoneComponentId", DropZoneComponentId);

            return services;
        }
    }
}
