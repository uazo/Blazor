using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using Microsoft.AspNetCore.Blazor.RenderTree;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.DX
{
    /// <summary></summary>
    public class DXTemplateRenderer : BlazorComponent
    {
        [Parameter]
        private Action<UICustomEventArgs> onRenderTemplate { get; set; }

        [Parameter]
        private string templateName { get; set; }

        [Parameter]
        private int templateRegistryID { get; set; }

        /// <summary></summary>
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

    /// <summary></summary>
    public class DXTemplateRegistry
    {
        /// <summary></summary>
        internal Dictionary<int, DXTemplateItem> templateItems { get; set; } = new Dictionary<int, DXTemplateItem>();

        /// <summary></summary>
        internal int templateItemCount { get; set; }

        /// <summary></summary>
        internal RenderFragment<DXTemplateItem> itemTemplate { get; set; }

        private RenderFragment _itemSimpleTemplate;

        /// <summary></summary>
        internal RenderFragment itemSimpleTemplate
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

    /// <summary></summary>
    public class DXTemplateItem
    {
        internal int _Version { get; set; }

        /// <summary></summary>
        public string itemData { get; set; }
        /// <summary></summary>
        public int itemIndex { get; set; }
    }
}
