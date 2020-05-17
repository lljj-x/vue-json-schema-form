/**
 * Created by Liu.Jun on 2020/4/16 17:32.
 */

// 组件参数
import vueProps from './props';
// 默认表单底部
import FormFooter from './FormFooter';
// 生成form表单默认数据
import { getDefaultFormState } from './common/schemaUtils';
import { deepEquals } from './common/utils';

import SchemaField from './fields/SchemaField';

import './index.css';

export default {
    name: 'ElementFrom',
    props: vueProps,
    data() {
        const formData = this.getStateFromData(this.$props.schema, this.$props.value);

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
                // 支持v-model
                this.$emit('input', newValue);

                // change 事件
                this.$emit('onChange', {
                    newValue,
                    oldValue
                });
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
                            self.$emit('onCancel');
                        },
                        onSubmit() {
                            self.$refs.genEditForm.validate().then(() => {
                                console.log(self.$refs.genEditForm);
                                self.$emit('onSubmit', self.formData);
                            });
                        }
                    }
                }) : undefined;

        const props = {
            schema: this.schema,
            uiSchema: this.uiSchema,
            errorSchema: this.errorSchema,
            rootSchema: this.schema,
            rootFormData: this.formData, // 根节点的数据
            curNodePathArr: [] // 当前节点路径
        };

        return h(
            'el-form',
            {
                class: {
                    genFromComponent: true,
                    [`genFromComponent_${this.schema.id}Form`]: true
                },
                ref: 'genEditForm',
                props: {
                    model: self.formData,
                    labelPosition: 'top',
                    labelSuffix: '：'
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
