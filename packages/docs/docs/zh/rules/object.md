# object

## 描述
>* type `object` 相关配置演示
>* 官方文档 - [json schema object](https://json-schema.org/understanding-json-schema/reference/object.html)

## 数据校验
* `additionalProperties` 是否可以有其它属性。默认允许，只支持配置配置 `false` 不允许，object 不支持
* `required` 数组，包含需要必须的属性key
* `minProperties` 最小对象的属性数量
* `maxProperties` 最大对象的属性数量

::: warning
* `Dependencies` 依赖相关的属性依赖，schema 依赖都不支持
* `additionalProperties` 不支持配置 `object`
* `Pattern Properties` 不支持
:::

如下演示：

`schema` `uiSchema` `errorSchema` 相关配置

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData, formRefFn}">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
            <p><el-button @click="formRefFn().validate()" type="primary">校验数据</el-button></p>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {
                    orderInfo: {
                        a: '11'
                    }
                },
                schema: {
                    id: 'objectSchema',
                    title: '演示：type object',
                    type: 'object',
                    properties: {
                        userInfo: {
                            type: 'object',
                            title: '用户信息',
                            description: '显示用户个人资料',
                            required: ['firstName'],
                            properties: {
                                firstName: {
                                    type: 'string',
                                    title: '名字',
                                    default: 'Jun'
                                },
                                lastName: {
                                    type: 'string',
                                    title: '名字'
                                }
                            }
                        },
                        orderInfo: {
                            type: 'object',
                            title: '订单信息',
                            description: '显示用户订单数据',
                            additionalProperties: false,
                            properties: {
                                orderId: {
                                    type: 'string',
                                    title: '订单Id',
                                    default: '12312311123123'
                                }
                            }
                        }
                    }
                },
                errorSchema: {
                    orderInfo: {
                        'err:additionalProperties': '订单信息不能包含额外的属性'
                    }
                }
            }
        }
   }
</script>

<style>
.genFromComponent_objectSchemaForm .__pathRoot_orderInfo .validateWidget-object .formItemErrorBox{
    margin-top: -15px;
}
</style>
```
:::
