/**
 * Created by Liu.Jun on 2020/4/16 17:32.
 */

// 组件参数
import vueProps from './props';
// 默认表单底部
import FormFooter from './FormFooter';
// 生成form表单默认数据
import getDefaultFormState from './common/schema/getDefaultFormState';
import { deepEquals } from './common/utils';

import SchemaField from './fields/SchemaField';

import './index.css';

export default {
    name: 'ElementFrom',
    props: vueProps,
    data() {
        const formData = this.getStateFromData(this.$props.schema, this.$props.value);

        // 计算form默认值和用户传入的值不相等
        // 保持v-model双向数据及时性
        if (!deepEquals(formData, this.value)) {
            this.handlerFormDataChange(formData, this.value);
        }

        return {
            formData
        };
    },
    computed: {
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
                this.handlerFormDataChange(newValue, oldValue);
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
        handlerFormDataChange(newValue, oldValue) {
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
                const formData = this.getStateFromData(this.$props.schema, this.$props.value);
                if (!deepEquals(this.formData, formData)) {
                    this.formData = formData;
                }
            }
        },
        getStateFromData(schema, inputFormData) {
            // 通过schema，默认数据，rootSchema 计算出 formData 默认值
            return getDefaultFormState(schema, inputFormData, schema);
        }
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
                        okBtn: self.footerParams.okBtn,
                        cancelBtn: self.footerParams.cancelBtn,
                    },
                    on: {
                        onCancel() {
                            self.$emit('on-cancel');
                        },
                        onSubmit() {
                            self.$refs.genEditForm.validate().then(() => {
                                // console.log(self.$refs.genEditForm);
                                self.$emit('on-submit', self.formData);
                            });
                        }
                    }
                }) : undefined;

        const props = {
            schema: this.schema,
            uiSchema: this.uiSchema,
            errorSchema: this.errorSchema,
            customFormats: this.customFormats,
            rootSchema: this.schema,
            rootFormData: this.formData, // 根节点的数据
            curNodePath: '' // 当前节点路径
        };

        return h(
            'el-form',
            {
                class: {
                    genFromComponent: true,
                    [`genFromComponent_${this.schema.id}Form`]: !!this.schema.id
                },
                ref: 'genEditForm',
                props: {
                    model: self.formData,
                    labelPosition: 'top',
                    labelSuffix: '：',
                    ...self.formProps
                    // size: 'small'
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
