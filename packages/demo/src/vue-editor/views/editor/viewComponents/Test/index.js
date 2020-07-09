/**
 * Created by Liu.Jun on 2020/5/7 10:31 下午.
 */

import propsSchema from './Test.json';

const View = () => import('./View.vue');

const NAME = propsSchema.id;
const componentViewName = `${NAME}View`;

export {
    componentViewName,
    View,
    propsSchema
};
