/**
 * Created by Liu.Jun on 2020/7/25 15:23.
 */

import propsSchema from './schema.json';
import uiSchema from './uiSchema';

const View = () => import('./View.vue');

const NAME = propsSchema.id;
const componentViewName = `${NAME}View`;

export {
    componentViewName,
    View,
    propsSchema,
    uiSchema
};
