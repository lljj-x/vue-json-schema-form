/**
 * Created by Liu.Jun on 2020/5/19 15:41.
 */

export default {
    schema: {
        title: 'Object property dependencies',
        type: 'object',
        properties: {
            unidirectional: {
                title: '单向依赖',
                description: '最基本的属性单向依赖，ui-schema 配置 onlyShowIfDependent 只在被依赖时才显示',
                type: 'object',
                'ui:options': {
                    onlyShowIfDependent: true
                },
                properties: {
                    name: {
                        title: 'Name',
                        type: 'string'
                    },
                    credit_card: {
                        title: 'Credit card',
                        type: 'string'
                    },
                    billing_address: {
                        title: 'Billing address',
                        type: 'string'
                    }
                },
                required: [
                    'name'
                ],
                dependencies: {
                    credit_card: [
                        'billing_address'
                    ]
                }
            },
            bidirectional: {
                title: '双向依赖',
                description: '显式地定义双向依赖，如果配置 onlyShowIfDependent 会导致初始化没有值时都无法渲染，这里需要使用者自行考虑',
                type: 'object',
                properties: {
                    name: {
                        title: 'Name',
                        type: 'string'
                    },
                    credit_card: {
                        title: 'Credit card',
                        type: 'string'
                    },
                    billing_address: {
                        title: 'Billing address',
                        type: 'string'
                    }
                },
                required: [
                    'name'
                ],
                dependencies: {
                    credit_card: [
                        'billing_address'
                    ],
                    billing_address: [
                        'credit_card'
                    ]
                }
            }
        }
    }
};
