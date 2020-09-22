# boolean
## 描述
>* type `boolean` 相关配置演示
>* 官方文档 - [JSON Schema boolean](https://json-schema.org/understanding-json-schema/reference/boolean.html)

## 数据校验
* `boolean` 类型 `true` 和 `false`

如下演示：`schema` `ui-schema` `error-schema` 相关配置

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
                    title: '演示：type boolean',
                    type: 'object',
                    properties: {
                        switch: {
                            type: 'boolean',
                            title: '开还是关'
                        }
                    }
                },
                uiSchema: {
                    switch: {
                        'ui:options': {
                            activeText: '开',
                            inactiveText: '关'
                        }
                    }
                },
                errorSchema: {}
            }
        }
   }
</script>
```
:::


