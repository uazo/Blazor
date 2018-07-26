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
            //((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXTextAreaComponentId", id);

            int id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXButton));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXButtonComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXCalendar));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXCalendarComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXColorBox));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXColorBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXAccordion));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXAccordionComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXTemplateRenderer));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXTemplateRendererComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXList));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXListComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXCheckBox));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXCheckBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXLookUp));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXLookupComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXDateBox));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXDateBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXSwitch));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXSwitchComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXDropDownBox));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXDropDownBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXTextBox));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXTextBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXTextArea));
            JSRuntime.Current.InvokeAsync<bool>("RegisterDXTextAreaComponentId", id);
            return services;
        }
    }
}
