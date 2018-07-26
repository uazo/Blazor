using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXTextBox : BlazorComponent
    {
        /// <summary></summary>
        [Parameter]
        public string value { get; set; }

        /// <summary></summary>
        [Parameter]
        public string hint { get; set; }

        /// <summary></summary>
        [Parameter]
        public string mask { get; set; }

        /// <summary></summary>
        [Parameter]
        public string maskChar { get; set; }

        /// <summary></summary>
        [Parameter]
        public string height { get; set; }

        /// <summary>Accepted Values: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url'</summary>
        [Parameter]
        public string mode { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool disabled { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool visible { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool readOnly { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool showClearButton { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool spellcheck { get; set; }

        /// <summary></summary>
        [Parameter]
        public int maxLength { get; set; }

        /// <summary></summary>
        [Parameter]
        public string width { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onInput { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UIEventArgs> onEnterKey { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UIEventArgs> onFocusIn { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UIEventArgs> onFocusOut { get; set; }
    }

    /// <summary></summary>
    public class DXTextArea: DXTextBox
    {
        /// <summary></summary>
        [Parameter]
        public string maxHeight { get; set; }

        /// <summary></summary>
        [Parameter]
        public string minHeight { get; set; }
    }
}
