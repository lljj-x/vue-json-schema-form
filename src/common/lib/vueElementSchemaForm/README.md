
### 基础格式
> 基本格式参见 `JSON Schema`
> 数据使用对象格式，对象更加直观，也可有序排序

参考链接：
> [https://json-schema.org/understanding-json-schema/index.html](https://json-schema.org/understanding-json-schema/index.html)
> [https://juejin.im/post/5b5533e3e51d45195c0747b8](https://juejin.im/post/5b5533e3e51d45195c0747b8)

### 我们实际情况：
> 基于 `JSON Schema draft 06`, 加上我们需要的扩展
> 流行的校验库： 
> * https://github.com/epoberezkin/ajv
> * https://github.com/korzio/djv
> * https://github.com/ebdrup/json-schema-benchmark

确认使用：
* `jsonschema` 作为数据校验库 https://github.com/tdegrunt/jsonschema
* `djvi` 生成模拟数据  https://github.com/korzio/djvi


详细的参考如下：

## 我们添加的值 - formItem
`这里的划重点`
* formItem - 对象，用以描述当前数据在编辑状态下，form 表单的调用组件和参数配置
* fromItem.inputType - 字符串 - 调用的组件类型， 会通过 vue render函数渲染
* fromItem.props - 传给如上组件的参数，如果参数以 `@` 开头，会认为是对语言key，会通过多语言方法处理 `$t(@placeholder1)`，值为对象可以支持多语言参数传递 `$t(@placeholder1.key, [@placeholder1.params])`

如下例子：
```json
{
    "formItem": {
        "inputType": "el-input",
        "props": {
            "placeholder": "请输入内容",
            "@placeholder1": "goods.list.pleaseInput",
            "@placeholder2": {
              "key": "goods.list.pleaseInput",
              "params": [1, 2]
            }
        }
    }
}
```

## Type-specific keywords - 特定类型的关键字

#### string
#### number
#### object
#### array
#### boolean
#### null

## 通用关键字 - Generic keywords
### 备注 - Annotations
* title - *字符串，将优选简短*
* description - *字符串，描述的数据的目的的更冗长的解释*
* default - *关键字指定的项目的默认值*
* examples - 提供一系列针对该模式进行验证的示例的地方。不用于验证，但是可以帮助向读者解释该模式的效果和目的

`Annotations 关键字都不是必需的，但鼓励您进行良好的实践，它们可以使您的模式“自我记录”。`

例子：
```json
{
    "title" : "Match anything",
    "description" : "This is a schema that matches anything.",
    "default" : "Default value",
    "examples" : [
    "Anything",
    4035
    ]
}
```

### 注释 - Comments
**New in draft 7**

* $comment - 关键字严格用于添加注释，不包含含义和行为附加，也可以删除，为后人的编辑提供信息。

### 枚举值 - Enumerated values
* enum
> 所述enum关键字被用于限制值，以一个固定的一组值。它必须是一个至少包含一个元素的数组，其中每个元素都是唯一的。

```json
{
  "type": "string",
  "enum": ["red", "amber", "green"]
}
```







