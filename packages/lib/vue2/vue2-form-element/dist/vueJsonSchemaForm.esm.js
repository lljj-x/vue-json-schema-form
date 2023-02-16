/** @license @lljj/vue-json-schema-form (c) 2020-2023 Liu.Jun License: Apache-2.0 */
import createVue2Core from '@lljj/vue2-form-core';
export { SchemaField, fieldProps } from '@lljj/vue2-form-core';
export { default as i18n } from '@lljj/vjsf-utils/i18n';
import * as vueUtils from '@lljj/vjsf-utils/vueUtils';
export { vueUtils };
import * as formUtils from '@lljj/vjsf-utils/formUtils';
export { formUtils };
import * as validate from '@lljj/vjsf-utils/schema/validate';
export { validate as schemaValidate };
export { default as getDefaultFormState } from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { openNewPage } from '@lljj/vjsf-utils/utils';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("el-checkbox-group", _vm._g(_vm._b({}, "el-checkbox-group", _vm.$attrs, false), _vm.$listeners), _vm._l(_vm.enumOptions, function (item, index) {
    return _c("el-checkbox", {
      key: index,
      attrs: {
        label: item.value
      }
    }, [_vm._v("\n        " + _vm._s(item.label) + "\n    ")]);
  }), 1);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("el-radio-group", _vm._g(_vm._b({}, "el-radio-group", _vm.$attrs, false), _vm.$listeners), _vm._l(_vm.enumOptions, function (item, index) {
    return _c("el-radio", {
      key: index,
      attrs: {
        label: item.value
      }
    }, [_vm._v("\n        " + _vm._s(item.label) + "\n    ")]);
  }), 1);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("el-select", _vm._g(_vm._b({}, "el-select", _vm.$attrs, false), _vm.$listeners), _vm._l(_vm.enumOptions, function (item, index) {
    return _c("el-option", {
      key: index,
      attrs: {
        label: item.label,
        value: item.value
      }
    });
  }), 1);
};

