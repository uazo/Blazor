// <auto-generated/>
#pragma warning disable 1591
namespace Test
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Blazor;
    using Microsoft.AspNetCore.Blazor.Components;
    public class TestComponent : Microsoft.AspNetCore.Blazor.Components.BlazorComponent
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Blazor.RenderTree.RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);
            builder.OpenElement(0, "input");
            builder.AddAttribute(1, "type", "checkbox");
            builder.AddAttribute(2, "checked", Microsoft.AspNetCore.Blazor.Components.BindMethods.GetValue(Enabled));
            builder.AddAttribute(3, "onchange", Microsoft.AspNetCore.Blazor.Components.BindMethods.SetValueHandler(__value => Enabled = __value, Enabled));
            builder.CloseElement();
        }
        #pragma warning restore 1998
#line 3 "x:\dir\subdir\Test\TestComponent.cshtml"
            
    public bool Enabled { get; set; }

#line default
#line hidden
    }
}
#pragma warning restore 1591
