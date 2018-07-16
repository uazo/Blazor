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
    public static class ItemDeleteMode
    {
        /// <summary></summary>
        public static string Context => "context";
        /// <summary></summary>
        public static string SlideButton => "slideButton";
        /// <summary></summary>
        public static string SlideItem => "slideItem";
        /// <summary></summary>
        public static string StaticMode => "static";
        /// <summary></summary>
        public static string Swipe => "swipe";
        /// <summary></summary>
        public static string Toggle => "toggle";
    }

    /// <summary></summary>
    public class DXList : BlazorComponent
    {
        private IEnumerable<object> _dataSource;

        /// <summary></summary>
        [Parameter]
        public string itemDeleteMode { get; set; }

        /// <summary></summary>
        [Parameter]
        public bool allowItemDeleting { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onItemClick { get; set; }

        /// <summary></summary>
        [Parameter]
        public Action<UICustomEventArgs> onItemDeleted { get; set; }

        /// <summary></summary>
        [Parameter]
        public IEnumerable<object> dataSource
        {
            get { return _dataSource; }
            set
            {
                _dataSource = value;

                DXTemplateRegistry.Find(itemTemplateId).Clear(dataSource?.Count() ?? 0);
                DXTemplateRegistry.Find(itemGroupTemplateId).Clear(dataSource?.Count() ?? 0);
            }
        }

        /// <summary></summary>
        [Parameter]
        public RenderFragment<DXTemplateItem> groupTemplate { get; set; }

        /// <summary></summary>
        [Parameter]
        public RenderFragment<DXTemplateItem> itemTemplate { get; set; }

        private int itemTemplateId;
        private int itemGroupTemplateId;

        /// <summary></summary>
        public DXList()
        {
            CreateRegistry();
        }

        private void CreateRegistry()
        {
            itemGroupTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
            itemTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
        }

        /// <summary></summary>
        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            DXTemplateRegistry.Find(itemTemplateId).itemTemplate = itemTemplate;
            DXTemplateRegistry.Find(itemGroupTemplateId).itemTemplate = groupTemplate;
        }

        /// <summary></summary>
        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);

            int sequence = 1;

            builder.OpenElement(sequence++, "div");
            builder.CloseElement();

            DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(groupTemplate), itemGroupTemplateId);
            DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(itemTemplate), itemTemplateId);
        }
    }
}
