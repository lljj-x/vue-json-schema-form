/**
 * Created by Liu.Jun on 2020/04/28 14:24.
 */

import propsSchema from './HotPickGoodsList.json';
import uiSchema from './uiSchema.json';

const View = () => import('./component/View.vue');

const NAME = propsSchema.id;
const componentViewName = `${NAME}View`;

export {
    componentViewName,
    View,
    propsSchema,
    uiSchema
};
