/**
 * Created by Liu.Jun on 2020/10/30 17:10.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'DateTime(时间戳)',
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
