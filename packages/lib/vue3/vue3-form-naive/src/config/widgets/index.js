/**
 * Created by Liu.Jun on 2020/5/17 10:41 下午.
 */

import { modelValueComponent } from '@lljj/vjsf-utils/vue3Utils';
import CheckboxesWidget from './CheckboxesWidget';
import RadioWidget from './RadioWidget';
import SelectWidget from './SelectWidget';
import DatePickerWidget from './DatePickerWidget';
import DateTimePickerWidget from './DateTimePickerWidget';
import TimePickerWidget from './TimePickerWidget';
import UploadWidget from './UploadWidget';

const widgetComponents = {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget,
    UploadWidget,
    InputWidget: modelValueComponent('n-input'),
    ColorWidget: modelValueComponent('n-color-picker'),
    TextAreaWidget: modelValueComponent('n-textarea'),
    InputNumberWidget: modelValueComponent('n-input-number'),
    AutoCompleteWidget: modelValueComponent('n-auto-complete'),
    SliderWidget: modelValueComponent('n-slider'),
    RateWidget: modelValueComponent('n-rate'),
    SwitchWidget: modelValueComponent('n-switch'),
};

export default widgetComponents;
