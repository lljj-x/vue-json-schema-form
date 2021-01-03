/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */

import DatePickerWidget from '../DatePickerWidget';

export default {
    name: 'DateTimePickerWidget',
    functional: true,
    render(h, context) {
        context.data.attrs.isDatetime = true;

        return h(DatePickerWidget, context.data, context.children);
    }
};
