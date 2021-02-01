/**
 * Created by Liu.Jun on 2020/4/16 17:32.
 */

import {
    getCurrentInstance, watch, ref, computed, h
} from 'vue';

import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

// 生成form表单默认数据
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { deepEquals } from '@lljj/vjsf-utils/utils';

// 基础公共样式
import '@lljj/vjsf-utils/style/baseForm.css';

import vueProps from './props';

// 默认表单底部
import FormFooter from './components/FormFooter.js';

import SchemaField from './fields/SchemaField';
import fieldProps from './fields/props';

export {
    fieldProps,
    SchemaField
};

export default function createForm(globalOptions = {}) {
    const Form = {
        name: 'VueElementForm',
        props: vueProps,
        emits: ['update:modelValue', 'change', 'cancel', 'submit', 'validation-failed', 'form-mounted'],
        setup(props, { slots, emit }) {
            if (!Form.installed && globalOptions.WIDGET_MAP.widgetComponents) {
                // global components
                const internalInstance = getCurrentInstance();
                Object.entries(globalOptions.WIDGET_MAP.widgetComponents).forEach(
                    ([componentName, component]) => internalInstance.appContext.app.component(componentName, component)
                );

                // 只注册一次
                Form.installed = true;
            }

            // rootFormData
            const rootFormData = ref(getDefaultFormState(props.schema, props.modelValue, props.schema));
            const footerParams = computed(() => ({
                show: true,
                okBtn: '保存',
                cancelBtn: '取消',
                ...props.formFooter
            }));

            // form组件实例，不需要响应式
            let formRef = null;

            // 更新formData
            const emitFormDataChange = (newValue, oldValue) => {
                // 支持v-model ，引用类型
                emit('update:modelValue', newValue);

                // change 事件，引用类型修改属性 newValue
                emit('change', {
                    newValue,
                    oldValue
                });
            };

            // 更新props
            const willReceiveProps = (newVal, oldVal) => {
                if (!deepEquals(newVal, oldVal)) {
                    const tempVal = getDefaultFormState(props.schema, props.modelValue, props.schema);
                    if (!deepEquals(rootFormData.value, tempVal)) {
                        rootFormData.value = tempVal;
                    }
                }
            };

            // emit v-model，同步值
            watch(rootFormData, (newValue, oldValue) => {
                emitFormDataChange(newValue, oldValue);
            }, {
                deep: true
            });

            // schema 被重新赋值
            watch(() => props.schema, (newVal, oldVal) => {
                willReceiveProps(newVal, oldVal);
            });

            // model value 变更
            watch(() => props.modelValue, (newVal, oldVal) => {
                willReceiveProps(newVal, oldVal);
            });

            // 保持v-model双向数据及时性
            emitFormDataChange(rootFormData.value, props.modelValue);

            const getDefaultSlot = () => {
                if (slots.default) {
                    return slots.default({
                        formData: rootFormData,
                        formRefFn: () => formRef
                    });
                }

                if (footerParams.value.show) {
                    return h(FormFooter, {
                        globalOptions,
                        okBtn: footerParams.okBtn,
                        cancelBtn: footerParams.cancelBtn,
                        onCancel() {
                            emit('cancel');
                        },
                        onSubmit() {
                            // 优先获取组件 $$validate 方法，方便对 validate方法转换
                            (formRef.$$validate || formRef.validate)((isValid, resData) => {
                                if (isValid) {
                                    return emit('submit', rootFormData);
                                }
                                console.warn(resData);
                                return emit('validation-failed', resData);
                            });
                        }
                    });
                }

                return [];
            };

            return () => {
                const {
                    layoutColumn = 1, inlineFooter, inline, ...otherFormProps
                } = props.formProps;
                const schemaProps = {
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema,
                    customFormats: props.customFormats,
                    customRule: props.customRule,
                    rootSchema: props.schema,
                    rootFormData: rootFormData.value, // 根节点的数据
                    curNodePath: '', // 当前节点路径
                    globalOptions, // 全局配置，差异化ui框架
                    formProps: {
                        labelSuffix: '：',
                        labelPosition: 'top',
                        ...otherFormProps,
                    }
                };

                return h(
                    resolveComponent(globalOptions.COMPONENT_MAP.form),
                    {
                        class: {
                            genFromComponent: true,
                            formInlineFooter: inlineFooter,
                            formInline: inline,
                            [`genFromComponent_${props.schema.id}Form`]: !!props.schema.id,
                            layoutColumn: !inline,
                            [`layoutColumn-${layoutColumn}`]: !inline
                        },
                        setFormRef: (form) => {
                            formRef = form;
                            emit('form-mounted', form);
                        },
                        model: rootFormData,
                        ...schemaProps.formProps
                    },
                    {
                        default: () => [
                            h(
                                SchemaField,
                                schemaProps
                            ),
                            getDefaultSlot(),
                        ]
                    }
                );
            };
        },
    };

    Form.install = (vueApp, options = {}) => {
        vueApp.component(options.name || Form.name, Form);
    };

    return Form;
}
