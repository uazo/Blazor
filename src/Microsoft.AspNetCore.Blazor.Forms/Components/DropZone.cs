using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Blazor.RenderTree;
using Microsoft.AspNetCore.Blazor.Components;

namespace Microsoft.AspNetCore.Blazor.Forms.Components
{
	/// <summary>
	/// 
	/// </summary>
	public class DropZone : Blazor.Components.BlazorComponent
	{
        /// <summary>
        /// 
        /// </summary>
        [Parameter]
        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Parameter]
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Parameter]
        public string Url { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Parameter]
        public string AuthorizationHeader { get; set; }

        /// <summary>
        /// </summary>
        [Parameter]
        public int MaxFiles { get; set; } = 1;

        /// <summary>
        /// 
        /// </summary>
        [Parameter]
        public Action<UICustomEventArgs> OnFileAdded { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Parameter]
        public Action<UICustomEventArgs> OnFileRemoved { get; set; }

        /// <summary>
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        ///// <inheritdoc />
        //public override void SetParameters(ParameterCollection parameters)
        //{
        //    parameters.TryGetValue(RenderTreeBuilder.ChildContent, out ChildContent);

        //    base.SetParameters(parameters);
        //}

        /// <inheritdoc />
        protected override void BuildRenderTree( RenderTreeBuilder builder )
		{
			int sequence = 1;

            builder.OpenElement(sequence++, "div");
			builder.AddAttribute(sequence++, "class", "dropzone needsclick");
            if (ChildContent == null)
            {
                builder.OpenElement(sequence++, "div");
                    builder.AddAttribute(sequence++, "class", "dz-message needsclick");
                    builder.AddContent(sequence++, "Drop files ");
                    builder.OpenElement(sequence++, "span");
                        builder.AddAttribute(sequence++, "class", "dz-note needsclick");
                    builder.CloseElement();
                builder.CloseElement();
            }
            else
            {
                builder.AddContent(sequence++, ChildContent);
            }
            builder.CloseElement();

			//<dropzone>
			//	<div class="dropzone needsclick">
			//		<div class="dz-message needsclick">
			//			Drop files <b>here</b> or <b>click</b> to upload.<br />
			//			<span class="dz-note needsclick">
			//				(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
			//			</span>
			//		</div>
			//	</div>
			//</dropzone>

			base.BuildRenderTree(builder);
		}

		/// <summary>
		/// 
		/// </summary>
		public class FileEventArgs
		{
			/// <summary>
			/// </summary>
			public string FileName { get; set; }

			/// <summary>
			/// </summary>
			public int Size { get; set; }

			/// <summary>
			/// </summary>
			public System.Guid Guid { get; set; }
		}
	}
}
