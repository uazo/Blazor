using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Builder;
using Microsoft.AspNetCore.Blazor.Components;
using Microsoft.AspNetCore.Blazor.RenderTree;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StandaloneApp
{
    /// <summary>
    /// </summary>
    public static class Factory
    {
        /// <summary>
        /// Register custom DOMComponent
        /// </summary>
        public static IBlazorApplicationBuilder AddDX(this IBlazorApplicationBuilder services)
        {
            int id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXButton));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXButtonComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXCalendar));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXCalendarComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXColorBox));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXColorBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXAccordion));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXAccordionComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXTemplateRenderer));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXTemplateRendererComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXList));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXListComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXCheckBox));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXCheckBoxComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXLookUp));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXLookupComponentId", id);

            id = Microsoft.AspNetCore.Blazor.Components.ComponentFactoryRegister.RegisterCustomComponent(typeof(DXDateBox));
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("RegisterDXDateBoxComponentId", id);

            return services;
        }
    }

    public class DXButton : BlazorComponent
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

    public class DXCalendar : BlazorComponent
    {
        [Parameter]
        public string hint { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }
    }

    public class DXColorBox : BlazorComponent
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

    public class DXAccordion : BlazorComponent
    {
        private IEnumerable<object> _dataSource;

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

        [Parameter]
        public RenderFragment<StandaloneApp.DXTemplateItem> itemTitleTemplate { get; set; }

        [Parameter]
        public RenderFragment<StandaloneApp.DXTemplateItem> itemTemplate { get; set; }

        private int itemTemplateId;
        private int itemTitleTemplateId;

        public DXAccordion()
        {
            CreateRegistry();
        }

        private void CreateRegistry()
        {
            itemTitleTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
            itemTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
        }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            DXTemplateRegistry.Find(itemTemplateId).itemTemplate = itemTemplate;
            DXTemplateRegistry.Find(itemTitleTemplateId).itemTemplate = itemTitleTemplate;
        }

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

    public class DXTemplateRenderer : BlazorComponent
    {
        [Parameter]
        private Action<UICustomEventArgs> onRenderTemplate { get; set; }

        [Parameter]
        private string templateName { get; set; }

        [Parameter]
        private int templateRegistryID { get; set; }

        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);

            var registry = DXTemplateRegistry.Find(templateRegistryID);

            //Console.WriteLine($"{templateRegistryID} templateItemCount ={registry.templateItems.Count}");
            int sequence = 1;
            for (int t = 0; t != registry.templateItemCount; t++)
            {
                builder.OpenElement(sequence++, "div");
                //Console.WriteLine($"{templateName} {t} {registry.templateItems.ContainsKey(t)}");
                if (registry.templateItems.ContainsKey(t))
                {
                    var item = registry.templateItems[t];

                    builder.AddAttribute(sequence++, "item", item._Version);
                    if (registry.itemSimpleTemplate != null)
                    {
                        builder.AddContent(sequence++, (RenderFragment)(builder3 => registry.itemSimpleTemplate.Invoke(builder3)));
                    }
                    else
                    {
                        builder.AddContent(sequence++, (RenderFragment)(builder3 => registry.itemTemplate?.Invoke(builder3, item)));
                    }
                }
                else
                {
                    builder.AddAttribute(sequence++, "item", 0);
                }
                builder.CloseElement();
            }
        }

        //protected override void StateHasChanged()
        //{
        //    Console.WriteLine("DXTemplateRenderer StateHasChanged");
        //    base.BuildRenderTree(null);
        //    base.StateHasChanged();
        //}

        internal static void RenderDXTemplate(RenderTreeBuilder builder,
            ref int sequence,
            string templateName,
            int templateRegistryID)
        {
            builder.OpenComponent<DXTemplateRenderer>(sequence++);
            builder.AddAttribute(sequence++, "templateName", templateName);
            builder.AddAttribute(sequence++, "templateRegistryID", templateRegistryID);
            builder.AddAttribute(sequence++, "onRenderTemplate", (evt) =>
            {
                UICustomEventArgs args = evt as UICustomEventArgs;
                DXTemplateItem item;

                if (string.IsNullOrWhiteSpace((string)args.Value))
                    item = new DXTemplateItem();
                else
                    item = Json.Deserialize<DXTemplateItem>((string)args.Value);

                var registry = DXTemplateRegistry.Find(templateRegistryID);
                item._Version++;
                registry.templateItems[item.itemIndex] = item;
                //Console.WriteLine($"onRenderTemplate {templateName} {item.itemIndex} {registry.templateItems.Count}");
            });

            builder.CloseComponent();
        }
    }

    public class DXTemplateRegistry
    {
        public Dictionary<int, DXTemplateItem> templateItems { get; set; } = new Dictionary<int, DXTemplateItem>();

        public int templateItemCount { get; set; }

        public RenderFragment<DXTemplateItem> itemTemplate { get; set; }

        private RenderFragment _itemSimpleTemplate;
        public RenderFragment itemSimpleTemplate
        {
            get
            {
                return _itemSimpleTemplate;
            }
            set
            {
                _itemSimpleTemplate = value;
                Clear(0);
            }
        }


        internal static int __id = 1;
        internal static Dictionary<int, DXTemplateRegistry> __list = new Dictionary<int, DXTemplateRegistry>();

        internal static int Create(DXTemplateRegistry obj)
        {
            obj.Clear(0);
            __list.Add(__id, obj);
            return __id++;
        }

        internal static DXTemplateRegistry Find(int templateRegistryID)
        {
            if (templateRegistryID == 0)
                throw new ApplicationException("templateRegistryID cannot be 0");
            return __list[templateRegistryID];
        }

        internal void Clear(int _templateItemCount)
        {
            if (itemSimpleTemplate != null)
                templateItemCount = 1;
            else
                templateItemCount = _templateItemCount;
        }
    }

    public class DXTemplateItem
    {
        internal int _Version { get; set; }
        public string itemData { get; set; }
        public int itemIndex { get; set; }
    }

    public static class ItemDeleteMode
    {
        public static string Context => "context";
        public static string SlideButton => "slideButton";
        public static string SlideItem => "slideItem";
        public static string StaticMode => "static";
        public static string Swipe => "swipe";
        public static string Toggle => "toggle";
    }

    public class DXCheckBox : BlazorComponent
    {
        [Parameter]
        public bool readOnly { get; set; }

        [Parameter]
        public string hint { get; set; }

        [Parameter]
        public string text { get; set; }

        [Parameter]
        public bool value { get; set; }

        [Parameter]
        public bool visible { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }
    }

    public class DXLookUp : BlazorComponent
    {
        private IEnumerable<object> _dataSource;

        [Parameter]
        public bool disabled { get; set; }

        [Parameter]
        public bool visible { get; set; }

        [Parameter]
        public bool showCancelButton { get; set; }

        [Parameter]
        public bool showClearButton { get; set; }

        [Parameter]
        public bool showPopupTitle { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onItemClick { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onOpened { get; set; }

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

        [Parameter]
        public RenderFragment titleTemplate { get; set; }

        [Parameter]
        public RenderFragment<StandaloneApp.DXTemplateItem> itemTemplate { get; set; }

        private int itemTemplateId;
        private int itemTitleTemplateId;

        public DXLookUp()
        {
            CreateRegistry();
        }

        private void CreateRegistry()
        {
            itemTitleTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
            itemTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
        }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            DXTemplateRegistry.Find(itemTitleTemplateId).itemSimpleTemplate = titleTemplate;
            DXTemplateRegistry.Find(itemTemplateId).itemTemplate = itemTemplate;
        }

        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);

            int sequence = 1;

            builder.OpenElement(sequence++, "div");
            builder.CloseElement();

            DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(titleTemplate), itemTitleTemplateId);
            DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(itemTemplate), itemTemplateId);
        }
    }

    public class DXList : BlazorComponent
    {
        private IEnumerable<object> _dataSource;

        [Parameter]
        public string itemDeleteMode { get; set; }

        [Parameter]
        public bool allowItemDeleting { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onItemClick { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onItemDeleted { get; set; }

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

        [Parameter]
        public RenderFragment<StandaloneApp.DXTemplateItem> groupTemplate { get; set; }

        [Parameter]
        public RenderFragment<StandaloneApp.DXTemplateItem> itemTemplate { get; set; }

        private int itemTemplateId;
        private int itemGroupTemplateId;

        public DXList()
        {
            CreateRegistry();
        }

        private void CreateRegistry()
        {
            itemGroupTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
            itemTemplateId = DXTemplateRegistry.Create(new DXTemplateRegistry());
        }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            DXTemplateRegistry.Find(itemTemplateId).itemTemplate = itemTemplate;
            DXTemplateRegistry.Find(itemGroupTemplateId).itemTemplate = groupTemplate;
        }

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

    public class DXDateBox : BlazorComponent
    {
        public static class Types
        {
            public static string date = "date";
            public static string datetime = "datetime";
            public static string time = "time";
        }

        [Parameter]
        public bool visible { get; set; }

        [Parameter]
        public string type { get; set; }

        [Parameter]
        public bool disabled { get; set; }

        [Parameter]
        public System.DateTime value { get; set; }

        [Parameter]
        public Action<UICustomEventArgs> onValueChanged { get; set; }
    }
}
