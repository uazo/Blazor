// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using Microsoft.JSInterop;
using System;

namespace Microsoft.AspNetCore.Blazor.Browser.Rendering
{
    /// <summary>
    /// Provides mechanisms for dispatching events to components in a <see cref="BrowserRenderer"/>.
    /// This is marked 'internal' because it only gets invoked from JS code.
    /// </summary>
    internal static class BrowserRendererEventDispatcher
    {
        // We receive the information as JSON strings because of current interop limitations:
        // - Can't pass unboxed value types from JS to .NET (yet all the IDs are ints)
        // - Can't pass more than 4 args from JS to .NET
        // This can be simplified in the future when the Mono WASM runtime is enhanced.
        public static void DispatchEvent(string eventDescriptorJson, string eventArgsJson)
        {
            var eventDescriptor = Json.Deserialize<BrowserEventDescriptor>(eventDescriptorJson);
            var eventArgs = ParseEventArgsJson(eventDescriptor.EventArgsType, eventArgsJson);
            var browserRenderer = BrowserRendererRegistry.Find(eventDescriptor.BrowserRendererId);
            browserRenderer.DispatchBrowserEvent(
                eventDescriptor.ComponentId,
                eventDescriptor.EventHandlerId,
                eventArgs);
        }

        private static UIEventArgs ParseEventArgsJson(string eventArgsType, string eventArgsJson)
        {
            switch (eventArgsType)
            {
                case "change":
                    return Json.Deserialize<UIChangeEventArgs>(eventArgsJson);
                case "clipboard":
                    return Json.Deserialize<UIClipboardEventArgs>(eventArgsJson);
                case "drag":
                    return Json.Deserialize<UIDragEventArgs>(eventArgsJson);
                case "error":
                    return Json.Deserialize<UIErrorEventArgs>(eventArgsJson);
                case "focus":
                    return Json.Deserialize<UIFocusEventArgs>(eventArgsJson);
                case "keyboard":
                    return Json.Deserialize<UIKeyboardEventArgs>(eventArgsJson);
                case "mouse":
                    return Json.Deserialize<UIMouseEventArgs>(eventArgsJson);
                case "pointer":
                    return Json.Deserialize<UIPointerEventArgs>(eventArgsJson);
                case "progress":
                    return Json.Deserialize<UIProgressEventArgs>(eventArgsJson);
                case "touch":
                    return Json.Deserialize<UITouchEventArgs>(eventArgsJson);
                case "unknown":
                    return Json.Deserialize<UIEventArgs>(eventArgsJson);
                case "wheel":
                    return Json.Deserialize<UIWheelEventArgs>(eventArgsJson);
								case "custom":
										return Json.Deserialize<UICustomEventArgs>(eventArgsJson);

                default:
                     throw new ArgumentException($"Unsupported value '{eventArgsType}'.", nameof(eventArgsType));
            }
        }

        private class BrowserEventDescriptor
        {
            public int BrowserRendererId { get; set; }
            public int ComponentId { get; set; }
            public int EventHandlerId { get; set; }
            public string EventArgsType { get; set; }
        }
    }
}
