// 内部使用 . ，配置数据key不能出现.
export const pathSeparator = '.';

// nodePath 转css类名
export function nodePath2ClassName(path) {
    const rootPathName = '__pathRoot';
    return path ? `${rootPathName}.${path}`.replace(/\./g, '_') : rootPathName;
}

// 是否为根节点
export function isRootNodePath(path) {
    return path === '';
}

// 计算当前节点path
export function computedCurPath(prePath, curKey) {
    return prePath === '' ? curKey : [prePath, curKey].join(pathSeparator);
}

// 获取当前path值
export function getPathVal(obj, path, leftDeviation = 0) {
    const pathArr = path.split(pathSeparator);

    for (let i = 0; i < pathArr.length - leftDeviation; i += 1) {
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
