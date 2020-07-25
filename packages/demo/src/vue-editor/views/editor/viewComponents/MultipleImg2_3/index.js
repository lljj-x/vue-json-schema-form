/**
 * Created by Liu.Jun on 2019/12/4 15:06.
 */

import propsSchema from './schema.json';
import uiSchema from './uiSchema.js';
import errorSchema from './errorSchema.js';

const View = () => import('./View.vue');

const NAME = propsSchema.id;
const componentViewName = `${NAME}View`;

export {
    componentViewName,
    View,
    propsSchema,
    uiSchema,
    errorSchema
};
