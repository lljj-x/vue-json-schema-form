/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '输入框',
    type: 'string'
};

export default {
    viewSchema,
    propsSchema: genSchema()
};
