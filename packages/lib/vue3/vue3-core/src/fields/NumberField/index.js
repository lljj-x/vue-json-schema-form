/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 * NumberField 复用StringField
 */

import { h } from 'vue';
import vueProps from '../props';
import StringField from '../StringField';

export default {
    name: 'NumberField',
    props: vueProps,
    setup(props, { attrs }) {
        return () => h(StringField, {
            ...props,
            ...attrs
        });
    }
};
