/**
 * Created by Liu.Jun on 2019/12/4 15:06.
 */

import propsSchema from './AllGoodsList.json';
import uiSchema from './uiSchema.json';

const View = () => import('./component/View.vue');

// 全部商品
const NAME = propsSchema.id;
const componentViewName = `${NAME}View`;

export {
    componentViewName,
    View,
    propsSchema,
    uiSchema
};
