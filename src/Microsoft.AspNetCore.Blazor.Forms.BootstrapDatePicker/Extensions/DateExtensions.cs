using Microsoft.AspNetCore.Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Forms.Extensions
{
    /// <summary>
    /// </summary>
    public static class DateExtensions
    {
        /// <summary>
        /// </summary>
        public static Microsoft.AspNetCore.Blazor.RenderFragment DateTimePickerFor<T, V>(
            this IForm<T> form,
            Expression<Func<T, V>> Field,
            object htmlAttributes = null,
            string Format = null) => form.ModelState.DateTimePickerFor(Field, htmlAttributes, Format);

        /// <summary>
        /// </summary>
        public static Microsoft.AspNetCore.Blazor.RenderFragment DateTimePickerFor<T, V>(
              this ModelStateDictionary<T> model,
              Expression<Func<T, V>> Field,
              object htmlAttributes = null,
              string Format = null)
        {
            var property = Extensions.PropertyHelpers.GetProperty(Field);

            System.DateTime.TryParse( model.GetValue(property)?.ToString(), out System.DateTime currentValue);

            return (builder) =>
            {
                int sequence = 1;

                builder.OpenComponent<Components.DatePicker>(sequence++);
                builder.AddAttribute(sequence++, "Name", property.Name);
                builder.AddAttribute(sequence++, "Value", currentValue);
                builder.AddAttribute(sequence++, "HtmlAttributes", htmlAttributes);
                builder.AddAttribute(sequence++, "Format", Format);

                builder.AddAttribute(sequence++, "onchange",
                    Blazor.Components.BindMethods.GetEventHandlerValue<UICustomEventArgs>( (e) =>
                {
                    model.SetValue( property, e.Value);
                }));

                builder.CloseComponent();
            };
        }
    }
}