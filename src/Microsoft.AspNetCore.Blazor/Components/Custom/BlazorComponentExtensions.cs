using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Components
{
    public abstract partial class BlazorComponent
    {
        System.Collections.Generic.Dictionary<System.Reflection.MethodInfo, System.Collections.Generic.Dictionary<object, Action<UIEventArgs>>>
            _retainedActions = new System.Collections.Generic.Dictionary<System.Reflection.MethodInfo, System.Collections.Generic.Dictionary<object, Action<UIEventArgs>>>();

        /// <summary>
        /// </summary>
        public Action<UIEventArgs> Action<T>(T args1, Action<UIEventArgs> action)
        {
            if (_retainedActions.TryGetValue(action.Method, out var list) == false)
            {
                list = new System.Collections.Generic.Dictionary<object, Action<UIEventArgs>>();
                _retainedActions[action.Method] = list;
            }

            if (list.TryGetValue(args1, out var value) == false)
            {
                value = (e) => action(e);
                list[args1] = value;
            }
            return value;
        }

        /// <summary>
        /// </summary>
        public Action<UIEventArgs> Action<T>(T args1, Action<UIEventArgs, T> action)
        {
            if (_retainedActions.TryGetValue(action.Method, out var list) == false)
            {
                list = new System.Collections.Generic.Dictionary<object, Action<UIEventArgs>>();
                _retainedActions[action.Method] = list;
            }

            if (list.TryGetValue(args1, out var value) == false)
            {
                value = (e) => action(e, args1);
                list[args1] = value;
            }
            return value;
        }
    }
}
