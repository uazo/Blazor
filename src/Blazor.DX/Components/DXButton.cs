using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXButton : BlazorComponent
    {
        /// <summary></summary>
        public enum ButtonType
        {
            /// <summary></summary>
            normal,
            /// <summary></summary>
            @default,
            /// <summary></summary>
            back,
            /// <summary></summary>
            danger,
            /// <summary></summary>
            success
        }

        /// <summary></summary>
        [Parameter]
        public string text { get; set; }

        /// <summary></summary>
        [Parameter]
        public string hint { get; set; }

        /// <summary></summary>
        [Parameter]
        public string icon { get; set; }

        /// <summary></summary>
        [Parameter]
        public string type { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onClick { get; set; }
    }
}
