using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using Microsoft.AspNetCore.Blazor.RenderTree;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StandaloneApp
{
    public class DxButton : BlazorComponent
    {
        public enum ButtonType
        {
            normal,
            @default,
            back,
            danger,
            success
        }

        [Parameter]
        public string text { get; set; }

        [Parameter]
        public string hint { get; set; }

        [Parameter]
        public string icon { get; set; }

        [Parameter]
        public string type { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onClick { get; set; }
    }

    public class DxCalendar : BlazorComponent
    {
        [Parameter]
        public string hint { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }
    }

    public class DxColorBox : BlazorComponent
    {
        [Parameter]
        public string hint { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }

        [Parameter]
        public string applyButtonText { get; set; }

        [Parameter]
        public bool disabled { get; set; }
    }
}
