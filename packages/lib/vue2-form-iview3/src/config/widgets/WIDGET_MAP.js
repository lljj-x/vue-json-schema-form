/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */

// widget 组件对应elementUi 配置表

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
        boolean: {
            functional: true,
            render(h, context) {
                const { activeText, inactiveText } = context.props;

                // 转换elementUi activeText inactiveText 支持 iview slot
                const childNode = Object.entries({
                    open: activeText,
                    close: inactiveText,
                }).reduce((preVal, [slot, value]) => {
                    if (value !== undefined) {
                        preVal.push(h('span', {
                            slot
                        }, [value]));
                    }

                    return preVal;
                }, []);

                return h('i-switch', context.data, childNode);
            }
        },
        string: 'i-input',
        number: 'input-number',
        integer: 'input-number',
    },
    formats: {
        color: 'color-picker',
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
