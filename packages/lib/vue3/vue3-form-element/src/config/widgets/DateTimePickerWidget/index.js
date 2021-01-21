/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */

import { h } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

export default {
    name: 'DateTimePickerWidget',
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
        return () => {
            const { isNumberValue, isRange, ...otherProps } = attrs || {};

            return h(resolveComponent('el-date-picker'), {
                type: isRange ? 'datetimerange' : 'datetime',
                ...otherProps,

                'onUpdate:modelValue': (val) => {
                    let trueVal;
                    if (isRange) {
                        trueVal = (val === null) ? [] : val.map(item => (new Date(item))[isNumberValue ? 'valueOf' : 'toISOString']());
                    } else {
                        trueVal = (val === null) ? undefined : (new Date(val))[isNumberValue ? 'valueOf' : 'toISOString']();
                    }

                    attrs['onUpdate:modelValue'].apply(attrs, [trueVal]);
                }
            }, slots);
        };
    }
};
