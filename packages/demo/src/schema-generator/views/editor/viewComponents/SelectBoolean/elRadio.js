/**
 * Created by Liu.Jun on 2020/12/10 15:16.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '是否选择(Radio)',
    type: 'boolean',
    'ui:widget': 'RadioWidget'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        enumNames: {
                            type: 'array',
                            items: [{
                                title: '选择文案',
                                type: 'string',
                                default: '是'
                            }, {
                                title: '非选择文案',
                                type: 'string',
                                default: '否'
                            }]
                        }
                    }
                }
            }
        }
    })
};
