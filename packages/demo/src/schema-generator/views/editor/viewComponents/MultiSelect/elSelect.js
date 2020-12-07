/**
 * Created by Liu.Jun on 2020/12/10 15:53.
 */

import baseMulti from './index';

export default {
    viewSchema: {
        ...baseMulti.viewSchema,
        title: '多选(Select)',
        'ui:widget': 'SelectWidget'
    },
    propsSchema: baseMulti.propsSchema
};
