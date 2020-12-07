/**
 * Created by Liu.Jun on 2020/12/10 15:15.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '是否选择(Switch)',
    type: 'boolean'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            properties: {
                uiOptions: {
                    type: 'object',
                    properties: {
                        activeText: {
                            title: '选择文案',
                            type: 'string'
                        },
                        inactiveText: {
                            title: '非选择文案',
                            type: 'string'
                        }
                    }
                }
            }
        }
    })
};
