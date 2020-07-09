# 常见问题

## Json schema object required
背景：
* json schema object required 包含的属性值只有为 `undefined` 校验才会会返回 `false`
* javascript 里面 `undefined` `0` `空字符串` `null` 等转成 `bool` 类型都为 `false`

为了抹平以上的差异性，在表单元素输入值时，当你的输入值变为空字符串 `''` ，会自动处理为 `undefined` 这样来和 `json schema` 规范保持一致。

:::tip
* 如果你不想做此转换，可通过配置 `uiSchema` 重置 `emptyValue` 的值

如：
```js
{ 'ui:emptyValue': '' }

// 或者
{ 'ui:emptyValue': '你喜欢的值' }
```
点击查看 [uiSchema参数配置](/zh/guide/basic-config.html#uischema)
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

`Vjsf` 依赖 `vue` `elementUi` `ajv` ，也都可以兼容到 `ie9`

* 兼容ie9需要处理两部分
1. css部分

由于可能存在flex 等样式，不支持ie9，目前版本需要手动去重置默认的表单样式。
> 后续计划默认样式不会超纲

2. js 部分

要么通过店铺 polyfill，要么让 `vjsf` 通过 `bable-loader` 处理即可
参见：[兼容性解决](/zh/guide/polyfill.html#css兼容)
