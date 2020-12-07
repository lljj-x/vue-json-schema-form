---
sidebarDepth: 2
---

# 高级配置

## 隐藏表单元素
隐藏表单元素可以通过 `ui:widget` 和 `ui:hidden` 两种方式来实现。

例如查看：[hidden隐藏表单项在线演示](https://form.lljj.me/#/demo?type=hidden%28%E9%9A%90%E8%97%8F%E8%A1%A8%E5%8D%95%E9%A1%B9%29)

```js
uiSchema = {
    hidden: {
        // 如下两种方式都可以
        'ui:widget': 'HiddenWidget',
        'ui:hidden': true,
    }
};
```


## 树形结构
* 树形结构需要使用 `$ref` 来递归调用自己
* 详细 `$ref` 配置请 [点击查看](https://json-schema.org/understanding-json-schema/structuring.html?highlight=definitions#reuse)

:::warning
* $ref 不支持跨文件调用
:::

如下demo：

:::demo 无限递归调用
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                schema: {
                    title: 'Refer 和 Refer递归调用',
                    definitions: {
                        node: {
                            type: 'object',
                            properties: {
                                name: { title: '输入当前节点名', type: 'string' },
                                children: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/definitions/node',
                                    },
                                },
                            },
                        },
                    },
                    type: 'object',
                    properties: {
                        tree: {
                            $ref: '#/definitions/node',
                        },
                    },
                },
                uiSchema: {
                    tree: {
                        name: {
                            'ui:description': 'ui-schema配置描述信息，不支持递归'
                        }
                    }

                },
                formData: {
                    tree: {
                        name: 'root',
                        children: [{ name: 'leaf' }],
                    }
                }
            }
        }
   }
</script>
```
:::

## 空数据默认值
默认在用户输入时如果清空了表单的数据，即空字符串 `''`，会默认设置值为 `undefined`，这样是为了保证和JSON Schema 规范保持一致。

可以通过配置 `ui-schema` `ui:emptyValue` 的值来重置空数据默认值。

如下： 试试清空 `firstName` `lastName` 输入框的值

>* 提示：`JSON.stringify` 转字符串时会丢弃 `undefined` 的值，所以如下 Demo 清空时没有`firstName`

:::demo ui:emptyValue 设置和不设置的区别
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    title: 'ui:emptyValue 设置默认空值',
                    type: 'object',
                    required: ['firstName', 'lastName'],
                    properties: {
                        firstName: {
                            title: 'First Name',
                            type: 'string',
                            default: 'Jun'
                        },
                        lastName: {
                            title: 'Last Name',
                            type: 'string',
                            default: 'Liu'
                        }
                    },
                },
                uiSchema: {
                    lastName: {
                        'ui:emptyValue': ''
                    }
                }
            }
        }
   }
</script>
```
:::

* 关联
1. [JSON Schema object required](/zh/guide/faq.html#json-schema-object-required)
1. [ui-schema 配置](/zh/guide/basic-config.html#ui-schema)


## 自定义样式

### 重置form表单默认样式
针对整个form默认样式，审查元素查看class名，通过css覆盖即可，根css类名 `genFromComponent`

### 重置表单widget组件样式
如果是对 widget 组件的样式设置，可以通过 `ui-schema` 配置 `style`、`class`、`attrs` 来重置你的样式

查看详细 [ui-schema重置表单widget样式](/zh/guide/basic-config.html#ui-schema配置演示-重置表单widget样式)

### 重置表单field组件样式
如果是对 field 组件的样式设置，可以通过 `ui-schema` 配置 `fieldStyle`、`fieldClass`、`fieldAttrs` 来重置每个节点

> 使用形式如上...

### 节点类名重置样式
在渲染form表单时会根据schema的数据结构对每个 `field` 渲染节点生成唯一的 `path` 路径，并标记在class属性中，可通过该class选择器来重置某个局部样式。

如：
![class pathName](/pathName.png)

::: tip
所有标记为路径的css类名，统一为 `__path` 前缀，其中 `anyOf`，`oneOf` 同一个path 路径会存在多处渲染，可能会存在重复 path className
:::

## 自定义Widget
自定义Widget通过配置 `ui:widget` 字段，不支持直接配置在 `type: object` 中

> `0.3` 以上版本支持在 `type: array` 中直接配置 `ui:widget`，如：[配置多文件上传](https://form.lljj.me/#/demo?type=Upload)

* 类型：`String` | `Object` | `Function`  (参见 [$createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) 第一个参数)
* 使用场景：需要自定义输入组件，比如结合业务的`图片上传` `商品选择` 等等

::: warning
* 自定义的 `Widget` 组件必须接受一个双向绑定 `v-model` 的值
:::

:::demo async function 重置，在实际项目中，实际只需要 `() => import('./xxx.vue')`;
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: '自定义Widget',
                    type: 'object',
                    required: ['inputText', 'numberEnumRadio'],
                    properties: {
                        inputText: {
                            title: '通过async function重置为span标签',
                            type: 'string',
                            default: String(new Date())
                        },
                        numberEnumRadio: {
                            type: 'number',
                            title: '通过组件名(重置为 Radio 渲染)',
                            enum: [1, 2, 3],
                            enumNames: ['Radio - 1', 'Radio - 2', 'Radio - 3']
                        }
                    }
                },
                uiSchema: {
                    numberEnumRadio: {
                        'ui:widget': 'RadioWidget'
                    },
                    inputText: {
                        'ui:widget': () => Promise.resolve({
                            name: 'TestAsyncWidget',
                            props: {
                                value: {
                                    type: null,
                                    default: ''
                                }
                            },
                            render(h) {
                                return h('div', {style: { padding: '4px', boxShadow: '0 0  4px 1px rgba(0,0,0,0.1)' }}, [
                                    h('button', {
                                        attrs: {type: 'button'},
                                        style: {marginRight: '6px'},
                                        on: {
                                            click: () => {
                                                this.$emit('input', String(new Date()))
                                            }
                                        }
                                    }, '点击更新时间'),
                                    h('span', this.value),
                                ]);
                            }
                        }),
                    }
                }
            }
        }
   }
