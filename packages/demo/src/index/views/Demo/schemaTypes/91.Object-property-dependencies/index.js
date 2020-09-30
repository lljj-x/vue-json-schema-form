/**
 * Created by Liu.Jun on 2020/5/19 15:41.
 */

export default {
    schema: {
        title: 'Property dependencies',
        description: 'These samples are best viewed without live validation.',
        type: 'object',
        properties: {
            unidirectional: {
                title: 'Unidirectional',
                src: 'https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies',
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    credit_card: {
                        type: 'number'
                    },
                    billing_address: {
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
            }
        }
    }
};
