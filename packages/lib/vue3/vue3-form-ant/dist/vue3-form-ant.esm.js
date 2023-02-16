/** @license @lljj/vue3-form-ant (c) 2020-2023 Liu.Jun License: Apache-2.0 */
import { defineComponent, h, ref, onMounted } from 'vue';
import createVue3Core from '@lljj/vue3-form-core';
export { SchemaField, fieldProps } from '@lljj/vue3-form-core';
export { default as i18n } from '@lljj/vjsf-utils/i18n';
import { resolveComponent, modelValueComponent } from '@lljj/vjsf-utils/vue3Utils';
import * as vueUtils from '@lljj/vjsf-utils/vue3Utils';
export { vueUtils };
export { modelValueComponent } from '@lljj/vjsf-utils/vue3Utils';
import * as formUtils from '@lljj/vjsf-utils/formUtils';
export { formUtils };
import * as validate from '@lljj/vjsf-utils/schema/validate';
export { validate as schemaValidate };
export { default as getDefaultFormState } from '@lljj/vjsf-utils/schema/getDefaultFormState';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var numberTimeComponent = function numberTimeComponent(component) {
  return defineComponent({
    inheritAttrs: false,
    setup: function setup(props, _ref) {
      var attrs = _ref.attrs,
          slots = _ref.slots;
      return function () {
        var isNumberValue = attrs.isNumberValue,
            isRange = attrs.isRange,
            value = attrs.value,
            otherAttrs = _objectWithoutProperties(attrs, ["isNumberValue", "isRange", "value"]); // antdv moment format 必须接受字符串时间戳


        var newValue = isNumberValue ? isRange ? (value || []).map(function (item) {
          return typeof item === 'number' ? String(item) : item;
        }) : typeof value === 'number' ? String(value) : value : value;

        var trueAttrs = _objectSpread2(_objectSpread2({}, attrs), {}, {
          value: newValue,
          'onUpdate:value': function updateValue(upValue) {
            if (isNumberValue) {
              upValue = isRange ? upValue.map(function (item) {
                return +item;
              }) : +upValue;
            }

            otherAttrs['onUpdate:value'].call(this, upValue);
          }
        });

        return h(resolveComponent(component), trueAttrs, slots);
      };
    }
  });
};

/**
 * Created by Liu.Jun on 2021/2/23 10:21 下午.
 */
var baseComponent = {
  name: 'CheckboxesWidget',
  props: {
    enumOptions: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    return function () {
      return h(resolveComponent('a-checkbox-group'), attrs, {
        default: function _default() {
          return props.enumOptions.map(function (item, index) {
            return h(resolveComponent('a-checkbox'), {
              key: index,
              value: item.value
            }, {
              default: function _default() {
                return item.label;
              }
            });
          });
        }
      });
    };
  }
};
var moduleValeComponent = modelValueComponent(baseComponent, {
  model: 'value'
});

/**
 * Created by Liu.Jun on 2021/2/23 10:21 下午.
 */
var baseComponent$1 = {
  name: 'RadioWidget',
  props: {
    enumOptions: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    return function () {
      return h(resolveComponent('a-radio-group'), attrs, {
        default: function _default() {
          return props.enumOptions.map(function (item, index) {
            return h(resolveComponent('a-radio'), {
              key: index,
              value: item.value
            }, {
              default: function _default() {
                return item.label;
              }
            });
          });
        }
      });
    };
  }
};
var moduleValeComponent$1 = modelValueComponent(baseComponent$1, {
  model: 'value'
});

var baseComponent$2 = {
  name: 'SelectWidget',
  props: {
    enumOptions: {
      default: function _default() {
        return [];
      },
      type: [Array]
    }
  },
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    return function () {
      return h(resolveComponent('a-select'), _objectSpread2(_objectSpread2({}, attrs.multiple ? {
        mode: 'multiple'
      } : {}), attrs), {
        default: function _default() {
          return props.enumOptions.map(function (item, index) {
            return h(resolveComponent('a-select-option'), {
              key: index,
              value: item.value
            }, {
              default: function _default() {
                return item.label;
              }
            });
          });
        }
      });
    };
  }
};
var moduleValeComponent$2 = modelValueComponent(baseComponent$2, {
  model: 'value'
});

