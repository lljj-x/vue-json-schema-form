/**
 * Created by Liu.Jun on 2020/4/23 11:24.
 */

import {
    isRootNodePath, path2prop, getPathVal, setPathVal
} from '../common/vueUtils';
import { getUserErrOptions } from '../common/formUtils';

import { validateFormDataAndTransformMsg } from '../common/schema/validate';

import i18n from '../i18n';

export default {
    name: 'Widget',
    props: {
        // 是否同步formData的值，默认表单元素都需要
        // oneOf anyOf 中的select属于formData之外的数据
        isFormData: {
            type: Boolean,
            default: true
        },
        // isFormData = false时需要传入当前 value 否则会通过 curNodePath 自动计算
        curValue: {
            type: null,
            default: 0
        },
        schema: {
            type: Object,
            default: () => ({})
        },
        errorSchema: {
            type: Object,
            default: () => ({})
        },
        customFormats: {
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
            type: null
        },
        curNodePath: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        // 解决 json schema和实际输入元素中空字符串 required 判定的差异性
        // 元素输入为 '' 使用 emptyValue 的值
        emptyValue: {
            type: null,
            default: undefined
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
    computed: {
        value: {
            get() {
                if (this.isFormData) {
                    return getPathVal(this.rootFormData, this.curNodePath);
                }
                return this.curValue;
            },
            set(value) {
                const trueValue = value === '' ? this.emptyValue : value;
                if (this.isFormData) {
                    setPathVal(this.rootFormData, this.curNodePath, trueValue);
                }
                this.$emit('onChange', trueValue);
            }
        }
    },
    created() {
        // 枚举类型默认值为第一个选项
        if (this.uiProps.enumOptions
            && this.uiProps.enumOptions.length > 0
            && this.value === undefined
            && this.value !== this.uiProps.enumOptions[0]
        ) {
            this.value = this.uiProps.enumOptions[0].value;
        }
    },
    render(h) {
        const self = this;

        const {
            class: className,
            style,
            ...uiProps
        } = self.uiProps;

        // 判断是否为根节点
        const isRootNode = isRootNodePath(this.curNodePath);

        return h(
            'el-form-item',
            {
                class: {
                    'is-required': self.required
                },
                props: {
                    label: self.label,
                    labelWidth: self.labelWidth,
                    ...this.isFormData ? {
                        // 这里对根节点打特殊标志，绕过elementUi无prop属性不校验
                        prop: isRootNode ? '__$$root' : path2prop(self.curNodePath),
                        rules: [
                            {
                                validator(rule, value, callback) {
                                    if (isRootNode) {
                                        value = self.rootFormData;
                                    }

                                    // isEmpty 校验
                                    const isEmpty = value === undefined;
                                    if (self.required) {
                                        if (isEmpty) {
                                            const requireErrObj = {
                                                keyword: 'required',
                                                params: {
                                                    missingProperty: path2prop(self.curNodePath)
                                                }
                                            };

                                            // 处理多语言require提示信息 （ajv 修改原引用）
                                            i18n.getCurrentLocalize()([requireErrObj]);

                                            // errorSchema 配置覆盖错误信息
                                            return callback(getUserErrOptions(self.errorSchema).required || requireErrObj.message);
                                        }
                                    } else if (isEmpty) {
                                        // 非required 为空 校验通过
                                        return callback();
                                    }

                                    // 校验是通过逐级展开校验 这里只捕获同级错误信息
                                    // 如 object对minProperties. maxProperties. oneOf属性
                                    const isOnlyValidate = !self.widget; // 单纯的校验器 不包含输入组件

                                    const errors = validateFormDataAndTransformMsg({
                                        formData: value,
                                        schema: self.$props.schema,
                                        customFormats: self.$props.customFormats,
                                        errorSchema: self.errorSchema,
                                        filterRootNodeError: true,
                                        isOnlyValidate
                                    });

                                    if (errors.length > 0) return callback(errors[0].message);
                                    return callback();

                                    // // schema ajv 校验
                                    // const error = validateFormData({
                                    //     formData: value,
                                    //     schema: self.$props.schema,
                                    //     customFormats: self.$props.customFormats
                                    // });

                                    // const errors = error.errors.filter((item) => {
                                    //     // 常规数据输入组件
                                    //     if (!isOnlyValidate) return item.property === '';
                                    //
                                    //     // 校验组件
                                    //     const schemaPathValidList = [
                                    //         '#/oneOf',
                                    //         '#/anyOf',
                                    //         '#/minProperties',
                                    //         '#/maxProperties',
                                    //         '#/contains',
                                    //         '#/minItems',
                                    //         '#/maxItems',
                                    //         '#/uniqueItems',
                                    //     ];
                                    //
                                    //     return item.property === '' && schemaPathValidList.includes(item.schemaPath);
                                    // });
                                    //
                                    // if (errors.length > 0) {
                                    //     const curErr = errors[0];
                                    //     const curErrMsg = getUserErrOptions(self.errorSchema)[curErr.name] || curErr.message;
                                    //
                                    //     // 强制置空错误信息 会直接校验通过
                                    //     if (curErrMsg) {
                                    //         // errorSchema 错误信息
                                    //         return callback(curErrMsg);
                                    //     }
                                    // }
                                    //
                                    // return callback();
                                },
                                trigger: 'blur'
                            }
                        ]
                    } : {},
                },
                scopedSlots: {
                    // 错误只能显示一行，多余...
                    error: props => (props.error ? h('p', {
                        class: {
                            formItemErrorBox: true
                        },
                        attrs: {
                            title: props.error
                        }
                    }, [props.error]) : null)
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
                            ...uiProps,
                            value: this.value, // v-model
                        },
                        style,
                        class: className,
                        attrs: {
                            placeholder: uiProps.placeholder, // 兼容placeholder配置在 外层或者attr内
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
                                    self.value = formatValue.value;
                                }
                            }
                        }
                    }
                )
            ]
        );
    }
};
