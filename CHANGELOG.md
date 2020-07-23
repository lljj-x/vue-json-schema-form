# [](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.12...v) (2020-07-23)


### Bug Fixes

* **arraymultiselect:** 修复type array 多选框不支持配置 uiwidget ([f9b577c](https://github.com/lljj-x/vue-json-schema-form/commit/f9b577c479a2c3dd0233952c50e74079c1e4a5ac))
* 修复选择框需要uiSchema参数问题 ([66be8df](https://github.com/lljj-x/vue-json-schema-form/commit/66be8df61f0b724fdcccf4b387341a948cf6dd05))


### Features

* 添加 datatime格式支持，和required 区间校验 ([d3d4e3f](https://github.com/lljj-x/vue-json-schema-form/commit/d3d4e3f68090ad9ea6c3900816568247e7d473a0))
* **datatime:** 时间日期选择支持区间选择，清空时保存数据类型 ([71343e4](https://github.com/lljj-x/vue-json-schema-form/commit/71343e4076abf3afd9a57de68f8381e09ccb0552))
* **daterange:** 支持时间区间选择 ([2de8f14](https://github.com/lljj-x/vue-json-schema-form/commit/2de8f14f8401eb58904187cced3b08556d937521))
* **datetime:** 新增支持 date、time、datetime 三种类型 ([897dedc](https://github.com/lljj-x/vue-json-schema-form/commit/897dedc3f1479c4a150dec7fd744fb1d14d6f453))
* **enum uischema:** enumNames 和anyOf const 形式，支持通过uiSchema配置枚举项标题 ([62698e4](https://github.com/lljj-x/vue-json-schema-form/commit/62698e4e1f778f5c90d626513421c07918064cbc))
* **field:** 自定义 field 支持 ui:fieldProps 配置传入附加props ([7bea3a6](https://github.com/lljj-x/vue-json-schema-form/commit/7bea3a6b2ecb4f78dde5d0abd721108d8bfe6ec0))



## [0.0.12](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.11...v0.0.12) (2020-07-20)


### Bug Fixes

* **object vaidate:** 对象类型校验修复 additionalProperties false 不生效问题 ([b8772e8](https://github.com/lljj-x/vue-json-schema-form/commit/b8772e80d0375588d5a689e67ab9ebbba0ed8711))
* **style:** 更新表单数组操作样式 ([ca0652f](https://github.com/lljj-x/vue-json-schema-form/commit/ca0652f3c96682e29619894a11bc7d9dd69799f5))


### Features

* **null:** 添加type null 支持 ([5c437ad](https://github.com/lljj-x/vue-json-schema-form/commit/5c437ad2356a1b046b54ea6726f298aa0c7d8e5c))
* array 类型支持 showTitle showDescription 配置是否显示标题或描述 ([d9e3618](https://github.com/lljj-x/vue-json-schema-form/commit/d9e361837e2c8dcbb180ab5a0be167155bac58b2))
* 对渲染节点添加class， 标识当前渲染节点path ([100d8ec](https://github.com/lljj-x/vue-json-schema-form/commit/100d8ecdc5ba95176050d9e8663e61d2afc2fbd0))
* 更新文档 ([df34da2](https://github.com/lljj-x/vue-json-schema-form/commit/df34da2a47a07d06c42a0cbc6a90d1ef42594db2))
* 调整表单渲染class类都为 首字母小写 ([fc97966](https://github.com/lljj-x/vue-json-schema-form/commit/fc9796607f99830965e6e3b1f8f13ab73e6bd160))
* **anyof:** anyOf 下拉切换组件，默认使用 当前schema的 title，description ([edd86ab](https://github.com/lljj-x/vue-json-schema-form/commit/edd86ab561b3aca15dd46f6a9a251fcd50e0f083))
* **customformats:** 支持customFormats配置，添加自定义 formats ([f84c7e1](https://github.com/lljj-x/vue-json-schema-form/commit/f84c7e136153be9682574aad1e02c169dfb5d2b3))
* **integerfield:** 添加单独 integerfield 区分 NumberField ([830ab48](https://github.com/lljj-x/vue-json-schema-form/commit/830ab48f514cf1ad53d4a9d04dbacee978360122))
* 调整lib 导出模块，添加 getDefaultFormState ([5a3c318](https://github.com/lljj-x/vue-json-schema-form/commit/5a3c3180a8428c78c681ab6b68dd3d20c8be0963))



# [](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.12...v) (2020-07-20)



## [0.0.12](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.11...v0.0.12) (2020-07-20)


### Bug Fixes

* **object vaidate:** 对象类型校验修复 additionalProperties false 不生效问题 ([b8772e8](https://github.com/lljj-x/vue-json-schema-form/commit/b8772e80d0375588d5a689e67ab9ebbba0ed8711))
* **style:** 更新表单数组操作样式 ([ca0652f](https://github.com/lljj-x/vue-json-schema-form/commit/ca0652f3c96682e29619894a11bc7d9dd69799f5))


### Features

* **null:** 添加type null 支持 ([5c437ad](https://github.com/lljj-x/vue-json-schema-form/commit/5c437ad2356a1b046b54ea6726f298aa0c7d8e5c))
* array 类型支持 showTitle showDescription 配置是否显示标题或描述 ([d9e3618](https://github.com/lljj-x/vue-json-schema-form/commit/d9e361837e2c8dcbb180ab5a0be167155bac58b2))
* 对渲染节点添加class， 标识当前渲染节点path ([100d8ec](https://github.com/lljj-x/vue-json-schema-form/commit/100d8ecdc5ba95176050d9e8663e61d2afc2fbd0))
* 更新文档 ([df34da2](https://github.com/lljj-x/vue-json-schema-form/commit/df34da2a47a07d06c42a0cbc6a90d1ef42594db2))
* 调整表单渲染class类都为 首字母小写 ([fc97966](https://github.com/lljj-x/vue-json-schema-form/commit/fc9796607f99830965e6e3b1f8f13ab73e6bd160))
* **anyof:** anyOf 下拉切换组件，默认使用 当前schema的 title，description ([edd86ab](https://github.com/lljj-x/vue-json-schema-form/commit/edd86ab561b3aca15dd46f6a9a251fcd50e0f083))
* **customformats:** 支持customFormats配置，添加自定义 formats ([f84c7e1](https://github.com/lljj-x/vue-json-schema-form/commit/f84c7e136153be9682574aad1e02c169dfb5d2b3))
* **integerfield:** 添加单独 integerfield 区分 NumberField ([830ab48](https://github.com/lljj-x/vue-json-schema-form/commit/830ab48f514cf1ad53d4a9d04dbacee978360122))
* 调整lib 导出模块，添加 getDefaultFormState ([5a3c318](https://github.com/lljj-x/vue-json-schema-form/commit/5a3c3180a8428c78c681ab6b68dd3d20c8be0963))



# [](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.10...v) (2020-07-06)



## [0.0.10](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.9...v0.0.10) (2020-07-06)


### Bug Fixes

* **formfooter:** 修复 formFooter 配置确定按钮文案无效的问题 ([6606ca2](https://github.com/lljj-x/vue-json-schema-form/commit/6606ca2412cc830819067313aa82cf798b5a795c))
* **lib:** 修复代码错误导致表单初始化会更新一次form value的问题 ([b9e7ec1](https://github.com/lljj-x/vue-json-schema-form/commit/b9e7ec128ffe9ca508b3fc6ec5feaba7a6d38379))


### Features

* **array:** 优化数组类型渲染，不可添加的空组不做渲染 ([fadd295](https://github.com/lljj-x/vue-json-schema-form/commit/fadd29541ba6082b1635ca306fc8b31df6eca48b))
* **form event:** 更新form emit事件名非为驼峰 ([db8bcb7](https://github.com/lljj-x/vue-json-schema-form/commit/db8bcb77ae6021e7e0002ee4c3b159ee3b503725))



# [](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.9...v) (2020-07-06)


### Bug Fixes

* **formfooter:** 修复 formFooter 配置确定按钮文案无效的问题 ([6606ca2](https://github.com/lljj-x/vue-json-schema-form/commit/6606ca2412cc830819067313aa82cf798b5a795c))
* **lib:** 修复代码错误导致表单初始化会更新一次form value的问题 ([b9e7ec1](https://github.com/lljj-x/vue-json-schema-form/commit/b9e7ec128ffe9ca508b3fc6ec5feaba7a6d38379))


### Features

* **array:** 优化数组类型渲染，不可添加的空组不做渲染 ([fadd295](https://github.com/lljj-x/vue-json-schema-form/commit/fadd29541ba6082b1635ca306fc8b31df6eca48b))
* **form event:** 更新form emit事件名非为驼峰 ([db8bcb7](https://github.com/lljj-x/vue-json-schema-form/commit/db8bcb77ae6021e7e0002ee4c3b159ee3b503725))



## [0.0.9](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.8...v0.0.9) (2020-06-22)


### Bug Fixes

* **doc:** 修复docs:build 报错，修改demo默然 ClientOnly ([dde714c](https://github.com/lljj-x/vue-json-schema-form/commit/dde714cfa90ed2514dc2efc6f1f9121f53b2880a))
* **lib:** 全局Vue下，默认注册 VueForm组件 ([0f81ac6](https://github.com/lljj-x/vue-json-schema-form/commit/0f81ac6a1ae957149c8f572b6bbb4cb17d329aff))



# [](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.9...v) (2020-06-22)



## [0.0.9](https://github.com/lljj-x/vue-json-schema-form/compare/v0.0.8...v0.0.9) (2020-06-22)


### Bug Fixes

* **doc:** 修复docs:build 报错，修改demo默然 ClientOnly ([dde714c](https://github.com/lljj-x/vue-json-schema-form/commit/dde714cfa90ed2514dc2efc6f1f9121f53b2880a))
* **lib:** 全局Vue下，默认注册 VueForm组件 ([0f81ac6](https://github.com/lljj-x/vue-json-schema-form/commit/0f81ac6a1ae957149c8f572b6bbb4cb17d329aff))



#  (2020-06-18)



