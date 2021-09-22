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
* vue3 antd Vue `v-model` 不使用 `modelValue` props，这里需要做个转换，[详细参见](/zh/guide/#vue3-ant-v-model-%E7%89%B9%E6%AE%8A%E5%A4%84%E7%90%86)
:::

### @lljj/vue-json-schema-form
* 适配ui库：`Vue2` `ElementUi`
* package name: `@lljj/vue-json-schema-form`
* umd cdn地址：[@lljj/vue-json-schema-form cdn](https://cdn.jsdelivr.net/npm/@lljj/vue-json-schema-form/dist/vueJsonSchemaForm.umd.min.js)
* umd script 标签形式引入暴露全局变量 `window.vueJsonSchemaForm`，`window.vueJsonSchemaForm.default` 暴露组件，同时会注册 `VueForm` 全局组件
* [playground](https://form.lljj.me/#/demo?type=Simple)

### @lljj/vue2-form-iview3
* 适配ui库：`Vue2` `iview3`
* package name: `@lljj/vue2-form-iview3`
* umd cdn地址：[@lljj/vue2-form-iview3 cdn](https://cdn.jsdelivr.net/npm/@lljj/vue2-form-iview3/dist/vue2-form-iview3.umd.min.js)
* umd script 标签形式引入暴露全局变量 `window.vue2FormIview3`，`window.vue2FormIview3.default` 暴露组件，同时会注册 `vue2FormIview3` 全局组件
* [playground](https://form.lljj.me/#/demo?type=Simple&ui=VueIview3Form)

### @lljj/vue3-form-element
* 适配ui库：`Vue3` `ElementPlus`
* package name : `@lljj/vue3-form-element`
* umd cdn地址：[@lljj/vue3-form-element cdn](https://cdn.jsdelivr.net/npm/@lljj/vue3-form-element/dist/vue3-form-element.umd.min.js)
* umd script 标签形式引入暴露全局变量 `window.vue3FormElement`，`window.vue3FormElement.default` 暴露组件
* [playground](https://form.lljj.me/v3/#/demo?type=Simple)


### @lljj/vue3-form-ant
* 适配ui库：`Vue3` `antdv`
* package name : `@lljj/vue3-form-ant`
* umd cdn地址：[@lljj/vue3-form-ant cdn](https://cdn.jsdelivr.net/npm/@lljj/vue3-form-ant/dist/vue3-form-ant.umd.min.js)
* umd script 标签形式引入暴露全局变量 `window.vue3FormAnt`，`window.vue3FormAnt.default` 暴露组件
* [playground](https://form.lljj.me/v3/#/demo?type=Simple&ui=VueAntForm)

#### vue3 ant v-model 特殊处理
例如 `a-input` 组件，ant vue3需要使用 `v-model:value`，但在整个框架内部 `v-model` 都是使用 `modelValue`，所以这里就需要对不一致的props通过中间组件组做转换。

你可以自行转换也可以使用内置方法 `modelValueComponent` 转换，如下：
```js
import { modelValueComponent } from '@lljj/vue3-form-ant';

// 返回一个接受 modelValue 和 update:modelValue v-model的组件
const MyFixInputComponent = modelValueComponent('a-input', {
    model: 'value' // 这里要根据ant组件 model的参数传递
});
```

**这样使用起来还是有些麻烦，目前已经对常用的Widget组件做了内置，参见 [ant vue 附加全局Widget组件](/zh/guide/components.html#vue3-ant-特有的全局组件)**

----------------------------

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
提供一些内部Vue相关的utils方法，详细的可以 [参见源码](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/utils/vueUtils.js)
> 不使用 `ui-schema` `ui:field` 一般不会使用

#### formUtils
提供一些内部Form相关的utils方法，详细的可以 [参见源码](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/utils/formUtils.js)
> 不使用 `ui-schema` `ui:field` 一般不会使用

#### schemaValidate
提供一些内部校验schema相关的方法，详细的可以 [参见源码](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/utils/schema/validate.js)
> 不使用 `ui-schema` `ui:field` 一般不会使用

## 说明
* 遵循 JSON Schema 规范，只需要给定 `JSON Schema`，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可适配常用的ui库，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
* 表单schema校验使用  [ajv](https://github.com/epoberezkin/ajv)
* 设计思想和对schema解析索引参考 [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)
