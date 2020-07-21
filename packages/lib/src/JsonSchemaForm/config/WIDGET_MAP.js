/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */

// 统一widget组件配置

import widgetComponents from '../widgets';

const {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget
} = widgetComponents;

export default {
    types: {
        boolean: 'el-switch',
        string: 'el-input',
        number: 'el-input-number',
        integer: 'el-input-number',
        array: '',
    },
    formats: {
        'date-time': 'el-time-select', // 2018-11-13T20:20:39+00:00
        time: 'el-date-picker', // 20:20:39+00:00
        date: 'el-date-picker', // 2018-11-13
    },
    common: {
        select: SelectWidget,
        radioGroup: RadioWidget,
        checkboxGroup: CheckboxesWidget,
    }
};
