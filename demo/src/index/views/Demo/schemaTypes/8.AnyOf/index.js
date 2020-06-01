/**
 * Created by Liu.Jun on 2020/5/19 15:00.
 */

// setTimeout(() => {
//     const fnList = [
//         () => 1,
//         p => Promise.resolve(p + 1),
//         p => p + 2,
//         p => Promise.resolve(p + 3),
//         p => Promise.resolve(p + 4),
//         p => p + 5,
//         p => p
//     ];
//
//     let preResult;
//     while (fnList.length > 0) {
//         const curFn = fnList.shift();
//         if (preResult) {
//             preResult = preResult.then((res) => {
//                 console.log(res);
//                 return Promise.resolve(curFn(res));
//             });
//         } else {
//             // 首次调用无参数
//             preResult = Promise.resolve(curFn());
//         }
//     }
// }, 1000);


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
        'ui:anyOf': {
            'ui:widget': 'RadioWidget',
            'ui:title': '测试 anyOf object',
            'ui:options': {
                style: {
                    // width: '300px',
                }
            }
        },
        age: {
            'ui:anyOf': {
                'ui:widget': 'RadioWidget',
                'ui:title': '选择选项',
                'ui:options': {
                }
            }
        },
        test: {
            // 'ui:widget': 'RadioWidget',
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
