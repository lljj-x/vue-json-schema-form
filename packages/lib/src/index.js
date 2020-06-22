/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import fieldProps from './JsonSchemaForm/fields/props';
import i18n from './JsonSchemaForm/i18n';

import * as vueUtils from './JsonSchemaForm/common/vueUtils';
import * as schemaUtils from './JsonSchemaForm/common/formUtils';
import * as schemaValidate from './JsonSchemaForm/common/schema/validate';

import JsonSchemaForm from './JsonSchemaForm';

// 存在Vue 全局变量默认注册 VueForm 组件
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('VueForm', JsonSchemaForm);
}

export default JsonSchemaForm;

export {
    fieldProps,
    vueUtils,
    schemaUtils,
    schemaValidate,
    i18n
};
