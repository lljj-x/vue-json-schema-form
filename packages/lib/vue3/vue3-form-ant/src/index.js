/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import {
    h, ref, onMounted, defineComponent
} from 'vue';
import createVue3Core, { fieldProps, SchemaField } from '@lljj/vue3-form-core';

import i18n from '@lljj/vjsf-utils/i18n';
import * as vueUtils from '@lljj/vjsf-utils/vue3Utils';
import * as formUtils from '@lljj/vjsf-utils/formUtils';
import * as schemaValidate from '@lljj/vjsf-utils/schema/validate';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import WIDGET_MAP from './config/widgets/WIDGET_MAP.js';

import { modelValueComponent } from './config/utils';

import './style.css';

const globalOptions = {
    WIDGET_MAP,
    COMPONENT_MAP: {
        form: defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots }) {
                // 处理 labelPosition 参数和layout之间转换
                const labelPositionMap = {
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
                };

                // 返回当前的 form ref
                const formRef = ref(null);
                if (attrs.setFormRef) {
                    onMounted(() => {
                        // form组件实例上附加一个 validate 方法
                        formRef.value.$$validate = (callBack) => {
                            formRef.value.validate().then((res) => {
                                callBack(true, res);
                            }).catch((err) => {
                                callBack(false, err.errorFields);
                            });
                        };
                        attrs.setFormRef(formRef.value);
                    });
                }

                return () => {
                    const {
                        // eslint-disable-next-line no-unused-vars
                        setFormRef, labelPosition, labelWidth, model, ...otherAttrs
                    } = attrs;

                    if (otherAttrs.inline) {
                        Object.assign(otherAttrs, {
                            layout: 'inline',
                            // labelCol: undefined,
                            // wrapperCol: undefined
                        });
                    }

                    return h(vueUtils.resolveComponent('a-form'), {
                        ref: formRef,
                        model: model.value,
                        ...labelPositionMap[labelPosition || 'top'],
                        ...otherAttrs,
                        colon: false
                    }, slots);
                };
            }
        }),
        formItem: defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots }) {
                const formItemRef = ref(null);
                return () => {
                    const { prop, rules, ...originAttrs } = attrs;

                    return h(vueUtils.resolveComponent('a-form-item'), {
                        ...originAttrs,
                        ref: formItemRef,

                        // 去掉callback 使用promise 模式
                        rules: (rules || []).map(validateRule => ({
                            ...validateRule,
                            validator(rule, value) {
                                return validateRule.validator.apply(this, [rule, value]);
                            }
                        })),
                        name: prop ? prop.split('.') : prop
                    }, {
                        ...slots,
                        default: function proxySlotDefault() {
                            // 解决 a-form-item 只对第一个子元素进行劫持，并监听 blur 和 change 事件，如果存在第一个元素description无法校验
                            // @blur="() => {$refs.name.onFieldBlur()}"
                            // @change="() => {$refs.name.onFieldChange()}"
                            return slots.default.call(this, {
                                onBlur: () => {
                                    if (formItemRef.value.$el.querySelector('.genFromWidget_des')) {
                                        // 存在 description，需要手动触发校验事件
                                        formItemRef.value.onFieldBlur();
                                    }
                                },
                                onChange: () => {
                                    if (formItemRef.value.$el.querySelector('.genFromWidget_des')) {
                                        // 存在 description，需要手动触发校验事件
                                        formItemRef.value.onFieldChange();
                                    }
                                }
                            });
                        }
                    });
                };
            }
        }),
        button: 'a-button',
        popover: defineComponent({
            setup(props, { attrs, slots }) {
                return () => h(vueUtils.resolveComponent('a-popover'), {
                    attrs
                }, {
                    default: slots.reference,
                    content: slots.default,
                });
            }
        }),
    },
    HELPERS: {
        // 是否mini显示 description
        isMiniDes(formProps) {
            return formProps && (
                ['left', 'right'].includes(formProps.labelPosition)
                || formProps.layout === 'horizontal' || formProps.inline === true
            );
        }
    }
};

const JsonSchemaForm = createVue3Core(globalOptions);

export default JsonSchemaForm;

export {
    globalOptions,
    SchemaField,
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n,
    modelValueComponent
};
