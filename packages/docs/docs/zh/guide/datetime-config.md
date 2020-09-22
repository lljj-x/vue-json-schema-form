# 日期时间配置
* 详细配置demo参见这里：[在线演示 dateTime](https://form.lljj.me/#/demo?type=Date-DateTime)

:::warning
对type为 `number` `array` 类型配置 `format` 这里打破了 `JSON Schema` 规范
:::

支持配置如下三种 `format` 配置时间和日期

## format `date-time`
使用日期时间格式选择器渲染，`支持区间选择`

* 支持配置 type `number` `string` `array`
* `string`：`2018-11-13T20:20:39+00:00` ISO字符串格式
* `number`： `1595492397822` 数字时间戳格式
* `array`：使用区间选择

>* 如果配置了 type `array` ，那么必须要在 items type 里面配置里面申明类型（`number` | `string`）
>* 如下：日期时间区间选择，使用 `string` 类型

> ```json
> {
>   "dateTimeRange": {
>     "title": "日期时间区间选择",
>     "type": "array",
>     "format": "date-time",
>     "items": {
>       "type": "string"
>     }
>     }
>  }
> ```

## format `date`
使用日期格式选择器渲染，`支持区间选择`

* 支持配置 type `number` `string` `array`
* 和 [format-date-time](#format-date-time) 配置一致

## format `time`
* 只支持支持配置 type `string` 格式 `16:04:41`
* 不支持配置区间
