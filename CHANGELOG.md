# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.1](https://github.com/lljj-x/vue-json-schema-form/compare/v0.2.0...v0.2.1) (2020-11-25)


### Bug Fixes

* **schema generator:** 修复schema生成器预览不支持% ([ff0d2da](https://github.com/lljj-x/vue-json-schema-form/commit/ff0d2da9b1944056185803898d3a2c66194cc508))
* **schema generator:** 多选类型强制 uniqueItems ([cd3349e](https://github.com/lljj-x/vue-json-schema-form/commit/cd3349ed960bdf2908ffd76ffce86cf99914b222))





# [0.2.0](https://github.com/lljj-x/vue-json-schema-form/compare/v0.1.3...v0.2.0) (2020-11-24)


### Bug Fixes

* **lib:** 修复lib boolean 类型使用select渲染时，label=true 导致props类型校验错误 ([70ac8fc](https://github.com/lljj-x/vue-json-schema-form/commit/70ac8fc02b47e6e51e42be9d97daab998bfdadc9))
* **lib:** 修复数组多选框默认值错误问题，修复anyOf选项数据可能合并错误 ([bf4a086](https://github.com/lljj-x/vue-json-schema-form/commit/bf4a086433b420ac0b9aa570bd13ff935c2ddd10))
* **lib:** 修复默认schema生成formData和默认值相等时导致可能不能及时更新的问题 ([590e37d](https://github.com/lljj-x/vue-json-schema-form/commit/590e37dd67d6863d3bb2867e978f83fa52a1fb9c))


### Features

* **demo:** 更新demo页ui样式 ([89b93b2](https://github.com/lljj-x/vue-json-schema-form/commit/89b93b26d0a57e623e6e2784e4636a7aefb32738))
* **lib:** array 类型 item title description 支持 $index 特殊字符 ([8922650](https://github.com/lljj-x/vue-json-schema-form/commit/89226508fa8dcdb55fe930a014e6ec7d1cc6a9bd)), closes [#19](https://github.com/lljj-x/vue-json-schema-form/issues/19)
* **lib:** ui配置支持 ui:xxx 配置表达式 ([570dd57](https://github.com/lljj-x/vue-json-schema-form/commit/570dd577fe88b779d37afb8fba8199b97edb2f73)), closes [#19](https://github.com/lljj-x/vue-json-schema-form/issues/19)
* **lib:** 对ui:xxx 配置支持表达式，options 内不支持表达式以便区分 ([7c20bb8](https://github.com/lljj-x/vue-json-schema-form/commit/7c20bb8c11d5038eca37d5fdb151ae250f7dc074))
* **lib:** 支持 column 布局，1 2 3 列 ，同时支持单个 widget 配置ui:width 指定宽度 ([a088a6f](https://github.com/lljj-x/vue-json-schema-form/commit/a088a6f21448e77f371e8391d93c03aa2e99a3e9))
* **schema generator:** 完成schema生成器 input 组件配置化 ([9d7cc67](https://github.com/lljj-x/vue-json-schema-form/commit/9d7cc67802353b3772e5937aeac9345ec0b46570))
* **schema generator:** 支持基础组件拖入生成 ([93e344e](https://github.com/lljj-x/vue-json-schema-form/commit/93e344e48ce50d3933830c90113dd5d789a0a371))
* **schema generator:** 添加schema generator 参数formLabel左右布局时隐藏description ([f13a159](https://github.com/lljj-x/vue-json-schema-form/commit/f13a159977d8f1677e8942dce2b1e53283943b82))
* **schema-generator:** 优化schema-generator参数配置 ([82d0b7d](https://github.com/lljj-x/vue-json-schema-form/commit/82d0b7d4430d92ae8094044dec3dfa521ed5c410))
* **schema-generator:** 优化导出代码 ([20d429c](https://github.com/lljj-x/vue-json-schema-form/commit/20d429c60f49f7e8181ece0b53974f303fec0c5f))
* **schema-generator:** 修复 schema-generator 导出schema参数丢失问题 ([23f9615](https://github.com/lljj-x/vue-json-schema-form/commit/23f961579dc11fe8a7626186b4f9736c4e1203c6))
* **schema-generator:** 初始化 schema-generator ([3a743ee](https://github.com/lljj-x/vue-json-schema-form/commit/3a743ee48c50493fb17a19cc0657cb351ef5a111))
* **schema-generator:** 完善表单设计器组件库 ([26afd79](https://github.com/lljj-x/vue-json-schema-form/commit/26afd79687263149a1e29c0adf03de3b7bd7f6db))
* **schema-generator:** 更新schema生成器 支持配置数组 ([0f4d3b4](https://github.com/lljj-x/vue-json-schema-form/commit/0f4d3b4be1b47fb89571500cd8749fed6a412a38))
* **schema-generator:** 添加日期相关组件 ([bcb2836](https://github.com/lljj-x/vue-json-schema-form/commit/bcb283665eab561608062255c5f197f5a1e1a5aa))
* **schema-generator:** 生成表单编辑器 ([dd5eecb](https://github.com/lljj-x/vue-json-schema-form/commit/dd5eecb607e2be8e000a56dd5202d3a9c02d38a0))
