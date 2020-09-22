# null

## 描述
>* type `null` 相关配置演示
>* 官方文档 - [JSON Schema null](https://json-schema.org/understanding-json-schema/reference/null.html)

## 数据校验
* `null` 类型 固定值为 null，null field 不渲染，`formData` 值为 `null`

如下演示：`schema` `ui-schema` `error-schema` 相关配置

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
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
                    title: '演示：type boolean',
                    type: 'object',
                    properties: {
                        nullType: {
                            type: 'null'
                        }
                    }
                }
            }
        }
   }
</script>
```


