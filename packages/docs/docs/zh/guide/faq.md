# 常见问题

## select筛选框的值可以动态配置吗

* 基于 JsonSchema 的方案，配置 `enum` 和 `enumNames` 动态更新即可， schema原本也为响应式数据
* 通过`ui:enumOptions`动态配置下拉列表

如下演示动态配置 `ui:enumOptions`，其它类似场景也可如此操作
::: demo
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
    name: 'Demo',
    methods: {
        consoleLog(getForm) {
            console.log(getForm());
        },
    },
    data() {
        return {
            formData: {
               name: ''
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: '选择你是谁',
                        type: 'string',
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:widget': 'SelectWidget',
                    'ui:enumOptions': [{value: '1',  label: '加载中...'}]
                }
            }
        }
    },
    created() {
        setTimeout(() => {
            Object.assign(this.uiSchema.name, {
                'ui:enumOptions': [{value: '2',  label: '小猫'},{value: '3',  label: '小狗'}]
            })
        }, 3000);
    }
};
</script>
```

:::

## JSON Schema object required

> **背景：**
>* JSON Schema 规范 object `required` 包含的属性值只有值为 `undefined` 时校验才不通过
>* `javascript` 里 `undefined` `0` `空字符串` `null` 等转成 `boolean` 类型都为 `false`

为了抹平以上的差异性，在表单元素输入值时，当你的输入值变为空字符串 `''` ，会自动处理为 `undefined` 这样来和 `JSON Schema` 规范保持一致。

:::tip
* 如果你不想做此转换，可通过配置 `ui-schema` 重置 `emptyValue` 的值

如：
```js
{ 'ui:emptyValue': '' }

// 或者
{ 'ui:emptyValue': '你喜欢的值' }
```
点击查看 [ui-schema参数配置](/zh/guide/basic-config.html#ui-schema)
:::


## Vue  Module not found
`0.0.8` 以后版本已经不使用 `vue-cli` 构建 lib，改用 `rollup` 构建后依赖 `vue` 小写
> 项目明明install了vue但找不到模块，这里是因为使用 vue-cli 构建lib，Vue 会被作为一个依赖引入，并且是首字母大写的Vue。

::: tip 解决方法
1、如果项目vue使用npm包，这里只需要在webpack resolve 别名配置中加上大写的 Vue

```js
// webpack 配置
module.exports = {
    // ...
    resolve: {
        alias: {
            Vue: 'vue' // + 上大写Vue
        }
    }
};

// 如果使用 vue cli3 +
// vue.config.js 配置 configureWebpack加上如下代码
module.exports = {
    // ...
    configureWebpack: (config) => {
         config.resolve.alias = {
             ...config.resolve.alias,
             Vue: 'vue' // + 上大写Vue
         };
    }
}

```

2、如果项目vue使用的外部script标签导入，这需要在webpack externals 配置加上 大写的Vue
```js
// webpack 配置
module.exports = {
    // ...
    externals: {
        vue: 'Vue',
        Vue: 'Vue' // + 上大写Vue
    }
}

// 如果使用 vue cli3 +
// vue.config.js 配置 configureWebpack加上如下代码
module.exports = {
    // ...
    configureWebpack: (config) => {
         config.externals = {
            ...config.externals,
            vue: 'Vue',
            Vue: 'Vue', // + 上大写Vue
         };
    }
}
```
:::


## 怎么兼容ie9

`@lljj/vue-json-schema-form` 依赖 `vue` `elementUi` `ajv` ，也都可以兼容到 `ie9`

* 兼容ie9需要处理两部分
1. css部分

由于可能存在flex 等样式，不支持ie9，目前版本需要手动去重置默认的表单样式。
> 后续计划默认样式不会超纲

2. js 部分

要么通过垫片 polyfill，要么让 `@lljj/vue-json-schema-form` 通过 `bable-loader` 处理即可
参见：[兼容性解决](/zh/guide/polyfill.html#script-兼容)

## 单字符串节点如何处理
根节点必须是 object ，其它不支持
