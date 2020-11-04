/**
 * Created by Liu.Jun on 2020/10/30 16:25.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '时间',
    type: 'string',
    format: 'time'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            required: [],
            properties: {
                placeholder: {
                    type: 'string',
                    title: '输入占位文本',
                    default: '请选择时间'
                }
            }
        }
    })
};
