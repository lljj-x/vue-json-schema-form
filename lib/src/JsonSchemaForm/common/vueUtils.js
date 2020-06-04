/**
 * Created by Liu.Jun on 2020/4/25 14:45.
 */

import Vue from 'vue';

// 内部使用 . ，配置数据key不能出现.
const pathSeparator = '.';

// 是否为根节点
export function isRootNodePath(path) {
    return path.split(pathSeparator).length === 0;
}

// 计算当前节点path
export function computedCurPath(prePath, curKey) {
    return prePath === '' ? curKey : [prePath, curKey].join(pathSeparator);
}

// 删除当前path值
export function deletePathVal(vueData, name) {
    Vue.delete(vueData, name);
}

// 设置当前path值
export function setPathVal(obj, path, value) {
    // Vue.set ?
    const pathArr = path.split(pathSeparator);
    for (let i = 0; i < pathArr.length; i += 1) {
        if (pathArr.length - i < 2) {
            // 倒数第一个数据
            // obj[pathArr[pathArr.length - 1]] = value;
            Vue.set(obj, pathArr[pathArr.length - 1], value);
            break;
        }
        obj = obj[pathArr[i]];
    }
}

// 获取当前path值
export function getPathVal(obj, path) {
    const pathArr = path.split(pathSeparator);

    for (let i = 0; i < pathArr.length; i += 1) {
        // 错误路径或者undefined中断查找
        if (obj === undefined) return undefined;
        obj = pathArr[i] === '' ? obj : obj[pathArr[i]];
    }
    return obj;
}

// path 等于props
export function path2prop(path) {
    return path;
}
