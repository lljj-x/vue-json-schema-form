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
* 如果存在Vue 全局变量，会注册全局组件 `VueForm`
:::

## 展现形式
通过schema生对应的form表单，默认使用 schema `title` 属性作为formItem 标题，`description` 属性作为表单的描述。

具体效果参见下面demo，点击显示代码可查看源代码或者在codepen运行

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

## 说明
* 遵循 jsonSchema 规范，只需要给定jsonSchema，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可快速适配常用的ui库，目前的版本默认视图依赖elementUi，后续版本会解耦开来，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
* 表单schema校验使用  [ajv](https://github.com/epoberezkin/ajv)
* 设计思想和对schema解析索引参考 [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)
