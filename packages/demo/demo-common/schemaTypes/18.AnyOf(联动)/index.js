/**
 * Created by Liu.Jun on 2020/5/19 15:00.
 */

export default {
    schema: {
        type: 'object',
        required: [
            'age'
        ],
        properties: {
            age: {
                title: '测试基础类型 anyOf',
                anyOf: [
                    {
                        title: '测试基础类型 anyOf 5的倍数',
                        type: 'integer',
                        multipleOf: 5
                    },
                    {
                        title: '测试基础类型 anyOf 3的倍数',
                        type: 'integer',
                        multipleOf: 3
                    }
                ],
                anyOfSelect: {
                    'ui:widget': 'RadioWidget',
                    'ui:title': '选择选项',
                    'ui:options': {
                    }
                }
            },
            test: {
                title: '测试 const anyOf',
                type: 'string',
                anyOf: [
                    {
                        title: 'schema option1',
                        const: '111'
                    },
                    {
                        'ui:title': 'ui-option2',
                        const: '222'
                    }
                ]
            },
            items: {
                title: '测试OneOf Array Items',
                type: 'array',
                items: {
                    type: 'object',
                    anyOf: [
                        {
                            properties: {
                                foo: {
                                    type: 'string'
                                }
                            }
                        },
                        {
                            properties: {
                                bar: {
                                    type: 'string'
                                }
                            }
                        }
                    ]
                }
            }
        },
        anyOfSelect: {
            'ui:widget': 'RadioWidget',
            'ui:title': '测试 anyOf object',
            'ui:options': {
                style: {
                    // width: '300px',
                }
            }
        },
        anyOf: [
            {
                'ui:showTitle': true,
                title: 'First method of identification',
                properties: {
                    type: {
                        'ui:hidden': true,
                        type: 'string',
                        default: 'userName',
                        const: 'userName'
                    },
                    firstName: {
                        type: 'string',
                        title: 'First name',
                        default: 'Chuck'
                    },
                    lastName: {
                        type: 'string',
                        title: 'Last name'
                    }
                }
            },
            {
                'ui:showTitle': true,
                title: 'Second method of identification',
                properties: {
                    type: {
                        'ui:hidden': true,
                        type: 'string',
                        default: 'id',
                        const: 'id'
                    },
                    firstName: {
                        type: 'string',
                        title: 'First name'
                    },
                    idCode: {
                        type: 'string',
                        title: 'ID code',
                        default: 'Default id'
                    }
                }
            }
        ]
    },
    uiSchema: {
    },
    formData: {
    }
};
