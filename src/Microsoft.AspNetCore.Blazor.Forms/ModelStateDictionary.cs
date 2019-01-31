using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Blazor.Forms.Extensions;

namespace Microsoft.AspNetCore.Blazor.Forms
{
    /// <summary>
    /// </summary>
    public class ModelStateDictionary<T> : Dictionary<string, object>
    {
        private static bool _EnableLog = false;
        private Extensions.PropertyHelper<T> cachedProperties = new Extensions.PropertyHelper<T>();
        private Dictionary<string, string> cachedDisplayValue = new Dictionary<string, string>();

        /// <summary>
        /// </summary>
        public Action<UIChangeEventArgs> OnChange { get; set; }

        T _binder;
        private Internals.ProxyObject<T> _proxy = null;

        // linker please include...
        static TypeConverter[] _tc = new TypeConverter[] {
            new StringConverter(), new BooleanConverter(),
            new Int32Converter(), new Int16Converter(), new Int64Converter(),
            new DateTimeConverter(),
            new SingleConverter(), new DoubleConverter(),
            new GuidConverter(),
            new EnumConverter(typeof(object)),
            new NullableConverter(typeof(int?)),
            new DecimalConverter()
        };

        /// <summary>
        /// </summary>
        /// <param name="binder"></param>
        public ModelStateDictionary(T binder)
        {
            _binder = binder;

            _proxy = new Internals.ProxyObject<T>(binder);
            _proxy.GetValue = (pd) =>
            {
                var value = this.GetValue(pd);
                return value;
            };
        }

        /// <summary>
        /// </summary>
        public T Binder { get { return _binder; } }

        #region Simil Tag-Helper

        /// <summary>
        /// </summary>
        public string this[Expression<Func<T,object>> Field]
        {
            get
            {
                return GetValue<object>(Field)?.ToString();
            }
            set
            {
                var property = GetPropertyInfo(Field);
                SetValue(property, value);
            }
        }

        /// <summary>
        /// </summary>
        public string ValidationFor(Expression<Func<T, object>> Field)
        {
            var property = GetPropertyInfo(Field);

            string errorDescription = this.GetValidationResults()?
                .Where(x => ((IEnumerable<string>)x.MemberNames).Contains(property.Name))
                .Select(x => x.ErrorMessage)
                .FirstOrDefault();
            return errorDescription;
        }

        /// <summary>
        /// </summary>
        public string PropertyName(Expression<Func<T, object>> Field)
        {
            var property = GetPropertyInfo(Field);
            return property.Name;
        }

        #endregion

        #region Get/Set Values

        internal bool ContainsValue(PropertyInfo property)
        {
            return this.ContainsKey(property.Name);
        }

        /// <summary>
        /// </summary>
        public object GetValue<V>(Expression<Func<T, V>> Field)
        {
            var property = GetPropertyInfo(Field);
            return GetValue(property);
        }

        internal object GetValue(PropertyDescriptor property)
        {
            if (this.ContainsKey(property.Name))
                return this[property.Name];
            else
                return property.GetValue(_binder);
        }

        /// <summary>
        /// </summary>
        public object GetValue(PropertyInfo property)
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
            var property = GetPropertyInfo(Field);
            SetValue(property, Value);
        }

        /// <summary>
        /// </summary>
        public void SetValue(PropertyInfo propertyInfo, object Value)
        {
            SetValue(propertyInfo.Name, propertyInfo.PropertyType, Value);
        }

        private Dictionary<string, Action<UIEventArgs>> _ActionList = new Dictionary<string, Action<UIEventArgs>>();

        /// <summary>
        /// </summary>
        public Action<UIEventArgs> OnChanged(string propertyName, Type propertyType)
        {
            return OnAction($"OnAction_{propertyName}", x =>
            {
                if (x is UIChangeEventArgs)
                {
                    SetValue(propertyName, propertyType, ((UIChangeEventArgs)x).Value);
                }
                else if( x is UICustomEventArgs )
                {
                    SetValue(propertyName, propertyType, ((UICustomEventArgs)x).Value);
                }
            });
        }

        /// <summary>
        /// </summary>
        public Action<UIEventArgs> OnAction(string ActionName, Action<UIEventArgs> action)
        {
            if (_ActionList.TryGetValue(ActionName, out var value) == false)
            {
                value = (e) => action(e);
                _ActionList[ActionName] = value;
            }
            return value;
        }

