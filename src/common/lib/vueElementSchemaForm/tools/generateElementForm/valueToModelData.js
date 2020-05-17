/**
 * Created by Liu.Jun on 2020/3/15 21:34.
 */


// 组件策略，各个组件需要的转换模式
const componentStrategy = {
    ElDatePicker(event) {
        return event instanceof Array ? event.map(item => +item) : +event;
    }
};

// 下划线组件名转大写驼峰组件名
export function lineToHump(str) {
    return str.replace(/-([a-z])/ig, (all, letter) => letter.toUpperCase())
        .replace(/^([a-z])/, (all, letter) => letter.toUpperCase());
}

// 存在一些组件组件组件值需要做二次处理，比如 el-date-picker 需要转换成时间戳
export default function valueToModelData(componentName, event) {
    const humpComponentName = lineToHump(componentName);
    if (componentStrategy[humpComponentName]) {
        return componentStrategy[humpComponentName](event);
    }
    return event;
}
