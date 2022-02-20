/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */

// widget 组件对应elementUi 配置表

import { modelValueComponent } from '@lljj/vjsf-utils/vue3Utils';
import widgetComponents from './index';

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
        boolean: modelValueComponent('n-switch'),
        string: modelValueComponent('n-input'),
        number: modelValueComponent('n-input-number'),
        integer: modelValueComponent('n-input-number'),
    },
    formats: {
        color: modelValueComponent('n-color-picker'),
        time: TimePickerWidget, // 20:20:39+00:00
        date: DatePickerWidget, // 2018-11-13
        'date-time': DateTimePickerWidget, // 2018-11-13T20:20:39+00:00
    },
    common: {
        select: SelectWidget,
        radioGroup: RadioWidget,
        checkboxGroup: CheckboxesWidget,
    },
    widgetComponents
};
