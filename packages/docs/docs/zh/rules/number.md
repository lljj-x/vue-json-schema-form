# number/integer

## 描述
>* type `number` 相关配置演示
>* 官方文档 - [JSON Schema number](https://json-schema.org/understanding-json-schema/reference/numeric.html)


## 数据校验
### `integer`
整数类型

### `multipleOf`
基数，必须为基数的倍数

### `minimum`
最小值

### `maximum`
最大值


:::tip
* integer 需要使用 type 来设置

```js
{ type: 'integer' }
```

* `exclusiveMinimum` `exclusiveMinimum` 查看schema文档

* 会根据 `schema` 配置，传递如下 `props` 到 `Widget` 组件
```js
    const props = {};
    if (undefined !== schema.multipleOf) {
        // 组件计数器步长
        props.step = schema.multipleOf;
    }
    if (schema.minimum || schema.minimum === 0) {
        props.min = schema.minimum;
    }
    if (schema.maximum || schema.maximum === 0) {
        props.max = schema.maximum;
    }
```

* `enum` 配置和 `string` 类型一致，[查看enum](/zh/rules/string.html#enum)
:::

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
                    title: '演示：type number',
                    type: 'object',
                    required: [
                        'age'
                    ],
                    properties: {
                        age: {
                            type: 'integer',
                            title: '年龄',
                            minimum: 10,
                            maximum: 99,
                            default: 18
                        },
                        price: {
                            type: 'number',
                            description: '请输入价格，必须为 0.5 的倍数',
                            title: '价格',
                            multipleOf: 0.5,
                            default: 1,
                        },
                        numberEnum: {
                            type: 'number',
                            title: '数组枚举 (select)',
                            enum: [1, 2, 3],
                            enumNames: ['Select - 1', 'Select - 2', 'Select - 3']
                        }
                    }
                },
                uiSchema: {
                    age: {
                        'ui:widget': 'el-slider',
                        'ui:description': '年龄10 - 99内',
                        'ui:options': {
                            style: {
                                boxShadow: '0 0 3px 1px yellow',
                            }
                        }
                    }
                },
                errorSchema: {
                    age: {
                        'err:options': {
                            required: '请输入年龄 10 - 99'
                        }
                    }
                }
            }
        }
   }
</script>
```
:::

