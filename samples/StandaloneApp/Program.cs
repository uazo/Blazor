// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using Microsoft.AspNetCore.Blazor.Browser.Rendering;
using Microsoft.AspNetCore.Blazor.Browser.Services;
using Microsoft.AspNetCore.Blazor.Forms;

namespace StandaloneApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var serviceProvider = new BrowserServiceProvider(configure =>
            {
                configure.AddForms();
                configure.AddDatePicker();
                configure.AddGritter();
                configure.AddDropZone();
                // Add any custom services here

                int id;

                id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DxButton));
                ((Microsoft.JSInterop.IJSInProcessRuntime)Microsoft.JSInterop.JSRuntime.Current).Invoke<bool>("RegisterDXButtonComponentId", id);

                id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DxCalendar));
                ((Microsoft.JSInterop.IJSInProcessRuntime)Microsoft.JSInterop.JSRuntime.Current).Invoke<bool>("RegisterDXCalendarComponentId", id);

                id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DxColorBox));
                ((Microsoft.JSInterop.IJSInProcessRuntime)Microsoft.JSInterop.JSRuntime.Current).Invoke<bool>("RegisterDXColorBoxComponentId", id);
            });

            new BrowserRenderer(serviceProvider).AddComponent<App>("app");
        }
    }
}
