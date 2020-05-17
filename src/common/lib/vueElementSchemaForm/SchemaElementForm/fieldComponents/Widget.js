/**
 * Created by Liu.Jun on 2020/4/23 11:24.
 */

import { pathArray2prop, getPathVal, setPathVal } from '../common/vueUtils';

import validateFormData from '../common/schemaValidate';

export default {
    name: 'Widget',
    props: {
        schema: {
            type: Object,
            default: () => ({})
        },
        errorSchema: {
            type: Object,
            default: () => ({})
        },
        widget: {
            type: [String, Function, Object],
        },
        // 部分场景可能需要格式化值，如vue .number 修饰符
        formatValue: {
            type: [Function],
            default: val => ({
                update: true,
                value: val
            })
        },
        rootFormData: {
            type: [Object],
            required: true
        },
        curNodePathArr: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: String,
            default: 'auto'
        },
        description: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        // attrs
        attrs: {
            type: Object,
            default: () => ({})
        },
        // props
        uiProps: {
            type: Object,
            default: () => ({})
        }
    },
    render(h) {
        const self = this;
        return h(
            'el-form-item',
            {
                props: {
                    label: self.label,
                    labelWidth: self.labelWidth,
                    required: self.required,
                    prop: pathArray2prop(self.curNodePathArr),
                    rules: [
                        {
                            validator(rule, value, callback) {
                                // required 需要特殊处理
                                const isEmpty = value === '' || value === undefined;
                                // const isEmpty = value === undefined;
                                if (self.required) {
                                    if (isEmpty) {
                                        // errorSchema 配置覆盖错误信息
                                        return callback(self.errorSchema.required || '必填选项');
                                    }
                                } else if (isEmpty) {
                                    // 非required 为空 校验通过
                                    return callback();
                                }

                                // 校验输入是否正确
                                const error = validateFormData({
                                    formData: value,
                                    schema: self.$props.schema
                                });
                                if (error.errors.length > 0) {
                                    const curErr = error.errors[0];

                                    // errorSchema 错误信息
                                    return callback(self.errorSchema[curErr.name] || curErr.message);
                                }

                                return callback();
                            },
                        }
                    ]
                },
                scopedSlots: {
                    // 错误只能显示一行，多余...
                    error: props => h('p', {
                        class: {
                            FormItemErrorBox: true
                        },
                        attrs: {
                            title: props.error
                        }
                    }, [props.error])
                },
            },
            [
                ...self.description ? [ // 有描述信息才会渲染
                    h(
                        'p',
                        {
                            domProps: {
                                innerHTML: self.description
                            },
                            class: {
                                genFromWidget_des: true
                            }
                        },
                        // self.description
                    )
                ] : [],
                h( // 关键输入组件
                    self.widget,
                    {
                        props: {
                            ...self.uiProps,
                            value: getPathVal(self.rootFormData, self.curNodePathArr), // v-model
                        },
                        attrs: {
                            placeholder: self.uiProps.placeholder, // 兼容placeholder配置在 外层或者attr内
                            ...self.attrs
                        },
                        on: {
                            input(event) {
                                const formatValue = self.formatValue(event);
                                // 默认用户输入变了都是需要更新form数据保持同步，唯一特例 input number
                                // 为了兼容 number 小数点后0结尾的数据场景
                                // 比如 1. 1.010 这类特殊数据输入是不需要触发 新值的设置，否则会导致schema校验为非数字
                                // 但由于element为了解另外的问题，会在nextTick时强制同步dom的值等于vm的值所以无法通过这种方式来hack，这里旧的这份逻辑依旧保留 不过update一直为true
                                if (formatValue.update) {
                                    setPathVal(self.rootFormData, self.curNodePathArr, formatValue.value);
                                }
                            }
                        }
                    }
                )
            ]
        );
    }
};
