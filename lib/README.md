# vue-json-schema-form
基于 Vue ElementUi JsonSchema快速构建一个带完整校验的form表单.

## 快速体验
点击这里快速查看和编辑 [演示demo](https://form.buhuida.com/ "Vue JsonSchema Form Demo")
或者[查看文档](https://vue-json-schema-form.buhuida.com/ "Vue JsonSchema Docs")、
[源代码](https://github.com/liujunchina/vue-json-schema-form "Vue JsonSchema github")
![](https://7.luochongfei.top/vue-json-schema-form.gif)

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

### 说明
* 遵循 jsonSchema 规范，只需要给定jsonSchema，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可快速适配常用的ui库，目前的版本默认视图依赖elementUi，后续版本会解耦开来，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
* 设计思想和对schema解析索引参考 [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/)

## 相关资料
[json Schema](https://json-schema.org/understanding-json-schema/index.html) |
[Vue](https://cn.vuejs.org/) |
[Element Ui](https://element.eleme.io/)

### 为何开发
原本是在很久前公司流产的项目类似淘宝店铺装修，也可以叫做前端可视化编辑。为了解决数据配置表单的通用性，所以使用json-schema描述数据结构，动态生成表单。

这样做的好处除了解决在每个配置表单的重复工作，服务端也可以基于同一份schema保持和前端一致的校验规则，不过对于使用 vue elementUi并未找到合适库可以直接使用，所以在后面一段时间决定自己实现一个 ..

可视化编辑演示 - https://buhuida.com/page_demo/demo-1911/vue-editor.html#/editor


### 不支持部分 （持续更新）
目前对标准json schema不支持的部分包含可能不限于如下：
1. object additionalProperties 属性不支持，目前统一为 false
1. object Dependencies 属性依赖和schema依赖都不支持
1. if else 新特性不支持

### Todo
*[x] anyOf 嵌套数组调整顺序的时候数据渲染异常问题修复
*[ ] 整理文档，逐步梳理 基本使用方法和个性化配置field、组件、错误信息处理、options配置等
*[ ] 逐步开源发布
*[ ] Ui配置，基础的显示支持function配置，接受当前formData参数，hidden title description placeholder等
*[ ] Object additionalProperties 默认false，数组嵌套anyOf 再嵌套object时对默认选中项目的计算导致展示不支持其它设置
*[ ] 所有节点都支持配置 widget
*[ ] uiSchema errSchema和formData使用相同的方式传递数据
*[ ] allOf配置支持可能不够全面
*[ ] 优化源码 不需要this的组件调整为 functional
*[ ] 性能部分 - 1、组件传参导致响应式的数据庞大 2、render函数完全重新渲染分离变和不变 3、formData 变更render 都需要重新执行
*[ ] 对照react schema from适配更多规则支持
*[ ] 解耦elementUi 重新开发form 和formItem组件，通过配置化实现适配elementUi iView 等常用ui组件
