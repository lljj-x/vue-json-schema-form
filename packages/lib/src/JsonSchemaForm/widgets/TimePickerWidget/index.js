/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */

export default {
    name: 'TimePickerWidget',
    functional: true,
    render(h, context) {
        context.data.props = {
            'value-format': 'HH:mm:ss',
            ...context.data.props
        };
        return h('el-time-picker', context.data, context.children);
    }
};
