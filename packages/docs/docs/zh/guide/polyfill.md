# 兼容性

## css兼容
原则上只兼容到ie11，因为使用了 css flex

> 如果需要兼容也可以通过重置异常的样式实现.

## script 兼容
项目内部会使用到一些es6+的api，如 String.prototype.includes 等，这类api在lib构建的时候并未处理，需要结合实际项目自行处理

#### 通过项目 Babel 转译当前库
如果项目使用 babel runtime，或者core-js@3通过 useBuiltIns 的形式，**vue-cli 默认使用这种方式**
> babel 默认忽略所有 `node_modules`中的文件， 可以通过 `babel include` 包含库文件目录 `node_modules/@lljj/vue-json-schema-form`

* 配置babel-loader：
```js
{
    test: /\.js$/
    loader: 'babel-loader',
    include: [
        path.resolve(__dirname,'../src'),
        path.resolve(__dirname,'../node_modules/@lljj/vue-json-schema-form') // + 添加这一行
    ]
}
```

* 或者vue-cli 只需配置  [transpileDependencies](https://cli.vuejs.org/zh/config/#transpiledependencies)

```js
{
    transpileDependencies: [
        path.resolve(__dirname,'../node_modules/@lljj/vue-json-schema-form') // + 添加这一行
    ]
},
```

:::tip
如上配置路径需要结合你实际的项目情况
:::

#### 通过 polyfill 处理
如果你的项目使用 polyfill 的形式来解决api的兼容问题，如 @babel/polyfill，或者你自己习惯的polyfill

> 保证垫片在之前加载执行
```js
// 如使用 @babel/polyfill
import "@babel/polyfill";
```

::: tip
如果依旧提示存在不支持的api方法，那可能是导入的polyfill不够用，可以在手动导入缺失的方法。

使用 `core-js` 按需导入

```js
// 比如提示缺失 Promise
import 'core-js/modules/es6.promise';
```
:::

