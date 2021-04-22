# @lljj/vue3-form-ant

基于 [Antd Vue](https://2x.antdv.com/components/overview-cn/) 、Vue3、 [JSON Schema](https://json-schema.org/understanding-json-schema/index.html) 生成表单

> 通过 [@lljj/vue3-form-core](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue3/vue3-core) 适配 ElementPlus 库

## 安装

```ssh
## npm
npm install --save @lljj/vue3-form-ant

## yarn
yarn add @lljj/vue3-form-ant
```

## 使用
```html
<VueForm
    v-model="formData"
    :schema="schema"
>
</VueForm>
```

```js
//  使用
import VueForm from '@lljj/vue3-form-ant';

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
                        'ui:options': {
                            placeholder: '请输入你的签名',
                            type: 'textarea',
                            rows: 1
                        }
                    }
                }
            }
        };
    }
};
```

## License
Apache-2.0
