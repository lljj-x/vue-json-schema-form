/**
 * Created by Liu.Jun on 2020/4/17 17:05.
 */

// fieldName转换为完整的字段路径字符串。
export function toErrorList(errorSchema, fieldName = 'root') {
    // XXX: We should transform fieldName as a full field path string.
    let errorList = [];
    if ('__errors' in errorSchema) {
        errorList = errorList.concat(
            // eslint-disable-next-line no-underscore-dangle
            errorSchema.__errors.map(stack => ({
                stack: `${fieldName}: ${stack}`,
            }))
        );
    }
    return Object.keys(errorSchema).reduce((acc, key) => {
        if (key !== '__errors') {
            acc = acc.concat(toErrorList(errorSchema[key], key));
        }
        return acc;
    }, errorList);
}

// is object
export function isObject(thing) {
    if (typeof File !== 'undefined' && thing instanceof File) {
        return false;
    }
    return typeof thing === 'object' && thing !== null && !Array.isArray(thing);
}

// 合并对象数据
export function mergeObjects(obj1, obj2, concatArrays = false) {
    // Recursively merge deeply nested objects.
    const preAcc = Object.assign({}, obj1); // Prevent mutation of source object.
    return Object.keys(obj2).reduce((acc, key) => {
        const left = obj1 ? obj1[key] : {};
        const right = obj2[key];
        if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
            acc[key] = mergeObjects(left, right, concatArrays);
        } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
            acc[key] = left.concat(right);
        } else {
            acc[key] = right;
        }
        return acc;
    }, preAcc);
}

// is arguments
function isArguments(object) {
    return Object.prototype.toString.call(object) === '[object Arguments]';
}

// 深度相等对比
export function deepEquals(a, b, ca = [], cb = []) {
    // Partially extracted from node-deeper and adapted to exclude comparison
    // checks for functions.
    // https://github.com/othiym23/node-deeper
    if (a === b) {
        return true;
    } if (typeof a === 'function' || typeof b === 'function') {
        // Assume all functions are equivalent
        // see https://github.com/mozilla-services/react-jsonschema-form/issues/255
        return true;
    } if (typeof a !== 'object' || typeof b !== 'object') {
        return false;
    } if (a === null || b === null) {
        return false;
    } if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    } if (a instanceof RegExp && b instanceof RegExp) {
        return (
            a.source === b.source
            && a.global === b.global
            && a.multiline === b.multiline
            && a.lastIndex === b.lastIndex
            && a.ignoreCase === b.ignoreCase
        );
    } if (isArguments(a) || isArguments(b)) {
        if (!(isArguments(a) && isArguments(b))) {
            return false;
        }
        const slice = Array.prototype.slice;
        return deepEquals(slice.call(a), slice.call(b), ca, cb);
    }
    if (a.constructor !== b.constructor) {
        return false;
    }

    const ka = Object.keys(a);
    const kb = Object.keys(b);
    // don't bother with stack acrobatics if there's nothing there
    if (ka.length === 0 && kb.length === 0) {
        return true;
    }
    if (ka.length !== kb.length) {
        return false;
    }

    let cal = ca.length;
    // eslint-disable-next-line no-plusplus
    while (cal--) {
        if (ca[cal] === a) {
            return cb[cal] === b;
        }
    }
    ca.push(a);
    cb.push(b);

    ka.sort();
    kb.sort();
    // eslint-disable-next-line no-plusplus
    for (let j = ka.length - 1; j >= 0; j--) {
        if (ka[j] !== kb[j]) {
            return false;
        }
    }

    let key;
    // eslint-disable-next-line no-plusplus
    for (let k = ka.length - 1; k >= 0; k--) {
        key = ka[k];
        if (!deepEquals(a[key], b[key], ca, cb)) {
            return false;
        }
    }

    ca.pop();
    cb.pop();

    return true;
}

// 只保证同时生成不重复
function genIdFn() {
    let preKey = `${+new Date()}`;
    let key = 0;
    return () => {
        const curTimestamp = `${+new Date()}`;
        if (curTimestamp === preKey) {
            key += 1;
        } else {
            // 重置 key
            key = 0;
        }

        preKey = curTimestamp;
        return `${preKey}x${key}`;
    };
}

export const genId = genIdFn();
