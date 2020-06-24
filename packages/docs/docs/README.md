---
home: true
pageClass: custom-page-home
heroImage: /logo.png
heroText: Vue JsonSchema Form
tagline: 基于 Vue 、JsonSchema快速构建一个带完整校验的form表单
footer: Apache2.0 Licensed | Copyright © 2020-2020 Jun
actionText: 快速开始 →
actionLink: /zh/guide/
---

## 快速体验
* [演示demo](https://form.lljj.me/ "Vue JsonSchema Form Demo")
* [查看文档](https://vue-json-schema-form.lljj.me/ "Vue JsonSchema Docs")
* [源代码](https://github.com/liujunchina/vue-json-schema-form "Vue JsonSchema github")
* [使用场景 - 前端可视化编辑演示](https://lljj.me/page_demo/demo-1911/vue-editor.html#/editor)
* [不支持部分和更新计划](/zh/guide/todo.html)

``` bash
# 安装
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
                        row: 1
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
::: demo 这里代码省略导入和使用组件 // import VueForm from '@lljj/vue-json-schema-form';
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
                        row: 1
                    }
                }
            }
        };
    }
};
</script>
```
:::

::: tip
* 遵循 jsonSchema 规范，只需要给定jsonSchema，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可快速适配常用的ui库，目前的版本默认视图依赖elementUi，后续版本会解耦开来，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
:::

## 相关资料
[json Schema](https://json-schema.org/understanding-json-schema/index.html) |
[Vue](https://cn.vuejs.org/) |
[Element Ui](https://element.eleme.io/)


### 为何开发
原本是在很久前公司流产的项目类似淘宝店铺装修，也可以叫做前端可视化编辑。为了解决数据配置表单的通用性，所以使用json-schema描述数据结构，动态生成表单。

这样做的好处除了解决在每个配置表单的重复工作，服务端也可以基于同一份schema保持和前端一致的校验规则，不过对于使用 vue elementUi并未找到合适库可以直接使用，所以在后面一段时间决定自己实现一个 ..
