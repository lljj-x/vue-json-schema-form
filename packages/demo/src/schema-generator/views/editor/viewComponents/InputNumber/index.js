/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '数字输入框',
    type: 'number'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        multipleOf: {
                            title: '步长',
                            type: 'number',
                            default: 1
                        },
                    }
                },
                uiOptions: {
                    type: 'object',
                    properties: {
                        stepStrictly: {
                            title: '严格步长',
                            type: 'boolean',
                            default: false
                        },
                        precision: {
                            title: '精度',
                            type: 'number',
                            minimum: 0
                        },
                        controlsPosition: {
                            type: 'string',
                            title: '按钮位置',
                            enum: [
                                'default',
                                'right'
                            ],
                            enumNames: [
                                '默认两边',
                                '右侧显示'
                            ],
                            default: 'default'
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
                        minimum: {
                            title: '最小值',
                            type: 'number'
                        },
                        maximum: {
                            title: '最大值',
                            type: 'number'
                        },
                    }
                }
            }
        }
    }, 'number')
};
