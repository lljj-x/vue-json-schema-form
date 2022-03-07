/**
 * Created by Liu.Jun on 2021/2/23 10:21 下午.
 */

import { h } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

const baseComponent = {
    name: 'DatePickerWidget',
    inheritAttrs: false,
    setup(props, { attrs }) {
        return () => {
            const {
                isNumberValue, isRange, modelValue, 'onUpdate:modelValue': onUpdateFormattedValue, ...otherAttrs
            } = attrs;
            const trueValue = isRange ? (modelValue && modelValue.length === 0 ? null : modelValue) : modelValue;

            return h(resolveComponent('n-date-picker'), {
                type: isRange ? 'datetimerange' : 'datetime',
                ...otherAttrs,
                ...isNumberValue ? {
                    value: trueValue,
                    onUpdateValue: onUpdateFormattedValue
                } : {
                    valueFormat: isNumberValue ? 'T' : 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
                    formattedValue: trueValue,
                    onUpdateFormattedValue,
                }
            });
        };
    }
};

export default baseComponent;
