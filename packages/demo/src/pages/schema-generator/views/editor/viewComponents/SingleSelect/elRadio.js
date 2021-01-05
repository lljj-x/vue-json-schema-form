/**
 * Created by Liu.Jun on 2020/12/10 15:41.
 */

import baseRadio from './index';

const viewSchema = {
    title: '单选(Radio)',
    type: 'string',
    'ui:widget': 'RadioWidget'
};

export default {
    viewSchema,
    propsSchema: baseRadio.propsSchema
};
