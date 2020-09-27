# 全局注册组件

`vjsf` 在运行中会自动注册如下全局组件，这些组件都是在渲染 `Widget` 所使用

* [CheckboxesWidget](#checkboxeswidget)
* [RadioWidget](#radiowidget)
* [SelectWidget](#selectwidget)
* [TimePickerWidget](#timepickerwidget)
* [DatePickerWidget](#datepickerwidget)
* [DateTimePickerWidget](#datetimepickerwidget)

## CheckboxesWidget
复选框组，内部使用 elementUi `el-checkbox-group` 组件

### props
* `value/v-model` `required`，类型 [`Array`]
* `enumOptions` `数组` 选项列表，结构如：`[{value: '1',  label: '选项一'}]`，value 为值，label 为显示标签

> 传递其它额外的参数会透传给 `el-checkbox-group` 组件

## RadioWidget
单选框组，内部使用 elementUi `el-radio-group` 组件

### props
* `value/v-model` `required`，类型 [`String`, `Number`, `Boolean`]
* `enumOptions` `数组` 选项列表，结构如：`[{value: '1',  label: '选项一'}]`，value 为值，label 为显示标签

> 传递其它额外的参数会透传给 `el-radio-group` 组件

## SelectWidget
下拉选择，内部使用 elementUi `el-select` 组件

### props
* `value/v-model` `required`，任意类型
* `enumOptions` `数组` 选项列表，结构如：`[{value: '1',  label: '选项一'}]`，value 为值，label 为显示标签

> 传递其它额外的参数会透传给 `el-select` 组件

## TimePickerWidget
> 内部做时间日期选择使用，一般不要配置自定义 `widget` 中使用

## DatePickerWidget
> 内部做时间日期选择使用，一般不要配置自定义 `widget` 中使用

## DateTimePickerWidget
> 内部做时间日期选择使用，一般不要配置自定义 `widget` 中使用

