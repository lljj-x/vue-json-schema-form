# vue-json-schema-form
基于 Vue ElementUi JsonSchema快速构建一个带完整校验的form表单.

## 快速体验
点击这里快速查看和编辑 [演示demo](https://form.buhuida.com/ "Vue JsonSchema Form Demo")
或者查看文档 [Vue JsonSchema Docs](https://vue-json-schema-form.buhuida.com/ "Vue JsonSchema Docs")

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

## 相关资料
[json Schema](https://json-schema.org/understanding-json-schema/index.html)

[Vue](https://cn.vuejs.org/)

[Element Ui](https://element.eleme.io/)

### 运用场景

* 可视化编辑 - https://buhuida.com/page_demo/demo-1911/vue-editor.html#/editor

主要解决在每个配置表单的重复工作，已经服务端如何和前端保持一致的校验规则，json schema很好的解决了这些问题


### 说明

设计思想和对schema解析索引参考 `react-jsonschema-form`，api也基本和 `react-jsonschema-form` 保持同步
> react-jsonschema-form：https://rjsf-team.github.io/react-jsonschema-form/


### 快速使用


### 实现


### 目标
可以全面兼容json schema的所有格式

### Todo

