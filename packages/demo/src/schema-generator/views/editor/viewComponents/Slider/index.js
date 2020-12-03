/**
 * Created by Liu.Jun on 2020/10/30 16:25.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '数字（slider）',
    type: 'number',
    'ui:widget': 'ElSlider'
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
                        multipleOf: {
                            title: '步长',
                            type: 'number',
                            default: 1
                        },
                    }
                },
                uiOptions: {
                    type: 'object',
                    properties: {
                        showInput: {
                            title: '显示输入框',
                            type: 'boolean',
                            default: false
                        },
                        showInputControls: {
                            title: '控制按钮',
                            type: 'boolean',
                            default: true
                        },
                        showStops: {
                            title: '显示间断点',
                            type: 'boolean',
                            default: false
                        },
                        showTooltip: {
                            title: '显示Tooltip',
                            type: 'boolean',
                            default: true
                        },
                        debounce: {
                            title: '去抖延迟ms',
                            type: 'number',
                            default: 300
                        }
                    }
                },
            }
        },
        rules: {
            type: 'object',
            title: '数据校验',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        minimum: {
                            title: '最小值',
                            type: 'number'
                        },
                        maximum: {
                            title: '最大值',
                            type: 'number'
                        },
                    }
                }
            }
        }
    }, 'number')
};
