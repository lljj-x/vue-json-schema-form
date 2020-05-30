/**
 * Created by Liu.Jun on 2020/4/25 14:45.
 */

import Vue from 'vue';

export function deletePathVal(vueData, name) {
    Vue.delete(vueData, name);
}

export function setPathVal(obj, pathArr, value) {
    // Vue.set ?
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

export function getPathVal(obj, pathArr) {
    for (let i = 0; i < pathArr.length; i += 1) {
        // 错误路径或者undefined中断查找
        if (obj === undefined) return undefined;
        obj = pathArr[i] === '' ? obj : obj[pathArr[i]];
    }
    return obj;
}

export function pathArray2prop(dotPath) {
    return dotPath.join('.');
}
