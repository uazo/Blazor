using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXLookUp : BlazorComponent, IDisposable
    {
        private IEnumerable<object> _dataSource;

        /// <summary>Specifies whether the widget responds to user interaction.</summary>
        [Parameter]
        public bool disabled { get; set; }

        /// <summary>Specifies whether the widget is visible.</summary>
        [Parameter]
        public bool visible { get; set; }

        /// <summary>Specifies whether or not to display the Clear button in the lookup window.</summary>
        [Parameter]
        public bool showClearButton { get; set; }

        /// <summary>A Boolean value specifying whether or not to display the title in the popup window.</summary>
        [Parameter]
        public bool showPopupTitle { get; set; }

        /// <summary>Specifies whether to close the drop-down menu if a user clicks outside it.</summary>
        [Parameter]
        public bool closeOnOutsideClick { get; set; }

        /// <summary>Specifies whether the search box is visible.</summary>
        [Parameter]
        public bool searchEnabled { get; set; }

        /// <summary>A Boolean value specifying whether or not the main screen is inactive while the lookup is active.</summary>
        [Parameter]
        public bool shading { get; set; }

        /// <summary>Specifies whether to display the Cancel button in the lookup window.</summary>
        [Parameter]
        public bool showCancelButton { get; set; }

        /// <summary>
        /// Specifies the name of a data source item field or an expression whose value is compared to the search criterion.
        /// </summary>
        [Parameter]
        public string searchExpr { get; set; }

        /// <summary>
        /// The text displayed on the Apply button.
        /// </summary>
        [Parameter]
        public string applyButtonText { get; set; }

        /// <summary>
        /// The text displayed on the Cancel button.
        /// </summary>
        [Parameter]
        public string cancelButtonText { get; set; }

        /// <summary>
        /// The text displayed on the Clear button.
        /// </summary>
        [Parameter]
        public string clearButtonText { get; set; }

        /// <summary></summary>
        [Parameter]
        public string valueExpr { get; set; }

        /// <summary>Specifies the name of the data source item field whose value is displayed by the widget.</summary>
        [Parameter]
        public string displayExpr { get; set; }

        /// <summary>
        /// The title of the lookup window.
        /// </summary>
        [Parameter]
        public string title { get; set; }

        /// <summary></summary>
        [Parameter]
        public object value { get; set; }

        /// <summary>A handler for the itemClick event.</summary>
        [Parameter]
        public Action<UICustomEventArgs> onItemClick { get; set; }

        /// <summary>A handler for the valueChanged event.</summary>
        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }

        /// <summary>A handler for the opened event</summary>
        [Parameter]
        public Action<UICustomEventArgs> onOpened { get; set; }

        /// <summary>A handler for the closed event.</summary>
        [Parameter]
        public Action<UICustomEventArgs> onClosed { get; set; }

        /// <summary>A data source used to fetch data the widget should display.</summary>
        [Parameter]
        public IEnumerable<object> dataSource
        {
            get { return _dataSource; }
            set
            {
                if (_dataSource?.GetHashCode() != value?.GetHashCode())
                {
                    _dataSource = value;

                    DXTemplateRegistry.Find(itemTemplateId).Clear();
                    DXTemplateRegistry.Find(itemTitleTemplateId).Clear();
                }
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

            DXTemplateRenderer.RenderDXTemplate(this, builder, ref sequence, nameof(titleTemplate), itemTitleTemplateId);
            DXTemplateRenderer.RenderDXTemplate(this, builder, ref sequence, nameof(itemTemplate), itemTemplateId);
        }

        /// <summary>
        /// </summary>
        public void Dispose()
        {
            DXTemplateRegistry.DisposeDXTemplate(itemTemplateId);
            DXTemplateRegistry.DisposeDXTemplate(itemTitleTemplateId);
        }
    }
}
