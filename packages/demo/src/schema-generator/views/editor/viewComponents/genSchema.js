/**
 * Created by Liu.Jun on 2020/10/26 18:24.
 */

import { formatFormLabelWidth } from '../common/editorData';

function genBaseVal(type = 'string') {
    return {
        title: '基础配置',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    title: {
                        title: '标题',
                        type: 'string',
                        'ui:placeholder': '请输入表单项标题',
                        'err:required': '请输入标题'
                    },
                    description: {
                        title: '描述',
                        type: 'string',
                        'ui:options': {
                            placeholder: '请输入表单项描述，支持输入html',
                            type: 'textarea',
                            rows: 3,
                        }
                    },
                    ...!['array', 'object'].includes(type) ? {
                        default: {
                            title: '默认值',
                            type,
                            'ui:placeholder': '输入默认值'
                        }
                    } : {}
                }
            },
            uiOptions: {
                type: 'object',
                properties: {
                    ...!['array', 'object'].includes(type) ? {
                        labelWidth: {
                            title: '标签宽度',
                            type: 'number',
                            'ui:widget': 'ElSlider',
                            'ui:options': {
                                formatTooltip(val) {
                                    return formatFormLabelWidth(val);
                                }
                            }
                        },
                        disabled: {
                            title: '禁用',
                            type: 'boolean',
                            default: false
                        }
                    } : {}
                }
            }
        }
    };
}

export default (schema, type) => ({
    type: 'object',
    required: ['property'],
    properties: {
        property: {
            title: '属性名',
            type: 'string',
            'ui:placeholder': '请输入属性名',
            'err:required': '属性名必填'
        },
        baseValue: genBaseVal(type),
        ...schema
    }
});
