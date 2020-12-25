/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '颜色选择器',
    type: 'string',
    format: 'color'
};
export default {
    viewSchema,
    propsSchema: genSchema()
};
