using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Blazor.Components;

namespace Microsoft.AspNetCore.Blazor.Routing
{
    /// <summary>
    /// </summary>
    public abstract class RouteComponent
    {
        /// <summary>
        /// </summary>
        public abstract IEnumerable<CustomRoute> GetRoutes();
    }

    /// <summary>
    /// </summary>
    public static class RouteExtensions
    {
        /// <summary>
        /// </summary>
        public static void Add( this List<CustomRoute> routes, string Template, Type ComponentType )
        {
            routes.Add(new CustomRoute() { Template = Template, ComponentType = ComponentType });
        }
    }

    /// <summary>
    /// </summary>
    public class CustomRoute
    {
        /// <summary>
        /// </summary>
        public string Template { get; set; }

        /// <summary>
        /// </summary>
        public Type ComponentType { get; set; }
    }
}
