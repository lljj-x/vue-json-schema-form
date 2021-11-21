# 数据校验

目前可以实现数据校验的方式有如下，三种
* [schema 校验](#schema-校验)
* [custom-rule自定义校验](#custom-rule-自定义校验)
* [ui:field自定义field校验](#自定义-field-校验)

:::tip
其中后两种方案是基于 `schema` 之外的校验，所以使用后接口将不能只使用 `schema` 校验数据，也需要重新实现类似自定义的校验
:::

## schema 校验
这里是完全基于遵循 `JSON Schema` 规范的校验规则，使用 [error-schema](/zh/guide/basic-config.html#error-schema) 配置校验错误提示。

> 建议在 `schema` 校验无法满足的时候选择下面两种方式

## custom-rule 自定义校验
* 类型：`function` 接收一个对象参数

格式如下：
```js
const customRule = ({
    field,
    value,
    rootFormData,
    callback
}) => {
    if (field === 'imgList.0.imgUrl') {
        return callback('永远校验失败');
    }
    return callback();
};
```

:::warning 各版本差异
* vue3 antd不包含callback参数，请使用Promise形式，如 `return Promise.reject('错误信息')`
:::

详细参数解释如下：
>* `field`： 当前节点的 `field` 路径，和 `formData` 数据结构对应， 通过 `.` 连接，如： `imgList.0.imgUrl`，
>实在不清楚可以通过 `Vue DevTools` 查看对应组件的 `curNodePath` 参数
>* `value`：当前节点的值，响应式数据，避免直接修改数据
>* `rootFormData`：根节点`formData`数据，响应式数据，避免直接修改数据
>* `callback`：`function` 必须调用 `callback` 返回当前的校验结果，不传参数说明校验通过

配置了 `custom-rule` 你将会获得最大程度的自定义校验，所有的表单项都会通过该方法处理。
调用者需要自行匹配 `field` 参数来判断是否为你所需要校验的字段。

:::tip
如果需要批量校验数组的每一项可使用正则表达式来匹配，如：
```js
// 这里可以选择你喜欢的方法找到你要校验的节点
// 比如匹配：imgList.0.imgUrl imgList.1.imgUrl ...
if (/imgList\.\d+\.imgUrl/.test(field)) {
    return callback('永远校验失败');
}
```
:::

### Demo：custom-rule

::: demo 通过 custom-rule 函数校验数据
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :custom-rule="customRule"
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
                    'password',
                    'password2'
                ],
                properties: {
                    password: {
                        type: 'string',
                        title: '请输入密码'
                    },
                    password2: {
                        type: 'string',
                        title: '请确认密码'
                    },
                    imgList: {
                        title: '图片列表',
                        type: 'array',
                        minItems: 1,
                        maxItems: 3,
                        items: {
                            type: 'object',
                            properties: {
                                imgUrl: {
                                    title: '图片地址',
                                    type: 'string',
                                    format: 'uri'
                                },
                                imgLink: {
                                    title: '图片链接地址',
                                    type: 'string',
                                    format: "uri"
                                }
                            },
                            required: [
                                'imgUrl',
                                'imgLink'
                            ]
                        }
                    }
                }
            },
            customRule: ({
                field,
                value,
                rootFormData,
                callback
            }) => {
                const rules = [{
                    rule: 'password2',
                    validator(value, rootFormData) {
                        if (value !== rootFormData.password) return '密码输入不一致';
                    }
                }, {
                    rule: /imgList\.\d+\.imgUrl/,
                    validator(value, rootFormData) {
                        if(!/^https/.test(value)) return '请输入https链接';
                    }
                }];

                for(const ruleItem of rules) {
                    // String | Regx
                    if ((String(ruleItem.rule) === ruleItem.rule && ruleItem.rule === field)
                            || (Object.prototype.toString.call(ruleItem.rule) === '[object RegExp]' && ruleItem.rule.test(field))
                    ) {
                        const error = ruleItem.validator(value, rootFormData);
                        // 停止继续校验
                        if (error) return callback(error);
                    }
                }
                return callback();
            }
        }
    }
}
</script>
```
:::

## 自定义 field 校验
通过 `ui-schema` 配置 `ui:field` 使用自定义 `field` 渲染，自定义field也就意味要自己实现输入组件渲染和数据校验。

* 点击查看 [自定义field](/zh/guide/adv-config.html#自定义field)
