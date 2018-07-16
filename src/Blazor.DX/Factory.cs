using Microsoft.AspNetCore.Blazor.Builder;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public static class Factory
    {
        /// <summary>
        /// Register custom DOMComponent
        /// </summary>
        public static IBlazorApplicationBuilder AddDX(this IBlazorApplicationBuilder services)
        {
            int id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXButton));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXButtonComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXCalendar));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXCalendarComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXColorBox));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXColorBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXAccordion));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXAccordionComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXTemplateRenderer));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXTemplateRendererComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXList));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXListComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXCheckBox));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXCheckBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXLookUp));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXLookupComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXDateBox));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXDateBoxComponentId", id);

            return services;
        }
    }
}
