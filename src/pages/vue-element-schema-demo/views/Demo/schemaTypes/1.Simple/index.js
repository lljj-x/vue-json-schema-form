export default {
    schema: {
        title: '测试注册表单',
        description: 'A simple form example.',
        type: 'object',
        required: ['firstName', 'lastName'],
        properties: {
            firstName: {
                type: 'string',
                title: 'First name',
                default: 'Liu'
            },
            lastName: {
                type: 'string',
                title: 'Last name',
            },
            age: {
                type: 'integer',
                title: 'Age',
                maximum: 80,
                minimum: 16
            },
            bio: {
                type: 'string',
                title: 'Bio',
                minLength: 10
            },
            password: {
                type: 'string',
                title: 'Password',
                minLength: 3,
            },
            telephone: {
                type: 'string',
                title: 'Telephone',
                minLength: 10,
            },
        },
    },
    formData: {
        lastName: 'Jun',
        age: 88,
        bio: '知道的越多、就知道的越少',
        password: 'My.Pass',
        telephone: '18814466xx2'
    },
    uiSchema: {
        'ui:description': '简单表单例子（这里通过UiSchema覆盖了默认description描述配置）',
        firstName: {
            'ui:title': '姓',
            'ui:description': '比如：李白姓李、孙尚香姓孙、马可波罗姓马可波',
            'ui:options': {
                placeholder: '请输入你的姓',
                attrs: {
                    autofocus: true
                }
            }
        },
        bio: {
            'ui:options': {
                placeholder: '请输入你的签名',
                type: 'textarea',
                row: 1
            }
        }
    },
    errorSchema: {
        age: {
            minimum: '不要装嫩了 。。（测试自定义错误信息）',
            maximum: '张老头子，坏得很'
        },
        bio: {
        }
    }
};
