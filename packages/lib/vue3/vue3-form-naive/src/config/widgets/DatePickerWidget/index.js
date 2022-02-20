/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */

import { h } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

import { parseDateString } from '@lljj/vjsf-utils/utils';

function isEmptyValue(value) {
    return value === null || value === '' || (Array.isArray(value) && value.every(item => item === ''));
}

const formatDateStr = (dateString) => {
    const {
        year,
        month,
        day
    } = parseDateString(dateString, false);
    return `${year}-${month}-${day}`;
};

export default {
    name: 'DatePickerWidget',
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
        return () => {
            const { isNumberValue, isRange, ...otherProps } = attrs || {};
            return h(resolveComponent('el-date-picker'), {
                type: isRange ? 'daterange' : 'date',
                ...otherProps,
                'onUpdate:modelValue': (val) => {
                    let trueVal;
                    if (isRange) {
                        trueVal = isEmptyValue(val)
                            ? []
                            : val.map(
                                item => (isNumberValue ? (new Date(item)).valueOf() : formatDateStr(item, isNumberValue))
                            );
                    } else {
                        trueVal = isEmptyValue(val)
                            ? undefined
                            : isNumberValue ? (new Date(val)).valueOf() : formatDateStr(val, isNumberValue);
                    }
                    attrs['onUpdate:modelValue'].apply(attrs, [trueVal]);
                }
            }, slots);
        };
    }
};
