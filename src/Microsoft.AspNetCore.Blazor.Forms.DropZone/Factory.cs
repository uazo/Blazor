using Microsoft.Extensions.DependencyInjection;
using Microsoft.JSInterop;
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
            JSRuntime.Current.InvokeAsync<bool>("RegisterDropZoneComponentId", DropZoneComponentId);

            return services;
        }
    }
}
