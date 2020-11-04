/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

import componentPackInput from '../viewComponents/Input';

import componentPackInputNumber from '../viewComponents/InputNumber';

import componentPackSlider from '../viewComponents/Slider';

import componentPackTime from '../viewComponents/Time';
import componentPackDate from '../viewComponents/Date';
import componentPackDateTime from '../viewComponents/DateTime';


/**
 * hidden 隐藏，不显示在工具栏
 * maxNum Number 最大可配置数
 * topDisplay Bool 最顶部显示
 * bottomDisplay Bool 最底部显示
 * onlyCanConfig Bool 是否只能配置数据，不能删除 copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: '基础组件',
        componentList: [{
            title: '输入框',
            componentPack: componentPackInput
        }, {
            title: '数字输入框',
            componentPack: componentPackInputNumber
        }, {
            title: '数字（slider）',
            componentPack: componentPackSlider
        }]
    },
    {
        groupName: '时间日期',
        componentList: [{
            title: '时间选择',
            componentPack: componentPackTime
        }, {
            title: '日期选择',
            componentPack: componentPackDate
        }, {
            title: '日期时间选择',
            componentPack: componentPackDateTime
        }]
    },
];

export default tools;
