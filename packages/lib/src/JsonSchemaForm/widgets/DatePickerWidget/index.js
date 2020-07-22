/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */

export default {
    name: 'DatePickerWidget',
    functional: true,
    render(h, context) {
        const { isNumberValue, isRange, ...otherProps } = context.data.props;

        context.data.props = {
            type: isRange ? 'daterange' : 'date',
            'value-format': isNumberValue ? 'timestamp' : 'yyyy-MM-dd',
            ...otherProps
        };
        return h('el-date-picker', context.data, context.children);
    }
};
