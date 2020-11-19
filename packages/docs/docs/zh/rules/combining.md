---
sidebarDepth: 2
---

# combining
>* 官方文档 - [JSON Schema combining](https://json-schema.org/understanding-json-schema/reference/combining.html)

包含如下几种类型：
* [allOf](#allof)
* [anyOf](#anyof)
* [oneOf](#oneof)
* [not](#not)

## allOf
### 描述
* 需要对所有的 `schema` 有效
* 官方文档 - [JSON Schema allOf](https://json-schema.org/understanding-json-schema/reference/combining.html#allof)

### 数据校验
* `allOf` 需要对所有的 `schema` 有效

> 在对 `schema` 数据处理的过程中会对 `allOf` 的每一项做深度合并操作，针对一些无法合并的 会直接放弃操作。
> ```js
> // 比如如下数据 永远都是 `false` 无法合并
> schema = {
>   "allOf": [
>     { "type": "string" },
>     { "type": "number" }
>  ]
> }
> ```

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
                    title: '演示：allOf',
                    type: 'object',
                    definitions: {
                        address: {
                            type: 'object',
                            properties: {
                                street_address: {
                                    title: '街道',
                                    type: 'string'
                                },
                                city: {
                                    title: '城市',
                                    type: 'string'
                                },
                                state: {
                                    title: '国家',
                                    type: 'string'
                                }
                            },
                            required: ['street_address', 'city', 'state']
                        }
                    },
                    properties: {
                        testAllOfRef: {
                            allOf: [
                                {
                                    $ref: '#/definitions/address'
                                },
                                {
                                    properties: {
                                        type: {
                                            type: 'string',
                                            title: '居住类型',
                                            enum: ['residential', 'business']
                                        }
                                    }
                                }
                            ],
                        }
                    }
                },
                uiSchema: {
                    testAllOfRef: {
                        type: {
                            'ui:widget': 'RadioWidget'
                        }
                    }
                },
                errorSchema: {
                    testAllOfRef: {
                        street_address: {
                            'err:required': '请输入街道地址...'
                        }
                    }}
            }
        }
   }
</script>
```
:::

## anyOf

### 描述
* 对任何一个 `schema` 有效即可，推荐在 `oneOf`  `anyOf` 都可以时使用 `anyOf`
* 官方文档 - [JSON Schema anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof)
* 使用了`oneOfSelect` `anyOfSelect` 配置下拉选项组件
* anyOf 内渲染object、array默认不显示 `title` 和 `description`，如果需要可以使用 `ui:showTitle: true`，`ui:description: true` 配置显示

### 数据校验
* 参考下面的使用案例

>* [Demo](https://form.lljj.me/#/demo?type=AnyOf%28联动%29)
>* [数据联动](/zh/guide/adv-config.html#数据联动)

### anyOfSelect、oneOfSelect
`anyOfSelect` 、`oneOfSelect` 用来配置 anyOf 或者 oneOf的下拉选项组件。

下拉选项名会使用对应anyOf选项内的title字段，但如果你设置了 `ui:enumOptions` 会直接使用该选项。

如下：

```js
const schema = {
    anyOfSelect: {
        'ui:widget': 'RadioWidget',
        'ui:title': '选择选项',
        'ui:options': {},
        'ui:enumOptions': [{
            label: '选项一',
            value: 0
        }, {
            label: '选项二',
            value: 1
        }]
    }
}
```

### anyOf 数据回填
在编辑页面时anyOf 当前选项是根据当前的formData来对每个anyOf的选项做校验，如果校验成功就返回匹配。

**如果使用相同的数据结构，为了保证正确匹配，可以使用 `const` 关键字来标记每个选项的值保证正确匹配当前结果**

如下：
```js
const schema = {
    type: 'object',
    title: '选项',
    required: [],
    anyOfSelect: {
        'ui:title': '渲染组件'
    },
    anyOf: [{
        title: 'el-switch',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    'ui:widget': {
                        title: '使用组件',
                        type: 'string',
                        default: 'el-switch',
                        const: 'el-switch',
                        'ui:hidden': true
                    },
                    other: {
                        title: '其它',
                        type: 'string'
                    }
                }
            }
        }
    }, {
        title: 'el-checkbox组件',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    'ui:widget': {
                        title: '使用组件',
                        type: 'string',
                        default: 'el-checkbox',
                        const: 'el-checkbox',
                        'ui:hidden': true
                    },
                    other: {
                        title: '其它',
                        type: 'string'
                    }
                }
            }
        }
    }]
}
```

### 特殊字段

#### const
* `const` 如果被包含在 `anyOf` 内，会默认被渲染为单选框，`const` 为单选框 value，`title` 为单选框 label。

如下演示：`schema` `ui-schema` `error-schema` 相关配置

:::demo 1、使用 anyOfSelect 配置下拉选项组件 <br> 2、anyOf同级的配置会作为公共配置传给当前选中的子schema
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
            <p><el-button @click="formRefFn().validate()" type="primary">校验数据</el-button></p>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: '演示：anyOf',
                    type: 'object',
                    properties: {
                        constVal: {
                            title: 'AnyOf const',
                            type: 'string',
                            anyOf: [
                                {
                                    title: 'schema option1',
                                    const: '111'
                                },
                                {
                                    const: '222'
                                }
                            ]
                        },
                        number: {
                            title: '基础类型anyOf',
                            anyOf: [
                                {
                                    title: '数字为 5 的倍数',
                                    type: 'integer',
                                    multipleOf: 5
                                },
                                {
                                    title: '数字为 3 的倍数',
                                    type: 'integer',
                                    multipleOf: 3
                                }
                            ]
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
                                            title: '名',
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
                    }
                },
                uiSchema: {
                    constVal: {
                        'ui:widget': 'RadioWidget',
                        anyOf: [
                            {},
                            {
                                'ui:title': 'ui-option2'
                            }
                        ]
                    },
                    number: {
                        anyOfSelect: {
                            'ui:widget': 'RadioWidget'
                        },
                        // 使用 anyOf 同级的配置会作为公共配置传给当前选中的子schema
                        'ui:widget': 'el-slider',
                        'ui:options': {
                            description: '通过公共配置设置anyOf每一个选项',
                        }
                    },
                    userInfo: {
                        // 使用 anyOfSelect 配置下拉选项组件
                        anyOfSelect: {
                            'ui:title': '选择配置用户类型',
                            // 'ui:widget': 'RadioWidget',
                            'ui:options': {
                                style: {
                                    width: '100%'
                                }
                            }
                        },
                        anyOf: [
                            {
                                firstName: {
                                    'ui:title': 'ui-schema - title 名'
                                }
                            },
                            {
                                idCode: {
                                    'ui:title': 'ui-schema - title ID'
                                }
                            }
                        ]
                    }
                },
                errorSchema: {
                    userInfo: {
                        anyOf: [
                            {
                                firstName: {
                                    'err:required': '请输入firstName'
                                }
                            }
                        ]
                    }
                }
            }
        }
   }
</script>
```
:::

::: tip
* `anyOf` `oneOf` 使用了 `oneOfSelect` `anyOfSelect` 配置下拉选项，`schema` 配置了同名key会导致 `error-schema`，`ui-schema` 无法正常工作
* 当前 `anyOf` 选中的 `schema` 会和原有 `schema` 做浅合并， `Object.assign({}, this.schema, curSelectSchema)`
* `ui-schema`、`error-schema` 在anyOf同级的配置会作为公共配置传给当前选中的子`schema`
:::

## oneOf
### 描述
* 有且只能对一个 `schema` 有效
* 官方文档 - [JSON Schema oneOf](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof)

### 数据校验
这里和 `anyof` 使用方法一致，[查看anyof](#anyof)

## not
### 描述
* 对当前 `schema` 无效
* 官方文档 - [JSON Schema not](https://json-schema.org/understanding-json-schema/reference/combining.html#not)

### 数据校验
>1. 好像不支持 吧 ...
>1. 应该没啥应用场景 吧...
>1. 先不支持了 吧...
