# @lljj/vjsf-utils
表单基础通用工具类，具体的参数可参见源码

## @lljj/vjsf-utils/i18n
 管理当前多语言


## @lljj/vjsf-utils/schema/getDefaultFormState
根据 jsonSchema 和 formData，计算当前schema value

## @lljj/vjsf-utils/schema/validate

```js
import {
    ajvValidateFormData,
    validateFormDataAndTransformMsg,
    isValid
} from '@lljj/vjsf-utils/schema/validate';

// 直接调用 ajv 验证schema，返回格式化后的结果
ajvValidateFormData(...args);

// 校验数据并处理多语言(只处理当前节点)
validateFormDataAndTransformMsg(...args);

// 返回数据是否校验成功
isValid(...args);

// 返回数据是否校验成功
isValid(...args);
```

## @lljj/vjsf-utils/arrayUtils
数组相关的工具类

## @lljj/vjsf-utils/formUtils
表单相关的工具类

## @lljj/vjsf-utils/vueUtils
Vue相关的工具类
