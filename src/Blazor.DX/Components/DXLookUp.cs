using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXLookUp : BlazorComponent
    {
        private IEnumerable<object> _dataSource;

        /// <summary></summary>
        [Parameter]
        public bool disabled { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool visible { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool showCancelButton { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool showClearButton { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool showPopupTitle { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onItemClick { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onOpened { get; set; }

        /// <summary></summary>
        [Parameter]
        public IEnumerable<object> dataSource
        {
            get { return _dataSource; }
            set
            {
                _dataSource = value;

                DXTemplateRegistry.Find(itemTemplateId).Clear(dataSource?.Count() ?? 0);
                DXTemplateRegistry.Find(itemTitleTemplateId).Clear(dataSource?.Count() ?? 0);
            }
        }

        /// <summary></summary>
        [Parameter]
        public RenderFragment titleTemplate { get; set; }

        /// <summary></summary>
        [Parameter]
        public RenderFragment<DXTemplateItem> itemTemplate { get; set; }

        private int itemTemplateId;
        private int itemTitleTemplateId;

        /// <summary></summary>
        public DXLookUp()
        {
            CreateRegistry();
        }

        private void CreateRegistry()
        {
            itemTitleTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
            itemTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
        }

        /// <summary></summary>
        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            DXTemplateRegistry.Find(itemTitleTemplateId).itemSimpleTemplate = titleTemplate;
            DXTemplateRegistry.Find(itemTemplateId).itemTemplate = itemTemplate;
        }

        /// <summary></summary>
        protected override void BuildRenderTree(Microsoft.AspNetCore.Blazor.RenderTree.RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);

            int sequence = 1;

            builder.OpenElement(sequence++, "div");
            builder.CloseElement();

            DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(titleTemplate), itemTitleTemplateId);
            DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(itemTemplate), itemTemplateId);
        }
    }
}
