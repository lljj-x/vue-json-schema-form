/**
 * Created by Liu.Jun on 2020/10/30 17:10.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'DateTime范围(时间戳)',
    type: 'array',
    format: 'date-time',
    items: {
        type: 'number'
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