var baseComponent$3 = {
  name: 'DatePickerWidget',
  inheritAttrs: false,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    return function () {
      var isNumberValue = attrs.isNumberValue,
          isRange = attrs.isRange,
          otherAttrs = _objectWithoutProperties(attrs, ["isNumberValue", "isRange"]);

      return h(resolveComponent(isRange ? 'a-range-picker' : 'a-date-picker'), _objectSpread2({
        valueFormat: isNumberValue ? 'x' : 'YYYY-MM-DD'
      }, otherAttrs));
    };
  }
};
var timeNumberComponent = numberTimeComponent(baseComponent$3);
var moduleValeComponent$3 = modelValueComponent(timeNumberComponent, {
  model: 'value'
});

var baseComponent$4 = {
  name: 'DatePickerWidget',
  inheritAttrs: false,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    return function () {
      var isNumberValue = attrs.isNumberValue,
          isRange = attrs.isRange,
          otherAttrs = _objectWithoutProperties(attrs, ["isNumberValue", "isRange"]);

      return h(resolveComponent(isRange ? 'a-range-picker' : 'a-date-picker'), _objectSpread2({
        valueFormat: isNumberValue ? 'x' : 'YYYY-MM-DDTHH:mm:ssZ',
        showTime: true
      }, otherAttrs));
    };
  }
};
var timeNumberComponent$1 = numberTimeComponent(baseComponent$4);
var moduleValeComponent$4 = modelValueComponent(timeNumberComponent$1, {
  model: 'value'
});

var baseComponent$5 = {
  name: 'TimePickerWidget',
  inheritAttrs: false,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    return function () {
      return h(resolveComponent('a-time-picker'), _objectSpread2({
        'value-format': 'HH:mm:ss'
      }, attrs));
    };
  }
};
var moduleValeComponent$5 = modelValueComponent(baseComponent$5, {
  model: 'value'
});

// https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca

var UploadWidget = {
  name: 'UploadWidget',
  props: {
    modelValue: {
      default: null,
      type: [String, Array]
    },
    responseFileUrl: {
      default: function _default() {
        return function (res) {
          return res ? res.url || res.data && res.data.url : '';
        };
      },
      type: [Function]
    },
    btnText: {
      type: String,
      default: '点击上传'
    },
    // 传入 VNode
    slots: {
      type: null,
      default: null
    }
  },
  inheritAttrs: false,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        emit = _ref.emit;
    // 设置默认 fileList
    var curModelValue = props.modelValue;
    var isArrayValue = Array.isArray(curModelValue);

    var defaultFileList = attrs.fileList || function () {
      if (isArrayValue) {
        return curModelValue.map(function (item, index) {
          return {
            uid: String(index),
            status: 'done',
            name: "\u5DF2\u4E0A\u4F20\u6587\u4EF6\uFF08".concat(index + 1, "\uFF09"),
            url: item
          };
        });
      }

      if (curModelValue) {
        return [{
          uid: '1',
          status: 'done',
          name: '已上传文件',
          url: curModelValue
        }];
      }

      return [];
    }(); // fileList


    var fileListRef = ref(defaultFileList);

    var getUrl = function getUrl(fileItem) {
      return fileItem && (fileItem.response && props.responseFileUrl(fileItem.response) || fileItem.url) || '';
    };

    var emitValue = function emitValue(emitFileList) {
      // v-model
      var curValue;

      if (isArrayValue) {
        curValue = emitFileList.length ? emitFileList.reduce(function (pre, item) {
          var url = getUrl(item);

          if (url) {
            item.url = url;
            pre.push(url);
          }

          return pre;
        }, []) : [];
      } else {
        var fileItem = emitFileList[emitFileList.length - 1];
        curValue = getUrl(fileItem);

        if (fileItem && curValue) {
          fileItem.url = curValue;
          fileListRef.value = [fileItem];
        } else {
          fileListRef.value = [];
        }
      }

      emit('update:modelValue', curValue);
    };

    return function () {
      return h(resolveComponent('a-upload'), _objectSpread2(_objectSpread2({}, attrs), {}, {
        fileList: fileListRef.value,
        'onUpdate:fileList': function updateFileList(val) {
          fileListRef.value = val;
        },
        onChange: function onChange(changeData) {
          if (changeData.file.status !== 'uploading') {
            emitValue(changeData.fileList);
          }

          if (attrs.onChange) {
            attrs.onChange.call(this, changeData);
          }
        }
      }), _objectSpread2({
        default: function _default() {
          return h(resolveComponent('a-button'), {
            type: 'primary'
          }, {
            default: function _default() {
              return props.btnText;
            }
          });
        }
      }, props.slots || {}));
    };
  }
};

