/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import fieldProps from './JsonSchemaForm/fields/props';
import i18n from './JsonSchemaForm/i18n';

import * as vueUtils from './JsonSchemaForm/common/vueUtils';
import * as formUtils from './JsonSchemaForm/common/formUtils';
import * as schemaValidate from './JsonSchemaForm/common/schema/validate';

import getDefaultFormState from './JsonSchemaForm/common/schema/getDefaultFormState';

import JsonSchemaForm from './JsonSchemaForm';
import SchemaField from './JsonSchemaForm/fields/SchemaField';

// 存在Vue 全局变量默认注册 VueForm 组件
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('VueForm', JsonSchemaForm);
}

export default JsonSchemaForm;

export {
    SchemaField,
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n
};
