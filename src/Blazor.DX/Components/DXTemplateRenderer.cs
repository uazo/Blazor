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

        static int nUpdate = 0;

        /// <summary></summary>
        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);

            var registry = DXTemplateRegistry.Find(templateRegistryID);

            //Console.WriteLine($"{templateRegistryID} templateItemCount ={registry.templateItems.Count}");
            int sequence = 1;
            var keys = registry.templateItems.Keys.OrderBy( x=> x ).ToArray();
            foreach (var key in keys)
            {
                string startElement = "DIV";
                var item = registry.templateItems[key];
                if (item.NeedUpdate)
                {
                    item.NeedUpdate = false;
                    startElement += $".{nUpdate++}";
                }

                builder.OpenElement(sequence++, startElement);
                builder.AddAttribute(sequence++, "btplid", key);
                //Console.WriteLine($"{templateName} {t} {registry.templateItems.ContainsKey(t)}");

                if (registry.itemSimpleTemplate != null)
                {
                    builder.AddContent(sequence++, RenderSimpleTemplate(registry));
                }
                else
                {
                    builder.AddContent(sequence++, RenderItemTemplate(registry, item));
                }
                
                builder.CloseElement();
            }
        }

        private static RenderFragment RenderSimpleTemplate(DXTemplateRegistry registry)
            => (RenderFragment)(builder3 => registry.itemSimpleTemplate.Invoke(builder3));

        private static RenderFragment RenderItemTemplate(DXTemplateRegistry registry, DXTemplateItem item)
            => (RenderFragment)(builder3 => registry.itemTemplate?.Invoke(builder3, item));

        internal static void RenderDXTemplate(
            BlazorComponent component,
            RenderTreeBuilder builder,
            ref int sequence,
            string templateName,
            int templateRegistryID)
        {
            builder.OpenComponent<DXTemplateRenderer>(sequence++);
            builder.AddAttribute(sequence++, "templateName", templateName);
            builder.AddAttribute(sequence++, "templateRegistryID", templateRegistryID);
            builder.AddAttribute(sequence++, "onRenderTemplate",
                component.Action( $"onRenderTemplate_{templateRegistryID}",
                (evt, x) =>
                {
                    UICustomEventArgs args = evt as UICustomEventArgs;
                    DXTemplateItem item;

                    if (string.IsNullOrWhiteSpace((string)args.Value))
                        item = new DXTemplateItem();
                    else
                        item = Json.Deserialize<DXTemplateItem>((string)args.Value);

                    var registry = DXTemplateRegistry.Find(templateRegistryID);
                    item.NeedUpdate = true;
                    registry.templateItems[item.itemIndex] = item;
                    //Console.WriteLine($"onRenderTemplate {templateName} {item.itemIndex} {registry.templateItems.Count}");
                }));
            //builder.AddAttribute(sequence++, "onRenderTemplate", (evt) =>
            //{
            //    UICustomEventArgs args = evt as UICustomEventArgs;
            //    DXTemplateItem item;

            //    if (string.IsNullOrWhiteSpace((string)args.Value))
            //        item = new DXTemplateItem();
            //    else
            //        item = Json.Deserialize<DXTemplateItem>((string)args.Value);

            //    var registry = DXTemplateRegistry.Find(templateRegistryID);
            //    item._Version++;
            //    registry.templateItems[item.itemIndex] = item;
            //    //Console.WriteLine($"onRenderTemplate {templateName} {item.itemIndex} {registry.templateItems.Count}");
            //});

            builder.CloseComponent();
        }
    }

    /// <summary></summary>
    public class DXTemplateRegistry
    {
        /// <summary></summary>
        internal Dictionary<int, DXTemplateItem> templateItems { get; set; } = new Dictionary<int, DXTemplateItem>();

        ///// <summary></summary>
        //internal int templateItemCount { get; set; }

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
                Clear();
            }
        }


        internal static int __id = 1;
        internal static Dictionary<int, DXTemplateRegistry> __list = new Dictionary<int, DXTemplateRegistry>();

        internal static int Create(DXTemplateRegistry obj)
        {
            obj.Clear();
            __list.Add(__id, obj);
            return __id++;
        }

        internal static DXTemplateRegistry Find(int templateRegistryID)
        {
            if (templateRegistryID == 0)
                throw new ApplicationException("templateRegistryID cannot be 0");
            return __list[templateRegistryID];
        }

        internal void Clear()
        {
            foreach (var i in templateItems.Values) i.NeedUpdate = true;
            //templateItems.Clear();

            //if (itemSimpleTemplate != null)
            //    templateItems.Add(0, new DXTemplateItem());
        }

        internal static void DisposeDXTemplate(int itemTemplateId)
        {
            if (__list.ContainsKey(itemTemplateId))
                __list.Remove(itemTemplateId);
        }
    }

    /// <summary></summary>
    public class DXTemplateItem
    {
        internal bool NeedUpdate { get; set; }

        /// <summary></summary>
        public string itemData { get; set; }
        /// <summary></summary>
        public int itemIndex { get; set; }
    }
}
