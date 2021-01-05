/**
 * Created by Liu.Jun on 2020/5/15 14:07.
 */

export default {
    schema: {
        definitions: {
            Thing: {
                type: 'object',
                properties: {
                    name: {
                        title: 'Thing',
                        type: 'string',
                        default: 'Default name',
                    },
                },
            },
        },
        type: 'object',
        properties: {
            listOfStrings: {
                type: 'array',
                title: 'A list of strings',
                'ui:options': {
                    showIndexNumber: true
                },
                items: {
                    title: 'Input string',
                    type: 'string',
                    default: 'bazinga',
                },
            },
            multipleChoicesList: {
                type: 'array',
                title: 'A multiple choices list',
                items: {
                    type: 'string',
                    enum: ['foo', 'bar', 'fuzz', 'qux'],
                },
                uniqueItems: true,
            },
            fixedItemsList: {
                type: 'array',
                title: 'A list of fixed items',
                items: [
                    {
                        title: 'A string value',
                        type: 'string',
                        default: 'lorem ipsum',
                    },
                    {
                        title: 'a boolean value',
                        type: 'boolean',
                    },
                    {
                        title: 'a string value',
                        type: 'string',
                    },
                    {
                        title: 'a number value',
                        type: 'number',
                    }
                ],
                additionalItems: {
                    title: 'Additional item',
                    type: 'number',
                },
            },
            minItemsList: {
                type: 'array',
                title: 'A list with a minimal number of items',
                minItems: 3,
                items: {
                    $ref: '#/definitions/Thing',
                },
            },
            defaultsAndMinItems: {
                type: 'array',
                title: 'List and item level defaults',
                minItems: 5,
                default: ['carp', 'trout', 'bream'],
                items: {
                    title: 'Default unidentified',
                    type: 'string',
                    default: 'unidentified',
                },
            },
            nestedList: {
                type: 'array',
                title: 'Nested list',
                items: {
                    type: 'array',
                    title: 'Inner list',
                    items: {
                        title: 'Inner Item',
                        type: 'string',
                        default: 'lorem ipsum',
                    },
                },
            },
            unorderable: {
                title: 'Unorderable items',
                type: 'array',
                items: {
                    title: 'Unorderable',
                    type: 'string',
                    default: 'lorem ipsum',
                },
            },
            unremovable: {
                title: 'Unremovable items',
                type: 'array',
                items: {
                    title: 'Unremovable',
                    type: 'string',
                    default: 'lorem ipsum',
                },
            },
            noToolbar: {
                title: 'No add, remove and order buttons',
                type: 'array',
                items: {
                    title: 'No ...',
                    type: 'string',
                    default: 'lorem ipsum',
                },
            },
            fixedNoToolbar: {
                title: 'Fixed array without buttons',
                type: 'array',
                items: [
                    {
                        title: 'A number',
                        type: 'number',
                        default: 42,
                    },
                    {
                        title: 'A boolean',
                        type: 'boolean',
                        default: false,
                    },
                ],
                additionalItems: {
                    title: 'A string',
                    type: 'string',
                    default: 'lorem ipsum',
                },
            },
        },
    },
    uiSchema: {
        listOfStrings: {
            items: {
                'ui:options': {
                    placeholder: 'Please enter a string'
                }
            },
        },
        multipleChoicesList: {
            'ui:widget': 'CheckboxesWidget',
        },
        fixedItemsList: {
            items: [
                {
                    'ui:options': {
                        type: 'textarea'
                    }
                },
                {
                    'ui:options': {
                        activeText: '开启',
                        inactiveText: '不开启'
                    }
                }
            ],
            additionalItems: {
                'ui:options': {
                    step: 10
                }
            },
        },
        unorderable: {
            'ui:options': {
                sortable: false,
            },
        },
        unremovable: {
            'ui:options': {
                removable: false,
            },
        },
        noToolbar: {
            'ui:options': {
                addable: false,
                sortable: false,
                removable: false,
            },
            items: {
                'ui:options': {
                    title: '不显示操作条'
                }
            }
        },
        fixedNoToolbar: {
            'ui:options': {
                addable: false,
                sortable: false,
                removable: false,
                showIndexNumber: true
            },
        },
    },
    formData: {
        listOfStrings: ['foo', 'bar'],
        multipleChoicesList: ['foo', 'bar'],
        fixedItemsList: ['Some text', true],
        nestedList: [['lorem', 'ipsum'], ['dolor']],
        unorderable: ['one', 'two'],
        unremovable: ['one', 'two'],
        noToolbar: ['one', 'two'],
        fixedNoToolbar: [42, true, 'additional item one', 'additional item two'],
    },
};
