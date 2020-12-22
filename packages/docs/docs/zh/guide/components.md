# 全局注册组件

`vjsf` 在运行中会自动注册如下全局组件，这些组件都是在渲染 `Widget` 所使用

* [CheckboxesWidget](#checkboxeswidget)
* [RadioWidget](#radiowidget)
* [SelectWidget](#selectwidget)
* [UploadWidget](#uploadwidget)
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

## UploadWidget
* 文件上传组件，支持多文件上传
* 页面体验地址：[Playground upload 组件](https://form.lljj.me/#/demo?type=Upload)

### props
* `value/v-model` `required`，类型：`[String, Array]`
* `responseFileUrl` Function ，用于处理上传文件接口返回值中提取 url 字段，接受上传接口返回值为参数
* `btnText` 配置上传按钮文字
* `slots` 支持传入 VNode 对象，最终传递给 upload 组件slot，用于自定义上传按钮和提示文案(使用方法参见如下DEMO)

> 传递其它额外的参数会透传给 el-upload 组件

`responseFileUrl` 默认值如下：
```js
{
    responseFileUrl: {
        default: res => (res ? (res.url || (res.data && res.data.url)) : ''),
        type: [Function]
    }
}
```

如下：使用 `ui:slots` 重置上传按钮

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            schema: {
                title: '文件上传',
                type: 'object',
                description: '文件上传 使用 el-upload组件，支持所有的 el-upload 参数，<br/>slot 可以通过 slots参数传入数组VNode list',
                properties: {
                    imgUrl: {
                        title: '单个图片',
                        type: 'string',
                        default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
                        'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                        'ui:widget': 'UploadWidget',
                        'ui:slots': {
                            default(h) {
                                return h('el-button', {
                                    slot: 'default',
                                    props: {
                                        size: 'mini',
                                        type: 'primary'
                                    },
                                }, ['上传图片'])
                            },
                            tip(h) {
                                return h('div', {
                                    slot: 'tip',
                                    style: {
                                        fontSize: '12px',
                                        color: '#666'
                                    }
                                }, ['注：请上传100 * 100尺寸的图片'])
                            },
                       }
                    },
                    imgUrlList: {
                        title: '多图',
                        type: 'array',
                        'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                        'ui:btnText': '重新设置上传按钮文字',
                        'ui:widget': 'UploadWidget',
                        // eslint-disable-next-line max-len
                        default: ['http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp'],
                        items: {
                            type: 'string',
                        }
                    }
                }
            },
            formData: {}
       }
    }
};
</script>
```
:::

## TimePickerWidget
> 内部做时间日期选择使用，一般不要配置自定义 `widget` 中使用

## DatePickerWidget
> 内部做时间日期选择使用，一般不要配置自定义 `widget` 中使用

## DateTimePickerWidget
> 内部做时间日期选择使用，一般不要配置自定义 `widget` 中使用


