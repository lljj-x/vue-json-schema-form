# 高级配置

## 数据联动
* 数据联动的实现需要遵循 `json schema` [anyOf](https://form.lljj.me/#/demo?type=AnyOf) [oneOf](https://form.lljj.me/#/demo?type=OneOf) 格式来实现
* 详细 AnyOf、oneOf 配置请 [点击查看](/zh/rules/combining.html)

如下演示：
:::tip
点击 `保存` 按钮查看 `formData` 数据
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
                title: '人员信息',
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
                                        title: '名字',
                                        default: 'Jun'
                                    },
                                    lastName: {
                                        type: 'string',
                                        title: '姓',
                                        default: 'Liu'
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
                            minItems: 1,
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
                                                default: 'Vjsf'
                                            },
                                            description: {
                                                type: 'string',
                                                title: '项目表述',
                                                default: '基于json schema 快速生成form表单'
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
默认在用户输入时如果清空了表单的数据为空时，即空字符串 `''`，会默认设置值为 `undefined`，这样是为了保证和json schema 规范保持一致。

可以通过配置 `uiSchema` `ui:emptyValue` 的值来重置空数据默认值。

如下： 试试清空 `firstName` `lastName` 输入框的值

>* 提示：`JSON.stringify` 转字符串时默认会丢弃 `undefined` 的值，所以清空时没有`firstName`

:::demo ui:emptyValue 设置和不设置的区别
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: 'ui:emptyValue 设置默认空值',
                    type: 'object',
                    required: ['firstName', 'lastName'],
                    properties: {
                        firstName: {
                            title: 'First Name',
                            type: 'string',
                            default: 'Jun'
                        },
                        lastName: {
                            title: 'Last Name',
                            type: 'string',
                            default: 'Liu'
                        }
                    },
                },
                uiSchema: {
                    lastName: {
                        'ui:emptyValue': ''
                    }
                }
            }
        }
   }
</script>
```
:::

* 参考
1. [Json schema object required](/zh/guide/faq.html#json-schema-object-required)
1. [uiSchema 配置](/zh/guide/basic-config.html#uischema)


## 自定义样式

### 重置form表单默认样式
针对整个form默认样式，审查元素通过css覆盖即可，根css类名 `genFromComponent`

### 重置表单widget组件样式
如果是对 widget 组件的样式设置，可以通过 `uiSchema` 配置 `style`、`class` 来重置你的样式

查看详细 [uiSchema重置表单widget样式](/zh/guide/basic-config.html#如：重置表单widget样式)

### 根据当前表单渲染的节点类名重置样式
在渲染form表单时会根据schema的数据结构对每个节点生成唯一的 path 路径，并标记在class中，可通过该class类名来重置某个局部样式。

## 自定义 field

## 自定义 widget

