# Introduction

## Quick start

* Install

``` bash
# npm
npm install --save @lljj/vue-json-schema-form

# yarn
yarn add @lljj/vue-json-schema-form
```

* Import

```js
import VueForm from '@lljj/vue-json-schema-form';
```

* CDN
```html
# As a script served from a CDN
<script src="//cdn.jsdelivr.net/npm/@lljj/vue-json-schema-form/dist/vueJsonSchemaForm.umd.min.js"></script>
```

::: tip Global import
* Register global components `VueForm`
* Expose global variables `window.vueJsonSchemaForm`
:::

## DEMO
Demonstrate the form of rendering user information, click the display code to view the source code or run it in `codepen`

::: demo
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
                        title: 'Username',
                        default: 'Liu.Jun',
                    },
                    age: {
                        type: 'number',
                        title: 'Age'
                    },
                    bio: {
                        type: 'string',
                        title: 'Bio',
                        minLength: 10,
                        default: 'The more you know, the less you know',
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:options': {
                        placeholder: 'Please enter your bio.',
                        type: 'textarea',
                        rows: 1
                    }
                }
            }
        };
    }
};
</script>
```
:::

## Basic concepts
Generate the HTML forms through `JSON Schema`

* Schema `title` attribute as the title of the form
* Schema `description` attribute as the description of the form

Based on the form of component recursion, the data is rendered step by step, as shown in the following figure .
![Vjsf](/vjsf.jpg)

Two concepts are involved, Field and Widget

* `Field` is used to render the component corresponding to each node. It can be any node. Generally, the component will contain the `FormItem` component
* `Widget` is a component used to render user input information, such as `input` and `select`, which are wrapped by the `FormItem` component

> `Field` and `Widget` can pass `uiSchema`
>
> [Custom Field](/zh/guide/adv-config.html#自定义field)、[Custom Widget](/zh/guide/adv-config.html#自定义widget)

## Exposure methods
```js
import VueForm, {
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n
} from '@lljj/vue-json-schema-form';
```

####  VueForm
Export VueForm components by default.

#### getDefaultFormState
Calculate the current value of `FormState` through `JSON Schema`
* Parameters: (`schema`, `formData`, `rootSchema`, `includeUndefinedValues`)

>* Schema `object` The schema to be calculated
>* FormData `object` current formData value, no `undefined` can be passed
>* RootSchema `object` The root node schema of the schema to be calculated
>* IncludeUndefinedValues `boolean` whether to include undefined values, the default is `true`

> Do not use `uiSchema`, `ui:field` is generally not used

#### fieldProps
Field props configuration, if you need to use `ui:field` to customize the field component, you need to use it to define component props.
> Do not use `uiSchema`, `ui:field` is generally not used

#### vueUtils
Provide some internal Vue-related utils methods, the details can be [see source code](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/src/JsonSchemaForm/common/vueUtils.js)
> Do not use `uiSchema`, `ui:field` is generally not used

#### formUtils
Provide some internal Form-related utils methods, which can be detailed [see source code](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/src/JsonSchemaForm/common/formUtils.js)
> Do not use `uiSchema`, `ui:field` is generally not used

#### schemaValidate
Provide some internal verification schema-related methods, the details can be [see source code](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/src/JsonSchemaForm/common/schema/validate.js)
> Do not use `uiSchema`, `ui:field` is generally not used

## Description
* Follow the JSON Schema specification, only need to give the `Json Schema`, you can generate the corresponding form
* Quickly configure personalized UI views and check error messages, which can be adapted to commonly used ui libraries. The default view of the current version depends on elementUi, and subsequent versions will be decoupled. You can adapt ElementUi, iView or your own development through configuration Component library
* Use [ajv](https://github.com/epoberezkin/ajv) for form schema verification
* Design ideas and reference to schema analysis index [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)
