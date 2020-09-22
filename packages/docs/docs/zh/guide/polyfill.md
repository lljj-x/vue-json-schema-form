# 兼容性

> 原则上只兼容到IE11

## css兼容
css使用了flex，这里可以重置样式兼容到低版本

> 如果需要兼容更低版本也可以通过覆盖异常的样式实现.

## script 兼容
项目内部会使用到一些es6+的api，如 String.prototype.includes 等，这类api在库文件构建的时候并未处理，需要结合实际项目自行处理。

#### 方法1：通过项目 Babel 转译当前库
如果项目使用 babel runtime，或者core-js@3通过 useBuiltIns 的方式，**vue-cli 默认使用这种方式**
> babel 默认忽略所有 `node_modules` 中的文件， 可以通过 `babel include` 包含库文件目录 `node_modules/@lljj/vue-json-schema-form`

* 使用 vue-cli 只需配置  [transpileDependencies](https://cli.vuejs.org/zh/config/#transpiledependencies)

```js
{
    transpileDependencies: [
        '@lljj/vue-json-schema-form' // + 添加这一行
    ]
},
```

* 或者配置babel-loader：
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

:::tip
如上配置路径需要结合你实际的项目情况
:::

#### 方法2：通过 polyfill 处理
如果你的项目不使用 useBuiltIns， 通过纯粹 polyfill 的方式来解决api的兼容问题，如 @babel/polyfill，或者你自己习惯的polyfill，那保证垫片优先执行即可.

> 保证垫片在之前加载执行
>
> 注：
>* 个人比较喜欢这种方式构建一份自己的polyfill，更容易保证每次变更资源文件的版本稳定。
>* 例如，我常用的：[@lljj/polyfill](https://github.com/lljj-x/polyfill)

```js
// 如使用 @babel/polyfill
import "@babel/polyfill";
```

::: tip
如果依旧提示存在不支持的api方法，那可能是导入的polyfill不够全，可以手动导入缺失的方法。

使用 `core-js` 手动按需导入

```js
// 比如提示缺失 Promise
import 'core-js/modules/es6.promise';
```
:::

