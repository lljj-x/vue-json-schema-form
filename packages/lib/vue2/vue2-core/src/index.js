/**
 * Created by Liu.Jun on 2020/4/16 17:32.
 */


import Vue from 'vue';

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
    // global components
    if (globalOptions.WIDGET_MAP.widgetComponents) {
        Object.entries(globalOptions.WIDGET_MAP.widgetComponents).forEach(([key, value]) => Vue.component(key, value));
    }

    return {
        name: 'VueForm',
        props: vueProps,
        provide() {
            return {
                genFormProvide: this.genFormProvide
            };
        },
        data() {
            const formData = getDefaultFormState(this.$props.schema, this.$props.value, this.$props.schema);

            // 保持v-model双向数据及时性
            this.emitFormDataChange(formData, this.value);

            return {
                formData
            };
        },
        computed: {
            genFormProvide() {
                return {
                    fallbackLabel: this.fallbackLabel
                };
            },
            footerParams() {
                return {
                    show: true,
                    okBtn: '保存',
                    cancelBtn: '取消',
                    ...this.formFooter
                };
            }
        },
        watch: {
            formData: {
                handler(newValue, oldValue) {
                    this.emitFormDataChange(newValue, oldValue);
                },
                deep: true
            },

            // 用于初始化了formData，监听变更是否重新计算 formData
            schema(newVal, oldVal) {
                this.willReceiveProps(newVal, oldVal);
            },
            value(newVal, oldVal) {
                this.willReceiveProps(newVal, oldVal);
            }
        },

        methods: {
            emitFormDataChange(newValue, oldValue) {
                // 支持v-model ，引用类型
                this.$emit('input', newValue);

                // change 事件，引用类型修改属性 newValue
                this.$emit('on-change', {
                    newValue,
                    oldValue
                });
            },

            // 避免用于双向绑定v-model 可能导致的循环调用
            willReceiveProps(newVal, oldVal) {
                if (!deepEquals(newVal, oldVal)) {
                    const formData = getDefaultFormState(this.$props.schema, this.$props.value, this.$props.schema);
                    if (!deepEquals(this.formData, formData)) {
                        this.formData = formData;
                    }
                }
            },
        },
        mounted() {
            this.$$uiFormRef = this.$refs.genEditForm;
            this.$emit('on-form-mounted', this.$refs.genEditForm, {
                formData: this.formData
            });
        },
        render(h) {
            const self = this;
            // default scoped slot
            const defaultSlot = this.$scopedSlots.default
                ? this.$scopedSlots.default({
                    formData: self.formData,
                    formRefFn: () => self.$refs.genEditForm
                })
                : this.footerParams.show
                    ? h(FormFooter, {
                        props: {
                            globalOptions,
                            okBtn: self.footerParams.okBtn,
                            okBtnProps: self.footerParams.okBtnProps,
                            cancelBtn: self.footerParams.cancelBtn,
                            formItemAttrs: self.footerParams.formItemAttrs,
                        },
                        on: {
                            onCancel() {
                                self.$emit('on-cancel');
                            },
                            onSubmit() {
                                self.$refs.genEditForm.validate((isValid, resData) => {
                                    if (isValid) {
                                        return self.$emit('on-submit', self.formData);
                                    }
                                    console.warn(resData);
                                    return self.$emit('on-validation-failed', resData);
                                });
                            }
                        }
                    }) : undefined;

            const {
                layoutColumn = 1, inlineFooter, ...formProps
            } = self.$props.formProps;

            const props = {
                schema: this.schema,
                uiSchema: this.uiSchema,
                errorSchema: this.errorSchema,
                customFormats: this.customFormats,
                customRule: this.customRule,
                rootSchema: this.schema,
                rootFormData: this.formData, // 根节点的数据
                curNodePath: '', // 当前节点路径
                globalOptions, // 全局配置，差异化ui框架
                formProps: {
                    labelPosition: 'top',
                    labelSuffix: '：',
                    ...formProps,
                }
            };

            const inline = formProps.inline;

            return h(
                globalOptions.COMPONENT_MAP.form,
                {
                    class: {
                        genFromComponent: true,
                        formInlineFooter: inlineFooter,
                        formInline: inline,
                        [`genFromComponent_${this.schema.id}Form`]: !!this.schema.id,
                        layoutColumn: !inline,
                        [`layoutColumn-${layoutColumn}`]: !inline
                    },
                    ref: 'genEditForm',
                    props: {
                        model: self.formData,
                        ...props.formProps
                    }
                },
                [
                    h(
                        SchemaField,
                        {
                            props
                        }
                    ),
                    defaultSlot,
                ]
            );
        }
    };
}
