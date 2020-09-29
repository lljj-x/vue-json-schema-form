# array

## 描述
>* type `array` 相关配置演示
>* 官方文档 - [JSON Schema array](https://json-schema.org/understanding-json-schema/reference/array.html)

## 数据校验
### `items`
数组每一项的配置 ，可以是单个schema对象或者数组 schema 列表

### `additionalItems`
数组中除项目定义之外的有效项，items 配置单个schema时无意义

### `contains`
数组元素需要包含 如：{ "type": "number" }

### `minItems`
数组最小长度

### `maxItems`
数组最大长度

### `uniqueItems`
是否每一项唯一，默认 `false`

如下演示：`schema` `ui-schema` `error-schema` 相关配置

> 或者点击这里查看 [array demo页面](https://form.lljj.me/#/demo?type=Arrays)
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
                schema: {
                    definitions: {
                        Thing: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    title: 'Name',
                                    default: 'Default name',
                                },
                            },
                        },
                    },
                    type: 'object',
                    properties: {
                        listOfString: {
                            type: 'array',
                            title: 'A list with a minimal number of items',
                            minItems: 1,
                            maxItems: 3,
                            items: {
                                $ref: '#/definitions/Thing',
                            }
                        },
                        multipleChoicesList: {
                            type: 'array',
                            title: 'A multiple choices list',
                            items: {
                                type: 'string',
                                enum: ['foo', 'bar', 'fuzz', 'qux'],
                            },
                            uniqueItems: true,
                        },
                        fixedItemsList: {
                            type: 'array',
                            title: 'A list of fixed items (tuple)',
                            items: [
                                {
                                    title: 'A string value',
                                    type: 'string',
                                    default: 'lorem ipsum',
                                },
                                {
                                    title: 'a boolean value',
                                    type: 'boolean',
                                },
                                {
                                    title: 'a number value',
                                    type: 'number',
                                }
                            ],
                            additionalItems: {
                                title: 'Additional item',
                                type: 'number',
                            },
                        },
                        nestedList: {
                            type: 'array',
                            title: 'Nested list',
                            items: {
                                type: 'array',
                                title: 'Nested list - inner list',
                                items: {
                                    title: 'Name',
                                    type: 'string',
                                    default: 'lorem ipsum',
                                },
                            },
                        },
                        unorderable: {
                            title: 'Unorderable items',
                            type: 'array',
                            items: {
                                type: 'string',
                                default: 'lorem ipsum',
                            },
                        },
                        unremovable: {
                            title: 'Unremovable items',
                            type: 'array',
                            items: {
                                type: 'string',
                                default: 'lorem ipsum',
                            },
                        },
                        noToolbar: {
                            title: 'No add, remove and order buttons',
                            type: 'array',
                            items: {
                                type: 'string',
                                default: 'lorem ipsum',
                            },
                        },
                        fixedNoToolbar: {
                            title: 'Fixed array without buttons(Tuple)',
                            type: 'array',
                            items: [
                                {
                                    title: 'A number',
                                    type: 'number',
                                    default: 42,
                                },
                                {
                                    title: 'A boolean',
                                    type: 'boolean',
                                    default: false,
                                },
                            ],
                            additionalItems: {
                                title: 'A string',
                                type: 'string',
                                default: 'lorem ipsum',
                            },
                        },
                    },
                },
                uiSchema: {
                    listOfString: {
                        items: {
                            name: {
                                'ui:options': {
                                    placeholder: 'Please enter a name'
                                }
                            }
                        },
                    },
                    multipleChoicesList: {
                        'ui:widget': 'CheckboxesWidget',
                    },
                    fixedItemsList: {
                        items: [
                            {
                                'ui:options': {
                                    type: 'textarea'
                                }
                            },
                            {
                                'ui:options': {
                                    activeText: '开',
                                    inactiveText: '关'
                                }
                            },
                            {
                                'ui:options': {
                                    placeholder: 'Please enter'
                                }
                            }
                        ],
                        additionalItems: {
                            'ui:options': {
                                step: 10
                            }
                        }
                    },
                    unorderable: {
                        'ui:options': {
                            sortable: false,
                        },
                    },
                    unremovable: {
                        'ui:options': {
                            removable: false,
                        },
                    },
                    noToolbar: {
                        'ui:options': {
                            addable: false,
                            sortable: false,
                            removable: false,
                        },
                        items: {
                            'ui:options': {
                                title: '不显示操作条'
                            }
                        }
                    },
                    fixedNoToolbar: {
                        'ui:options': {
                            addable: false,
                            sortable: false,
                            removable: false,
                        },
                    },
                },
                errorSchema: {
                    nestedList: {
                        items: {
                            items: {
                                'err:required': '请输入Inner item name'
                            }
                        }
                    }
                },
                formData: {
                    multipleChoicesList: ['foo', 'bar'],
                    fixedItemsList: ['Some text', true],
                    nestedList: [['lorem', 'ipsum'], ['dolor']],
                    unorderable: ['one', 'two'],
                    unremovable: ['one', 'two'],
                    noToolbar: ['one', 'two'],
                    fixedNoToolbar: [42, true, 'additional item one', 'additional item two'],
                }
            }
        }
   }
</script>
```
:::

## 其它配置
* 支持通过配置 `ui-schema` 中的 `ui:addable`、`ui:sortable`、`ui:removable` 配置数组是否可添加/排序/移除
* 支持通过配置 `ui-schema` 中的 `ui:showIndexNumber` 配置是否显示数组item序号
* 参见 [ui-schema 配置](https://form.lljj.me/#/demo?type=Arrays)

如：
```js
uiSchema = {
    'ui:options': {
        addable: false,
        sortable: false,
        removable: false,
        showIndexNumber: true
    }
}
```
