using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Forms
{
    /// <summary>
    /// 
    /// </summary>
    public static class GritterFactory
    {
        private static int DropZoneComponentId { get; set; }

        /// <summary>
        /// Register custom DOMComponent
        /// </summary>
        public static IServiceCollection AddGritter(this IServiceCollection services)
        {
            return services;
        }
    }
}
