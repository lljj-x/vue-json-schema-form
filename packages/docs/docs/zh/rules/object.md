# object

## 描述
>* type `object` 相关配置演示
>* 官方文档 - [JSON Schema object](https://json-schema.org/understanding-json-schema/reference/object.html)

## 数据校验
### `additionalProperties`
是否可以有其它属性。只支持配置配置 `false` ，其它不支持

### `required`
数组类型，包含需要必须的属性key

### `minProperties`
最小对象的属性数量

### `maxProperties`
最大对象的属性数量

### `dependencies`
支持配置属性依赖

::: warning
* `Dependencies` schema 依赖不支持
* `additionalProperties` 只支持配置 `false`
* `Pattern Properties` 不支持
:::

如下演示：

`schema` `ui-schema` `error-schema` 相关配置

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

## 其它配置

### ui:order
* 支持通过配置 `ui-schema` `ui:order` 对属性渲染顺序进行排序。
* 参见 [ui-schema order 配置](https://form.lljj.me/#/demo?type=Simple)

比如：
```js
// 支持 * 匹配其它值
uiSchema = {
    'ui:order': ['number', '*'],
    // 'ui:order': ['firstName', 'lastName'],
}
```

### ui:onlyShowIfDependent

`ui-schema` 配置 `onlyShowIfDependent: true` 可以隐藏没触发依赖的项，[参见这里](/zh/guide/data-linkage.html#object-dependencies-实现数据联动)
