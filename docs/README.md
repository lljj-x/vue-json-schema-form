---
home: true
pageClass: custom-page-home
heroImage: /logo.png
heroText: Vue JsonSchema Form
tagline: 基于 Vue 、JsonSchema快速构建一个带完整校验的form表单
footer: Apache2.0 Licensed | Copyright © 2018-2020 Jun
actionText: 快速开始 →
actionLink: /zh/guide/
---

### 快速体验
点击这里快速查看和编辑 [演示demo](https://form.buhuida.com/ "Vue JsonSchema Form Demo")
或者github代码 [Vue JsonSchema Form](https://github.com/liujunchina/vue-json-schema-form "Vue JsonSchema Form Code")

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
                        'firstName'
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
                    }
                }
            };
        }
    };
</script>
```
::: tip 说明
* 遵循 jsonSchema 规范，只需要给定jsonSchema，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可快速适配常用的ui库，目前的版本默认视图依赖elementUi，后续版本会解耦开来，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
:::

### 相关资料
[json Schema](https://json-schema.org/understanding-json-schema/index.html)

[Vue](https://cn.vuejs.org/)

[Element Ui](https://element.eleme.io/)

文档部署在Netlify, 部署状态 [![Netlify Status](https://api.netlify.com/api/v1/badges/863ec4c4-cbe6-45c9-a7b8-85ff6658947d/deploy-status)](https://app.netlify.com/sites/determined-lewin-59111e/deploys)
