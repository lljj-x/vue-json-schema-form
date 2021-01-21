/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */

import { h, ref, watch } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';
import { parseDateString } from '@lljj/vjsf-utils/utils';

const formatTimeStr = (dateString) => {
    const { hour, minute, second } = parseDateString(dateString, true);
    return `${hour}:${minute}:${second}`;
};

const formatTimeObj = (timeStr) => {
    if (timeStr instanceof Date) {
        return timeStr;
    }

    // 取当前时间 改时分秒
    if (typeof timeStr === 'string') {
        const [hours, minutes, seconds] = timeStr.split(':');
        const curTime = new Date();
        curTime.setHours(+hours);
        curTime.setMinutes(+minutes);
        curTime.setSeconds(+seconds);
        return curTime;
    }

    // 其它格式清空
    return undefined;
};

export default {
    name: 'TimePickerWidget',
    inheritAttrs: false,
    props: {
        modelValue: {
            default: null,
            type: null
        }
    },
    setup(props, { attrs, slots }) {
        // hack element plus timePicker 变为object类型
        const originValue = ref(formatTimeObj(props.modelValue));

        // 不需要响应式
        let formatValue = props.modelValue;

        // 如果外部修改了值
        watch(() => props.modelValue, (newVal) => {
            if (newVal !== formatValue) {
                // 更新内部值
                originValue.value = formatTimeObj(newVal);
            }
        });

        return () => h(resolveComponent('el-time-picker'), {
            ...attrs,
            modelValue: originValue.value,
            'onUpdate:modelValue': (val) => {
                originValue.value = val;

                // 更新并缓存内部 timeStr
                formatValue = val === null ? undefined : formatTimeStr(val);

                // 更新外部的值
                attrs['onUpdate:modelValue'].apply(attrs, [formatValue]);
            }
        }, slots);
    }
};
