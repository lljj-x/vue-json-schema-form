# 设计实现

## 表单渲染
基于组件递归的形式，逐级渲染数据，如下图：（点击放大）
![Vjsf](/vjsf.jpg)

:::tip 递归说明
* `schema` `ui-schema` `error-schema` 是基于递归逐个节点拆解渲染，这部分数据基本不会变化。
* `formData` 用户输入时会高频变化的数据，为了避免每次输入导致整棵树的渲染。
这里通过当前节点path字符串 `curNodePath` 和根节点formData `rootFormData` 解析当前值。
> 比如：`curNodePath` 为 `userInfo.userName`，可以很轻松的获取或者设置当前节点的值
>> 这里提供公共方法
>> ```js
>> import { vueUtils } from '@lljj/vue-json-schema-form';
>>
>> // get
>> vueUtils.getPathVal(rootFormData, curNodePath);
>>
>> // set
>> vueUtils.setPathVal(rootFormData, curNodePath, value);
>> ```
:::

## 如何校验数据
校验使用 [ajv](https://github.com/epoberezkin/ajv) 校验schema，搭配 [error-schema](/zh/guide/basic-config.html#error-schema) 自定义校验错误提示

#### 数据是通过逐级拆分校验的
举个例子：

```js
// 如下schema
schema = {
     type: 'object',
     minProperties: 2,
     required: [
         'firstName',
         'lastName'
     ],
     properties: {
         firstName: {
             type: 'string',
             title: 'First name',
             default: 'Jun'
         },
         lastName: {
             type: 'string',
             title: 'Last name'
         }
     }
};

// formData
formData = {
    firstName: 'Jun'
}
```

进行如下拆分：
![vjsf-vaidate](/vjsf-vaidate.jpg)

上面的schema会拆分为下面三处校验，分别是依次对属性property值和和对object自身。

#### 为何如此 ？
方便将每个叶子节点的校验定义在 `formItem` 上，用户输入时，只校验用户操作的输入框。

好处：
> 可以只校验当前活动的输入框计算会更快，省去了对整个表单校验再去匹配ajv到每个formItem的步骤，同时也不会导致非活动的输入框提示出校验信息。

弊端：
> 有些属性是无法拆分到叶子节点上，比如 object的minProperties，array的minItems，oneOf，anyOf等
>* 所以会在 `object`，`array`，`oneOf`，`anyOf` 节点会加一个单独的校验，在 `submit` 的时候触发校验，如上图 `object校验`

#### 特殊处理： `required` 配置
`object required` 会拆分到每个 `property` 里面去校验，通过 `object field`  计算每个 `property` 是否需要 `required`

```js
// 伪代码 - required 通过父节点传递props
function render(h) {
    const propertiesVnode = propertiesNameList.map(name => {
        return h(
            ChildField,
            {
                props: {
                    ...,
                    required: Array.isArray(schema.required)
                        && schema.required.includes(name),
                }
            }
        );
    });
}
```

:::tip
对于 `array` 类型，每个 `item` 都是 `required`
:::

#### 其它补充
`error-schema` 和 `ui-schema` 配置数据结构都是和 `schema` 保持一致，如果和formData保持一致，
会导致一些场景无法配置到，比如 `anyOf`，所以选择如此。

## 设计思想

* 设计思想借鉴[react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)，
在对schema的解析索引也使用了 `react-json-schema` 的源码，同时也顺便解决了一些原有的小问题。

* 在用户输入的时候可以最小程度的重新渲染，做到在绝大部分的场景都是只需要重新渲染输入内容的 `Widget` 组件。
