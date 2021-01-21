---
home: true
pageClass: custom-page-home
heroImage: /logo.png
heroText: Vue JSON Schema Form
tagline: 基于 Vue 、JSON Schema 构建form表单，支持Vue3和多Ui框架
footer: Apache2.0 Licensed | Copyright © 2020-2020 Jun
actionText: 快速开始 →
actionLink: /zh/guide/
---

## 快速体验
* [Playground 演示](https://form.lljj.me/ "Vue JSON Schema Form Playground")
* [源代码](https://github.com/lljj-x/vue-json-schema-form "Vue JSON Schema github") / [可视化表单Schema生成器](https://form.lljj.me/schema-generator.html "Vue JSON Schema Form 可视化表单Schema生成器") / [Vue可视化活动编辑器](https://form.lljj.me/vue-editor.html)
* [不支持部分和更新计划](/zh/guide/todo.html)

``` bash
# 安装
# vue2+elementUi 版本
npm install --save @lljj/vue-json-schema-form

# 或者：
yarn add @lljj/vue-json-schema-form
```

```vue
<template>
    <VueForm
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
    >
    </VueForm>
</template>

<script >
//  使用
import VueForm from '@lljj/vue-json-schema-form';

export default {
    name: 'Demo',
    components: {
        VueForm
    },
    data() {
        return {
            formData: {},
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '用户名',
                        default: 'Liu.Jun',
                    },
                    age: {
                        type: 'number',
                        title: '年龄'
                    },
                    bio: {
                        type: 'string',
                        title: '签名',
                        minLength: 10,
                        default: '知道的越多、就知道的越少',
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:options': {
                        placeholder: '请输入你的签名',
                        type: 'textarea',
                        rows: 1
                    }
                }
            }
        };
    }
};
</script>
```

> 运行如下：

## DEMO
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
            formData: {},
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '用户名',
                        default: 'Liu.Jun',
                    },
                    age: {
                        type: 'number',
                        title: '年龄'
                    },
                    bio: {
                        type: 'string',
                        title: '签名',
                        minLength: 10,
                        default: '知道的越多、就知道的越少',
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:options': {
                        placeholder: '请输入你的签名',
                        type: 'textarea',
                        rows: 1
                    }
                }
            }
        };
    }
};
</script>
```
:::

## 相关资料
[JSON Schema](https://json-schema.org/understanding-json-schema/index.html) |
[Vue](https://cn.vuejs.org/)

## 为何开发
在做前端可视化编辑时，为了解决数据配置表单的通用性，所以使用 `JSON Schema` 描述数据结构，动态生成表单。

这样做的好处除了解决在每个配置表单的重复工作，服务端也可以基于同一份schema保持和前端一致的校验规则，不过对于使用 vue elementUi并未找到合适库可以直接使用，所以在后面一段时间决定自己实现一个 ..
