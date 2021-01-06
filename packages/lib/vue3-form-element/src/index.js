/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import createVue2Core from '@lljj/vue3-form-core';

import WIDGET_MAP from './config/widgets/WIDGET_MAP.js';

// import i18n from '@lljj/vjsf-utils/i18n';
// import * as vueUtils from '@lljj/vjsf-utils/vueUtils';
// import * as formUtils from '@lljj/vjsf-utils/formUtils';
// import * as schemaValidate from '@lljj/vjsf-utils/schema/validate';
// import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';

// import fieldProps from '@lljj/vue2-form-core/JsonSchemaForm/fields/props';
// import SchemaField from './JsonSchemaForm/fields/SchemaField';

import './style.css';

const JsonSchemaForm = createVue2Core(Object.freeze({
    WIDGET_MAP: Object.freeze(WIDGET_MAP),
    COMPONENT_MAP: Object.freeze({
        form: 'el-form',
        formItem: 'el-form-item',
        button: 'el-button',
        popover: 'el-popover'
    }),
    ICONS_MAP: Object.freeze({
        question: 'el-icon-question',
        moveUp: 'el-icon-caret-top',
        moveDown: 'el-icon-caret-bottom',
        close: 'el-icon-close',
        plus: 'el-icon-plus'
    })
}));

export default JsonSchemaForm;

// 存在Vue 全局变量默认注册 VueForm 组件
// if (typeof window !== 'undefined' && window.Vue) {
//     window.Vue.component('VueForm', JsonSchemaForm);
// }

// export {
//     SchemaField,
//     fieldProps,
//
//     getDefaultFormState,
//     vueUtils,
//     formUtils,
//     schemaValidate,
//     i18n
// };
