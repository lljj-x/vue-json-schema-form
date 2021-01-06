/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */

export default {
    name: 'DateTimePickerWidget',
    functional: true,
    render(h, context) {
        const { isNumberValue, isRange, ...otherProps } = context.data.attrs || {};

        context.data.attrs = {
            type: isRange ? 'datetimerange' : 'datetime',
            ...otherProps
        };

        // 字符串为 0 时区ISO标准时间
        const oldInputCall = context.data.on.input;
        context.data.on = {
            ...context.data.on,
            input(val) {
                let trueVal;
                if (isRange) {
                    trueVal = (val === null) ? [] : val.map(item => (new Date(item))[isNumberValue ? 'valueOf' : 'toISOString']());
                } else {
                    trueVal = (val === null) ? undefined : (new Date(val))[isNumberValue ? 'valueOf' : 'toISOString']();
                }

                oldInputCall.apply(context.data.on, [trueVal]);
            }
        };

        return h('el-date-picker', context.data, context.children);
    }
};
