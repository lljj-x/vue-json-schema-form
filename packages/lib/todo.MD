*[x] 单独的包处理提取
*[x] 支持 v-model，value格式 区别是响应式和不响应式
*[x] 支持通过方法创建组件和form组件
*[x] 拆分 数据schema、ui schema可区分配置
*[x] ajv 处理错误异常
*[x] 校验规则需要特殊自定义扩展 validRules
*[x] errorSchema 覆盖默认错误信息，可多语言配置等
*[x] schema表单和校验规则需要支持多语言
*[x] array 三种类型 逐步支持
*[x] array 类型控制条样式调整，需要支持没配置的时候不显示和按钮自动适配右对齐
*[x] array 类型所有添加的item都需要required
*[x] 抽离公共isRequire逻辑，anyOf oneOf 需要代入父级别的特殊参数
*[x] 对象和数组的校验规则都会受外层结构影响 添加父级的校验
*[x] 实现emptyValue 逻辑，遵循schema规范的required形式
*[x] required 的差异性，schema 规定undefind才是不符合required的
*[x] oneOf 数据校验，如object 拆开了数据校验导致异常问题，object特殊处理合并在一起
*[x] oneOf anyOf 支持
*[x] 整理所有冗余代码 包括优化打包文件体积

### 总结
设计思想上的借鉴，整体实现会有较大的不同，在我的项目中所有被递归的数据都是不会变化的数据
故意区分了，静态和用户的formData数据，这样在用户输入的时候可以让vue更精准的知道被依赖的组件，而不是，递归了整个formData，这棵树的逐一级别依赖
这样做绝大部分的场景都是只需要重新render输入内容的最小field，oneof anyof会不同，因为需要依赖用户输入的的值来改变form的展现形态


ui:field: 栏目组件 比如 -> 对象
ui:widget: 每一个具体的输入部件

> oneOf ui配置和error配置
> 需要保留关键字，schema使用的oneOf allOf anyOf , 内部配置使用了（oneOfSelect oneOfAllOptions anyOfSelect anyOfAllOptions） 配置了同名key会导致errorSchema，uiSchema无法正常工作
> 1. oneOfOptions oneOfAll  Array 适配oneOf里面的每一个值
> 1. oneOf ui中适配oneOf select的配置，error中适配oneOf类型校验错误 String
> 1. 都会合并options的选项和上一级的配置
> 1. 定义的数据字段名称 不能包含 . 字符串，内部会使用.连接出节点path
