# 设计实现

## 表单渲染
基于组件递归的形式，逐级渲染数据，如下图：（点击放大）
![Vjsf](/Vjsf.jpg)

:::tip 递归说明
* `schema` `uiSchema` `errorSchema` 是基于递归逐个节点拆解渲染，这部分数据基本不会变化。
* `formData`在用户输入是需要高频变化的数据，为了避免每次输入导致整棵树的渲染。
这里通过当前节点path `curNodePath` 和根节点formData `rootFormData` 解析当前值。
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

## 数据校验
数据校验使用 [ajv](https://github.com/epoberezkin/ajv) 校验schema，搭配 `errorSchema` 自定义校验信息

#### **schema数据是通过逐级校验的，而非全量校验**

举个例子：
![vjsf-vaidate](/vjsf-vaidate.jpg)
这里上面的schema会拆分为下面三处校验，分别是对属性property和对object自身。
。。。todo:写文档了

#### **为何如此 ？**

错误校验逐级校验的好处和带来的问题

#### 特殊处理：`object` `required` 配置
对required 的校验是放在每个 property 里面去校验的，保证校验提示在具体的property上

#### **其它补充**
校验错误配置 `errorSchema` 和 `uischema` 配置都是和 `schema` 保持一致，如果和formData保持一致，
会导致一些场景无法配置到，比如 `anyOf` 但这样确实更简单点。

后续会考虑 `uiSchema`、`errorSchema` 可以支持配置 `schema` 文件中来减少这份配置。


## 设计思想

* 设计思想借鉴[react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)，
在对schema的解析索引也使用了 `react-json-schema` 的源码。

* 在项目中所有被递归的都是低频率变化的，故意区分了schema和formData的处理方式。尽量让用户输入的时候可以最小程度的重新渲染，
在绝大部分的场景都是只需要重新render输入内容的最小`Widget`，oneof anyof会不同，因为需要依赖用户输入的的值来改变form的展现形态。

