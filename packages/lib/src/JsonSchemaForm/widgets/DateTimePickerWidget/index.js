/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */

export default {
    name: 'DateTimePickerWidget',
    functional: true,
    render(h, context) {
        const { isNumber, ...otherProps } = context.data.props;

        context.data.props = {
            type: 'datetime',
            ...otherProps
        };

        // 字符串为 0 时区标准时间
        const oldInputCall = context.data.on.input;
        context.data.on = {
            ...context.data.on,
            input(val) {
                oldInputCall.apply(context.data.on, [(new Date(val))[isNumber ? 'valueOf' : 'toISOString']()]);
            }
        };

        return h('el-date-picker', context.data, context.children);
    }
};
