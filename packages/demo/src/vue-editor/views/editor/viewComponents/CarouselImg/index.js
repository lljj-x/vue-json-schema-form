/**
 * Created by Liu.Jun on 2019/12/4 15:06.
 */

import propsSchema from './CarouselImg.json';
import uiSchema from './uiSchema.json';

const View = () => import('./component/View.vue');

const NAME = propsSchema.id;
const componentViewName = `${NAME}View`;

const customRule = ({
    field,
    value,
    rootFormData,
    callback
}) => {
    if (field === 'imgList.0.dateTimeArray') {
        return callback('永远校验失败');
    }

    return callback();
};

export {
    componentViewName,
    View,
    propsSchema,
    uiSchema,
    customRule
};
