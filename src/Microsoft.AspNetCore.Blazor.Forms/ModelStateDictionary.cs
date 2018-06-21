using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Text;

namespace Microsoft.AspNetCore.Blazor.Forms
{
    /// <summary>
    /// 
    /// </summary>
    public class ModelStateDictionary : Dictionary<string, object>
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

        //internal void SetValue(PropertyInfo property, object parsedValue)
        internal void SetValue(string propertyName, object parsedValue)
        {
            //var propertyType = property.PropertyType;
            this[propertyName] = parsedValue;

            if (propertyChanged == null) propertyChanged = new List<string>();
            if (propertyChanged.Contains(propertyName) == false) propertyChanged.Add(propertyName);

            //if (propertyType == typeof(string))
            //	property.SetValue(_binder, (string)parsedValue);
            //else if (propertyType == typeof(int))
            //{
            //	int v = 0;
            //	if (int.TryParse(parsedValue, out v))
            //		property.SetValue(_binder, v);
            //}
        }

        internal System.Collections.Generic.List<string> PropertyChanged { get { return propertyChanged; } }
        internal void ClearChanges()
        {
            propertyChanged = null;
        }
    }
}
