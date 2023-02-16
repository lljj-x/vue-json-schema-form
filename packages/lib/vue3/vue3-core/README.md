# @lljj/vue3-form-core
vue3 版本核心，可以基于此适配不同的 vue3 ui库。

适配的核心就是对应类型为自己的组件库，且处理默认 `props` 与自己组件库 props 之间的转换

> 适配方案可参见 [@lljj/vue3-form-element](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue3/vue3-form-element) 、[@lljj/vue3-form-ant](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue3/vue3-form-ant)


## 兼容性
npm 包直接为 es6+ 源码，需要在构建 lib 时通过babe转义

如配置 rollup babel plugin：

```js
babel({
    exclude: /node_modules\/(?!(@lljj)\/).*/, // 忽略跳过 @lljj
    extensions: ['.js', '.vue'],
})
```

## 安装

```ssh
## npm
npm install --save @lljj/vue3-form-core

## yarn
yarn add @lljj/vue3-form-core
```

## 使用方法

按如下格式，配置对应组件在当前组件库中的映射关系，可以直接配置全局组件名或者组件构造函数，`默认组件 props 为elementUi格式，如果props格式不同需要中间组件来做转换`；

```js
import createVue2Core from '@lljj/vue3-form-core';

const globalOptions = {
    // widget组件和现有组件库映射关系
    WIDGET_MAP: {
        // 默认按schema type 映射默认widget组件
        types: {
            // type  boolean
            boolean: 'el-switch',

            // type  string
            string: 'el-input',

            // type number
            number: 'el-input-number',

            // type integer
            integer: 'el-input-number',
        },

        // 按 schema format 映射默认widget组件，优先级高于 types
        formats: {
            // format: color
            color: 'el-color-picker',

            // format: time
            time: TimePickerWidget, // 格式 20:20:39+00:00

            // format: date
            date: DatePickerWidget, // 格式 2018-11-13

            // format: date-time
            'date-time': DateTimePickerWidget, // 格式 2018-11-13T20:20:39+00:00
        },

        // 一些公共常用类型
        common: {
            // select option
            select: SelectWidget,

            // radio
            radioGroup: RadioWidget,

            // checkout
            checkboxGroup: CheckboxesWidget,
        },

        // 这里配置一些 为当前ui库适配过的组件，会在运行时自动注册为全局组件，不注册为全局也可不配置
        // Vue3 只有在组件内才能获取到当前的app，所以注册时机是在 form组件setup中，且只会注册一次。
        widgetComponents: {
            CheckboxesWidget,
            RadioWidget,
            SelectWidget,
            TimePickerWidget,
            DatePickerWidget,
            DateTimePickerWidget
        }
    },

    // 其它表单相关组件映射关系
    COMPONENT_MAP: {
        // form组件
        form: 'el-form',

        // formItem 组件
        formItem: 'el-form-item',

        // button 组件
        button: 'el-button',

        // popover，用在formLable 左右布局时鼠标移入显示description
        popover: 'el-popover'
    },
    HELPERS: {
        // 是否mini显示 description
        isMiniDes(formProps) {
            return formProps && ['left', 'right'].includes(formProps.labselPosition);
        }
    }
};

const mySchemaForm = createVue2Core(globalOptions);

```

适配一个新的ui框架只需要适配如上的组件即可

## License
Apache-2.0
