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

    /// <summary>
    /// </summary>
    public class UIListEventArgs : UICustomEventArgs
    {
        /// <summary></summary>
        public string itemData { get; set; }

        /// <summary></summary>
        public int itemIndex { get; set; }
    }

    /// <summary></summary>
    public class DXList : BlazorComponent, IDisposable
    {
        static DXList()
        {
            Microsoft.AspNetCore.Blazor.Browser.Rendering.BrowserRendererEventDispatcher.RegisterUIEventType<UIListEventArgs>("custom-onItemClick");
            Microsoft.AspNetCore.Blazor.Browser.Rendering.BrowserRendererEventDispatcher.RegisterUIEventType<UIListEventArgs>("custom-onItemDeleted");
            Microsoft.AspNetCore.Blazor.Browser.Rendering.BrowserRendererEventDispatcher.RegisterUIEventType<UIListEventArgs>("custom-onItemDeleting");
        }

        private IEnumerable<object> _dataSource;

        /// <summary>Specifies the way a user can delete items from the list.</summary>
        [Parameter]
        public string itemDeleteMode { get; set; }

        /// <summary>Specifies whether the search panel is visible.</summary>
        [Parameter]
        public string searchEnabled { get; set; }
        
        /// <summary>Specifies whether or not an end user can delete list items.</summary>
        [Parameter]
        public bool allowItemDeleting { get; set; }

        /// <summary>Specifies whether a user can reorder list items. Grouped items cannot be moved from one group to another.</summary>
        [Parameter]
        public bool allowItemReordering { get; set; }

        /// <summary>The text or HTML markup displayed by the widget if the item collection is empty.</summary>
        [Parameter]
        public string noDataText { get; set; }

        /// <summary>Specifies whether data items should be grouped.</summary>
        [Parameter]
        public bool grouped { get; set; }

        /// <summary>A handler for the itemClick event.</summary>
        [Parameter]
        public Action<UIListEventArgs> onItemClick { get; set; }

        /// <summary>A handler for the itemDeleted event.</summary>
        [Parameter]
        public Action<UIListEventArgs> onItemDeleted { get; set; }

        /// <summary>A handler for the itemDeleting event. Executed before an item is deleted from the data source.</summary>
        [Parameter]
        public Action<UIListEventArgs> onItemDeleting { get; set; }

        /// <summary>The text or HTML markup displayed by the widget if the item collection is empty.</summary>
        [Parameter]
        public string height { get; set; }

        /// <summary></summary>
        [Parameter]
        public IEnumerable<object> dataSource
        {
            get { return _dataSource; }
            set
            {
                if (_dataSource?.GetHashCode() != value?.GetHashCode())
                {
                    DXTemplateRegistry.Find(itemTemplateId).Clear();
                    DXTemplateRegistry.Find(itemGroupTemplateId).Clear();
                }

                _dataSource = value;
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

            DXTemplateRenderer.RenderDXTemplate(this, builder, ref sequence, nameof(groupTemplate), itemGroupTemplateId);
            DXTemplateRenderer.RenderDXTemplate(this, builder, ref sequence, nameof(itemTemplate), itemTemplateId);
        }

        /// <summary>
        /// </summary>
        public void Dispose()
        {
            DXTemplateRegistry.DisposeDXTemplate(itemTemplateId);
            DXTemplateRegistry.DisposeDXTemplate(itemGroupTemplateId);
        }
    }
}
