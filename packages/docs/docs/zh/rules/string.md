# string

## 描述
>* type `string` 相关配置演示
>* 官方文档 - [JSON Schema string](https://json-schema.org/understanding-json-schema/reference/string.html)

## 数据校验
> 可以使用minLength和maxLength关键字来限制字符串的长度
### `minLength`
最小长度

### `maxLength`
最大长度

### `pattern`
正则表达式

### `format`
常用类型校验，如 `uri` `email`，参见 `JSON Schema` 官方文档

## 特殊字段

### enum
* `enum` 默认会被渲染为单选下拉框，`enumNames` 会被渲染为下拉框的 label
* `ui:enumNames` 可以覆盖默认下拉框label

如下演示：

`schema` `ui-schema` `error-schema` 相关配置

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData }">
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
                    title: '演示：type string',
                    type: 'object',
                    required: [
                        'userName'
                    ],
                    properties: {
                        userName: {
                            type: 'string',
                            title: '用户名',
                            minLength: 2,
                            maxLength: 8,
                            default: 'Liu.Jun'
                        },
                        homePage: {
                            type: 'string',
                            description: '输入个人主页，主机名必须为 www.google.com',
                            title: '个人主页',
                            format: 'uri',
                            pattern: "^https?:\\/\\/www\\.google\\.com.*"
                        },
                        stringEnum: {
                            type: 'string',
                            title: '字符串枚举 (radio)',
                            enum: ['red', 'yellow', 'blue'],
                            enumNames: ['Color - 1', 'Color - 2', 'Color - 3']
                        }
                    }
                },
                uiSchema: {
                    userName: {
                        'ui:description': '必须输入2 - 8个字符串',
                        'ui:options': {
                            style: {
                                boxShadow: '0 0 3px 1px red',
                            }
                        }
                    },
                    stringEnum: {
                        'ui:widget': 'RadioWidget',
                        'ui:enumNames': ['UiColor - 1', 'UiColor - 2', 'UiColor - 3']
                    }
                },
                errorSchema: {
                    userName: {
                        'err:options': {
                            required: '请输入用户名'
                        }
                    },
                    homePage: {
                        'err:pattern': '请输入正确的主页地址 - 主机名必须为 www.google.com'
                    }
                }
            }
        }
   }
</script>
```
:::

