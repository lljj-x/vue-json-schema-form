/**
 * Created by Liu.Jun on 2021/2/23 10:21 下午.
 */

import { h } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

const baseComponent = {
    name: 'TimePickerWidget',
    inheritAttrs: false,
    setup(props, { attrs }) {
        return () => {
            const {
                modelValue, 'onUpdate:modelValue': onUpdateFormattedValue, ...otherAttrs
            } = attrs;

            return h(resolveComponent('n-time-picker'), {
                ...otherAttrs,
                valueFormat: 'HH:mm:ss',
                formattedValue: modelValue,
                onUpdateFormattedValue,
            });
        };
    }
};

export default baseComponent;
