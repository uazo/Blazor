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

        /// <summary>
        /// </summary>
        public T Binder { get { return _binder; } }

        #region Get/Set Values

        internal bool ContainsValue(PropertyInfo property)
        {
            return this.ContainsKey(property.Name);
        }

        /// <summary>
        /// </summary>
        public V GetValue<V>(Expression<Func<T, V>> Field)
        {
            var property = Internals.PropertyHelpers.GetProperty<T, V>(Field);
            return (V)GetValue(property);
        }

        internal object GetValue(PropertyDescriptor property)
        {
            if (this.ContainsKey(property.Name))
                return this[property.Name];
            else
                return property.GetValue(_binder);
        }

        internal object GetValue(PropertyInfo property)
        {
            if (this.ContainsKey(property.Name))
                return this[property.Name];
            else
                return property.GetValue(_binder);
        }

        /// <summary>
        /// </summary>
        public void SetValue<V>(Expression<Func<T, V>> Field, V Value)
        {
            var property = Internals.PropertyHelpers.GetProperty<T, V>(Field);
            SetValue(property.Name, property.PropertyType, Value);
        }

        internal void SetValue(string propertyName, Type propertyType, object parsedValue)
        {
            if (parsedValue != null)
            {
                var value = parsedValue.ToString();

                if (propertyType == typeof(string))
                {
                    this[propertyName] = value;
                }
                else if (propertyType == typeof(int) || propertyType == typeof(int?))
                {
                    if (int.TryParse(value, out int v))
                        this[propertyName] = v;
                    else if (bool.TryParse(value, out bool vb))
                        this[propertyName] = (vb == true ? 1 : 0);
                }
                else if (propertyType == typeof(bool) || propertyType == typeof(bool?))
                {
                    if (bool.TryParse(value, out bool v))
                        this[propertyName] = v;
                }
                else if (propertyType == typeof(double))
                {
                    if (double.TryParse(value, out double v))
                        this[propertyName] = v;
                }
                else if (propertyType == typeof(float))
                {
                    if (float.TryParse(value, out float v))
                        this[propertyName] = v;
                }
                else if (propertyType == typeof(System.DateTime) || propertyType == typeof(System.DateTime?))
                {
                    if (System.DateTime.TryParse(value, out System.DateTime v))
                        this[propertyName] = v;
                }
                else if (propertyType == typeof(System.Enum) || propertyType.IsEnum)
                {
                    if (int.TryParse(value, out int v))
                        this[propertyName] = v;
                    else
                    {
                        try
                        {
                            this[propertyName] = System.Enum.Parse(propertyType, value);
                        }
                        catch { }
                    }
                }
                else
                    throw new ApplicationException($"Unknown type {propertyType.Name}");

                //Console.WriteLine($"Setting {propertyName} of type {propertyType.Name} value {value}");
            }

            if (propertyChanged == null) propertyChanged = new List<string>();
            if (propertyChanged.Contains(propertyName) == false) propertyChanged.Add(propertyName);

            this.ValidateModel();
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
        public void Update()
        {
            this.Update(_binder);
        }

        /// <summary>
        /// </summary>
        public void Update(T model)
        {
            var properties = TypeDescriptor.GetProperties(model);
            foreach (PropertyDescriptor prop in properties)
            {
                if (this.ContainsKey(prop.Name))
                {
                    Console.WriteLine($"{prop.Name}={this[prop.Name]}");
                    prop.SetValue(model, this[prop.Name]);
                }
                else
                {
                    Console.WriteLine($"NO {prop.Name}");
                }
            }
        }

        #endregion

        #region Custom Errors

        /// <summary>
        /// </summary>
        public void AddModelError<V>(Expression<Func<T, V>> Field, string Message)
        {
            var property = Internals.PropertyHelpers.GetProperty<T, V>(Field);
            AddModelError(property.Name, Message);
        }

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

                this.OnCustomValidateModel();
                if (_isValid == true && _validationResults.Count != 0) _isValid = false;

                this.ClearChanges();

                //Console.WriteLine($"_isValid = {_isValid}");
            }
        }

        /// <summary>
        /// Provide custom validator
        /// </summary>
        protected virtual void OnCustomValidateModel()
        {
        }

        #endregion
    }
}
