---
home: true
pageClass: custom-page-home
heroImage: /logo.png
heroText: Vue JSON Schema Form
tagline: Quickly building HTML form based on Vue and JSON Schema
footer: Apache2.0 Licensed | Copyright © 2020-2020 Jun
# actionText: Quick start →
# actionLink: /en/guide/
---

## Experience quickly
* [Live playground](https://form.lljj.me/ "Vue JSON Schema Form Demo")
* [Document](https://vue-json-schema-form.lljj.me/ "Vue JSON Schema Docs")
* [Github](https://github.com/lljj-x/vue-json-schema-form "Vue JSON Schema github")
* [Usage scenario - visual activity editor](https://form.lljj.me/vue-editor.html)
* [Partial plan and update plans are not supported](/zh/guide/todo.html)

``` bash
# NPM
npm install --save @lljj/vue-json-schema-form

# Yarn
yarn add @lljj/vue-json-schema-form
```

```vue
<template>
    <VueForm
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
    >
    </VueForm>
</template>

<script >
import VueForm from '@lljj/vue-json-schema-form';

export default {
    name: 'Demo',
    components: {
        VueForm
    },
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

## DEMO
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
                        default: 'This is default bio .',
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

## Relevant
[JSON Schema](https://json-schema.org/understanding-json-schema/index.html) |
[Vue](https://cn.vuejs.org/) |
[Element Ui](https://element.eleme.io/)

## Why
Originated from shop decoration scenes, it can also be called front-end visual editing. In order to solve the universality of the component data configuration form, the form is generated through `JsonSchema`.

The advantage of this is to solve the repetitive work of each configuration form, and the server can also maintain the same verification rules as the front-end based on the same schema.
