/**
 * Created by Liu.Jun on 2020/5/18 13:02.
 */

export default {
    schema: {
        title: 'Widgets',
        type: 'object',
        properties: {
            stringFormats: {
                type: 'object',
                title: 'String formats',
                required: ['email', 'uri'],
                properties: {
                    email: {
                        title: 'Email',
                        type: 'string',
                        format: 'email',
                    },
                    uri: {
                        title: 'Uri',
                        type: 'string',
                        format: 'uri',
                    },
                },
            },
            boolean: {
                type: 'object',
                title: 'Boolean field',
                properties: {
                    default: {
                        type: 'boolean',
                        title: 'checkbox (default)',
                        description: 'This is the checkbox-description',
                    },
                    radio: {
                        type: 'boolean',
                        title: 'radio buttons',
                        description: 'This is the radio-description',
                    },
                    select: {
                        type: 'boolean',
                        title: 'select box',
                        description: 'This is the select-description',
                    },
                },
            },
            string: {
                type: 'object',
                title: 'String field',
                properties: {
                    default: {
                        type: 'string',
                        title: 'text input (default)',
                    },
                    textarea: {
                        type: 'string',
                        title: 'textarea',
                    },
                    color: {
                        type: 'string',
                        title: 'color picker',
                        format: 'color',
                        default: '#151ce6',
                    },
                },
            },
            secret: {
                type: 'string',
                default: "I'm a hidden string.",
            },
            disabled: {
                type: 'string',
                title: 'A disabled field',
                default: 'I am disabled.',
            },
            readonly: {
                type: 'string',
                title: 'A readonly field',
                default: 'I am read-only.',
            },
            widgetOptions: {
                title: 'Custom widget with options',
                type: 'string',
                default: 'I am yellow',
            },
            selectWidgetOptions: {
                title: 'Custom select widget with options',
                type: 'string',
                enum: ['foo', 'bar'],
                enumNames: ['Foo', 'Bar'],
            },
        },
    },
    uiSchema: {
        boolean: {
            radio: {
                'ui:widget': 'RadioWidget',
            },
            select: {
                'ui:widget': 'SelectWidget',
            },
        },
        string: {
            textarea: {
                'ui:options': {
                    type: 'textarea',
                    rows: 6,
                    autosize: {
                        minRows: 2,
                        maxRows: 4
                    }
                },
            },
        },
        secret: {
            'ui:widget': 'HiddenWidget',
        },
        disabled: {
            'ui:disabled': true,
        },
        readonly: {
            'ui:readonly': true,
        },
        widgetOptions: {
            'ui:options': {
                style: {
                    boxShadow: '0 0 6px 2px yellow'
                },
                class: {
                    className: true
                }
            },
        },
        selectWidgetOptions: {
            'ui:options': {
                style: {
                    boxShadow: '0 0 6px 2px pink'
                }
            },
        },
    },
    formData: {
        stringFormats: {
            email: 'chuck@norris.net',
            uri: 'http://chucknorris.com/',
        },
        boolean: {
            default: true,
            radio: true,
            select: true,
        },
        string: {
            default: 'Hello...',
            textarea: '... World',
        },
        secret: "I'm a hidden string.",
    },
    errorSchema: {
        stringFormats: {
            email: {
                'err:required': '邮箱地址必须输入'
            }
        }
    }
};