var widgetComponents = {
  CheckboxesWidget: moduleValeComponent,
  RadioWidget: moduleValeComponent$1,
  SelectWidget: moduleValeComponent$2,
  TimePickerWidget: moduleValeComponent$5,
  DatePickerWidget: moduleValeComponent$3,
  DateTimePickerWidget: moduleValeComponent$4,
  UploadWidget: UploadWidget,
  InputWidget: modelValueComponent('a-input'),
  ColorWidget: {
    setup: function setup(props, _ref) {
      var attrs = _ref.attrs;
      return function () {
        return h(widgetComponents.InputWidget, _objectSpread2(_objectSpread2({}, attrs), {}, {
          style: _objectSpread2(_objectSpread2({}, attrs.style || {}), {}, {
            maxWidth: '180px'
          })
        }), {
          addonAfter: function addonAfter() {
            return h('input', {
              disabled: attrs.disabled,
              readonly: attrs.readonly,
              value: attrs.modelValue,
              onInput: function onInput(e) {
                attrs['onUpdate:modelValue'](e.target.value);
              },
              onChange: function onChange(e) {
                attrs['onUpdate:modelValue'](e.target.value);
              },
              type: 'color',
              style: {
                padding: '0',
                width: '50px'
              }
            });
          }
        });
      };
    }
  },
  TextAreaWidget: modelValueComponent('a-textarea'),
  InputNumberWidget: modelValueComponent('a-input-number'),
  AutoCompleteWidget: modelValueComponent('a-auto-complete'),
  SliderWidget: modelValueComponent('a-slider'),
  RateWidget: modelValueComponent('a-rate'),
  SwitchWidget: modelValueComponent('a-switch', {
    model: 'checked'
  })
};

/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */
var InputWidget = widgetComponents.InputWidget,
    InputNumberWidget = widgetComponents.InputNumberWidget,
    SwitchWidget = widgetComponents.SwitchWidget,
    CheckboxesWidget = widgetComponents.CheckboxesWidget,
    RadioWidget = widgetComponents.RadioWidget,
    SelectWidget = widgetComponents.SelectWidget,
    TimePickerWidget = widgetComponents.TimePickerWidget,
    DatePickerWidget = widgetComponents.DatePickerWidget,
    DateTimePickerWidget = widgetComponents.DateTimePickerWidget,
    ColorWidget = widgetComponents.ColorWidget;
