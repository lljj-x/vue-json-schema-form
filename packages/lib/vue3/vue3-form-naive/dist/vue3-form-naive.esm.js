/** @license @lljj/vue3-form-naive (c) 2020-2023 Liu.Jun License: Apache-2.0 */
import { h, ref, getCurrentInstance, defineComponent, onMounted } from 'vue';
import createVue3Core from '@lljj/vue3-form-core';
export { SchemaField, fieldProps } from '@lljj/vue3-form-core';
export { default as i18n } from '@lljj/vjsf-utils/i18n';
import { modelValueComponent as modelValueComponent$1, resolveComponent } from '@lljj/vjsf-utils/vue3Utils';
import * as vueUtils from '@lljj/vjsf-utils/vue3Utils';
export { vueUtils };
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
      return h(resolveComponent('n-checkbox-group'), attrs, {
        default: function _default() {
          return h(resolveComponent('n-space'), {
            itemStyle: 'display: flex'
          }, {
            default: function _default() {
              return props.enumOptions.map(function (item, index) {
                return h(resolveComponent('n-checkbox'), {
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
        }
      });
    };
  }
};
var moduleValeComponent = modelValueComponent$1(baseComponent, {
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
      return h(resolveComponent('n-radio-group'), attrs, {
        default: function _default() {
          return props.enumOptions.map(function (item, index) {
            return h(resolveComponent('n-radio'), {
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
var moduleValeComponent$1 = modelValueComponent$1(baseComponent$1, {
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
      return h(resolveComponent('n-select'), _objectSpread2({
        options: props.enumOptions
      }, attrs));
    };
  }
};
var moduleValeComponent$2 = modelValueComponent$1(baseComponent$2, {
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
          modelValue = attrs.modelValue,
          onUpdateFormattedValue = attrs['onUpdate:modelValue'],
          otherAttrs = _objectWithoutProperties(attrs, ["isNumberValue", "isRange", "modelValue", "onUpdate:modelValue"]);

      var trueValue = isRange ? modelValue && modelValue.length === 0 ? null : modelValue : modelValue;
      return h(resolveComponent('n-date-picker'), _objectSpread2(_objectSpread2({
        type: isRange ? 'daterange' : 'date'
      }, otherAttrs), isNumberValue ? {
        value: trueValue,
        onUpdateValue: onUpdateFormattedValue
      } : {
        valueFormat: isNumberValue ? 'T' : 'yyyy-MM-dd',
        formattedValue: trueValue,
        onUpdateFormattedValue: onUpdateFormattedValue
      }));
    };
  }
};

var baseComponent$4 = {
  name: 'DatePickerWidget',
  inheritAttrs: false,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    return function () {
      var isNumberValue = attrs.isNumberValue,
          isRange = attrs.isRange,
          modelValue = attrs.modelValue,
          onUpdateFormattedValue = attrs['onUpdate:modelValue'],
          otherAttrs = _objectWithoutProperties(attrs, ["isNumberValue", "isRange", "modelValue", "onUpdate:modelValue"]);

      var trueValue = isRange ? modelValue && modelValue.length === 0 ? null : modelValue : modelValue;
      return h(resolveComponent('n-date-picker'), _objectSpread2(_objectSpread2({
        type: isRange ? 'datetimerange' : 'datetime'
      }, otherAttrs), isNumberValue ? {
        value: trueValue,
        onUpdateValue: onUpdateFormattedValue
      } : {
        valueFormat: isNumberValue ? 'T' : 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
        formattedValue: trueValue,
        onUpdateFormattedValue: onUpdateFormattedValue
      }));
    };
  }
};

var baseComponent$5 = {
  name: 'TimePickerWidget',
  inheritAttrs: false,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    return function () {
      var modelValue = attrs.modelValue,
          onUpdateFormattedValue = attrs['onUpdate:modelValue'],
          otherAttrs = _objectWithoutProperties(attrs, ["modelValue", "onUpdate:modelValue"]);

      return h(resolveComponent('n-time-picker'), _objectSpread2(_objectSpread2({}, otherAttrs), {}, {
        valueFormat: 'HH:mm:ss',
        formattedValue: modelValue,
        onUpdateFormattedValue: onUpdateFormattedValue
      }));
    };
  }
};

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
            id: String(index),
            status: 'finished',
            name: "\u5DF2\u4E0A\u4F20\u6587\u4EF6\uFF08".concat(index + 1, "\uFF09"),
            url: item
          };
        });
      }

      if (curModelValue) {
        return [{
          id: '1',
          status: 'finished',
          name: '已上传文件',
          url: curModelValue
        }];
      }

      return [];
    }(); // fileList


    var fileListRef = ref(defaultFileList);

    var getUrl = function getUrl(eventTarget) {
      var resJson = {};

      try {
        resJson = JSON.parse(eventTarget.response);
      } catch (e) {// nothing..
      }

      return props.responseFileUrl(resJson) || resJson.url || '';
    };

    var emitValue = function emitValue(emitFileList) {
      // v-model
      var curValue;

      if (isArrayValue) {
        curValue = emitFileList.length ? emitFileList.reduce(function (pre, item) {
          var url = item.url;
          if (url) pre.push(url);
          return pre;
        }, []) : [];
      } else {
        var fileItem = emitFileList[emitFileList.length - 1];
        var url = fileItem && fileItem.url;

        if (url) {
          curValue = url;
        }
      }

      emit('update:modelValue', curValue);
    };

    var globalProperties = getCurrentInstance().appContext.config.globalProperties;
    return function () {
      // eslint-disable-next-line no-unused-vars
      attrs['onUpdate:modelValue'];
          var otherAttrs = _objectWithoutProperties(attrs, ["onUpdate:modelValue"]);

      var data = _objectSpread2(_objectSpread2({
        fileList: fileListRef.value,
        'on-error': function onError() {
          if (globalProperties.$message) {
            globalProperties.$message.error('文件上传失败');
          }
        }
      }, otherAttrs), {}, {
        'onUpdate:fileList': function onUpdateFileList(fileList) {
          emitValue(fileList);
        },
        'on-change': function onChange(_ref2) {
          var fileList = _ref2.fileList;
          fileListRef.value = fileList;
        },
        'on-finish': function onFinish(_ref3) {
          var file = _ref3.file,
              event = _ref3.event;
          // 用户注册的 onSuccess
          file.url = getUrl(event.target);
          return file;
        }
      });

      if (!isArrayValue) data.max = 1;

      var childVNode = _objectSpread2({
        default: function _default() {
          return h(resolveComponent('n-button'), {
            type: 'primary'
          }, {
            default: function _default() {
              return props.btnText;
            }
          });
        }
      }, props.slots || {});

      return h(resolveComponent('n-upload'), data, childVNode);
    };
  }
};

/**
 * Created by Liu.Jun on 2020/5/17 10:41 下午.
 */
var widgetComponents = {
  CheckboxesWidget: moduleValeComponent,
  RadioWidget: moduleValeComponent$1,
  SelectWidget: moduleValeComponent$2,
  TimePickerWidget: baseComponent$5,
  DatePickerWidget: baseComponent$3,
  DateTimePickerWidget: baseComponent$4,
  UploadWidget: UploadWidget,
  InputWidget: modelValueComponent$1('n-input'),
  ColorWidget: modelValueComponent$1('n-color-picker'),
  TextAreaWidget: modelValueComponent$1('n-textarea'),
  InputNumberWidget: modelValueComponent$1('n-input-number'),
  AutoCompleteWidget: modelValueComponent$1('n-auto-complete'),
  SliderWidget: modelValueComponent$1('n-slider'),
  RateWidget: modelValueComponent$1('n-rate'),
  SwitchWidget: modelValueComponent$1('n-switch')
};

/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */
var CheckboxesWidget = widgetComponents.CheckboxesWidget,
    RadioWidget = widgetComponents.RadioWidget,
    SelectWidget = widgetComponents.SelectWidget,
    TimePickerWidget = widgetComponents.TimePickerWidget,
    DatePickerWidget = widgetComponents.DatePickerWidget,
    DateTimePickerWidget = widgetComponents.DateTimePickerWidget,
    InputWidget = widgetComponents.InputWidget,
    SwitchWidget = widgetComponents.SwitchWidget,
    InputNumberWidget = widgetComponents.InputNumberWidget,
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

var css_248z = ".genFromComponent .n-form-item-blank{-ms-flex-wrap:wrap;flex-wrap:wrap}.genFromComponent .n-form-item.n-form-item--top-labelled{grid-template-rows:none}.genFromComponent .formFooter_item .n-form-item-blank{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.genFromComponent .n-form-item-feedback--error .n-form-item-feedback__line{display:-webkit-box!important;text-overflow:ellipsis;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:normal;text-align:left;line-height:1.2;font-size:12px}.genFromComponent .validateWidget .n-form-item-blank,.genFromComponent .validateWidget .n-form-item-feedback-wrapper{min-height:auto}";
styleInject(css_248z);

var globalOptions = {
  WIDGET_MAP: WIDGET_MAP,
  COMPONENT_MAP: {
    form: defineComponent({
      inheritAttrs: false,
      setup: function setup(props, _ref) {
        var attrs = _ref.attrs,
            slots = _ref.slots;
        // 处理 labelPosition 参数和 label-placement 之间的关系
        var labelPositionMap = {
          top: {
            labelAlign: 'left',
            labelPlacement: 'top'
          },
          left: {
            labelAlign: 'left',
            labelPlacement: 'left'
          },
          right: {
            labelAlign: 'right',
            labelPlacement: 'left'
          }
        };
        var formRef = ref(null);

        if (attrs.setFormRef) {
          onMounted(function () {
            // form组件实例上重置一个 validate 方法
            formRef.value.$$validate = function (callBack) {
              formRef.value.validate(function (errors) {
                if (errors) {
                  return callBack(false, errors);
                }

                return callBack(true);
              });
            };

            attrs.setFormRef(formRef.value);
          });
        }

        return function () {
          attrs.setFormRef;
              var labelPosition = attrs.labelPosition,
              model = attrs.model,
              otherAttrs = _objectWithoutProperties(attrs, ["setFormRef", "labelPosition", "model"]);

          return h(resolveComponent('n-form'), _objectSpread2(_objectSpread2({
            ref: formRef,
            model: model.value
          }, labelPositionMap[labelPosition || 'top']), otherAttrs), slots);
        };
      }
    }),
    formItem: defineComponent({
      inheritAttrs: false,
      setup: function setup(props, _ref2) {
        var attrs = _ref2.attrs,
            slots = _ref2.slots;
        return function () {
          var prop = attrs.prop,
              rules = attrs.rules,
              originAttrs = _objectWithoutProperties(attrs, ["prop", "rules"]);

          var childAttrs = _objectSpread2(_objectSpread2({}, originAttrs), {}, {
            path: prop,
            rule: (rules || []).map(function (validateRule) {
              return {
                trigger: validateRule.trigger,
                asyncValidator: function asyncValidator(rule, value, callback) {
                  return validateRule.validator(rule, value, callback);
                }
              };
            })
          });

          return h(resolveComponent('n-form-item'), childAttrs, slots);
        };
      }
    }),
    button: 'n-button',
    // popover: ,
    popover: defineComponent({
      setup: function setup(props, _ref3) {
        var attrs = _ref3.attrs,
            slots = _ref3.slots;
        return function () {
          return h(resolveComponent('n-popover'), attrs, {
            trigger: slots.reference,
            default: slots.default
          });
        };
      }
    })
  },
  HELPERS: {// 是否mini显示 description
    // isMiniDes(formProps) {
    //     return formProps && ['left', 'right'].includes(formProps.labelPosition);
    // }
  }
};
var JsonSchemaForm = createVue3Core(globalOptions);
var modelValueComponent = modelValueComponent$1;

export default JsonSchemaForm;
export { globalOptions, modelValueComponent };
