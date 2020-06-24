# 基本配置

## 参数 Props
### formFooter
表单footer配置 - object

```js
{
    show: true, // 是否显示
    okBtn: '保存', // 确认按钮文字
    cancelBtn: '取消' // 取消按钮文字
}
```

### value / v-model
表单绑定值 - object
> 对于不需要双向绑定的值，可以传入value参数，

### formProps
传给form的值 - object
true

### formFooter


## 事件 Emit Event
### onSubmit
点击提交按钮，且表单通过校验，参数(formData)
> 事件只有在配置了默认底部才会触发 [props formFooter](#formprops)

### onCancel
点击取消按钮
> 事件只有在配置了默认底部才会触发 [props formFooter](#formprops)

### onChange
表单的值发生改变，参数(newVal, oldVal)
> 引用类型，所以newVal 等于 oldVal 参见 [vue watch](https://cn.vuejs.org/v2/api/#vm-watch)

## 方法 Methods

## 插槽 Scope-Slot

jsonSchema
elementUi
ajv
