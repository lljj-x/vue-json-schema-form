/** @license @lljj/vue3-form-element (c) 2020-2023 Liu.Jun License: Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('@lljj/vue3-form-core'), require('@lljj/vjsf-utils/i18n'), require('@lljj/vjsf-utils/vue3Utils'), require('@lljj/vjsf-utils/formUtils'), require('@lljj/vjsf-utils/schema/validate'), require('@lljj/vjsf-utils/schema/getDefaultFormState'), require('@lljj/vjsf-utils/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', '@lljj/vue3-form-core', '@lljj/vjsf-utils/i18n', '@lljj/vjsf-utils/vue3Utils', '@lljj/vjsf-utils/formUtils', '@lljj/vjsf-utils/schema/validate', '@lljj/vjsf-utils/schema/getDefaultFormState', '@lljj/vjsf-utils/utils'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vue3FormElement = {}, global.Vue, global.createVue3Core, global.i18n, global.vueUtils, global.formUtils, global.validate, global.getDefaultFormState, global.utils));
}(this, (function (exports, vue, createVue3Core, i18n, vueUtils, formUtils, validate, getDefaultFormState, utils) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var createVue3Core__default = /*#__PURE__*/_interopDefaultLegacy(createVue3Core);
  var i18n__default = /*#__PURE__*/_interopDefaultLegacy(i18n);
  var vueUtils__namespace = /*#__PURE__*/_interopNamespace(vueUtils);
  var formUtils__namespace = /*#__PURE__*/_interopNamespace(formUtils);
  var validate__namespace = /*#__PURE__*/_interopNamespace(validate);
  var getDefaultFormState__default = /*#__PURE__*/_interopDefaultLegacy(getDefaultFormState);

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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var script = {
    name: 'CheckboxesWidget',
    props: {
      enumOptions: {
        default: function _default() {
          return [];
        },
        type: [Array]
      }
    }
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_el_checkbox = vue.resolveComponent("el-checkbox");

    var _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group");

    return vue.openBlock(), vue.createBlock(_component_el_checkbox_group, _ctx.$attrs, {
      default: vue.withCtx(function () {
        return [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.enumOptions, function (item, index) {
          return vue.openBlock(), vue.createBlock(_component_el_checkbox, {
            key: index,
            label: item.value
          }, {
            default: vue.withCtx(function () {
              return [vue.createTextVNode(vue.toDisplayString(item.label), 1
              /* TEXT */
              )];
            }),
            _: 2
            /* DYNAMIC */

          }, 1032
          /* PROPS, DYNAMIC_SLOTS */
          , ["label"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))];
      }),
      _: 1
      /* STABLE */

    }, 16
    /* FULL_PROPS */
    );
  }

  script.render = render;
  script.__file = "src/config/widgets/CheckboxesWidget/index.vue";

  var script$1 = {
    name: 'RadioWidget',
    props: {
      enumOptions: {
        default: function _default() {
          return [];
        },
        type: [Array]
      }
    }
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_el_radio = vue.resolveComponent("el-radio");

    var _component_el_radio_group = vue.resolveComponent("el-radio-group");

    return vue.openBlock(), vue.createBlock(_component_el_radio_group, _ctx.$attrs, {
      default: vue.withCtx(function () {
        return [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.enumOptions, function (item, index) {
          return vue.openBlock(), vue.createBlock(_component_el_radio, {
            key: index,
            label: item.value
          }, {
            default: vue.withCtx(function () {
              return [vue.createTextVNode(vue.toDisplayString(item.label), 1
              /* TEXT */
              )];
            }),
            _: 2
            /* DYNAMIC */

          }, 1032
          /* PROPS, DYNAMIC_SLOTS */
          , ["label"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))];
      }),
      _: 1
      /* STABLE */

    }, 16
    /* FULL_PROPS */
    );
  }

  script$1.render = render$1;
  script$1.__file = "src/config/widgets/RadioWidget/index.vue";

  var script$2 = {
    name: 'SelectWidget',
    props: {
      enumOptions: {
        default: function _default() {
          return [];
        },
        type: [Array]
      }
    }
  };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_el_option = vue.resolveComponent("el-option");

    var _component_el_select = vue.resolveComponent("el-select");

    return vue.openBlock(), vue.createBlock(_component_el_select, _ctx.$attrs, {
      default: vue.withCtx(function () {
        return [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.enumOptions, function (item, index) {
          return vue.openBlock(), vue.createBlock(_component_el_option, {
            key: index,
            label: item.label,
            value: item.value
          }, null, 8
          /* PROPS */
          , ["label", "value"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))];
      }),
      _: 1
      /* STABLE */

    }, 16
    /* FULL_PROPS */
    );
  }

  script$2.render = render$2;
  script$2.__file = "src/config/widgets/SelectWidget/index.vue";

  function isEmptyValue(value) {
    return value === null || value === '' || Array.isArray(value) && value.every(function (item) {
      return item === '';
    });
  }

  var formatDateStr = function formatDateStr(dateString) {
    var _parseDateString = utils.parseDateString(dateString, false),
        year = _parseDateString.year,
        month = _parseDateString.month,
        day = _parseDateString.day;

    return "".concat(year, "-").concat(month, "-").concat(day);
  };

  var DatePickerWidget = {
    name: 'DatePickerWidget',
    inheritAttrs: false,
    setup: function setup(props, _ref) {
      var attrs = _ref.attrs,
          slots = _ref.slots;
      return function () {
        var _ref2 = attrs || {},
            isNumberValue = _ref2.isNumberValue,
            isRange = _ref2.isRange,
            otherProps = _objectWithoutProperties(_ref2, ["isNumberValue", "isRange"]);

        return vue.h(vueUtils.resolveComponent('el-date-picker'), _objectSpread2(_objectSpread2({
          type: isRange ? 'daterange' : 'date'
        }, otherProps), {}, {
          'onUpdate:modelValue': function onUpdateModelValue(val) {
            var trueVal;

            if (isRange) {
              trueVal = isEmptyValue(val) ? [] : val.map(function (item) {
                return isNumberValue ? new Date(item).valueOf() : formatDateStr(item);
              });
            } else {
              trueVal = isEmptyValue(val) ? undefined : isNumberValue ? new Date(val).valueOf() : formatDateStr(val);
            }

            attrs['onUpdate:modelValue'].apply(attrs, [trueVal]);
          }
        }), slots);
      };
    }
  };

  var DateTimePickerWidget = {
    name: 'DateTimePickerWidget',
    inheritAttrs: false,
    setup: function setup(props, _ref) {
      var attrs = _ref.attrs,
          slots = _ref.slots;

      var trueValue = function trueValue(isRange, isNumberValue, val) {
        if (isRange) {
          return val === null ? [] : val.map(function (item) {
            return new Date(item)[isNumberValue ? 'valueOf' : 'toISOString']();
          });
        }

        return val === null ? undefined : new Date(val)[isNumberValue ? 'valueOf' : 'toISOString']();
      };

      return function () {
        var _ref2 = attrs || {},
            isNumberValue = _ref2.isNumberValue,
            isRange = _ref2.isRange,
            otherProps = _objectWithoutProperties(_ref2, ["isNumberValue", "isRange"]);

        return vue.h(vueUtils.resolveComponent('el-date-picker'), _objectSpread2(_objectSpread2({
          type: isRange ? 'datetimerange' : 'datetime'
        }, otherProps), {}, {
          'onUpdate:modelValue': function onUpdateModelValue(val) {
            var trueVal = trueValue(isRange, isNumberValue, val);
            attrs['onUpdate:modelValue'].apply(attrs, [trueVal]);
          }
        }), slots);
      };
    }
  };

  var formatTimeStr = function formatTimeStr(dateString) {
    var _parseDateString = utils.parseDateString(dateString, true),
        hour = _parseDateString.hour,
        minute = _parseDateString.minute,
        second = _parseDateString.second;

    return "".concat(hour, ":").concat(minute, ":").concat(second);
  };

  var formatTimeObj = function formatTimeObj(timeStr) {
    if (timeStr instanceof Date) {
      return timeStr;
    } // 取当前时间 改时分秒


    if (typeof timeStr === 'string') {
      var _timeStr$split = timeStr.split(':'),
          _timeStr$split2 = _slicedToArray(_timeStr$split, 3),
          hours = _timeStr$split2[0],
          minutes = _timeStr$split2[1],
          seconds = _timeStr$split2[2];

      var curTime = new Date();
      curTime.setHours(+hours);
      curTime.setMinutes(+minutes);
      curTime.setSeconds(+seconds);
      return curTime;
    } // 其它格式清空


    return undefined;
  };

  var TimePickerWidget = {
    name: 'TimePickerWidget',
    inheritAttrs: false,
    props: {
      modelValue: {
        default: null,
        type: null
      }
    },
    setup: function setup(props, _ref) {
      var attrs = _ref.attrs,
          slots = _ref.slots;
      // hack element plus timePicker 变为object类型
      var originValue = vue.ref(formatTimeObj(props.modelValue)); // 不需要响应式

      var formatValue = props.modelValue; // 如果外部修改了值

      vue.watch(function () {
        return props.modelValue;
      }, function (newVal) {
        if (newVal !== formatValue) {
          // 更新内部值
          originValue.value = formatTimeObj(newVal);
        }
      });
      return function () {
        return vue.h(vueUtils.resolveComponent('el-time-picker'), _objectSpread2(_objectSpread2({}, attrs), {}, {
          modelValue: originValue.value,
          'onUpdate:modelValue': function onUpdateModelValue(val) {
            originValue.value = val; // 更新并缓存内部 timeStr

            formatValue = val === null ? undefined : formatTimeStr(val); // 更新外部的值

            attrs['onUpdate:modelValue'].apply(attrs, [formatValue]);
          }
        }), slots);
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
              name: "\u5DF2\u4E0A\u4F20\u6587\u4EF6\uFF08".concat(index + 1, "\uFF09"),
              url: item
            };
          });
        }

        if (curModelValue) {
          return [{
            name: '已上传文件',
            url: curModelValue
          }];
        }

        return [];
      }(); // fileList


      var fileListRef = vue.ref(defaultFileList);

      var getUrl = function getUrl(fileItem) {
        return fileItem && (fileItem.response && props.responseFileUrl(fileItem.response) || fileItem.url) || '';
      };

      var emitValue = function emitValue(emitFileList) {
        // v-model
        var curValue;

        if (isArrayValue) {
          curValue = emitFileList.length ? emitFileList.reduce(function (pre, item) {
            var url = getUrl(item);
            if (url) pre.push(url);
            return pre;
          }, []) : [];
        } else {
          var fileItem = emitFileList[emitFileList.length - 1];
          curValue = getUrl(fileItem);
        }

        emit('update:modelValue', curValue);
      };

      var globalProperties = vue.getCurrentInstance().appContext.config.globalProperties;
      return function () {
        var data = _objectSpread2(_objectSpread2({
          fileList: fileListRef.value,
          'on-exceed': function onExceed() {
            if (globalProperties.$message) {
              globalProperties.$message.warning('超出文件上传数');
            }
          },
          'on-error': function onError() {
            if (globalProperties.$message) {
              globalProperties.$message.error('文件上传失败');
            }
          },
          'on-preview': function onPreview(file) {
            var url = getUrl(file);
            if (url) utils.openNewPage(url);
          }
        }, attrs), {}, {
          'on-remove': function onRemove(file, fileList) {
            emitValue(fileList);

            if (attrs['on-remove']) {
              attrs['on-remove'](file, fileList);
            }
          },
          'on-success': function onSuccess(response, file, fileList) {
            emitValue(fileList); // 用户注册的 onSuccess

            if (attrs['on-success']) {
              attrs['on-success'](response, file, fileList);
            }
          }
        });

        if (!isArrayValue) data.limit = 1;

        var childVNode = _objectSpread2({
          default: function _default() {
            return vue.h(vueUtils.resolveComponent('el-button'), {
              type: 'primary'
            }, {
              default: function _default() {
                return props.btnText;
              }
            });
          }
        }, props.slots || {});

        return vue.h(vueUtils.resolveComponent('el-upload'), data, childVNode);
      };
    }
  };

  /**
   * Created by Liu.Jun on 2020/5/17 10:41 下午.
   */
  var widgetComponents = {
    CheckboxesWidget: script,
    RadioWidget: script$1,
    SelectWidget: script$2,
    TimePickerWidget: TimePickerWidget,
    DatePickerWidget: DatePickerWidget,
    DateTimePickerWidget: DateTimePickerWidget,
    UploadWidget: UploadWidget
  };

  /**
   * Created by Liu.Jun on 2020/4/21 18:23.
   */
  var CheckboxesWidget = widgetComponents.CheckboxesWidget,
      RadioWidget = widgetComponents.RadioWidget,
      SelectWidget = widgetComponents.SelectWidget,
      TimePickerWidget$1 = widgetComponents.TimePickerWidget,
      DatePickerWidget$1 = widgetComponents.DatePickerWidget,
      DateTimePickerWidget$1 = widgetComponents.DateTimePickerWidget;
  var WIDGET_MAP = {
    types: {
      boolean: 'el-switch',
      string: 'el-input',
      number: 'el-input-number',
      integer: 'el-input-number'
    },
    formats: {
      color: 'el-color-picker',
      time: TimePickerWidget$1,
      // 20:20:39+00:00
      date: DatePickerWidget$1,
      // 2018-11-13
      'date-time': DateTimePickerWidget$1 // 2018-11-13T20:20:39+00:00

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

  var css_248z = ".genFromComponent.el-form--label-top .el-form-item__label{line-height:26px}.genFromComponent.el-form--label-top .genFromWidget_des{margin-bottom:4px;margin-top:-4px}.genFromComponent .el-checkbox,.genFromComponent .el-color-picker{vertical-align:top}.genFromComponent .formFooter_item .el-form-item__content{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}";
  styleInject(css_248z);

  var globalOptions = {
    WIDGET_MAP: WIDGET_MAP,
    COMPONENT_MAP: {
      form: vue.defineComponent({
        inheritAttrs: false,
        setup: function setup(props, _ref) {
          var attrs = _ref.attrs,
              slots = _ref.slots;
          var formRef = vue.ref(null);

          if (attrs.setFormRef) {
            vue.onMounted(function () {
              attrs.setFormRef(formRef.value);
            });
          }

          return function () {
            // eslint-disable-next-line no-unused-vars
            attrs.setFormRef;
                var otherAttrs = _objectWithoutProperties(attrs, ["setFormRef"]);

            return vue.h(vueUtils.resolveComponent('el-form'), _objectSpread2({
              ref: formRef
            }, otherAttrs), slots);
          };
        }
      }),
      formItem: 'el-form-item',
      button: 'el-button',
      popover: 'el-popover'
    },
    HELPERS: {// 是否mini显示 description
      // isMiniDes(formProps) {
      //     return formProps && ['left', 'right'].includes(formProps.labelPosition);
      // }
    }
  };
  var JsonSchemaForm = createVue3Core__default['default'](globalOptions);

  Object.defineProperty(exports, 'SchemaField', {
    enumerable: true,
    get: function () {
      return createVue3Core.SchemaField;
    }
  });
  Object.defineProperty(exports, 'fieldProps', {
    enumerable: true,
    get: function () {
      return createVue3Core.fieldProps;
    }
  });
  Object.defineProperty(exports, 'i18n', {
    enumerable: true,
    get: function () {
      return i18n__default['default'];
    }
  });
  exports.vueUtils = vueUtils__namespace;
  exports.formUtils = formUtils__namespace;
  exports.schemaValidate = validate__namespace;
  Object.defineProperty(exports, 'getDefaultFormState', {
    enumerable: true,
    get: function () {
      return getDefaultFormState__default['default'];
    }
  });
  exports.default = JsonSchemaForm;
  exports.globalOptions = globalOptions;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
