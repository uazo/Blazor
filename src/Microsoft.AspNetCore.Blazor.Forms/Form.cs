using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Blazor.Components;
using Microsoft.AspNetCore.Blazor.RenderTree;

namespace Microsoft.AspNetCore.Blazor.Forms
{
	/// <summary>
	/// </summary>
	/// <typeparam name="T"></typeparam>
	public class Form<T> : Microsoft.AspNetCore.Blazor.Components.BlazorComponent, IForm<T>
	{
        [Inject] private System.Net.Http.HttpClient HttpClient { get; set; }

        /// <summary>
        /// </summary>
        public ModelStateDictionary<T> ModelState { get; set; }

		private T _Model;

        /// <summary>
        /// </summary>
        [Parameter]
        internal protected T Model
		{
			get { return _Model; }
			set
			{
				_Model = value;
				ModelState = CreateModelState(value);
			}
		}

        /// <summary>
        /// </summary>
        protected virtual ModelStateDictionary<T> CreateModelState(T value)
        {
            return new ModelStateDictionary<T>(value);
        }

        /// <summary>
        /// Method invoked when the component has received parameters from its parent in
        /// the render tree, and the incoming values have been assigned to properties.
        /// Invoke ValidateModel()
        /// </summary>
        protected override void OnParametersSet()
		{
			base.OnParametersSet();
			ModelState?.ValidateModel();
		}

		#region Internal Stuffs

        internal System.Net.Http.HttpClient getHttpClient()
        {
            return HttpClient;
        }

        #endregion

        #region Set Values

        ///// <summary>
        ///// </summary>
        //public object GetValue<V>(Expression<Func<T, V>> Field)
        //{
        //    var property = Internals.PropertyHelpers.GetProperty<T, V>(Field);
        //    return ModelState.GetValue(property);
        //}

        ///// <summary>
        ///// </summary>
        //public void SetValue<V>(Expression<Func<T, V>> Field, V Value)
        //{
        //    var property = Internals.PropertyHelpers.GetProperty<T, V>(Field);
        //    SetValue(property, Value);
        //}

        //internal void SetValue(PropertyInfo property, object parsedValue)
        //{
        //    SetValue(property.Name, property.PropertyType, parsedValue);
        //}

        //private void SetValue(string propertyName, Type propertType, object parsedValue)
        //{
        //    this.ModelState?.SetValue(propertyName, propertType, parsedValue);
        //    this.StateHasChanged();
        //}

        //internal bool RemoveValue(string propertyName)
        //{
        //    if (this.ModelState?.RemoveValue(propertyName) == true)
        //    {
        //        this.ModelState?.ValidateModel();
        //        this.StateHasChanged();
        //        return true;
        //    }
        //    return false;
        //}

        #endregion

        /// <summary>
        /// </summary>
        public void ValidateModel()
        {
            bool currentIsValid = ModelState.IsValid();

            ModelState?.ValidateModel();
            if (currentIsValid != ModelState.IsValid()) this.StateHasChanged();
        }
    }
}
