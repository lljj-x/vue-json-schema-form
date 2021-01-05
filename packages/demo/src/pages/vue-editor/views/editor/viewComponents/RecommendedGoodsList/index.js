/**
 * Created by Liu.Jun on 2020/04/28 14:24.
 */

import propsSchema from './RecommendedGoodsList.json';
import uiSchema from './uiSchema.json';

const View = () => import('./component/View.vue');

export default {
    View,
    propsSchema,
    uiSchema
};