var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent_1({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

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
 * Created by Liu.Jun on 2020/7/22 13:21.
 */
var DatePickerWidget = {
  name: 'DatePickerWidget',
  functional: true,
  render: function render(h, context) {
    var _ref = context.data.attrs || {},
        isNumberValue = _ref.isNumberValue,
        isRange = _ref.isRange,
        otherProps = _objectWithoutProperties(_ref, ["isNumberValue", "isRange"]);

    context.data.attrs = _objectSpread2({
      type: isRange ? 'daterange' : 'date',
      'value-format': isNumberValue ? 'timestamp' : 'yyyy-MM-dd'
    }, otherProps);
    var oldInputCall = context.data.on.input;
    context.data.on = _objectSpread2(_objectSpread2({}, context.data.on), {}, {
      input: function input(val) {
        var trueVal = val === null ? isRange ? [] : undefined : val;
        oldInputCall.apply(context.data.on, [trueVal]);
      }
    });
    return h('el-date-picker', context.data, context.children);
  }
};

/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */
var DateTimePickerWidget = {
  name: 'DateTimePickerWidget',
  functional: true,
  render: function render(h, context) {
    var _ref = context.data.attrs || {},
        isNumberValue = _ref.isNumberValue,
        isRange = _ref.isRange,
        otherProps = _objectWithoutProperties(_ref, ["isNumberValue", "isRange"]);

    context.data.attrs = _objectSpread2({
      type: isRange ? 'datetimerange' : 'datetime'
    }, otherProps); // 字符串为 0 时区ISO标准时间

    var oldInputCall = context.data.on.input;
    context.data.on = _objectSpread2(_objectSpread2({}, context.data.on), {}, {
      input: function input(val) {
        var trueVal;

        if (isRange) {
          trueVal = val === null ? [] : val.map(function (item) {
            return new Date(item)[isNumberValue ? 'valueOf' : 'toISOString']();
          });
        } else {
          trueVal = val === null ? undefined : new Date(val)[isNumberValue ? 'valueOf' : 'toISOString']();
        }

        oldInputCall.apply(context.data.on, [trueVal]);
      }
    });
    return h('el-date-picker', context.data, context.children);
  }
};

/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */
var TimePickerWidget = {
  name: 'TimePickerWidget',
  functional: true,
  render: function render(h, context) {
    context.data.attrs = _objectSpread2({
      'value-format': 'HH:mm:ss'
    }, context.data.attrs || {});
    var oldInputCall = context.data.on.input;
    context.data.on = _objectSpread2(_objectSpread2({}, context.data.on), {}, {
      input: function input(val) {
        oldInputCall.apply(context.data.on, [val === null ? undefined : val]);
      }
    });
    return h('el-time-picker', context.data, context.children);
  }
};

var UploadWidget = {
  name: 'UploadWidget',
  props: {
    value: {
      default: null,
      type: [String, Array]
    },
    responseFileUrl: {
      default: function _default(res) {
        return res ? res.url || res.data && res.data.url : '';
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
  data: function data() {
    // 设置默认 fileList
    var value = this.value;
    var isArrayValue = Array.isArray(value);

    var fileList = this.$attrs.fileList || function () {
      if (isArrayValue) {
        return value.map(function (item, index) {
          return {
            name: "\u5DF2\u4E0A\u4F20\u6587\u4EF6\uFF08".concat(index + 1, "\uFF09"),
            url: item
          };
        });
      }

      if (value) {
        return [{
          name: '已上传文件',
          url: value
        }];
      }

      return [];
    }();

    return {
      isArrayValue: isArrayValue,
      fileList: fileList
    };
  },
  methods: {
    getUrl: function getUrl(fileItem) {
      return fileItem && (fileItem.response && this.responseFileUrl(fileItem.response) || fileItem.url) || '';
    },
    emitValue: function emitValue(fileList) {
      var _this = this;

      // v-model
      var value;

      if (this.isArrayValue) {
        value = fileList.length ? fileList.reduce(function (pre, item) {
          var url = _this.getUrl(item);

          if (url) pre.push(url);
          return pre;
        }, []) : [];
      } else {
        var fileItem = fileList[fileList.length - 1];
        value = this.getUrl(fileItem);
      }

      this.$emit('input', value);
    }
  },
  render: function render() {
    var _this2 = this;

    var h = this.$createElement;
    var attrs = this.$attrs;
    var slots = this.$props.slots;
    var data = {
      attrs: _objectSpread2(_objectSpread2({
        fileList: this.fileList,
        'on-exceed': function onExceed() {
          if (_this2.$message) {
            _this2.$message.warning('超出文件上传数');
          }
        },
        'on-error': function onError() {
          if (_this2.$message) {
            _this2.$message.error('文件上传失败');
          }
        },
        'on-preview': function onPreview(file) {
          var url = _this2.getUrl(file);

          if (url) openNewPage(url);
        }
      }, attrs), {}, {
        'on-remove': function onRemove(file, fileList) {
          _this2.emitValue(fileList);

          if (attrs['on-remove']) {
            attrs['on-remove'](file, fileList);
          }
        },
        'on-success': function onSuccess(response, file, fileList) {
          _this2.emitValue(fileList); // 用户注册的 onSuccess


          if (attrs['on-success']) {
            attrs['on-success'](response, file, fileList);
          }
        }
      })
    };
    if (!this.isArrayValue) data.attrs.limit = 1;
    var childVNode = [];

    if (slots && slots.default) {
      childVNode.push(h('template', {
        slot: 'default'
      }, [typeof slots.default === 'function' ? slots.default(h) : slots.default]));
    } else {
      childVNode.push(h('el-button', {
        props: {
          type: 'primary'
        }
      }, [this.btnText]));
    }

    if (slots && slots.tip) {
      childVNode.push(h('template', {
        slot: 'tip'
      }, [typeof slots.tip === 'function' ? slots.tip(h) : slots.tip]));
    }

    return h('el-upload', data, childVNode);
  }
};

/**
 * Created by Liu.Jun on 2020/5/17 10:41 下午.
 */
// const files = require.context('.', true, /\.js|vue$/);
// const widgetComponents = files.keys().reduce((preVal, curKey) => {
//     if (curKey !== './index.js') {
//         preVal[curKey.replace(/(\.\/|\/index\.(js|vue))/g, '')] = files(curKey).default;
//     }
//     return preVal;
// }, {});

var widgetComponents = {
  CheckboxesWidget: __vue_component__,
  RadioWidget: __vue_component__$1,
  SelectWidget: __vue_component__$2,
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

var css_248z = ".genFromComponent.el-form--label-top .el-form-item__label{line-height:26px;padding-bottom:6px;font-size:14px}.genFromComponent .el-checkbox,.genFromComponent .el-color-picker{vertical-align:top}";
styleInject(css_248z);

/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */
var globalOptions = Object.freeze({
  WIDGET_MAP: Object.freeze(WIDGET_MAP),
  COMPONENT_MAP: Object.freeze({
    form: 'el-form',
    formItem: 'el-form-item',
    button: 'el-button',
    popover: 'el-popover'
  }),
  HELPERS: {
    // 是否mini显示 description
    isMiniDes: function isMiniDes(formProps) {
      return formProps && ['left', 'right'].includes(formProps.labelPosition);
    }
  }
});
var JsonSchemaForm = createVue2Core(globalOptions); // 存在Vue 全局变量默认注册 VueForm 组件

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('VueForm', JsonSchemaForm);
}

export default JsonSchemaForm;
export { globalOptions };
