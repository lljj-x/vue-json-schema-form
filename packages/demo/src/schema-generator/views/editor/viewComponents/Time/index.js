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
            }
        },
        rules: {
            type: 'object',
            title: '数据校验',
            required: [],
            properties: {
                minTime: {
                    title: '最小时间',
                    type: 'string',
                    format: 'time'
                },
                maxTime: {
                    title: '最大时间',
                    type: 'string',
                    format: 'time'
                }
            }
        }
    })
};
