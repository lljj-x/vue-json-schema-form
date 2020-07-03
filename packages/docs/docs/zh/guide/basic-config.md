# 基本配置

## 参数 Props

### schema `required`
用于描述表单数据json schema - `object`，
遵循 [json Schema](https://json-schema.org/understanding-json-schema/index.html) 规范

* [点击这里深入了解 schema 配置](/zh/guide/adv-config.html#schema)

**例: 配置用户信息表单**
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
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
                title: 'UserInfo 表单',
                description: 'A simple form example.',
                type: 'object',
                required: [
                    'firstName',
                    'lastName'
                ],
                properties: {
                    firstName: {
                        type: 'string',
                        title: 'First name',
                        default: 'Liu'
                    },
                    lastName: {
                        type: 'string',
                        title: 'Last name'
                    },
                    age: {
                        type: 'integer',
                        title: 'Age',
                        maximum: 80,
                        minimum: 16
                    },
                    bio: {
                        type: 'string',
                        title: 'Bio',
                        minLength: 10
                    },
                    password: {
                        type: 'string',
                        title: 'Password',
                        minLength: 3
                    },
                    telephone: {
                        type: 'string',
                        title: 'Telephone',
                        minLength: 10
                    }
                }
            }
        };
    }
};
</script>
```
:::

### uiSchema
用于配置表单展示样式 - `object`，普通json数据，非`json schema`规范
* [点击这里深入了解 uiSchema 配置](/zh/guide/adv-config.html#配置ui-uischema)

::: tip
 * 配置数据结构和schema保持一致，所有的ui配置属性 `ui:` 开头
 * 也可以在 `ui:options` 内的配置所有的属性，不需要 `ui:` 开头
 * 如果配置了`ui:xx` 和 `ui:options` 内配置了`xx`属性，`ui:options`内的优先级更高，实际上你可以把所有的参数都配置在 `ui:options` 内；这里可以按照个人习惯，推荐使用如下参数格式
 * 注：uiSchema 为普通json数据，并非json schema规范语法
 :::

参数格式如下：
```js
uiSchema = {
    'ui:title': '覆盖schema title', // 覆盖schema title
    'ui:description': '覆盖schema description描述信息',  // 覆盖schema description
    'ui:emptyValue': undefined,   // 表单元素输入为空时的值，默认 undefind
    'ui:widget': 'el-slider', // 配置input组件，支持字符串或者传入一个vue组件
    'ui:labelWidth': '50px', // form item label宽度
    'ui:options': {
            attrs: {
                // 通过 vue render函数 attrs 传递给 widget 组件
                autofocus: true
            },
            style: {
                // 通过 vue render函数 style 传递给 widget 组件
                boxShadow: '0 0 6px 2px #2b9939'
            },
            class: {
                // 通过 vue render函数 class 传递给 widget 组件
                className_hei: true
            },

            // 其它参数会 通过 props 传递给 widget 组件
            type: 'textarea',
            rows: '6',
            placeholder: '请输入你的内容'
    }
}
```

**例：重置表单样式**
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
                number: 1,
                numberEnumRadio: 2,
                integerRange: 50,
            },
            schema: {
                type: 'object',
                properties: {
                    inputText: {
                        title: 'Input Text',
                        type: 'string'
                    },
                    number: {
                        title: 'Number (默认渲染组件)',
                        type: 'number'
                    },
                    integerRange: {
                        title: 'Integer range (使用 ElSlider)',
                        type: 'integer',
                        minimum: 42,
                        maximum: 100
                    }
                }
            },
            uiSchema: {
                'ui:order': ['number', '*'],
                inputText: {
                    'ui:description': '这里重置了描述信息',
                    'ui:emptyValue': '',
                    'ui:options': {
                        attrs: {
                            'autofocus': true
                        },
                        style: {
                            boxShadow: '0 0 6px 2px #2b9939'
                        },
                        class: {
                            className_hei: true
                        },
                        type: 'textarea',
                        rows: '6',
                        placeholder: '请输入你的内容'
                    }
                },
                number: {
                    'ui:title': '这里重置了标题'
                },
                integerRange: {
                    'ui:widget': 'el-slider',
                }
            }
        }
    }
};
</script>
```
:::

