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
	public class Form<T> : Microsoft.AspNetCore.Blazor.Components.BlazorComponent/*, IForm*/
	{
        [Inject] private System.Net.Http.HttpClient HttpClient { get; set; }

        /// <summary>
        /// </summary>
        public ModelStateDictionary<T> ModelState { get; private set; }

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
				ModelState = new ModelStateDictionary<T>(value);
			}
		}

		/// <summary>
		/// Method invoked when the component has received parameters from its parent in
		/// the render tree, and the incoming values have been assigned to properties.
		/// Invoke ValidateModel()
		/// </summary>
		protected override void OnParametersSet()
		{
			base.OnParametersSet();

			ValidateModel();
		}

		#region Validating Stuffs

		private bool _isValid { get; set; }

		internal List<System.ComponentModel.DataAnnotations.ValidationResult> GetValidationResults()
		{
			return _validationResults;
		}

		private List<System.ComponentModel.DataAnnotations.ValidationResult> _validationResults;
		private System.ComponentModel.DataAnnotations.ValidationContext _context;

		/// <summary>
		/// Validate the model
		/// </summary>
		/// <returns>True if is valid</returns>
		public bool IsValid()
		{
			return _isValid;
		}

		/// <summary>
		/// Validate the model
		/// </summary>
		public void ValidateModel()
		{
			//Console.WriteLine("ValidateModel!");

            bool currentIsValid = _isValid;

			_context = null;
			_validationResults = null;
			_isValid = true;

			if (Model != null)
			{
                //var t = TypeDescriptor.GetAttributes(typeof(Internals.MasqueradeObject<T>));

                var m = new Internals.MasqueradeObject<T>(Model);
                m.GetValue = ( pd ) =>
                {
                	var value = ModelState.GetValue(pd);
                	return value;
                };
				_context = new System.ComponentModel.DataAnnotations.ValidationContext(m, serviceProvider: null, items: null);
				_validationResults = new List<System.ComponentModel.DataAnnotations.ValidationResult>();
				_isValid = m.TryValidateObject(_context, _validationResults, ModelState.PropertyChanged);
                ModelState.ClearChanges();

                //Console.WriteLine($"_isValid = {_isValid}");

                if (currentIsValid != _isValid) this.StateHasChanged();
			}
		}

        internal System.Net.Http.HttpClient getHttpClient()
        {
            return HttpClient;
        }

        #endregion

        #region Set Values

        /// <summary>
        /// </summary>
        public object GetValue<V>(Expression<Func<T, V>> Field)
        {
            var property = Internals.PropertyHelpers.GetProperty<T, V>(Field);
            return ModelState.GetValue(property);
        }

        /// <summary>
        /// </summary>
        public void SetValue<V>(Expression<Func<T, V>> Field, V Value)
        {
            var property = Internals.PropertyHelpers.GetProperty<T, V>(Field);
            SetValue(property, Value);
        }

        internal void SetValue(PropertyInfo property, object parsedValue)
        {
            SetValue(property.Name, property.PropertyType, parsedValue);
        }

        private void SetValue(string propertyName, Type propertType, object parsedValue)
        {
            this.ModelState?.SetValue(propertyName, propertType, parsedValue);
            this.ValidateModel();
            this.StateHasChanged();
        }

        internal bool RemoveValue(string propertyName)
        {
            if (this.ModelState?.RemoveValue(propertyName) == true)
            {
                this.ValidateModel();
                this.StateHasChanged();
                return true;
            }
            return false;
        }

        #endregion
    }
}
