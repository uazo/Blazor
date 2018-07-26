using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using Microsoft.AspNetCore.Blazor.RenderTree;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXDropDownBox : BlazorComponent, IDisposable
    {
        static DXDropDownBox()
        {
        }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onOpened { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onClosed { get; set; }

        /// <summary></summary>
        [Parameter]
        public RenderFragment contentTemplate { get; set; }

        /// <summary></summary>
        [Parameter]
        public RenderFragment dropDownButtonTemplate { get; set; }

        /// <summary></summary>
        [Parameter]
        public RenderFragment fieldTemplate { get; set; }

        /// <summary></summary>
        [Parameter]
        public string value { get; set; }

        /// <summary></summary>
        [Parameter]
        public string displayValue { get; set; }

        /// <summary></summary>
        [Parameter]
        public string text { get; set; }

        /// <summary></summary>
        [Parameter]
        public string height { get; set; }

        private int tid1;
        private int tid2;
        private int tid3;

        /// <summary></summary>
        public DXDropDownBox()
        {
            CreateRegistry();
        }

        private void CreateRegistry()
        {
            tid1 = DXTemplateRegistry.Create(new DXTemplateRegistry());
            tid2 = DXTemplateRegistry.Create(new DXTemplateRegistry());
            tid3 = DXTemplateRegistry.Create(new DXTemplateRegistry());
        }

        /// <summary></summary>
        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            DXTemplateRegistry.Find(tid1).itemSimpleTemplate = contentTemplate;
            DXTemplateRegistry.Find(tid2).itemSimpleTemplate = dropDownButtonTemplate;
            DXTemplateRegistry.Find(tid3).itemSimpleTemplate = fieldTemplate;
        }

        /// <summary></summary>
        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);

            int sequence = 1;

            builder.OpenElement(sequence++, "div");
            builder.CloseElement();

            DXTemplateRenderer.RenderDXTemplate(this, builder, ref sequence, nameof(contentTemplate), tid1);
            DXTemplateRenderer.RenderDXTemplate(this, builder, ref sequence, nameof(dropDownButtonTemplate), tid2);
            DXTemplateRenderer.RenderDXTemplate(this, builder, ref sequence, nameof(fieldTemplate), tid3);
        }

        /// <summary>
        /// </summary>
        public void Dispose()
        {
            DXTemplateRegistry.DisposeDXTemplate(tid1);
            DXTemplateRegistry.DisposeDXTemplate(tid2);
            DXTemplateRegistry.DisposeDXTemplate(tid3);
        }
    }
}
