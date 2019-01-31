using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Blazor.Forms.Components;
using Microsoft.JSInterop;

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
            /// Set Authorization Header value
            /// </summary>
            public string AuthorizationHeader { get; set; }

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
            internal protected virtual void InvokeOnFileAdded<T>(ModelStateDictionary<T> model, System.Reflection.PropertyInfo Property, DropZone.FileEventArgs args)
            {
                model.SetValue(Property, args.Guid);
                OnFileAdded?.Invoke(Property.Name, args);
            }

            /// <summary>
            /// </summary>
            public Action<string, Components.DropZone.FileEventArgs> OnFileRemoved { get; set; }

            /// <summary>
            /// </summary>
            internal protected virtual void InvokeOnFileRemoved<T>(ModelStateDictionary<T> model, System.Reflection.PropertyInfo Property, DropZone.FileEventArgs args)
            {
                if( model.RemoveValue(Property) == false)
                    model.SetValue(Property, null);

                OnFileRemoved?.Invoke(Property.Name, args);
            }
        }

        /// <summary>
        /// </summary>
        public static Microsoft.AspNetCore.Blazor.RenderFragment DropZoneFor<T, V>(
            this Microsoft.AspNetCore.Blazor.Forms.Form<T> form,
            Expression<Func<T, V>> Field,
            DropZoneOptions options = null,
            object htmlAttributes = null) => form.ModelState.DropZoneFor(Field, options, htmlAttributes);


        /// <summary>
        /// </summary>
        public static Microsoft.AspNetCore.Blazor.RenderFragment DropZoneFor<T, V>(
          this ModelStateDictionary<T> model,
          Expression<Func<T, V>> Field,
          DropZoneOptions options = null,
          object htmlAttributes = null)
        {
            if (options == null) options = new DropZoneOptions();

            var property = Extensions.PropertyHelper<T>.GetProperty(Field);
            string currentValue = model.GetValue(property)?.ToString();
            //Console.WriteLine($"currentValue={currentValue}");

            return (builder) =>
            {
                int sequence = 1;

                builder.OpenComponent<Components.DropZone>(sequence++);
                builder.AddAttribute(sequence++, "Name", property.Name);
                builder.AddAttribute(sequence++, "Id", property.Name);
                builder.AddAttribute(sequence++, "Url", options.PostUrl);
                builder.AddAttribute(sequence++, "MaxFiles", options.MaxFiles);
                if( string.IsNullOrEmpty(options.AuthorizationHeader) == false)
                    builder.AddAttribute(sequence++, "AuthorizationHeader", options.AuthorizationHeader);
                builder.AddAttribute(sequence++, "Value", currentValue == null ? string.Empty : currentValue);

                builder.AddAttribute(sequence++, "onfileadded",
                    model.OnAction($"onfileadded_{property}", args =>
                    {
                        var customArgs = args as UICustomEventArgs;
                        var fileArgs = Json.Deserialize<Components.DropZone.FileEventArgs>((string)customArgs.Value);
                        options.InvokeOnFileAdded(model, property, fileArgs);
                    }));

                builder.AddAttribute(sequence++, "onfileremoved",
                    model.OnAction($"onfileremoved_{property}", args =>
                    {
                        var customArgs = args as UICustomEventArgs;
                        var fileArgs = Json.Deserialize<Components.DropZone.FileEventArgs>((string)customArgs.Value);
                        options.InvokeOnFileRemoved(model, property, fileArgs);
                    }));

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