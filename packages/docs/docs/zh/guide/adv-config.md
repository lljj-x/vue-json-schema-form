# 高级

## 数据联动
* 数据联动的实现需要遵循 `json schema` [anyOf](https://form.lljj.me/#/demo?type=AnyOf) [oneOf](https://form.lljj.me/#/demo?type=OneOf) 格式来实现
* 详细 AnyOf、oneOf 配置请 [点击查看](/zh/rules/combining.html)

如下演示：
:::tip
点击 `保存` 按钮 查看 `formData` 数据
:::
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
        @on-submit="handleSubmit"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
            },
            schema: {
                type: 'object',
                properties: {
                    price: {
                        type: 'number',
                        title: '月薪资',
                        default: 99999.99
                    },
                    userInfo: {
                        title: '个人资料设置方式',
                        anyOf: [
                            {
                                title: '通过用户名设置',
                                required: ['firstName'],
                                properties: {
                                    firstName: {
                                        type: 'string',
                                        title: '姓',
                                        default: 'Liu'
                                    },
                                    lastName: {
                                        type: 'string',
                                        title: '名',
                                        default: 'Jun'
                                    }
                                }
                            },
                            {
                                title: '通过用户id设置',
                                properties: {
                                    idCode: {
                                        type: 'string',
                                        title: 'ID',
                                        default: '10086'
                                    }
                                }
                            }
                        ]
                    },
                },
                anyOf: [{
                    title: '设置更多信息',
                    properties: {
                        age: {
                            title: '年龄',
                            type: 'number',
                            anyOf: [
                                {
                                    const: 18
                                },
                                {
                                    const: 28
                                }
                            ]
                        },
                        url: {
                            title: '个人主页',
                            format: 'uri',
                            type: 'string',
                            default: 'https://lljj.me'
                        },
                        projects: {
                            title: '项目经验',
                            type: 'array',
                            items: {
                                type: 'object',
                                anyOf: [
                                    {
                                        title: '在线演示项目',
                                        properties: {
                                            url: {
                                                title: '输入项目地址',
                                                type: 'string',
                                                format: 'uri',
                                                default: 'https://www.demo.com'
                                            }
                                        }
                                    },
                                    {
                                        title: '文字表述项目',
                                        required: ['name'],
                                        properties: {
                                            name: {
                                                type: 'string',
                                                title: '项目名称',
                                            },
                                            description: {
                                                type: 'string',
                                                title: '项目表述',
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }, {
                    title: '不设置',
                    properties: {}
                }]
            },
            uiSchema: {
                userInfo: {
                    anyOfSelect: {
                       'ui:widget': 'RadioWidget'
                    },
                    anyOf: [
                        {
                            'ui:title': '使用用户名设置（uiSchema）', // 这里会覆盖schema 配置
                        },
                    ]
                },
                anyOfSelect: {
                    'ui:title': '是否需要更多信息',
                }
            },
            errorSchema: {
            }
        }
    },
    methods: {
        handleSubmit(formData) {
            this.$showJson({
                componentProps: {
                    jsonString: formData
                }
            });
        }
    }
}
</script>
```
:::


>* 推荐使用 `anyOf`，`oneOf` 只能有一个符合的结果
>* 后续版本会考虑通过ui配置的值支持函数来实现类似交互效果

## 空数据默认值

## 自定义样式

## 自定义 field

## 自定义 widget

