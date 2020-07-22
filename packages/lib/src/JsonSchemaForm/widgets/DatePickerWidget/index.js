/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */

export default {
    name: 'DatePickerWidget',
    functional: true,
    render(h, context) {
        const { isNumber, ...otherProps } = context.data.props;

        context.data.props = {
            type: 'date',
            'value-format': isNumber ? 'timestamp' : 'yyyy-MM-dd',
            ...otherProps
        };
        return h('el-date-picker', context.data, context.children);
    }
};
