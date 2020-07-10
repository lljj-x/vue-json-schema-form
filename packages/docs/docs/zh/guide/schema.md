# schema 配置

schema 配置完全遵循 [json Schema](https://json-schema.org/understanding-json-schema/index.html) 规范格式

## 渲染页面结构
- `title` 渲染标题
- `description` 渲染描述

这里如果是 `object` 或者`array` 内的 `title` `description` 会被渲染为包裹容器`FieldGroupWrap` 标题和描述

内部的 `title` `description` 会被 `widget` 组件渲染为 formItem 的标题和描述

:::tip 如何隐藏
* 不配置 `title` `description` 属性不会显示
* 特例：对于`object` `array` 类型可以通过 [uiSchema showTitle](/zh/guide/uiSchema.html#showTitle) 参数控制是否显示
:::

