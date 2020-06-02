# 常见问题

## Vue  Module not found
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

## 兼容性问题如何处理

