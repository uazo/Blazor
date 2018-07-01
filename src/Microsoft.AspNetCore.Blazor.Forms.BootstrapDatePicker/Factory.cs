using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Forms
{
    /// <summary>
    /// 
    /// </summary>
    public static class BootstrapDatePickerFactory
    {
        private static int DateTimePickerComponentId { get; set; }

        /// <summary>
        /// Register custom DOMComponent
        /// </summary>
        public static IServiceCollection AddDatePicker(this IServiceCollection services)
        {
            DateTimePickerComponentId = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(Components.DatePicker));
            Blazor.Browser.Interop.RegisteredFunction.Invoke<bool>("RegisterDateTimePickerComponentId", DateTimePickerComponentId);

            return services;
        }
    }
}
