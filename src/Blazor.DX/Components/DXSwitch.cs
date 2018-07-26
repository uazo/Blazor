using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXSwitch : BlazorComponent
    {
        /// <summary></summary>
        [Parameter]
        public bool readOnly { get; set; }

        /// <summary></summary>
        [Parameter]
        public string hint { get; set; }

        /// <summary></summary>
        [Parameter]
        public string onText { get; set; }

        /// <summary></summary>
        [Parameter]
        public string offText { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool value { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool visible { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool disabled { get; set; }

        /// <summary></summary>
        [Parameter]
        public string width { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }
    }
}
