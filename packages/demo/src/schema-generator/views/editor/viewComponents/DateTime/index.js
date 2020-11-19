/**
 * Created by Liu.Jun on 2020/10/30 17:10.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '日期时间',
    type: 'number',
    format: 'date-time'
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
                },
                uiOptions: {
                    type: 'object',
                    properties: {
                        placeholder: {
                            type: 'string',
                            title: '输入占位文本',
                            default: '请选择日期时间'
                        }
                    }
                }
            }
        }
    })
};
