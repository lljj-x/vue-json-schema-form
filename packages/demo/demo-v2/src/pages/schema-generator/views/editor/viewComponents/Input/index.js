/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '输入框',
    type: 'string'
};
export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            required: [],
            properties: {
                uiOptions: {
                    type: 'object',
                    properties: {
                        placeholder: {
                            type: 'string',
                            title: '输入占位文本',
                            default: '请输入'
                        },
                        clearable: {
                            title: '显示清空按钮',
                            type: 'boolean',
                            default: false
                        },
                        showWordLimit: {
                            title: '字数统计',
                            type: 'boolean',
                            default: false
                        },
                        showPassword: {
                            title: '密码框',
                            type: 'boolean',
                            default: false
                        },
                        type: {
                            type: 'string',
                            title: '输入框类型',
                            enum: [
                                'text',
                                'textarea'
                            ],
                            enumNames: [
                                '输入框 Input',
                                '文字域 Textarea'
                            ]
                        },
                    }
                }
            }
        },
        rules: {
            type: 'object',
            title: '数据校验',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        maxLength: {
                            title: '最大长度',
                            type: 'number'
                        },
                        minLength: {
                            title: '最小长度',
                            type: 'number'
                        }
                    }
                }
            }
        }
    })
};
