/**
 * Created by Liu.Jun on 2020/10/30 17:10.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '日期时间范围',
    type: 'array',
    format: 'date-time',
    items: {
        type: 'string'
    }
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
                        items: {
                            type: 'object',
                            properties: {
                                type: {
                                    title: '返回值类型',
                                    type: 'string',
                                    default: 'number',
                                    enum: [
                                        'number',
                                        'string',
                                    ],
                                    enumNames: [
                                        '数字时间戳',
                                        'ISO字符串'
                                    ]
                                }
                            }
                        }
                    }
                },
                uiOptions: {
                    type: 'object',
                    properties: {
                        startPlaceholder: {
                            type: 'string',
                            title: '开始占位符',
                            default: '开始日期'
                        },
                        endPlaceholder: {
                            type: 'string',
                            title: '结束占位符',
                            default: '结束日期'
                        }
                    }
                }
            }
        }
    })
};