</script>
```
:::


## 自定义Field
自定义field通过配置 `ui-schema` `ui:field` 字段，可以配置在任意需要自定义field的schema节点，参数格式和 [自定义Widget](#自定义widget) 一致

支持配置 [ui:fieldProps](/zh/guide/basic-config.html#ui-schema)，传给自定义field组件，需要在field组件props配置申明该参数

* 类型：`String` | `Object` | `Function` (参见 [$createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) 第一个参数)
* 使用场景：schema配置无法满足，或者想嵌入现用的组件

> 自定义Field 会直接接管后续节点的渲染，意味着自定义节点后渲染逻辑都可以根据使用者需要的场景自行处理，field组件内部一般会包含 `FormItem`，`校验规则`，`输入组件`

::: warning
使用者需要自行将值同步回 `formData`

可以直接修改 `rootFormData` 的属性值或者通过 `vueUtils` 提供的方法设置，可以参见后面自定义演示
:::

`Field组件` 会接受以下 `props`：

:::demo showCode: Props（点击下拉展开）
 ```js
{
    // 当前节点schema
    schema: {
         type: Object,
         default: () => ({})
     },

    // 当前节点Ui Schema
     uiSchema: {
         type: Object,
         default: () => ({})
     },

     // 当前节点Error Schema
     errorSchema: {
         type: Object,
         default: () => ({})
     },

     // 自定义校验规则
     customFormats: {
         type: Object,
         default: () => ({})
     },

     // 跟节点 Schema
     rootSchema: {
         type: Object,
         default: () => ({})
     },

     // 根节点数据
     rootFormData: {
         type: null,
         default: () => ({})
     },

     // 当前节点路径
     curNodePath: {
         type: String,
         default: ''
     },

     // 是否必填
     required: {
         type: Boolean,
         default: false
     }
}
```
:::

可以直接通过 `@lljj/vue-json-schema-form` 导入props配置，已经包含了上面的参数
```js
import { fieldProps } from  '@lljj/vue-json-schema-form';
```

### Demo - 图片链接配置

* Demo中 `ui:field` 组件内继续使用schema的配置来做 `视图的展示` 和 `数据校验`，并且使用内置方法同步 `formData` 的值
* [查看field组件源码](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/LinkImgField.vue)

>* 这里的图片选择只是随机选择，实际的项目场景中可能是基于相册的选择或上传等...
>* 如下Demo省去了导入组件并注册的代码

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    id: 'MultipleImgLink',
                        type: 'object',
                        definitions: {
                            ImgItem: {
                                type: 'object',
                                properties: {
                                    imgUrl: {
                                        title: '图片文件地址',
                                        type: 'string',
                                        format: 'uri'
                                    },
                                    imgLink: {
                                        title: '图片链接地址',
                                        type: 'string',
                                        format: 'uri'
                                    }
                                },
                                required: [
                                    'imgUrl',
                                    'imgLink'
                                ]
                            }
                        },
                        properties: {
                            imgItem1: {
                                $ref: '#/definitions/ImgItem'
                            },
                            imgItem2: {
                                $ref: '#/definitions/ImgItem'
                            }
                        }
                },
                uiSchema: {
                    imgItem1: {
                        'ui:title': '图片1（配置ui:field）',

                        // LinkImgField 源码 https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/LinkImgField.vue
                        'ui:field': 'LinkImgField'
                    },
                    imgItem2: {
                        'ui:title': '图片2（不配置ui:field）',
                    }
                }
            }
        }
   }
</script>
:::

### Demo - 联级选择

* Demo中 `ui:field` 使用现有省市区联级组件嵌入，不使用schema配置和方法
* [查看field组件源码](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/DistpickerField.vue)

>* 使用省市区联动组件
>* 配置了 `ui:fieldProps` 透传参数给组件 placeholders 参数
>* 如下Demo省去了导入组件并注册的代码

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    id: 'DistpickerTest',
                    title: '地址填写',
                    type: 'object',
                    definitions: {
                        item: {
                            title: '名称/编码',
                            type: 'string'
                        },
                        address: {
                            default: {
                                province: 440000,
                                city: "广州市",
                                area: "海珠区"
                            },
                            type: 'object',
                            properties: {
                                province: {
                                    title: '省份',
                                    $ref: '#/definitions/item'
                                },
                                city: {
                                    title: '城市',
                                    $ref: '#/definitions/item'
                                },
                                area: {
                                    title: '区县',
                                    $ref: '#/definitions/item'
                                }
                            }
                        }
                    },
                    required: ['name'],
                    properties: {
                        name: {
                            title: '收件人',
                            type: 'string',
                            default: 'HH'
                        },
                        address1: {
                            $ref: '#/definitions/address'
                        },
                        address3: {
                            $ref: '#/definitions/address'
                        }
                    }
                },
                uiSchema: {
                    name: {
                        'ui:options': {
                            placeholder: '请输入收件人'
                        },
                        'err:options': {
                            required: '请输入收件人'
                        }
                    },
                    address1: {
                        'ui:field': 'DistpickerField',
                        'ui:fieldProps': {
                            placeholders: {
                                  province: '------- 省 --------',
                                  city: '--- 市 ---',
                                  area: '--- 区 ---',
                              }
                        },
                    },
                    address3: {
                        'ui:title': '不使用ui:field',
                    }
                }
            }
        }
   }
</script>
:::
