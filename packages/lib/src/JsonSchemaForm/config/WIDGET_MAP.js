/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */

import widgetComponents from '../widgets';

const {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget
} = widgetComponents;

export default {
    boolean: {
        checkbox: CheckboxesWidget,
        radio: RadioWidget,
        select: SelectWidget,
        hidden: null,
    },
    string: {
        text: 'el-input',
        password: 'PasswordWidget',
        email: 'el-input',
        hostname: 'el-input',
        ipv4: 'el-input',
        ipv6: 'el-input',
        uri: 'el-input',
        'data-url': 'el-input',
        radio: RadioWidget,
        select: SelectWidget,
        textarea: 'el-input',
        hidden: null,
        date: 'el-date-picker',
        datetime: 'el-date-picker',
        'date-time': 'el-date-picker',
        'alt-date': 'el-input',
        'alt-datetime': 'el-input',
        color: 'el-color-picker',
        file: 'el-input',
    },
    number: {
        text: 'el-input-number',
        select: SelectWidget,
        updown: 'el-input-number',
        range: 'RangeWidget',
        radio: RadioWidget,
        hidden: 'HiddenWidget',
    },
    integer: {
        text: 'el-input-number',
        select: SelectWidget,
        updown: 'el-input-number',
        range: 'el-slider',
        radio: RadioWidget,
        hidden: 'HiddenWidget',
    },
    array: {
        select: SelectWidget,
        checkboxes: CheckboxesWidget,
        files: 'el-input',
        hidden: null,
    }
};
