/**
 * Created by Liu.Jun on 2020/5/17 10:41 下午.
 */

import CheckboxesWidget from './CheckboxesWidget';
import RadioWidget from './RadioWidget';
import SelectWidget from './SelectWidget';
import DatePickerWidget from './DatePickerWidget';
import DateTimePickerWidget from './DateTimePickerWidget';
import TimePickerWidget from './TimePickerWidget';
import UploadWidget from './UploadWidget';

// webpack -> rollup
// const files = require.context('.', true, /\.js|vue$/);
// const widgetComponents = files.keys().reduce((preVal, curKey) => {
//     if (curKey !== './index.js') {
//         preVal[curKey.replace(/(\.\/|\/index\.(js|vue))/g, '')] = files(curKey).default;
//     }
//     return preVal;
// }, {});


const widgetComponents = {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget,
    UploadWidget
};

export default widgetComponents;
