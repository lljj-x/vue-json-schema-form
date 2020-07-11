# TODO

## 不支持 （持续更新）
目前对标准json schema不支持的部分包含可能不限于如下：
1. object additionalProperties 属性不支持，目前统一为 false
1. object Dependencies 属性依赖和schema依赖都不支持
1. if else 新特性不支持

## Todo
- [ ] extraErrors参数 支持
- [ ] customRules参数 支持
- [ ] 对表单所有渲染节点打上唯一class类名，方便重置样式
- [x] anyOf 嵌套数组调整顺序的时候数据渲染异常问题修复
- [ ] 整理文档，逐步梳理 基本使用方法和个性化配置field、组件、错误信息处理、options配置等
- [x] lib如果直接umd包导入，默认注册vue组件 类elementUi
- [ ] 逐步开源发布
- [ ] Ui配置，基础的显示支持function配置，接受当前formData参数，hidden title description placeholder等
- [ ] Object additionalProperties 默认false，数组嵌套anyOf 再嵌套object时对默认选中项目的计算导致展示不支持其它设置
- [ ] 所有节点都支持配置 widget
- [ ] uiSchema errSchema和formData使用相同的方式传递数据
- [ ] allOf配置支持可能不够全面
- [ ] 优化源码 不需要this的组件调整为 functional
- [ ] 性能部分 - 1、组件传参导致响应式的数据庞大 2、render函数完全重新渲染分离变和不变 3、formData 变更render 都需要重新执行
- [ ] 对照react schema from适配更多规则支持
- [ ] 解耦elementUi 重新开发form 和formItem组件，通过配置化实现适配elementUi iView 等常用ui组件
