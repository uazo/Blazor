using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXColorBox : BlazorComponent
    {
        /// <summary></summary>
        [Parameter]
        public string hint { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }

        /// <summary></summary>
        [Parameter]
        public string applyButtonText { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool disabled { get; set; }
    }
}
