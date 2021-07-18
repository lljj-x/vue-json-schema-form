/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */

// widget 组件对应elementUi 配置表

import { h } from 'vue';
import widgetComponents from './index';

const {
    InputWidget,
    InputNumberWidget,
    SwitchWidget,
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget
} = widgetComponents;

export default {
    types: {
        boolean: SwitchWidget,
        string: InputWidget,
        number: InputNumberWidget,
        integer: InputNumberWidget,
    },
    formats: {
        color: {
            setup(props, { attrs }) {
                return () => h(InputWidget, {
                    ...attrs,
                    style: {
                        ...attrs.style || {},
                        maxWidth: '180px'
                    }
                }, {
                    addonAfter: () => h('input', {
                        disabled: attrs.disabled,
                        readonly: attrs.readonly,
                        value: attrs.modelValue,
                        onInput(e) {
                            attrs['onUpdate:modelValue'](e.target.value);
                        },
                        onChange(e) {
                            attrs['onUpdate:modelValue'](e.target.value);
                        },
                        type: 'color',
                        style: {
                            padding: '0',
                            width: '50px'
                        }
                    })
                });
            }
        },
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
