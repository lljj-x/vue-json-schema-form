/** @license @lljj/vue2-form-iview3 (c) 2020-2023 Liu.Jun License: Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@lljj/vue2-form-core'), require('@lljj/vjsf-utils/i18n'), require('@lljj/vjsf-utils/vueUtils'), require('@lljj/vjsf-utils/formUtils'), require('@lljj/vjsf-utils/schema/validate'), require('@lljj/vjsf-utils/schema/getDefaultFormState'), require('@lljj/vjsf-utils/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', '@lljj/vue2-form-core', '@lljj/vjsf-utils/i18n', '@lljj/vjsf-utils/vueUtils', '@lljj/vjsf-utils/formUtils', '@lljj/vjsf-utils/schema/validate', '@lljj/vjsf-utils/schema/getDefaultFormState', '@lljj/vjsf-utils/utils'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vue2FormIview3 = {}, global.createVue2Core, global.i18n, global.vueUtils, global.formUtils, global.validate, global.getDefaultFormState, global.utils));
}(this, (function (exports, createVue2Core, i18n, vueUtils, formUtils, validate, getDefaultFormState, utils) { 'use strict';

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

  var createVue2Core__default = /*#__PURE__*/_interopDefaultLegacy(createVue2Core);
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

    return _c("checkbox-group", _vm._g(_vm._b({}, "checkbox-group", _vm.$attrs, false), _vm.$listeners), _vm._l(_vm.enumOptions, function (item, index) {
      return _c("checkbox", {
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

    return _c("radio-group", _vm._g(_vm._b({}, "radio-group", _vm.$attrs, false), _vm.$listeners), _vm._l(_vm.enumOptions, function (item, index) {
      return _c("radio", {
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

    return _c("i-select", _vm._g(_vm._b({}, "i-select", _vm.$attrs, false), _vm.$listeners), _vm._l(_vm.enumOptions, function (item, index) {
      return _c("i-option", {
        key: index,
        attrs: {
          value: item.value
        }
      }, [_vm._v("\n        " + _vm._s(item.label) + "\n    ")]);
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

  /**
   * Created by Liu.Jun on 2020/7/22 13:21.
   */
  var f = function f(s) {
    return "0".concat(s).substr(-2);
  };

  function formatDateStr(date, isDatetime) {
    if (!date) return '';
    var dateObj = new Date(date);
    if (isDatetime) return dateObj.toISOString();
    var _year$month$day = {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate()
    },
        year = _year$month$day.year,
        month = _year$month$day.month,
        day = _year$month$day.day;
    return "".concat(year, "-").concat(f(month), "-").concat(f(day));
  }

  var toDateObj = function toDateObj(value) {
    return Array.isArray(value) ? value.map(function (item) {
      return value && new Date(item);
    }) : value && new Date(value);
  };

  function isEmptyValue(value) {
    return value === null || value === '' || Array.isArray(value) && value.every(function (item) {
      return item === '';
    });
  }

  var DatePickerWidget = {
    name: 'DatePickerWidget',
    props: {
      value: {
        type: null
      },
      isNumberValue: {
        type: Boolean,
        default: false
      },
      isDatetime: {
        type: Boolean,
        default: false
      },
      isRange: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        originValue: toDateObj(this.value),
        formatValue: this.formatDate(this.value)
      };
    },
    watch: {
      value: function value(newVal) {
        // 兼容 iview 绑定字符串类型值会导致无限循环的问题
        if (newVal === this.formatValue) ; else {
          // 外部更新值
          this.originValue = toDateObj(newVal);
        }
      }
    },
    computed: {
      type: function type() {
        return this.isDatetime ? this.isRange ? 'datetimerange' : 'datetime' : this.isRange ? 'daterange' : 'date';
      }
    },
    methods: {
      formatDate: function formatDate(val) {
        var _this$$props = this.$props,
            isRange = _this$$props.isRange,
            isNumberValue = _this$$props.isNumberValue,
            isDatetime = _this$$props.isDatetime;
        var trueVal;

        if (isRange) {
          trueVal = isEmptyValue(val) ? [] : val.map(function (item) {
            return isNumberValue ? new Date(item).valueOf() : formatDateStr(item, isDatetime);
          });
        } else {
          trueVal = isEmptyValue(val) ? undefined : isNumberValue ? new Date(val).valueOf() : formatDateStr(val, isDatetime);
        }

        return trueVal;
      }
    },
    render: function render(h) {
      var self = this;
      return h('date-picker', {
        attrs: _objectSpread2({
          type: this.type,
          value: this.originValue
        }, this.$attrs),
        on: _objectSpread2(_objectSpread2({}, this.$listeners), {}, {
          input: function input(val) {
            self.originValue = val;
            self.formatValue = self.formatDate(val);
            self.$emit('input', self.formatValue);
          }
        })
      });
    }
  };

  /**
   * Created by Liu.Jun on 2020/7/22 13:21.
   */
  var DateTimePickerWidget = {
    name: 'DateTimePickerWidget',
    functional: true,
    render: function render(h, context) {
      context.data.attrs.isDatetime = true;
      return h(DatePickerWidget, context.data, context.children);
    }
  };

  /**
   * Created by Liu.Jun on 2020/7/22 13:22.
   */
  var TimePickerWidget = {
    name: 'TimePickerWidget',
    functional: true,
    render: function render(h, context) {
      var oldInputCall = context.data.on.input;
      context.data.on = _objectSpread2(_objectSpread2({}, context.data.on), {}, {
        input: function input(val) {
          oldInputCall.apply(context.data.on, [val === null ? undefined : val]);
        }
      });
      return h('time-picker', context.data, context.children);
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
          defaultFileList: this.fileList,
          'on-error': function onError() {
            if (_this2.$message) {
              _this2.$message.error('文件上传失败');
            }
          },
          'on-preview': function onPreview(file) {
            var url = _this2.getUrl(file);

            if (url) utils.openNewPage(url);
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
        childVNode.push(h('i-button', {
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

      return h('upload', data, childVNode);
    }
  };

  /**
   * Created by Liu.Jun on 2021/1/2 10:53 下午.
   */
  var SwitchWidget = {
    name: 'SwitchWidget',
    functional: true,
    render: function render(h, context) {
      var _context$props = context.props,
          activeText = _context$props.activeText,
          inactiveText = _context$props.inactiveText; // 转换elementUi activeText inactiveText 支持 iview slot

      var childNode = Object.entries({
        open: activeText,
        close: inactiveText
      }).reduce(function (preVal, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            slot = _ref2[0],
            value = _ref2[1];

        if (value !== undefined) {
          preVal.push(h('span', {
            slot: slot
          }, [value]));
        }

        return preVal;
      }, []);
      return h('i-switch', context.data, childNode);
    }
  };

  /**
   * Created by Liu.Jun on 2021/1/2 10:56 下午.
   */
  var InputNumberWidget = {
    name: 'SwitchWidget',
    functional: true,
    render: function render(h, context) {
      // iview3 input number undefined 会默认为 1，需要抹平差异
      // 实际的数据为 undefined 保持和jsonSchema 一致
      // 传递给 iview 时转换为 null，兼容iview3清空场景
      if (context.data.attrs.value === undefined) context.data.attrs.value = null;
      return h('input-number', context.data, context.children);
    }
  };

  /**
   * Created by Liu.Jun on 2020/5/17 10:41 下午.
   */
  var widgetComponents = {
    CheckboxesWidget: __vue_component__,
    RadioWidget: __vue_component__$1,
    SelectWidget: __vue_component__$2,
    TimePickerWidget: TimePickerWidget,
    DatePickerWidget: DatePickerWidget,
    DateTimePickerWidget: DateTimePickerWidget,
    UploadWidget: UploadWidget,
    SwitchWidget: SwitchWidget,
    InputNumberWidget: InputNumberWidget
  };

  /**
   * Created by Liu.Jun on 2020/4/21 18:23.
   */
  var CheckboxesWidget = widgetComponents.CheckboxesWidget,
      RadioWidget = widgetComponents.RadioWidget,
      SelectWidget = widgetComponents.SelectWidget,
      TimePickerWidget$1 = widgetComponents.TimePickerWidget,
      DatePickerWidget$1 = widgetComponents.DatePickerWidget,
      DateTimePickerWidget$1 = widgetComponents.DateTimePickerWidget,
      SwitchWidget$1 = widgetComponents.SwitchWidget,
      InputNumberWidget$1 = widgetComponents.InputNumberWidget;
  var WIDGET_MAP = {
    types: {
      boolean: SwitchWidget$1,
      string: 'i-input',
      number: InputNumberWidget$1,
      integer: InputNumberWidget$1
    },
    formats: {
      color: 'color-picker',
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

  var css_248z = ".genFromComponent.ivu-form-label-top .ivu-form-item-label{line-height:26px;padding-bottom:6px}.genFromComponent .ivu-form-item-error-tip{padding-top:2px;position:absolute;display:-webkit-box!important;text-overflow:ellipsis;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:normal;text-align:left;line-height:1.2}.genFromComponent .validateWidget .ivu-form-item-error-tip{padding:5px 0;position:relative}";
  styleInject(css_248z);

  var globalOptions = Object.freeze({
    WIDGET_MAP: Object.freeze(WIDGET_MAP),
    COMPONENT_MAP: Object.freeze({
      form: {
        functional: true,
        render: function render(h, context) {
          context.data.props = _objectSpread2(_objectSpread2({}, context.data.props), {}, {
            labelWidth: context.data.props.labelPosition === 'top' || !context.data.props.labelWidth ? undefined : parseFloat(String(context.data.props.labelWidth))
          });
          return h('i-form', context.data, context.children);
        }
      },
      formItem: {
        functional: true,
        render: function render(h, context) {
          context.data.props = _objectSpread2(_objectSpread2({}, context.data.props), {}, {
            labelWidth: context.data.props && context.data.props.labelWidth ? parseFloat(String(context.data.props.labelWidth)) : undefined
          }); // https://github.com/vuejs/vue/issues/8380
          // 具名插槽需要重新显示的指定，无法直接透传 Orz...

          return h('form-item', context.data, Object.entries(context.slots()).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                slotName = _ref2[0],
                VNode = _ref2[1];

            return h('template', {
              slot: slotName
            }, VNode);
          }));
        }
      },
      button: 'i-button',
      popover: {
        functional: true,
        render: function render(h, context) {
          var _context$slots = context.slots(),
              content = _context$slots.default,
              defaults = _context$slots.reference; // 交换 slot


          return h('poptip', context.data, [h('template', {
            slot: 'default'
          }, defaults), h('template', {
            slot: 'content'
          }, content)]);
        }
      }
    }),
    HELPERS: {
      // 是否mini显示 description
      isMiniDes: function isMiniDes(formProps) {
        return formProps && ['left', 'right'].includes(formProps.labelPosition);
      }
    }
  });
  var JsonSchemaFormIview3 = createVue2Core__default['default'](globalOptions); // 存在Vue 全局变量默认注册 VueForm 组件

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('VueFormIview3', JsonSchemaFormIview3);
  }

  Object.defineProperty(exports, 'SchemaField', {
    enumerable: true,
    get: function () {
      return createVue2Core.SchemaField;
    }
  });
  Object.defineProperty(exports, 'fieldProps', {
    enumerable: true,
    get: function () {
      return createVue2Core.fieldProps;
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
  exports.default = JsonSchemaFormIview3;
  exports.globalOptions = globalOptions;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
