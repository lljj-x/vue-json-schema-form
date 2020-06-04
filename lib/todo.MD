https://github.com/rjsf-team/react-jsonschema-form
https://rjsf-team.github.io/react-jsonschema-form/

https://github.com/koumoul-dev/vuetify-jsonschema-form
https://github.com/jarvelov/vue-form-json-schema
https://github.com/yourtion/vue-json-ui-editor

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
*[ ] 逐步开源发布

*[*] 更新 curNodePath 参数为string 格式，避免重新循环后引用类型对比导致子组件 update
*[ ] anyOf 嵌套数组调整顺序的时候数据渲染异常问题修复
*[ ] array 类型key 通过计算唯一key，不使用index

*[ ] 整理文档，逐步梳理 基本使用方法和个性化配置field、组件、错误信息处理、options配置等
*[ ] Ui配置，基础的显示支持function处理，hidden title description placeholder等
*[ ] Object additionalProperties 默认false，数组嵌套anyOf 再嵌套object时对默认选中项目的计算导致展示不支持其它设置
*[ ] 所有节点都支持配置 widget
*[ ] uiSchema errSchema和formData使用相同的方式传递数据
*[ ] allOf配置支持可能不够全面
*[ ] 优化源码 不需要this的组件改完 functional
*[ ] 性能部分 - 1、组件传参导致响应式的数据庞大 2、render函数完全重新渲染分离变和不变 3、formData 变更render 都需要重新执行
*[ ] depend 依赖支持
*[ ] if else 支持
*[ ] 对照react schema from适配更多规则支持
*[ ] 解耦elementUi 重新开发form 和formItem组件，通过配置化实现适配elementUi iView 等常用ui组件


### 总结
设计思想上的借鉴，整体实现会有较大的不同，在我的项目中所有被递归的数据都是不会变化的数据
故意区分了，静态和用户的formData数据，这样在用户输入的时候可以让vue更精准的知道被依赖的组件，而不是，递归了整个formData，这棵树的逐一级别依赖
这样做绝大部分的场景都是只需要重新render输入内容的最小field，oneof anyof会不同，因为需要依赖用户输入的的值来改变form的展现形态

rootFormData + 属性path来传递，避免数据逐级递归数据，导致一次change事件链内的组件都需要重新render

需要注意，required 在schema里面规定，有值就校验通过，所以空字符串也是true
这里如果自己实现field直接返回输入控件的时候，按你的场景可能需要自己特殊处理 required 规则 校验条件，
当然内部继续调用下一级SchemaField内部会自动处理差异，并且是把requred的错误覆盖配置在了最后一级

对于number类型的特殊处理，如1.0 1. 1.0110 这类数据如何处理
后面想通过一个hack，故意让视图输入了这类特殊值的时候不去触发vm中的数据更新
但是element为了解决另一个问题，做了一次强制的数据对比更新，所以在element ui中无法hack
https://github.com/ElemeFE/element/issues/12850

ui:field: 栏目组件 比如 -> 对象
ui:widget: 每一个具体的输入部件

> oneOf ui配置和error配置
> 需要保留关键字，schema使用的oneOf allOf anyOf , 内部配置使用了（oneOfSelect oneOfAllOptions anyOfSelect anyOfAllOptions） 配置了同名key会导致errorSchema，uiSchema无法正常工作
> 1. oneOfOptions oneOfAll  Array 适配oneOf里面的每一个值
> 1. oneOf ui中适配oneOf select的配置，error中适配oneOf类型校验错误 String
> 1. 都会合并options的选项和上一级的配置
> 1. 定义的数据字段名称 不能包含 . 字符串，内部会使用.连接出节点path
