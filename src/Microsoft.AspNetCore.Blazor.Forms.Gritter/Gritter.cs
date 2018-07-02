using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microsoft.AspNetCore.Blazor.Forms.Components
{
    /// <summary>
    /// </summary>
    public static class Gritter
    {
        /// <summary>
        /// </summary>
        public static void ShowMessage( string Title, string Text)
        {
            ((IJSInProcessRuntime)JSRuntime.Current).Invoke<bool>("ShowGritterMessage", new object[] { Title, Text });
        }
    }
}
