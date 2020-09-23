# vue-json-schema-form
基于 `Vue`、`ElementUi`、`JSON Schema` 快速构建一个带完整校验的form表单.

## 快速体验
* [查看文档](https://vue-json-schema-form.lljj.me/ "Vue JSON Schema Docs")
* [演示Demo](https://form.lljj.me/ "Vue JSON Schema Form Demo")
* [使用场景 - 可视化活动编辑器](https://form.lljj.me/vue-editor.html)，点击这里查看 [如何启动活动编辑器](#如何启动活动编辑器)
* [不支持部分和更新计划](https://vue-json-schema-form.lljj.me/zh/guide/todo.html)

![](https://7.luochongfei.top/vue-json-schema-form.gif?1)

## 如何启动活动编辑器

![](https://lljj-xxxx.oss-cn-hongkong.aliyuncs.com/vue-editor.jpg)

```ssh
# 安装依赖
yarn install

# 运行demo页 （同时运行表单编辑器和活动编辑器）
# （formEditr）表单编辑器 http://127.0.0.1:8800/
# （H5）活动编辑器 http://127.0.0.1:8800/vue-editor.html
yarn run demo:dev

# 只运行（formEditr）表单编辑器
yarn run demo:dev --dir=index

# 只运行（H5）活动编辑器
yarn run demo:dev --dir=vue-editor

```

### 说明
* 遵循 `JSON Schema` 规范，只需要给定 `JSON Schema`，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可适配常用的ui库，目前的版本默认视图依赖 `elementUi`，后续版本会解耦开来，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
* 表单schema校验使用  [ajv](https://github.com/epoberezkin/ajv)
* 设计思想和对schema解析索引参考 [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

## 相关资料
[JSON Schema](https://json-schema.org/understanding-json-schema/index.html) |
[Vue](https://cn.vuejs.org/) |
[Element Ui](https://element.eleme.io/)

### 为何开发
原本是在很久前公司流产的项目类似淘宝店铺装修，也可以叫做前端可视化编辑。为了解决数据配置表单的通用性，所以使用 `JSON Schema` 描述数据结构，动态生成表单。

这样做的好处除了解决在每个配置表单的重复工作，服务端也可以基于同一份schema保持和前端一致的校验规则，不过对于使用 vue elementUi并未找到合适库可以直接使用，所以在后面一段时间决定自己实现一个 。

## License
Apache-2.0
