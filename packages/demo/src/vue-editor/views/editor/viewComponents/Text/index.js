/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import propsSchema from './propsSchema.json';
import uiSchema from './uiSchema.json';

const View = () => import('./View.vue');

// Text
const NAME = propsSchema.id;
const componentViewName = `${NAME}View`;

export {
    componentViewName,
    View,
    propsSchema,
    uiSchema
};
