using Microsoft.AspNetCore.Blazor.Builder;
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
        public static IBlazorApplicationBuilder AddDropZone(this IBlazorApplicationBuilder services)
        {
            DropZoneComponentId = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(Components.DropZone));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDropZoneComponentId", DropZoneComponentId);

            return services;
        }
    }
}
