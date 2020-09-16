/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 * IntegerField 复用StringField
 */

import vueProps from '../props';
import StringField from '../StringField';

export default {
    name: 'IntegerField',
    props: vueProps,
    functional: true,
    render(h, context) {
        return h(StringField, context.data);
    }
};
