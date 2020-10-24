/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import propsSchema from './propsSchema.json';
import uiSchema from './uiSchema.js';

const View = () => import('./View.vue');

export default {
    View,
    propsSchema,
    uiSchema
};
