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
    public class DXAccordion : BlazorComponent
    {
        private IEnumerable<object> _dataSource;

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
        public RenderFragment<DXTemplateItem> itemTitleTemplate { get; set; }

        /// <summary></summary>
        [Parameter]
        public RenderFragment<DXTemplateItem> itemTemplate { get; set; }

        private int itemTemplateId;
        private int itemTitleTemplateId;

        /// <summary></summary>
        public DXAccordion()
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

            DXTemplateRegistry.Find(itemTemplateId).itemTemplate = itemTemplate;
            DXTemplateRegistry.Find(itemTitleTemplateId).itemTemplate = itemTitleTemplate;
        }

        /// <summary></summary>
        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);

            //Console.WriteLine($"DXAccordion BuildRenderTree {items_TitleTemplate.Count}");

            int sequence = 1;

            builder.OpenElement(sequence++, "div");
            builder.CloseElement();

            DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(itemTitleTemplate), itemTitleTemplateId);
            DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(itemTemplate), itemTemplateId);
        }
    }
}
