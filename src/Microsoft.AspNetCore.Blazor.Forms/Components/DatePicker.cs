using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Blazor.Components;
using Microsoft.AspNetCore.Blazor.Forms.Extensions;
using Microsoft.AspNetCore.Blazor.RenderTree;

namespace Microsoft.AspNetCore.Blazor.Forms.Components
{
    /// <summary>
    /// </summary>
    public class DatePicker : BlazorComponent
    {
        /// <summary>
        /// </summary>
        [Parameter]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [Parameter]
        public System.DateTime? Value { get; set; }

        /// <summary>
        /// </summary>
        [Parameter]
        public string Format { get; set; }

        /// <summary>
        /// </summary>
        [Parameter]
        public object HtmlAttributes { get; set; }

        /// <summary>
        /// </summary>
        [Parameter]
        public Action<UICustomEventArgs> OnChange { get; set; }

        /// <inheritsdoc/>
        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            int sequence = 1;

            builder.OpenElement(sequence++, "div");
            builder.AddAttribute(sequence++, "class", "input-group date");
            builder.AddAttribute(sequence++, "id", Name);

            builder.OpenElement(sequence++, "input");
            builder.AddAttribute(sequence++, "type", "text");
            builder.AddAttribute(sequence++, "name", Name);
            if (Value.HasValue)
            {
                var d = Value.Value.ToString(); //.Subtract(new DateTime(1970, 1, 1)).TotalMilliseconds;
                builder.AddAttribute(sequence++, "value", d);
                //Console.WriteLine(d);
            }

            ExtensionsFunctions.WriteHtmlAttributes(builder, ref sequence, HtmlAttributes);
            builder.CloseElement();

            builder.OpenElement(sequence++, "span");
            builder.AddAttribute(sequence++, "class", "input-group-addon");
            builder.OpenElement(sequence++, "i");
            builder.AddAttribute(sequence++, "class", "fa fa-clock");
            builder.CloseElement();
            builder.CloseElement();

            builder.CloseElement();

            base.BuildRenderTree(builder);
        }
    }
}