        internal void SetValue(string propertyName, Type propertyType, object parsedValue)
        {
            if (parsedValue != null)
            {
                var value = parsedValue.ToString();
                this[propertyName] = value;

                TypeConverter typeConverter = TypeDescriptor.GetConverter(propertyType);
                if (typeConverter.CanConvertFrom(typeof(string)))
                {
                    try
                    {
                        this[propertyName] = typeConverter.ConvertFromString(value);
                        Log(() => $"typeConverter for {propertyType.Name} {typeConverter.GetType().Name} {this[propertyName]} isnull={this[propertyName] == null}");
                    }
                    catch
                    {
                    }

                    if ((propertyType == typeof(System.DateTime) || propertyType == typeof(System.DateTime?)) && string.IsNullOrWhiteSpace(value))
                    {
                        // special case for datetime
                        // typeConverter.ConvertFromString("") returns System.DateTime.MinValue
                        this[propertyName] = null; 
                    }
                }
                Log(() => $"Setting {propertyName} of type {propertyType.Name} value {value}");
            }
            this.ValidateModel();
            OnChange?.Invoke(new UIChangeEventArgs()
            {
                Value = parsedValue
            });
        }

        /// <summary>
        /// </summary>
        public bool RemoveValue(PropertyInfo propertyInfo)
        {
            return RemoveValue(propertyInfo.Name);
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
                    object value = this[prop.Name];
                    if (prop.PropertyType.IsAssignableFrom(value?.GetType()))
                    {
                        prop.SetValue(model, value);
                        Log(() => $"{prop.Name}={value} (IsAssignableFrom)");
                    }
                    else if( value == null && Nullable.GetUnderlyingType(prop.PropertyType) != null)
                    {
                        prop.SetValue(model, null);
                        Log(() => $"{prop.Name}={value} (Nullable)");
                    }
                    else
                    {
                        Log(() => $"{prop.Name}={value} (NOT AssignableFrom)");
                    }
                }
                //else
                //{
                //    Console.WriteLine($"NO {prop.Name}");
                //}
            }
        }

        #endregion

        #region Custom Errors

        /// <summary>
        /// </summary>
        public void AddModelError<V>(Expression<Func<T, V>> Field, string Message)
        {
            var property = GetPropertyInfo(Field);
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

        /// <summary>
        /// </summary>
        public List<System.ComponentModel.DataAnnotations.ValidationResult> GetValidationResults()
        {
            return _validationResults;
        }

        private bool _isValid { get; set; }

        /// <summary>
        /// Validate the model
        /// </summary>
        /// <returns>True if is valid</returns>
        public bool IsValid
        {
            get { return _isValid; }
        }

        /// <summary>
        /// Validate the model
        /// </summary>
        public void ValidateModel()
        {
            Log(() => "ValidateModel!");

            _context = null;
            ClearErrors();

            if (_binder != null)
            {
                _context = new System.ComponentModel.DataAnnotations.ValidationContext(_proxy, serviceProvider: null, items: null);
                _isValid = _proxy.TryValidateObject(_context, _validationResults, null);

                this.OnCustomValidateModel();
                if (_isValid == true && _validationResults.Count != 0) _isValid = false;

                Log(() => $"_isValid = {_isValid}");
            }
        }

        /// <summary>
        /// Provide custom validator
        /// </summary>
        protected virtual void OnCustomValidateModel()
        {
        }

        #endregion

        #region Properties

        /// <summary>
        /// </summary>
        public PropertyInfo GetPropertyInfo<V>(Expression<Func<T, V>> Field)
        {
            return cachedProperties.Property(Field);
        }

        internal string GetDisplayName(PropertyInfo property)
        {
            if (cachedDisplayValue.TryGetValue(property.Name, out var displayname) == false)
            {
                displayname = Extensions.ExtensionsFunctions.GetDisplayName(property);
                cachedDisplayValue[property.Name] = displayname;
            }
            return displayname;
        }

        /// <summary>
        /// </summary>
        public string DisplayName(Expression<Func<T, object>> Field)
        {
            var property = GetPropertyInfo(Field);
            return GetDisplayName(property);
        }

        //System.Collections.Generic.Dictionary<string,
        //    System.Collections.Generic.Dictionary<string, object>> _CacheFor = new Dictionary<string, Dictionary<string, object>>();

        //internal X GetCacheFor<X>(string key, string skey, Func<X> p)
        //{
        //    if (_CacheFor.TryGetValue(key, out var list) == false)
        //    {
        //        list = new Dictionary<string, object>();
        //        _CacheFor[key] = list;
        //    }

        //    if (list.TryGetValue(skey, out var v) == false )
        //    {
        //        v = p();
        //        list[skey] = v;
        //    }

        //    return (X)v;
        //}

        #endregion

        #region Log

        void Log(Func<string> message)
        {
            if( _EnableLog == true)
            {
                Console.WriteLine(message());
            }
        }

        #endregion
    }
}
