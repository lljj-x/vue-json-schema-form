/**
 * Created by Liu.Jun on 2020/10/26 18:24.
 */

import { formatFormLabelWidth } from '../common/editorData';

function genBaseVal(type = 'string', isMultiSelect = false) {
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
                        },
                    } : {},
                    ...['array'].includes(type) ? {
                        minItems: {
                            title: '最少子元素',
                            type: 'number'
                        },
                        maxItems: {
                            title: '最多子元素',
                            type: 'number'
                        },
                        uniqueItems: {
                            type: 'boolean',
                            title: '不重复',
                            description: '多选框强制默认为 true，且配置无效',
                            'ui:widget': 'el-switch',
                            default: false
                        }
                    } : {}
                }
            },
            uiOptions: {
                type: 'object',
                properties: {
                    ...!['array', 'object'].includes(type) || isMultiSelect ? {
                        width: {
                            title: '宽度',
                            type: 'string',
                            description: '请输入style width 支持的格式，<br />比如<strong style="font-weight: bold;">10%、100px</strong>等，推荐百分比单位',
                            'ui:placeholder': '请输入FormItem宽度'
                        },
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
                        required: {
                            title: '必填',
                            type: 'boolean',
                            default: false
                        },
                        disabled: {
                            title: '禁用',
                            type: 'boolean',
                            default: false
                        }
                    } : {
                        showTitle: {
                            title: '显示标题',
                            type: 'boolean',
                            default: true,
                            'ui:widget': 'el-switch'
                        },
                        showDescription: {
                            title: '显示描述',
                            type: 'boolean',
                            default: true,
                            'ui:widget': 'el-switch'
                        }
                    },
                }
            }
        }
    };
}

export default (schema, type, isMultiSelect) => ({
    type: 'object',
    required: ['property'],
    properties: {
        property: {
            title: '属性名',
            type: 'string',
            'ui:placeholder': '请输入属性名',
            'err:required': '属性名必填'
        },
        baseValue: genBaseVal(type, isMultiSelect),
        ...schema
    }
});
