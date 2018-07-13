using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using Microsoft.AspNetCore.Blazor.RenderTree;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StandaloneApp
{
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

        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);

            DXTemplateRegistry.Find(itemTemplateId).itemTemplate = itemTemplate;
            DXTemplateRegistry.Find(itemTitleTemplateId).itemTemplate = itemTitleTemplate;

            //Console.WriteLine($"DXAccordion BuildRenderTree {items_TitleTemplate.Count}");

            int sequence = 1;

            builder.OpenElement(sequence++, "div");
            builder.CloseElement();
            if (dataSource != null)
            {
                DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(itemTitleTemplate), itemTitleTemplateId);
                DXTemplateRenderer.RenderDXTemplate(builder, ref sequence, nameof(itemTemplate), itemTemplateId);
            }
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

            Console.WriteLine($"{templateRegistryID} templateItemCount ={registry.templateItems.Count}");
            int sequence = 1;
            for (int t = 0; t != registry.templateItemCount; t++)
            {
                builder.OpenElement(sequence++, "div");
                Console.WriteLine($"{templateName} {t} {registry.templateItems.ContainsKey(t)}");
                if (registry.templateItems.ContainsKey(t))
                {
                    var item = registry.templateItems[t];

                    builder.AddAttribute(sequence++, "item", item._Version);
                    builder.AddContent(sequence++, (RenderFragment)(builder3 => registry.itemTemplate?.Invoke(builder3, item)));
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
                var item = Microsoft.JSInterop.Json.Deserialize<DXTemplateItem>((string)args.Value);

                var registry = DXTemplateRegistry.Find(templateRegistryID);
                item._Version++;
                registry.templateItems[item.itemIndex] = item;
                Console.WriteLine($"onRenderTemplate {templateName} {item.itemIndex} {registry.templateItems.Count}");
            });

            builder.CloseComponent();
        }
    }

    public class DXTemplateRegistry
    {
        public Dictionary<int, DXTemplateItem> templateItems { get; set; } = new Dictionary<int, DXTemplateItem>();
        public RenderFragment<StandaloneApp.DXTemplateItem> itemTemplate { get; set; }
        public int templateItemCount { get; set; }


        internal static int __id = 1;
        internal static Dictionary<int, DXTemplateRegistry> __list = new Dictionary<int, DXTemplateRegistry>();

        internal static int Create(DXTemplateRegistry obj)
        {
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
            templateItemCount = _templateItemCount;
        }
    }

    public class DXTemplateItem
    {
        internal int _Version { get; set; }
        public string itemData { get; set; }
        public int itemIndex { get; set; }
    }
}
