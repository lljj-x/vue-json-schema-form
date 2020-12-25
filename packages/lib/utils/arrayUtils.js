/**
 * Created by Liu.Jun on 2020/4/25 10:53.
 */

// 通过 index 上移
export function moveUpAt(target, index) {
    if (index === 0) return false;
    const item = target[index];
    const newItems = [item, target[index - 1]];
    return target.splice(index - 1, 2, ...newItems);
}

// 通过 index 下移动
export function moveDownAt(target, index) {
    if (index === target.length - 1) return false;
    const item = target[index];
    const newItems = [target[index + 1], item];
    return target.splice(index, 2, ...newItems);
}

// 移除
export function removeAt(target, index) {
    // 移除数组中指定位置的元素，返回布尔表示成功与否
    return !!target.splice(index, 1).length;
}

// 数组填充对象
export function fillObj(target, data) {
    // 简单复制 异常直接抛错
    try {
        if (typeof data === 'object') {
            return target.fill(null).map(() => JSON.parse(JSON.stringify(data)));
        }
    } catch (e) {
        // nothing ...
    }

    // 默认返回一个 undefined
    return undefined;
}

// 切割分为多个数组
export function cutOff(target, cutOffPointIndex) {
    return target.reduce((preVal, curVal, curIndex) => {
        preVal[curIndex > cutOffPointIndex ? 1 : 0].push(curVal);
        return preVal;
    }, [[], []]);
}

// 数组交集
export function intersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item));
}