### errorSchema
用于配置表单校验错误文案信息 - `object`，普通json数据，非json schema规范
* [点击这里深入了解 errSchema 配置](/zh/guide/adv-config.html#配置校验错误文案-errschema)

数据配置和 `uiSchema` 保存一致，使用 `err:` 做前缀
::: tip
 * 配置数据结构和schema保持一致，所有的ui配置属性 `err:` 开头
 * 也可以在 `err:options` 内的配置所有的属性，不需要 `err:` 开头
 * 如果配置了`err:xx` 和 `err:options` 内配置了`xx`属性，`err:options`内优先级更高，实际上你可以把所有的参数都配置在 `err:options` 内；这里可以按照个人习惯，推荐使用如下参数格式
 * 注：errSchema 为标准json数据，并非json schema规范语法
 :::

> 例：重置表单错误信息

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :error-schema="errorSchema"
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
                type: 'object',
                required: [
                    'userName',
                    'homePage',
                    'bio'
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '用户名',
                        default: 'Liu.Jun'
                    },
                    homePage: {
                        type: 'string',
                        format: 'uri',
                        title: '个人主页'
                    },
                    bio: {
                        type: 'string',
                        title: '签名',
                        minLength: 10
                    },
                    listOfStrings: {
                        type: 'array',
                        title: 'A list of strings',
                        description: '最少包含两个item',
                        uniqueItems: true,
                        minItems: 2,
                        items: {
                            type: 'string',
                            default: 'bazinga'
                        }
                    },
                    fixedItemsList: {
                        type: 'array',
                        title: 'A list of fixed items',
                        items: [
                            {
                                title: 'A string value',
                                type: 'string',
                                maxLength: 2
                            }
                        ]
                    }
                }
            },
            errorSchema: {
                userName: {
                    'err:options': {
                        required: '请输入用户名'
                    }
                },
                bio: {
                    'err:minLength': '签名最小长度10个字符串'
                },
                listOfStrings: {
                    'err:uniqueItems': '不能包含重复的值',
                    items: {
                        'err:options': {
                            required: '不能为空 ~'
                        }
                    }
                },
                fixedItemsList: {
                    items: [
                        {
                            'err:maxLength': '老铁，最多只能输入两个字符'
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

### customFormats
自定义校验规则 - `object`

### extraErrors
额外的错误配置 - `object`
相应式的值用来给表单直接传入校验错误信息，比如在点击了提交按钮需要和接口校验数据重新返回错误的场景

### customRules
自定义校验规则 - `object`
实现类似elementUi form rules validator 的方式校验表单数据

`目前不支持，后续版本会优先实现，现阶段只能通过 自定义field 实现自定义校验;`

### formFooter
表单footer配置 - `object`
```js
// 默认值
formFooter = {
    show: true, // 是否显示
    okBtn: '保存', // 确认按钮文字
    cancelBtn: '取消' // 取消按钮文字
}
```

### value / v-model
表单绑定值 - `object`
> 对于不需要双向绑定的值，可以传入value参数

### formProps
传给form的值 - `object`
```js
// 默认值
// 目前使用elementUi el-form - https://element.eleme.cn/2.13/#/zh-CN/component/form#form-attributes
formProps = {
    labelPosition: 'top', // 是否显示
    labelSuffix: '：', // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
    inline: false, // 行内表单模式
    labelWidth: 'auto', // 表单域标签的宽度，例如 '50px'
}
```

## 事件 Emit Event
emit所有事件，如：

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @onSubmit="handlerSubmit"
        @on-cancel="handlerCancel"
        @on-change="handlerChange"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {
        handlerSubmit() {
            const vNode = this.$createElement('pre', JSON.stringify(this.formData, null, 4));
            this.$message({
                type: 'success',
                message: vNode
            });
        },
        handlerCancel() {
            this.$message.warning('点击了取消');
        },
        handlerChange({ oldValue, newValue }) {
            const vNode = this.$createElement('pre', JSON.stringify(newValue, null, 4));
            this.$notify({
                title: '输入数据',
                message: vNode
            });
        },
    },
    data() {
        return {
            formData: {
               name: 'Liu.Jun'
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: '输入名字',
                        type: 'string'
                    }
                }
            }
        }
    }
};
</script>
```
:::

### on-submit
点击提交按钮，且表单通过校验，参数(formData)
> 事件只有在配置了默认底部才会触发 [props formFooter](#formprops)

### on-cancel
点击取消按钮
> 事件只有在配置了默认底部才会触发 [props formFooter](#formprops)

### on-change
表单的值发生改变，参数(newVal, oldVal)
> 引用类型，只有重新对对象赋值，否则newVal 等于 oldVal 参见 [vue watch](https://cn.vuejs.org/v2/api/#vm-watch)

## 方法 Methods

## 插槽 Scope-Slot

jsonSchema
elementUi
ajv
