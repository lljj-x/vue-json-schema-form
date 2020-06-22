# 介绍

## 快速开始
``` bash
# 安装
npm install --save @lljj/vue-json-schema-form

# yarn
yarn add @lljj/vue-json-schema-form
```

```html
# script引入 unpkg CDN
<script src="//unpkg.com/@lljj/vue-json-schema-form/dist/vueJsonSchemaForm.umd.min.js"></script>
<script>
    Vue.component('vue-form', vueJsonSchemaForm.default);
</script>
```

## DEMO
::: demo 这里代码省略导入和使用组件 // import VueForm from '@lljj/vue-json-schema-form';
```html
<template>
    <vue-form
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {},
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '用户名',
                        default: 'Liu.Jun',
                    },
                    age: {
                        type: 'number',
                        title: '年龄'
                    },
                    bio: {
                        type: 'string',
                        title: '签名',
                        minLength: 10,
                        default: '知道的越多、就知道的越少',
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:options': {
                        placeholder: '请输入你的签名',
                        type: 'textarea',
                        row: 1
                    }
                }
            }
        };
    }
};
</script>
```
:::

## 参数 props
### formFooter
表单footer配置 - object
默认：
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
