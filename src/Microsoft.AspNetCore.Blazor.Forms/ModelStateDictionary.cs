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
        object _binder;
        System.Collections.Generic.List<string> propertyChanged;

        /// <summary>
        /// </summary>
        /// <param name="binder"></param>
        public ModelStateDictionary(object binder)
        {
            _binder = binder;
        }

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

        internal System.Collections.Generic.List<string> PropertyChanged { get { return propertyChanged; } }
        internal void ClearChanges()
        {
            propertyChanged = null;
        }

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
    }
}
