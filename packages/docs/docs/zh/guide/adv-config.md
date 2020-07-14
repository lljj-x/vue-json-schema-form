# 高级配置

## 数据联动
* 数据联动的实现需要遵循 `json schema` [anyOf](https://form.lljj.me/#/demo?type=AnyOf) [oneOf](https://form.lljj.me/#/demo?type=OneOf) 格式来实现
* 详细 AnyOf、oneOf 配置请 [点击查看](/zh/rules/combining.html)

如下演示：
:::tip
点击 `保存` 按钮查看 `formData` 数据
:::
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
                                                default: '基于json schema 快速生成form表单'
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
                            'ui:title': '使用用户名设置（uiSchema）', // 这里会覆盖schema 配置
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
>* 后续版本会考虑通过ui配置的值支持函数来实现类似交互效果

## 空数据默认值
默认在用户输入时如果清空了表单的数据为空时，即空字符串 `''`，会默认设置值为 `undefined`，这样是为了保证和json schema 规范保持一致。

可以通过配置 `uiSchema` `ui:emptyValue` 的值来重置空数据默认值。

如下： 试试清空 `firstName` `lastName` 输入框的值

>* 提示：`JSON.stringify` 转字符串时默认会丢弃 `undefined` 的值，所以清空时没有`firstName`

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

* 参考
1. [Json schema object required](/zh/guide/faq.html#json-schema-object-required)
1. [uiSchema 配置](/zh/guide/basic-config.html#uischema)


## 自定义样式

### 重置form表单默认样式
针对整个form默认样式，审查元素通过css覆盖即可，根css类名 `genFromComponent`

### 重置表单widget组件样式
如果是对 widget 组件的样式设置，可以通过 `uiSchema` 配置 `style`、`class` 来重置你的样式

查看详细 [uiSchema重置表单widget样式](/zh/guide/basic-config.html#如：重置表单widget样式)

### 根据当前表单渲染的节点类名重置样式
在渲染form表单时会根据schema的数据结构对每个 `field` 渲染节点生成唯一的 `path` 路径，并标记在class属性中，可通过该class选择器来重置某个局部样式。

如：
![class pathName](/pathName.png)

::: tip
所有标记为路径的css类名，统一为 `__path` 前缀，其中 `anyOf`，`oneOf` 同一个path 路径可能存在多处渲染，会存在重复 path class
:::

## 自定义Widget
自定义Widget通过配置 `uiSchema` `ui:widget`字段

* 类型：`String` | `Object` | `Function`

可直接传入Vue组件，或者已注的组件名，或者resolve 了Vue组件的 async 函数，参加 [$createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)，通过调用 `$createElement` 创建 `Vnode` 。

* 使用场景：需要自定义输入组件，比如结合业务的`图片上传` `商品选择` 等等

:::tip
* 自定义的 `Widget` 组件必须接受一个双向绑定的值
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
自定义Field通过配置 `uiSchema` `ui:field` 字段

* 类型：String | Object | Function

可直接传入Vue组件，或者已注的组件名，或者resolve 了Vue组件的 async 函数，参加 [$createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)，通过调用 `$createElement` 创建 `Vnode` 。
> 参数格式和 [自定义Widget](#自定义widget) 一致

* 使用场景：需要完全自定义某个节点的场景，相对比较复杂

1. 自定义Filed需要实现Field以及其子节点的渲染校验逻辑，意味着自定义节点后渲染逻辑都需要使用者自行处理，当然你也可以在子节点中继续调用 `Vjsf`的`SchemaField`组件，再交给`Vjsf`去继续渲染。
1. 组件内部一般会包含 `FormItem`，`校验规则`，`Widget` 输入组件

`Field组件` 会接受以下参数：
:::demo showCode:点击显示代码查看Props所有参数
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

可以直接通过 `vjsf` 导入props配置，已经包含了上面的参数
```js
import { fieldProps } from  '@lljj/vue-json-schema-form';
```

* 演示：对图片和链接配置需要定义自己的ui效果
> 当前的演示demo不支持import语法，所以这里不能直接演示，详细的代码可以点击这里查看 github.com/xxx/xx/

`LinkImgField` 代码如下：
```html
<template>
    <div :class="$style.box">
        <el-form-item
            :label="selectProps.title"
            :prop="curNodePath"
            :class="$style.elFormItem"
            :rules="[
                {
                    validator(rule, value, callback) {
                        // 无需特殊处理 required
                        const error = schemaValidate.default({
                            formData: value,
                            schema: $props.schema
                        });

                        if (error.errors.length > 0) {
                            // 只取第一个错误信息
                            const curErr = error.errors[0];

                            // 找到配置的errSchema节点
                            const curErrorSchema = vueUtils.getPathVal(
                                errorSchema,
                                vueUtils.computedCurPath(curNodePath, curErr.property.replace(/^\.+/, ''))
                            );

                            return callback(curErrorSchema && curErrorSchema[curErr.name] || curErr.message);
                        }
                        return callback();
                    },
                }
            ]"
            :required="elItemRequired"
        >
            <div v-if="selectProps.description" :class="$style.description" v-html="selectProps.description"></div>
            <div :class="$style.formItem">
                <div :class="$style.uploadBox" @click="selectImg">
                    <img v-if="imgUrl" :src="imgUrl" alt="" style="max-width: 100%;max-height: 100%;">
                    <i v-else class="el-icon-plus"></i>
                </div>
                <el-input
                    v-model="imgLink"
                    :class="$style.input"
                    :placeholder="placeholder"
                    size="medium"
                ></el-input>
            </div>
        </el-form-item>
    </div>
</template>

<script>
    // 覆盖默认field 做个性商品选择和链接输入
    import {
        fieldProps,
        vueUtils,
        formUtils,
        schemaValidate
    } from '@lljj/vue-json-schema-form';

    export default {
        name: 'LinkImgField',
        props: fieldProps,
        data() {
            return {
                selectPhotoVisible: false,
                schemaValidate,
                vueUtils
            };
        },
        computed: {
            elItemRequired() {
                // 配置了 required 的属性提示小红点
                return this.schema.required.length > 0;
            },
            placeholder() {
                const { uiSchema } = this.$props;
                return (uiSchema.imgLink && uiSchema.imgLink['ui:options'] && uiSchema.imgLink['ui:options'].placeholder)
                    || '请输入合法的链接';
            },
            selectProps() {
                return formUtils.getUiOptions({
                    schema: this.schema,
                    uiSchema: this.uiSchema
                });
            },
            curValue() {
                return vueUtils.getPathVal(this.rootFormData, this.curNodePath);
            },
            imgUrl: {
                get() {
                    return this.curValue.imgUrl;
                },
                set(value) {
                    vueUtils.setPathVal(this.rootFormData, vueUtils.computedCurPath(this.curNodePath, 'imgUrl'), value);
                }
            },
            imgLink: {
                get() {
                    return this.curValue.imgLink;
                },
                set(value) {
                    vueUtils.setPathVal(this.rootFormData, vueUtils.computedCurPath(this.curNodePath, 'imgLink'), value);
                }
            }
        },
        methods: {
            selectImg() {
                const imgs = [
                    'https://gw.alicdn.com/tfs/TB1DKP9zCtYBeNjSspkXXbU8VXa-1920-450.jpg_Q90.jpg',
                    'https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg',
                    'https://aecpm.alicdn.com/simba/img/TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg',
                    'https://img.alicdn.com/tfs/TB1FrlZPAzoK1RjSZFlXXai4VXa-1000-320.jpg',
                    'https://img.alicdn.com/tfs/TB1n5sCMYvpK1RjSZPiXXbmwXXa-900-320.jpg',
                    'https://img.alicdn.com/tps/i4/TB1ecCsOCzqK1RjSZPxSuw4tVXa.jpg',
                    'https://img.alicdn.com/tps/i4/TB1tVhuNhnaK1RjSZFBSuwW7VXa.jpg',
                    'https://img.alicdn.com/tfs/TB1IyonQVXXXXXCXXXXXXXXXXXX-750-200.jpg',
                    'https://gw.alicdn.com/tfs/TB1hJ2KX6ihSKJjy0FlXXadEXXa-254-318.png',
                    'https://gw.alicdn.com/tfs/TB1UE5RaCWD3KVjSZSgXXcCxVXa-720-400.jpg',
                    'https://gw.alicdn.com/tfs/TB11iC2uAzoK1RjSZFlXXai4VXa-254-318.jpg',
                    'https://gw.alicdn.com/tfs/TB1xo26qeH2gK0jSZFEXXcqMpXa-330-316.jpg',
                    'https://img.alicdn.com/bao/uploaded/i3/2781891994/O1CN01usHqqQ1QbILCMqrJm_!!2781891994.jpg',
                    'https://img.alicdn.com/bao/uploaded/i1/TB1M31ANFXXXXaOXpXXwu0bFXXX.png',
                    'https://img.alicdn.com/imgextra/i2/143584903/O1CN01qdnUD81m5cPPJlXog_!!143584903.jpg'
                ];
                this.$message.success('选择图片成功，这里随机一个图片');
                this.imgUrl = imgs[Math.floor(Math.random() * imgs.length)];
            },
            handleImageSelected(data) {
                this.imgUrl = data[0];
            }
        }
    };
</script>

<style module>
    @import 'variable.css';
    .box {
        :global {
            .el-form-item__label {
                font-weight: bold;
            }
            .el-form-item.is-error {
                :local {
                    .uploadBox {
                        color: #F56C6C;
                    }
                }
            }
        }
    }
    :global {
        .arrayOrderList_item {
            :local {
                .elFormItem {
                    margin-bottom: 0;
                }
            }
        }
    }
    .formItem {
        align-items: center;
        display: flex;
    }
    .input {
        flex: 1;
        margin-left: 5px;
    }
    .description {
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 10px;
        color: var(--color-text-light)
    }
    .uploadBox {
        cursor: pointer;
        width: 60px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--background-color-base);
    }
</style>

```
