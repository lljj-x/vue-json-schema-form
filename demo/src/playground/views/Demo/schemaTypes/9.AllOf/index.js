/**
 * Created by Liu.Jun on 2020/5/19 15:00.
 */

export default {
    schema: {
        type: 'object',
        definitions: {
            address: {
                type: 'object',
                properties: {
                    street_address: {
                        title: '街道',
                        type: 'string'
                    },
                    city: {
                        title: '城市',
                        type: 'string'
                    },
                    state: {
                        title: '国家',
                        type: 'string'
                    }
                },
                required: ['street_address', 'city', 'state']
            }
        },
        properties: {
            test: {
                title: '测试字符串',
                allOf: [
                    {
                        type: 'string',
                        default: 'xxx',
                    },
                    {
                        maxLength: 5
                    }
                ]
            },
            testAllOfRef: {
                allOf: [
                    {
                        $ref: '#/definitions/address'
                    },
                    {
                        properties: {
                            type: {
                                type: 'string',
                                title: 'allOf 枚举',
                                enum: ['residential', 'business']
                            }
                        }
                    }
                ],
            }
        },
        allOf: [
            {
                properties: {
                    lorem: {
                        title: 'allOf 标题',
                        type: ['string', 'boolean'],
                        default: false,
                    },
                },
            },
            {
                properties: {
                    lorem: {
                        type: 'boolean',
                    },
                    ipsum: {
                        title: 'title',
                        type: 'string',
                    },
                },
            },
        ],
    },
    formData: {},
};
