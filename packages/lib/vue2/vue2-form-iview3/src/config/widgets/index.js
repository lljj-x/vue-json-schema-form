/**
 * Created by Liu.Jun on 2020/5/17 10:41 下午.
 */

import Vue from 'vue';

import CheckboxesWidget from './CheckboxesWidget';
import RadioWidget from './RadioWidget';
import SelectWidget from './SelectWidget';
import DatePickerWidget from './DatePickerWidget';
import DateTimePickerWidget from './DateTimePickerWidget';
import TimePickerWidget from './TimePickerWidget';
import UploadWidget from './UploadWidget';
import SwitchWidget from './SwitchWidget';
import InputNumberWidget from './InputNumberWidget';

const widgetComponents = {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget,
    UploadWidget,
    SwitchWidget,
    InputNumberWidget
};

// 注册组件
Object.entries(widgetComponents).forEach(([key, value]) => Vue.component(key, value));

export default widgetComponents;
