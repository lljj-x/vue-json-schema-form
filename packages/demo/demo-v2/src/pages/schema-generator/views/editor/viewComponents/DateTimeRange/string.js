/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import baseData from './index';

export default {
    viewSchema: {
        ...baseData.viewSchema,
        title: 'DateTime范围(字符串)',
        items: {
            type: 'string'
        }
    },
    propsSchema: baseData.propsSchema
};
