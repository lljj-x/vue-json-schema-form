# 介绍

## 准备
开始之前请务必先了解 [Vue](https://cn.vuejs.org/) 和 [JsonSchema](https://json-schema.org/understanding-json-schema/index.html)

## 体验
* [Playground 演示](https://form.lljj.me/ "Vue JSON Schema Form Playground")
* [Vue可视化活动编辑器](https://form.lljj.me/vue-editor.html)
* [可视化表单Schema生成器](https://form.lljj.me/schema-generator.html "Vue JSON Schema Form 可视化表单Schema生成器")

## 多版本选择
支持如下Vue版本和Ui框架，结合你的项目框架选择版本。

**各版本api和使用形式99%一致，仅有如下差异：**
::: warning 各版本差异
* vue3 emit事件都会去掉on前缀，详细看这里 [事件 Emit Event](/zh/guide/basic-config.html#事件-emit-event)
:::

### @lljj/vue-json-schema-form
* 适配ui库：`Vue2` `ElementUi`
* package name: `@lljj/vue-json-schema-form`
* umd cdn地址：[@lljj/vue-json-schema-form cdn](https://cdn.jsdelivr.net/npm/@lljj/vue-json-schema-form/dist/vueJsonSchemaForm.umd.min.js)
* umd script 标签形式引入暴露全局变量 `window.vueJsonSchemaForm`

### @lljj/vue2-form-iview3
* 适配ui库：`Vue2` `iview3`
* package name: `@lljj/vue2-form-iview3`
* umd cdn地址：[@lljj/vue2-form-iview3 cdn](https://cdn.jsdelivr.net/npm/@lljj/vue2-form-iview3/dist/vue2-form-iview3.umd.min.js)
* umd script 标签形式引入暴露全局变量 `window.vue2FormIview3`

### @lljj/vue3-form-element
* 适配ui库：`Vue3` `ElementPlus`
* package name : `@lljj/vue3-form-element`
* umd cdn地址：[@lljj/vue2-form-iview3 cdn](https://cdn.jsdelivr.net/npm/@lljj/vue3-form-element/dist/vue3-form-element.umd.min.js)
* umd script 标签形式引入暴露全局变量 `window.vue3FormElement`

### @lljj/vue3-form-ant
* 适配ui库：`Vue3` `antdv`
* package name : `@lljj/vue3-form-ant`
* umd cdn地址：[@lljj/vue3-form-ant cdn](https://cdn.jsdelivr.net/npm/@lljj/vue3-form-ant/dist/vue3-form-ant.umd.min.js)
* umd script 标签形式引入暴露全局变量 `window.vue3FormAnt`
* >todo，还未发布

::: tip
后续的文档都以 `@lljj/vue-json-schema-form` 为例
:::


## 快速开始

### npm

``` bash
# 安装
npm install --save @lljj/vue-json-schema-form

# yarn
yarn add @lljj/vue-json-schema-form
```

* 使用
```js
import VueForm from '@lljj/vue-json-schema-form';
import Vue from 'vue';

// 全局注册 或者可以在组件内注册
Vue.component('VueForm', VueForm);
```

### script引入
```html
# script引入
<script src="//cdn.jsdelivr.net/npm/@lljj/vue-json-schema-form/dist/vueJsonSchemaForm.umd.min.js"></script>
```

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

## 基本概念
通过 `JSON Schema` 生成对应的form表单
* schema `title` 属性作为 form表单的标题
* schema `description` 属性作为表单的描述

基于组件递归的形式，逐级渲染数据，如下图：（点击放大）
![Vjsf](/vjsf.jpg)

其中涉及到两个概念，`Field`、`Widget`
* `Field` 用来渲染每一个节点对应的组件，可以是任意节点，一般组件内会包含 `FormItem` 组件
* `Widget` 用来渲染用户输入信息的组件，如 `input` ，`select`，被 `FormItem` 组件包裹
> `Field` `Widget` 都可以通过`ui-schema`自定义，
> 详细方法可以查看 [自定义Field](/zh/guide/adv-config.html#自定义field)、[自定义Widget](/zh/guide/adv-config.html#自定义widget)

## 暴露方法
```js
import VueForm, {
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n
} from '@lljj/vue-json-schema-form';
```

####  VueForm
默认导出 VueForm组件

#### getDefaultFormState
通过 `JSON Schema` 计算当前 `FormState` 的值
* 参数：(schema, formData, rootSchema, includeUndefinedValues)

>* schema `object` 需要计算的schema
>* formData `object` 当前的 formData 值，没有可以传 `undefined`
>* rootSchema `object` 需要计算的schema的根节点schema
>* includeUndefinedValues `boolean` 是否包含未定义的值 ，默认 `true`

> 不使用 `ui-schema` `ui:field` 一般不会使用

#### fieldProps
Field props配置，如果需要使用 `ui:field` 自定义field 组件，需要使用它定义组件props
> 不使用 `ui-schema` `ui:field` 一般不会使用

#### vueUtils
提供一些内部Vue相关的utils方法，详细的可以 [参见源码](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/src/JsonSchemaForm/common/vueUtils.js)
> 不使用 `ui-schema` `ui:field` 一般不会使用

#### formUtils
提供一些内部Form相关的utils方法，详细的可以 [参见源码](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/src/JsonSchemaForm/common/formUtils.js)
> 不使用 `ui-schema` `ui:field` 一般不会使用

#### schemaValidate
提供一些内部校验schema相关的方法，详细的可以 [参见源码](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/src/JsonSchemaForm/common/schema/validate.js)
> 不使用 `ui-schema` `ui:field` 一般不会使用

## 说明
* 遵循 JSON Schema 规范，只需要给定 `JSON Schema`，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可适配常用的ui库，目前的版本默认视图依赖elementUi，后续版本会解耦开来，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
* 表单schema校验使用  [ajv](https://github.com/epoberezkin/ajv)
* 设计思想和对schema解析索引参考 [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)
