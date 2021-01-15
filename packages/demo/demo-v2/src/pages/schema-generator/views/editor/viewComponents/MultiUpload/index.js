/**
 * Created by Liu.Jun on 2020/11/27 11:03 下午.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '多文件',
    type: 'array',
    items: {
        type: 'string'
    },
    'ui:widget': 'UploadWidget',
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
                    required: ['action'],
                    properties: {
                        action: {
                            title: '上传接口',
                            type: 'string',
                            format: 'uri',
                            default: 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca'
                        },
                        btnText: {
                            title: '上传按钮文案',
                            type: 'string'
                        }
                    }
                }
            }
        }
    })
};
