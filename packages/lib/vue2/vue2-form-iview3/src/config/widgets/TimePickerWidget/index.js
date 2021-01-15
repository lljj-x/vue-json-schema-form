/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */

export default {
    name: 'TimePickerWidget',
    functional: true,
    render(h, context) {
        const oldInputCall = context.data.on.input;
        context.data.on = {
            ...context.data.on,
            input(val) {
                oldInputCall.apply(context.data.on, [val === null ? undefined : val]);
            }
        };

        return h('time-picker', context.data, context.children);
    }
};
