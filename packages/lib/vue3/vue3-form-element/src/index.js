/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import createVue3Core, { fieldProps, SchemaField } from '@lljj/vue3-form-core';


import i18n from '@lljj/vjsf-utils/i18n';
import * as vueUtils from '@lljj/vjsf-utils/vue3Utils';
import * as formUtils from '@lljj/vjsf-utils/formUtils';
import * as schemaValidate from '@lljj/vjsf-utils/schema/validate';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import WIDGET_MAP from './config/widgets/WIDGET_MAP.js';

import './style.css';

const globalOptions = {
    WIDGET_MAP,
    COMPONENT_MAP: {
        form: 'el-form',
        formItem: 'el-form-item',
        button: 'el-button',
        popover: 'el-popover'
    },
    ICONS_MAP: {
        question: 'el-icon-question',
        moveUp: 'el-icon-caret-top',
        moveDown: 'el-icon-caret-bottom',
        close: 'el-icon-close',
        plus: 'el-icon-plus'
    }
};

const JsonSchemaForm = createVue3Core(globalOptions);

// 存在Vue 全局变量默认注册 VueForm 组件
// if (typeof window !== 'undefined' && window.Vue) {
//     window.Vue.component('VueForm', src);
// }

export default JsonSchemaForm;

export {
    globalOptions,
    SchemaField,
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n
};
