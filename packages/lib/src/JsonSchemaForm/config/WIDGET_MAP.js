/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */

// 统一widget组件配置

import widgetComponents from '../widgets';

const {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget
} = widgetComponents;

export default {
    types: {
        boolean: 'el-switch',
        string: 'el-input',
        number: 'el-input-number',
        integer: 'el-input-number',
        // array: '',
    },
    formats: {
        time: TimePickerWidget, // 20:20:39+00:00
        date: DatePickerWidget, // 2018-11-13
        'date-time': DateTimePickerWidget, // 2018-11-13T20:20:39+00:00
    },
    common: {
        select: SelectWidget,
        radioGroup: RadioWidget,
        checkboxGroup: CheckboxesWidget,
    }
};
