/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

import componentPackText from '../viewComponents/Text';

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
        groupName: '图文类',
        componentList: [{
            title: '纯文本',
            maxNum: 20,
            icon: 'el-icon-notebook-1',
            componentPack: componentPackText
        }]
    },
];

export default tools;
