using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Blazor.Forms.Components;

namespace Microsoft.AspNetCore.Blazor.Forms.Extensions
{
    /// <summary>
    /// 
    /// </summary>
    public static class DropZoneExtensions
    {
        /// <summary>
        /// </summary>
        public class DropZoneOptions
        {
            /// <summary>
            /// </summary>
            public static string DefaultPostUrl { get; set; }

            private string _postUrl = null;

            /// <summary>
            /// Limit the maximum number of files that will be handled by this Dropzone
            /// </summary>
            public int MaxFiles { get; set; } = 1;

            /// <summary>
            /// </summary>
            public int ImageWidth { get; set; } = 100;

            /// <summary>
            /// Get url of current Value
            /// </summary>
            public Func<string, string> GetUrl { get; set; }

            /// <summary>
            /// 
            /// </summary>
            public string PostUrl
            {
                get
                {
                    if (string.IsNullOrEmpty(_postUrl) == false) return _postUrl;
                    return DefaultPostUrl;
                }
                set
                {
                    _postUrl = value;
                }
            }

            /// <summary>
            /// </summary>
            public Action<string, Components.DropZone.FileEventArgs> OnFileAdded { get; set; }

            /// <summary>
            /// </summary>
            internal protected virtual void InvokeOnFileAdded<T>(Form<T> form, System.Reflection.PropertyInfo Property, DropZone.FileEventArgs args)
            {
                form.ModelState.SetValue(Property.Name, Property.PropertyType, args.Guid);
                OnFileAdded?.Invoke(Property.Name, args);
            }

            /// <summary>
            /// </summary>
            public Action<string, Components.DropZone.FileEventArgs> OnFileRemoved { get; set; }

            /// <summary>
            /// </summary>
            internal protected virtual void InvokeOnFileRemoved<T>(Form<T> form, System.Reflection.PropertyInfo Property, DropZone.FileEventArgs args)
            {
                if( form.ModelState.RemoveValue(Property.Name) == false)
                    form.ModelState.SetValue(Property.Name, Property.PropertyType, null);

                OnFileRemoved?.Invoke(Property.Name, args);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="V"></typeparam>
        /// <param name="form"></param>
        /// <param name="Field"></param>
        /// <param name="options"></param>
        /// <param name="htmlAttributes"></param>
        /// <returns></returns>
        public static Microsoft.AspNetCore.Blazor.RenderFragment DropZoneFor<T, V>(
          this Microsoft.AspNetCore.Blazor.Forms.Form<T> form,
          Expression<Func<T, V>> Field,
          DropZoneOptions options = null,
          object htmlAttributes = null)
        {
            if (options == null) options = new DropZoneOptions();

            var property = Internals.PropertyHelpers.GetProperty<T, V>(Field);
            string currentValue = form.ModelState.GetValue(property)?.ToString();
            //Console.WriteLine($"currentValue={currentValue}");

            return (builder) =>
            {
                int sequence = 1;

                builder.OpenComponent<Components.DropZone>(sequence++);
                builder.AddAttribute(sequence++, "Name", property.Name);
                builder.AddAttribute(sequence++, "Id", property.Name);
                builder.AddAttribute(sequence++, "Url", options.PostUrl);
                builder.AddAttribute(sequence++, "MaxFiles", options.MaxFiles);
                builder.AddAttribute(sequence++, "Value", currentValue == null ? string.Empty : currentValue);

                builder.AddAttribute(sequence++, "onfileadded", args =>
                {
                    var customArgs = args as UICustomEventArgs;
                    var fileArgs = JsonUtil.Deserialize<Components.DropZone.FileEventArgs>((string)customArgs.Value);
                    options.InvokeOnFileAdded(form, property, fileArgs);
                });

                builder.AddAttribute(sequence++, "onfileremoved", args =>
                {
                    var customArgs = args as UICustomEventArgs;
                    var fileArgs = JsonUtil.Deserialize<Components.DropZone.FileEventArgs>((string)customArgs.Value);
                    options.InvokeOnFileRemoved(form, property, fileArgs);
                });

                builder.WriteHtmlAttributes(ref sequence, htmlAttributes);

                if (options.GetUrl != null)
                {
                    var currentUrl = options.GetUrl(currentValue);

                    builder.AddAttribute(sequence++,
                        RenderTree.RenderTreeBuilder.ChildContent,
                        (Microsoft.AspNetCore.Blazor.RenderFragment)((frame) =>
                    {
                        int seq = 1;
                        if (string.IsNullOrEmpty(currentUrl) == false)
                        {
                            frame.AddContent(seq++, "");
                            frame.OpenElement(seq++, "IMG");
                            frame.AddAttribute(seq++, "src", currentUrl);
                            frame.AddAttribute(seq++, "width", options.ImageWidth);
                            frame.CloseElement();
                        }
                        else
                        {
                            frame.AddContent(seq++, "Drop files ");
                            frame.OpenElement(seq++, "span");
                            frame.AddAttribute(seq++, "class", "dz-note needsclick");
                            frame.CloseElement();
                        }
                    }));
                }

                builder.CloseComponent();
            };
        }
    }
}