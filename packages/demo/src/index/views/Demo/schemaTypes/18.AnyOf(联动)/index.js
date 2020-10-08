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
                ]
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
        anyOf: [
            {
                title: 'First method of identification',
                properties: {
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
                title: 'Second method of identification',
                properties: {
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
        anyOfSelect: {
            'ui:widget': 'RadioWidget',
            'ui:title': '测试 anyOf object',
            'ui:options': {
                style: {
                    // width: '300px',
                }
            }
        },
        age: {
            anyOfSelect: {
                'ui:widget': 'RadioWidget',
                'ui:title': '选择选项',
                'ui:options': {
                }
            }
        },
        test: {
            // 'ui:widget': 'RadioWidget',
            anyOf: [
                {},
                {
                    'ui:title': 'ui-option2'
                }
            ]
        }
    },
    formData: {
        // age: 11111,
        // test: '222',
        // idCode: '111',
        // firstName: '11',
        // lastName: '11'
    }
};
