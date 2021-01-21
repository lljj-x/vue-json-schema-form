/**
 * Created by Liu.Jun on 2020/5/19 9:49 下午.
 */

import { h } from 'vue';
import SelectLinkageField from '../SelectLinkageField';

export default {
    name: 'oneOfField',
    setup(props, { attrs, slots }) {
        return () => h(SelectLinkageField, {
            ...attrs,
            combiningType: 'oneOf',
            selectList: attrs.schema.oneOf
        }, slots);
    }
};
