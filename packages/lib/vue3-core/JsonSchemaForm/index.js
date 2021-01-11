/**
 * Created by Liu.Jun on 2020/4/16 17:32.
 */

import {
    getCurrentInstance, watch, ref, computed, h
} from 'vue';

// 生成form表单默认数据
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { deepEquals } from '@lljj/vjsf-utils/utils';

import vueProps from './props';

// 默认表单底部
import FormFooter from './components/FormFooter.js';

import SchemaField from './fields/SchemaField';

import './index.css';
import WIDGET_MAP from '@lljj/vue3-form-element/src/config/widgets/WIDGET_MAP';

export default function createForm(globalOptions = {}) {
    const Form = {
        name: 'VueElementForm',
        props: vueProps,
        emits: ['update:modelValue', 'change'],
        setup(props, ctx) {
            // 注册组件
            const internalInstance = getCurrentInstance();
            Object.entries(globalOptions.WIDGET_MAP.widgetComponents).forEach(
                ([componentName, component]) => internalInstance.appContext.app.component(componentName, component)
            );

            // formData
            const formData = ref(getDefaultFormState(props.schema, props.value, props.schema));
            const footerParams = computed(() => ({
                show: true,
                okBtn: '保存',
                cancelBtn: '取消',
                ...props.formFooter
            }));

            // 更新formData
            const emitFormDataChange = (newValue, oldValue) => {
                // 支持v-model ，引用类型
                ctx.emit('update:modelValue', newValue);

                // change 事件，引用类型修改属性 newValue
                ctx.emit('change', {
                    newValue,
                    oldValue
                });
            };

            // 更新props
            const willReceiveProps = (newVal, oldVal) => {
                if (!deepEquals(newVal, oldVal)) {
                    const tempVal = getDefaultFormState(props.schema, props.value, props.schema);
                    if (!deepEquals(formData.value, tempVal)) {
                        formData.value = tempVal;
                    }
                }
            };

            // emit v-model，同步值
            watch(formData, (newValue, oldValue) => {
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
            emitFormDataChange(formData, props.modelValue);

            const defaultSlot = ctx.slots.default
                ? ctx.slots.default({
                    formData,
                    formRefFn: () => ctx.$refs.genEditForm
                })
                : footerParams.value.show
                    ? h(FormFooter, {
                        props: {
                            globalOptions,
                            okBtn: footerParams.okBtn,
                            cancelBtn: footerParams.cancelBtn,
                        },
                        on: {
                            onCancel() {
                                ctx.emit('cancel');
                            },
                            onSubmit() {
                                ctx.$refs.genEditForm.validate((isValid, resData) => {
                                    if (isValid) {
                                        return ctx.emit('on-submit', formData);
                                    }
                                    console.warn(resData);
                                    return ctx.emit('on-validation-failed', resData);
                                });
                            }
                        }
                    }) : null;

            return () => 'Vue3 嘿嘿嘿';
        },
        // methods: {
        //     emitFormDataChange(newValue, oldValue) {
        //         // 支持v-model ，引用类型
        //         this.$emit('input', newValue);
        //
        //         // change 事件，引用类型修改属性 newValue
        //         this.$emit('on-change', {
        //             newValue,
        //             oldValue
        //         });
        //     },
        //
        //     // 避免用于双向绑定v-model 可能导致的循环调用
        //     willReceiveProps(newVal, oldVal) {
        //         if (!deepEquals(newVal, oldVal)) {
        //             const formData = getDefaultFormState(this.$props.schema, this.$props.value, this.$props.schema);
        //             if (!deepEquals(this.formData, formData)) {
        //                 this.formData = formData;
        //             }
        //         }
        //     },
        // },
        // render(h) {
        //     const self = this;
        //     // default scoped slot
        //     const defaultSlot = this.$scopedSlots.default
        //         ? this.$scopedSlots.default({
        //             formData: self.formData,
        //             formRefFn: () => self.$refs.genVueForm
        //         })
        //         : this.footerParams.show
        //             ? h(FormFooter, {
        //                 props: {
        //                     globalOptions,
        //                     okBtn: self.footerParams.okBtn,
        //                     cancelBtn: self.footerParams.cancelBtn,
        //                 },
        //                 on: {
        //                     onCancel() {
        //                         self.$emit('on-cancel');
        //                     },
        //                     onSubmit() {
        //                         self.$refs.genVueForm.validate((isValid, resData) => {
        //                             if (isValid) {
        //                                 return self.$emit('on-submit', self.formData);
        //                             }
        //                             console.warn(resData);
        //                             return self.$emit('on-validation-failed', resData);
        //                         });
        //                     }
        //                 }
        //             }) : undefined;
        //
        //     const { layoutColumn = 1, ...formProps } = self.$props.formProps;
        //
        //     const props = {
        //         schema: this.schema,
        //         uiSchema: this.uiSchema,
        //         errorSchema: this.errorSchema,
        //         customFormats: this.customFormats,
        //         customRule: this.customRule,
        //         rootSchema: this.schema,
        //         rootFormData: this.formData, // 根节点的数据
        //         curNodePath: '', // 当前节点路径
        //         globalOptions, // 全局配置，差异化ui框架
        //         formProps: {
        //             labelPosition: 'top',
        //             labelSuffix: '：',
        //             ...formProps,
        //         }
        //     };
        //
        //     return h(
        //         globalOptions.COMPONENT_MAP.form,
        //         {
        //             class: {
        //                 genFromComponent: true,
        //                 [`formLabel-${props.formProps.labelPosition}`]: true,
        //                 formInlineFooter: formProps.inlineFooter,
        //                 formInline: formProps.inline,
        //                 [`genFromComponent_${this.schema.id}Form`]: !!this.schema.id,
        //                 layoutColumn: !formProps.inline,
        //                 [`layoutColumn-${layoutColumn}`]: !formProps.inline
        //             },
        //             ref: 'genVueForm',
        //             props: {
        //                 model: self.formData,
        //                 ...props.formProps
        //             }
        //         },
        //         [
        //             h(
        //                 SchemaField,
        //                 {
        //                     props
        //                 }
        //             ),
        //             defaultSlot,
        //         ]
        //     );
        // }
    };

    Form.install = (vueApp, options = {}) => {
        debugger;
        vueApp.component(Form.name || options.name, Form);
    };

    return Form;
}
