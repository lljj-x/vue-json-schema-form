/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 * IntegerField 复用StringField
 */

import { h } from 'vue';
import vueProps from '../props';
import StringField from '../StringField';

export default {
    name: 'IntegerField',
    props: vueProps,
    setup(props, { attrs }) {
        return () => h(StringField, {
            ...props,
            ...attrs
        });
    }
};
