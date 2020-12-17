---
sidebarDepth: 2
---

# 数据联动
要实现数据联动可以有多种方法来实现，也支持一些不基于 `JSON Schema` 规范的ui配置来实现，**推荐优先使用基于JSON Schema规范的方案**。

遵循 `JSON Schema` 规范包含如下几种方式：
* [JSON Schema anyOf 配置](#anyof-实现数据联动)
* [object dependencies 实现联动](#object-dependencies-实现数据联动)
* [Todo: 通过 if else 实现联动](#if-else-实现联动)

通过UI配置的方式：
* [通过ui-schema配置表达式](#ui-schema配置表达式)
* [自定义ui:field 使用已有联级组件](#ui-field-调用自己的联级组件)
* [ui-schema 动态样式](#ui-schema-动态样式)

:::warning
在使用通过UI配置的方式时，可能打破 `JSON Schema` 规范，所以在使用时需要注意避免和 `JSON Schema` 描述的数据结构冲突。
> 比如：配置了 `required`, 但ui-schema又配置了 `ui:hidden: true`，必须输入又不显示 ....

如果冲突因为生成的表单中会只校验显示的元素所以不会存在问题，但即使是表单通过了校验，数据结构也已经不在符合了，所以一定要避免....
:::

## anyOf 实现数据联动
基于 [JSON Schema anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof) 规范，[详细anyOf配置可参考这里](/zh/rules/combining.html#anyof)，**适用于根据类型选择然后使用不同的数据结构或ui样式**。

比如：设置个人资料可以通过 `firstName` + `lastName` 或者 通过 `userId` 两种方式来设置。如下演示：（点击 `保存` 按钮查看 `formData` 数据），也可以查看 [其它anyOf在线演示](https://form.lljj.me/#/demo?type=AnyOf%28联动%29)

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
        @on-submit="handleSubmit"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
            },
            schema: {
                title: '人员信息',
                type: 'object',
                properties: {
                    price: {
                        type: 'number',
                        title: '月薪资',
                        default: 99999.99
                    },
                    userInfo: {
                        title: '个人资料设置方式',
                        anyOf: [
                            {
                                title: '通过用户名设置',
                                required: ['firstName'],
                                properties: {
                                    type: {
                                        'ui:widget': 'HiddenWidget',
                                        title: '类型',
                                        type: 'string',
                                        default: 'userInfo'
                                    },
                                    firstName: {
                                        type: 'string',
                                        title: '名字',
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
                                    type: {
                                        'ui:widget': 'HiddenWidget',
                                        title: '类型',
                                        type: 'string',
                                        default: 'userId'
                                    },
                                    idCode: {
                                        type: 'string',
                                        title: 'ID',
                                        default: '10086'
                                    }
                                }
                            }
                        ]
                    },
                },
                anyOf: [{
                    title: '设置更多信息',
                    properties: {
                        age: {
                            title: '年龄',
                            type: 'number',
                            anyOf: [
                                {
                                    const: 18
                                },
                                {
                                    const: 28
                                }
                            ]
                        },
                        url: {
                            title: '个人主页',
                            format: 'uri',
                            type: 'string',
                            default: 'https://lljj.me'
                        },
                        projects: {
                            title: '项目经验',
                            type: 'array',
                            minItems: 1,
                            items: {
                                type: 'object',
                                anyOf: [
                                    {
                                        title: '在线演示项目',
                                        properties: {
                                            url: {
                                                title: '输入项目地址',
                                                type: 'string',
                                                format: 'uri',
                                                default: 'https://www.demo.com'
                                            }
                                        }
                                    },
                                    {
                                        title: '文字表述项目',
                                        required: ['name'],
                                        properties: {
                                            name: {
                                                type: 'string',
                                                title: '项目名称',
                                                default: 'Vjsf'
                                            },
                                            description: {
                                                type: 'string',
                                                title: '项目表述',
                                                default: '基于JSON Schema 快速生成form表单'
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }, {
                    title: '不设置',
                    properties: {}
                }]
            },
            uiSchema: {
                userInfo: {
                    anyOfSelect: {
                       'ui:widget': 'RadioWidget'
                    },
                    anyOf: [
                        {
                            'ui:title': '使用用户名设置（ui-schema）', // 这里会覆盖schema 配置
                        },
                    ]
                },
                anyOfSelect: {
                    'ui:title': '是否需要更多信息',
                }
            },
            errorSchema: {
            }
        }
    },
    methods: {
        handleSubmit(formData) {
            this.$showJson({
                componentProps: {
                    jsonString: formData
                }
            });
        }
    }
}
</script>
```
:::

>* 推荐使用 `anyOf`，`oneOf` 只能有一个符合的结果

## object dependencies 实现数据联动

基于 [JSON Schema Object dependencies](https://json-schema.org/understanding-json-schema/reference/object.html#property-dependencies) 规范，**适用于根据需要根据值是否为空（undefined）来做联动设置**，*目前只支持 property dependencies*。

支持 `ui-schema` 配置 `onlyShowIfDependent: true` 隐藏没触发依赖的项

比如：填写了 `信用卡号` 就必须填写 `账单地址`。如下演示，也可以查看 [Object-property-dependencies在线演示](https://form.lljj.me/#/demo?type=Object-property-dependencies%28联动%29)

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="$showJson({
             componentProps: {
                 jsonString: formData
             }
         })"
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
                title: 'Object property dependencies',
                type: 'object',
                properties: {
                    unidirectional: {
                        title: '单向依赖',
                        description: '最基本的属性单向依赖，ui-schema 配置 onlyShowIfDependent 只在被依赖时才显示',
                        type: 'object',
                        'ui:options': {
                            onlyShowIfDependent: true
                        },
                        properties: {
                            name: {
                                title: 'Name',
                                type: 'string'
                            },
                            credit_card: {
                                title: 'Credit card',
                                type: 'string'
                            },
                            billing_address: {
                                title: 'Billing address',
                                type: 'string'
                            }
                        },
                        required: [
                            'name'
                        ],
                        dependencies: {
                            credit_card: [
                                'billing_address'
                            ]
                        }
                    },
                    bidirectional: {
                        title: '双向依赖',
                        description: '显式地定义双向依赖，如果配置 onlyShowIfDependent 会导致初始化没有值时都无法渲染，这里需要使用者自行考虑',
                        type: 'object',
                        properties: {
                            name: {
                                title: 'Name',
                                type: 'string'
                            },
                            credit_card: {
                                title: 'Credit card',
                                type: 'string'
                            },
                            billing_address: {
                                title: 'Billing address',
                                type: 'string'
                            }
                        },
                        required: [
                            'name'
                        ],
                        dependencies: {
                            credit_card: [
                                'billing_address'
                            ],
                            billing_address: [
                                'credit_card'
                            ]
                        }
                    }
                }
            },
        }
    }
}
</script>
```
:::

## if else 实现联动
> *暂不支持*

基于 [JSON Schema if then else](https://json-schema.org/understanding-json-schema/reference/conditionals.html)，**适用于根据值等于一个常量时来做联动**，*目前版本不支持该特性*。

就目前来看 if else 比较容易解决数据联动的场景，可以根据值来做判断，但依旧不能解决对值支持逻辑判断，比如`大于`、`小于`，后续版本会考虑支持该特性。

## ui-schema配置表达式
可能打破 `JSON Schema` 规范，配置思想来源 [ali form-render](https://github.com/alibaba/form-render)，通过对ui-schema `ui:hidden` 配置表达式。

**ui:hidden实际不仅仅只支持表达式，详细的包含如下三种格式：**

### ui:hidden mustache 表达式
mustache 表达式可使用 `parentFormData`、`rootFormData` 两个内置变量。

* `parentFormData` 当前节点父级的 FormData值
* `rootFormData` 根节点的 FormData值

> 配置表达式会通过 `new Function` return 出结果，所以实际你在表达式中也可以访问到全局变量。

这样的配置都是可以的：
```js
uiSchema = {
    user: {
        'ui:hidden': `{{ parentFormData.attr !== 'league' && rootFormData.case1.showMore === false }}`,
    }
}
```

比如：需要根据某个值做逻辑判断来显示隐藏，也可以查看 [uiSchema ui:hidden(联动)在线演示](https://form.lljj.me/#/demo?type=uiSchema-ui-hidden%28联动%29)
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="$showJson({
             componentProps: {
                 jsonString: formData
             }
         })"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
                case3: {
                  ruleList: [
                      {
                          attr: 'league',
                          relation: '>',
                          league: 'b'
                      }
                  ]
                }
            },
            schema: {
                title: '使用ui-schema配置ui:hidden表达式',
                type: 'object',
                properties: {
                    case1: {
                        title: '整体隐藏',
                        type: 'object',
                        properties: {
                            showMore: {
                                title: '显示更多',
                                type: 'boolean',
                                default: false
                            },
                            x1: {
                                title: '输入框1',
                                type: 'string',
                                'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                            },
                            x2: {
                                title: '输入框2',
                                type: 'string',
                                'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                            }
                        }
                    },
                    case3: {
                        title: '列表/显示不同组件',
                        type: 'object',
                        properties: {
                            ruleList: {
                                title: '球员筛选',
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        attr: {
                                            title: '标准',
                                            type: 'string',
                                            enum: [
                                                'goal',
                                                'league'
                                            ],
                                            enumNames: [
                                                '入球数',
                                                '所在联盟'
                                            ],
                                            'ui:width': '40%'
                                        },
                                        relation: {
                                            title: '-',
                                            type: 'string',
                                            enum: [
                                                '>',
                                                '<',
                                                '='
                                            ],
                                            'ui:hidden': "{{parentFormData.attr === 'league'}}",
                                            'ui:width': '20%'
                                        },
                                        goal: {
                                            title: '入球数',
                                            type: 'string',
                                            pattern: '^[0-9]+$',
                                            message: {
                                                pattern: '输入正确得分'
                                            },
                                            'ui:hidden': "{{parentFormData.attr !== 'goal'}}",
                                            'ui:width': '40%'
                                        },
                                        league: {
                                            title: '名称',
                                            type: 'string',
                                            enum: [
                                                'a',
                                                'b',
                                                'c'
                                            ],
                                            enumNames: [
                                                '西甲',
                                                '英超',
                                                '中超'
                                            ],
                                            'ui:hidden': "{{parentFormData.attr !== 'league'}}",
                                            'ui:width': '40%'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>
```
:::

### ui:hidden function
function 和表达式类似，只是函数会更加灵活，函数接受 `parentFormData`、`rootFormData` 两个参数。

* `parentFormData` 当前节点父级的 FormData值
* `rootFormData` 根节点的 FormData值

如下配置：
```js
uiSchema = {
    user: {
        'ui:hidden': (parentFormData, rootFormData) => {
            return ...;
        },
    }
}
```


### ui:hidden 普通类型
* 普通类型，比如 `true` `false` 都会被转 `Boolean` 类型

## ui:field 调用自己的联级组件
可能打破 `JSON Schema` 规范，**适用于通过配置一个已有的自定义组件来渲染一些复杂的联动场景**

比如： [ui:field 使用已有省市区联级组件](/zh/guide/adv-config.html#demo-联级选择)

## ui-schema  动态样式
可能打破 `JSON Schema` 规范。`ui-schema` 和 `formData` 本身都是响应式数据，所以完全可以通过计算属性返回 ui-schema，配置 `ui:widget:HiddenWidget` 、`ui:field: null` 、 `ui:fieldStyle` 等都可以实现样式联动。

这个方法可以说是目前的下下策，会使得 `ui-schema` 配置存在大量的条件判断。
