# 介绍

## 快速开始
使用npm
``` bash
# 安装
npm install --save @lljj/vue-json-schema-form

# yarn
yarn add @lljj/vue-json-schema-form
```

全局引入
```html
# script引入
<script src="//cdn.jsdelivr.net/npm/@lljj/vue-json-schema-form/dist/vueJsonSchemaForm.umd.min.js"></script>
```

::: tip
* 全局引入，会注册全局组件 `VueForm`
* 暴露全局变量 `window.vueJsonSchemaForm`
:::

## DEMO
演示渲染用户信息的表单，点击显示代码可查看源代码或者在codepen运行

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

## 基本概念
通过 schema 生成对应的form表单
* schema `title` 属性作为 form表单的标题
* schema `description` 属性作为表单的描述

基于组件递归的形式，逐级渲染数据，如下图：（点击放大）
![class pathName](/Vjsf.jpg)

其中涉及到两个概念，`Field`、`Widget`
* `Field` 用来渲染每一个节点对应的组件，可以是任意节点，一般包含 `FormItem` 组件
* `Widget` 用来渲染用户输入信息的组件，如 `input` ，`select`，被 `FormItem` 组件包裹
> `Field` `Widget` 都可以通过`uiSchema`自定义，
> 详细方法可以查看 [自定义Field](/zh/guide/adv-config.html#自定义field)、[自定义Widget](/zh/guide/adv-config.html#自定义widget)

## 说明
* 遵循 jsonSchema 规范，只需要给定jsonSchema，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可适配常用的ui库，目前的版本默认视图依赖elementUi，后续版本会解耦开来，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
* 表单schema校验使用  [ajv](https://github.com/epoberezkin/ajv)
* 设计思想和对schema解析索引参考 [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)
