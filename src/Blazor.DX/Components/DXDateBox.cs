using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXDateBox : BlazorComponent
    {
        /// <summary></summary>
        public static class Types
        {
            /// <summary></summary>
            public static string date = "date";
            /// <summary></summary>
            public static string datetime = "datetime";
            /// <summary></summary>
            public static string time = "time";
        }

        /// <summary></summary>
        [Parameter]
        public bool visible { get; set; }

        /// <summary></summary>
        [Parameter]
        public string type { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool disabled { get; set; }

        /// <summary></summary>
        [Parameter]
        public System.DateTime value { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }
    }
}
