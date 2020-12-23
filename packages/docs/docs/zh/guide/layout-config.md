# 布局配置

> 布局配置可以直接在 [Schema生成器](https://form.lljj.me/schema-generator.html#/index) 中体验，
> 表单配置 中设置 `布局`，或者设置单个元素的 `宽度`

支持 [layoutColumn](#layoutcolumn) 对整个表单的配置，或者 [ui:width](#ui-width) 对单个节点的配置，结合场景选择。

## layoutColumn
> `layoutColumn` 可以直接配置整个表单的多列布局。

页面表单支持配置展示为 1、2、3 列，在 [form-props](/zh/guide/basic-config.html#form-props) 参数中配置 `layoutColumn` 即可

如下：
```js
formProps: {
    layoutColumn: 2
}
```

## ui:width
> `ui:width` 可以对单个表单项支持配置宽度，能正常被css width 解析的参数都可以。

配置需要设置宽度的节点，在 [ui-schema](/zh/guide/basic-config.html#ui-schema) 中配置 `ui:width` 即可

```js
'ui:width': {
    width: '50%'
}
```

## 布局演示
演示渲染用户信息的表单，点击显示代码可查看源代码或者在codepen运行

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
        :formProps="{
            layoutColumn: 2
        }"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {},
            schema: {
                type: 'object',
                properties: {
                    obj1: {
                        title: 'Object1',
                        type: 'object',
                        description: '默认使用表单配置，两列布局',
                        required: [],
                        properties: {
                            input1: {
                                title: '输入框',
                                type: 'string',
                                'ui:options': {
                                    placeholder: '请输入'
                                }
                            },
                            input2: {
                                title: '输入框',
                                type: 'string',
                                'ui:options': {
                                    placeholder: '请输入'
                                }
                            }
                        },
                        'ui:order': [
                            'input1',
                            'input2'
                        ]
                    },
                    object2: {
                        title: 'Object2',
                        type: 'object',
                        description: '通过 ui:width 重置了表单项宽度',
                        required: [],
                        properties: {
                            boolean: {
                                title: '是否选择(Switch)',
                                type: 'boolean',
                                'ui:options': {
                                    width: '33.333%'
                                }
                            },
                            stringRadio: {
                                title: '单选(Radio)',
                                type: 'string',
                                'ui:widget': 'RadioWidget',
                                enum: [
                                    '1',
                                    '2',
                                    '3'
                                ],
                                enumNames: [
                                    '一',
                                    '二',
                                    '三'
                                ],
                                'ui:options': {
                                    width: '33.333%'
                                }
                            },
                            stringSelect: {
                                title: '单选(Select)',
                                type: 'string',
                                'ui:widget': 'SelectWidget',
                                enum: [
                                    '1',
                                    '2',
                                    '3'
                                ],
                                enumNames: [
                                    '一',
                                    '二',
                                    '三'
                                ],
                                'ui:options': {
                                    width: '33.333%'
                                }
                            }
                        },
                        'ui:order': [
                            'boolean',
                            'stringRadio',
                            'stringSelect'
                        ]
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:options': {
                        placeholder: '请输入你的签名',
                        type: 'textarea',
                        rows: 1
                    }
                }
            }
        };
    }
};
</script>
```
:::
