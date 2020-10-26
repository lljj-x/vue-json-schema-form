/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

import componentPackText from '../viewComponents/Input';

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
            componentPack: componentPackText
        }]
    },
];

export default tools;
