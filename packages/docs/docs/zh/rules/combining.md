---
sidebarDepth: 2
---

# combining
>* 官方文档 - [json schema combining](https://json-schema.org/understanding-json-schema/reference/combining.html)

包含如下几种类型：
* [allOf](#allof)
* [anyOf](#anyof)
* [oneOf](#oneof)
* [not](#not)

## allOf
### 描述
* 需要对所有的 `schema` 有效
* 官方文档 - [json schema allOf](https://json-schema.org/understanding-json-schema/reference/combining.html#allof)

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

如下演示：`schema` `uiSchema` `errorSchema` 相关配置

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
* 官方文档 - [json schema anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof)

### 数据校验
* 其它对schema的校验可查看这里：
>* [Demo](https://form.lljj.me/#/demo?type=AnyOf)
>* [数据联动](/zh/guide/adv-config.html#数据联动)

如下演示：`schema` `uiSchema` `errorSchema` 相关配置

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
                    userInfo: {
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
                                    'ui:title': 'uiSchema - title 名'
                                }
                            },
                            {
                                idCode: {
                                    'ui:title': 'uiSchema - title ID'
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
* `anyOf` `oneOf` 使用了`oneOfSelect` `anyOfSelect` 配置下拉选项，`schema` 配置了同名key会导致 `errorSchema`，`uiSchema` 无法正常工作
* 都会合并options的选项和上一级的配置
* 当前 `anyOf` `schema` 会原有 schema 做浅合并 `Object.assign`
* todo: 合并规则
:::

## oneOf
### 描述
* 有且只能对一个 `schema` 有效
* 官方文档 - [json schema oneOf](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof)

### 数据校验
这里和 `anyof` 使用方法一致，[查看anyof](#anyof)

## not
### 描述
* 对当前 `schema` 无效
* 官方文档 - [json schema not](https://json-schema.org/understanding-json-schema/reference/combining.html#not)

### 数据校验
>1. 好像不支持 吧 ...
>1. 应该没啥应用场景 吧...
>1. 先不支持了 吧...