var WIDGET_MAP = {
  types: {
    boolean: SwitchWidget,
    string: InputWidget,
    number: InputNumberWidget,
    integer: InputNumberWidget
  },
  formats: {
    color: ColorWidget,
    time: TimePickerWidget,
    // 20:20:39+00:00
    date: DatePickerWidget,
    // 2018-11-13
    'date-time': DateTimePickerWidget // 2018-11-13T20:20:39+00:00

  },
  common: {
    select: SelectWidget,
    radioGroup: RadioWidget,
    checkboxGroup: CheckboxesWidget
  },
  widgetComponents: widgetComponents
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".genFromComponent.ant-form-vertical .ant-form-item-label{line-height:26px;padding-bottom:6px;font-size:14px}.genFromComponent .ant-form-item{margin-bottom:22px}.genFromComponent .ant-form-item.ant-form-item-with-help{margin-bottom:2px}.genFromComponent .ant-form-explain{padding-top:2px;display:-webkit-box!important;text-overflow:ellipsis;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:normal;text-align:left;line-height:1.2;font-size:12px}.genFromComponent .validateWidget .ant-form-explain{padding:5px 0;position:relative}.genFromComponent .ant-form-item-label>label.ant-form-item-no-colon:after{display:none}";
styleInject(css_248z);

var globalOptions = {
  WIDGET_MAP: WIDGET_MAP,
  COMPONENT_MAP: {
    form: defineComponent({
      inheritAttrs: false,
      setup: function setup(props, _ref) {
        var attrs = _ref.attrs,
            slots = _ref.slots;
        // 处理 labelPosition 参数和layout之间转换
        var labelPositionMap = {
          top: {
            layout: 'vertical'
          },
          left: {
            layout: 'horizontal',
            labelAlign: 'left'
          },
          right: {
            layout: 'horizontal',
            labelAlign: 'right'
          }
        }; // 返回当前的 form ref

        var formRef = ref(null);

        if (attrs.setFormRef) {
          onMounted(function () {
            // form组件实例上附加一个 validate 方法
            formRef.value.$$validate = function (callBack) {
              formRef.value.validate().then(function (res) {
                callBack(true, res);
              }).catch(function (err) {
                callBack(false, err.errorFields);
              });
            };

            attrs.setFormRef(formRef.value);
          });
        }

        return function () {
          attrs.setFormRef;
              var labelPosition = attrs.labelPosition;
              attrs.labelWidth;
              var model = attrs.model,
              otherAttrs = _objectWithoutProperties(attrs, ["setFormRef", "labelPosition", "labelWidth", "model"]);

          if (otherAttrs.inline) {
            Object.assign(otherAttrs, {
              layout: 'inline' // labelCol: undefined,
              // wrapperCol: undefined

            });
          }

          return h(resolveComponent('a-form'), _objectSpread2(_objectSpread2(_objectSpread2({
            ref: formRef,
            model: model.value
          }, labelPositionMap[labelPosition || 'top']), otherAttrs), {}, {
            colon: false
          }), slots);
        };
      }
    }),
    formItem: defineComponent({
      inheritAttrs: false,
      setup: function setup(props, _ref2) {
        var attrs = _ref2.attrs,
            slots = _ref2.slots;
        var formItemRef = ref(null);
        return function () {
          var prop = attrs.prop,
              rules = attrs.rules,
              originAttrs = _objectWithoutProperties(attrs, ["prop", "rules"]);

          return h(resolveComponent('a-form-item'), _objectSpread2(_objectSpread2({}, originAttrs), {}, {
            ref: formItemRef,
            // 去掉callback 使用promise 模式
            rules: (rules || []).map(function (validateRule) {
              return _objectSpread2(_objectSpread2({}, validateRule), {}, {
                validator: function validator(rule, value) {
                  return validateRule.validator.apply(this, [rule, value]);
                }
              });
            }),
            name: prop ? prop.split('.') : prop
          }), _objectSpread2(_objectSpread2({}, slots), {}, {
            default: function proxySlotDefault() {
              // 解决 a-form-item 只对第一个子元素进行劫持，并监听 blur 和 change 事件，如果存在第一个元素description无法校验
              // @blur="() => {$refs.name.onFieldBlur()}"
              // @change="() => {$refs.name.onFieldChange()}"
              return slots.default.call(this, {
                onBlur: function onBlur() {
                  if (formItemRef.value.$el.querySelector('.genFromWidget_des')) {
                    // 存在 description，需要手动触发校验事件
                    formItemRef.value.onFieldBlur();
                  }
                },
                onChange: function onChange() {
                  if (formItemRef.value.$el.querySelector('.genFromWidget_des')) {
                    // 存在 description，需要手动触发校验事件
                    formItemRef.value.onFieldChange();
                  }
                }
              });
            }
          }));
        };
      }
    }),
    button: 'a-button',
    popover: defineComponent({
      setup: function setup(props, _ref3) {
        var attrs = _ref3.attrs,
            slots = _ref3.slots;
        return function () {
          return h(resolveComponent('a-popover'), attrs, {
            default: slots.reference,
            content: slots.default
          });
        };
      }
    })
  },
  HELPERS: {
    // 是否mini显示 description
    isMiniDes: function isMiniDes(formProps) {
      return formProps && (['left', 'right'].includes(formProps.labelPosition) || formProps.layout === 'horizontal' || formProps.inline === true);
    }
  }
};
var JsonSchemaForm = createVue3Core(globalOptions);

export default JsonSchemaForm;
export { globalOptions };
