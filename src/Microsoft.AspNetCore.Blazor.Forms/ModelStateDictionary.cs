using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Forms
{
    /// <summary>
    /// </summary>
    public class ModelStateDictionary<T> : Dictionary<string, object>
    {
        T _binder;
        System.Collections.Generic.List<string> propertyChanged;

        /// <summary>
        /// </summary>
        /// <param name="binder"></param>
        public ModelStateDictionary(T binder)
        {
            _binder = binder;
        }

        #region Get/Set Values

        internal object GetValue(PropertyDescriptor property)
        {
            if (this.ContainsKey(property.Name))
                return this[property.Name];
            else
                return property.GetValue(_binder);
        }

        internal string GetValue(PropertyInfo property)
        {
            if (this.ContainsKey(property.Name))
                return this[property.Name]?.ToString();
            else
                return property.GetValue(_binder)?.ToString();
        }

        internal bool ContainsValue(PropertyInfo property)
        {
            return this.ContainsKey(property.Name);
        }

        internal void SetValue(string propertyName, Type propertyType, object parsedValue)
        {
            this[propertyName] = parsedValue;

            if (parsedValue != null)
            {
                if( propertyType == typeof(string))
                {
                    this[propertyName] = parsedValue.ToString();
                }
                else if (propertyType == typeof(int))
                {
                    if (int.TryParse(parsedValue.ToString(), out int v))
                        this[propertyName] = v;
                }
                else if( propertyType == typeof(bool))
                {
                    if (bool.TryParse(parsedValue.ToString(), out bool v))
                        this[propertyName] = v;
                }
            }

            if (propertyChanged == null) propertyChanged = new List<string>();
            if (propertyChanged.Contains(propertyName) == false) propertyChanged.Add(propertyName);
        }

        internal bool RemoveValue(string propertyName)
        {
            if (this.ContainsKey(propertyName))
            {
                this.Remove(propertyName);
                return true;
            }
            return false;
        }

        #endregion

        #region Changes

        internal System.Collections.Generic.List<string> PropertyChanged { get { return propertyChanged; } }
        internal void ClearChanges()
        {
            propertyChanged = null;
        }

        #endregion

        #region Update Model

        /// <summary>
        /// </summary>
        public void Update(T model)
        {
            var properties = TypeDescriptor.GetProperties(model);
            foreach (PropertyDescriptor prop in properties)
            {
                if( this.ContainsKey(prop.Name) )
                    prop.SetValue(model, this[prop.Name]);
            }
        }

        #endregion

        #region Custom Errors

        /// <summary>
        /// </summary>
        public void AddModelError(string Field, string Message )
        {
            var r = new System.ComponentModel.DataAnnotations.ValidationResult(Message, new string[] { Field });
            _validationResults.Add(r);
        }

        /// <summary>
        /// </summary>
        public void ClearErrors()
        {
            _validationResults = new List<System.ComponentModel.DataAnnotations.ValidationResult>();
            _isValid = true;
        }

        #endregion

        #region Validation Result

        private List<System.ComponentModel.DataAnnotations.ValidationResult> _validationResults = new List<System.ComponentModel.DataAnnotations.ValidationResult>();
        private System.ComponentModel.DataAnnotations.ValidationContext _context;

        internal List<System.ComponentModel.DataAnnotations.ValidationResult> GetValidationResults()
        {
            return _validationResults;
        }

        private bool _isValid { get; set; }

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

            _context = null;
            ClearErrors();

            if (_binder != null)
            {
                var m = new Internals.MasqueradeObject<T>(_binder);
                m.GetValue = (pd) =>
                {
                    var value = this.GetValue(pd);
                    return value;
                };
                _context = new System.ComponentModel.DataAnnotations.ValidationContext(m, serviceProvider: null, items: null);
                _isValid = m.TryValidateObject(_context, _validationResults, this.PropertyChanged);
                this.ClearChanges();

                //Console.WriteLine($"_isValid = {_isValid}");
            }
        }
        #endregion
    }
}
