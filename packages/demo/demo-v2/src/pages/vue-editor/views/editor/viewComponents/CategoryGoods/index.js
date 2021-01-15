/**
 * Created by Liu.Jun on 2020/7/25 15:23.
 */

import propsSchema from './schema.json';
import uiSchema from './uiSchema';

const View = () => import('./View.vue');

export default {
    View,
    propsSchema,
    uiSchema
};
