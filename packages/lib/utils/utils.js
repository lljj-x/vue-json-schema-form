/**
 * Created by Liu.Jun on 2020/4/17 17:05.
 */

// is object
export function isObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
}

// is arguments
function isArguments(object) {
    return Object.prototype.toString.call(object) === '[object Arguments]';
}

// 定义的数据推导出schema 类型
export const guessType = function guessType(value) {
    if (Array.isArray(value)) {
        return 'array';
    } if (typeof value === 'string') {
        return 'string';
    } if (value == null) {
        return 'null';
    } if (typeof value === 'boolean') {
        return 'boolean';
        // eslint-disable-next-line no-restricted-globals
    } if (!isNaN(value)) {
        return 'number';
    } if (typeof value === 'object') {
        return 'object';
    }
    // Default to string if we can't figure it out
    return 'string';
};

export function union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}

// Recursively merge deeply nested schemas.
// The difference between mergeSchemas and mergeObjects
// is that mergeSchemas only concats arrays for
// values under the "required" keyword, and when it does,
// it doesn't include duplicate values.
export function mergeSchemas(obj1, obj2) {
    const acc = Object.assign({}, obj1); // Prevent mutation of source object.
    // eslint-disable-next-line no-shadow
    return Object.keys(obj2).reduce((acc, key) => {
        const left = obj1 ? obj1[key] : {};
        const right = obj2[key];
        if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
            acc[key] = mergeSchemas(left, right);
        } else if (
            obj1
            && obj2
            && (getSchemaType(obj1) === 'object' || getSchemaType(obj2) === 'object')
            && key === 'required'
            && Array.isArray(left)
            && Array.isArray(right)
        ) {
            // Don't include duplicate values when merging
            // "required" fields.
            acc[key] = union(left, right);
        } else {
            acc[key] = right;
        }
        return acc;
    }, acc);
}

// 合并对象数据
export function mergeObjects(obj1, obj2, concatArrays = false) {
    // Recursively merge deeply nested objects.
    const preAcc = Object.assign({}, obj1); // Prevent mutation of source object.
    if (!isObject(obj2)) return preAcc;

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

// 获取给定 schema 类型。
export function getSchemaType(schema) {
    const { type } = schema;

    // 通过const 申明的常量 做类型推断
    if (!type && schema.const) {
        return guessType(schema.const);
    }

    // 枚举默认字符串
    if (!type && schema.enum) {
        return 'string';
    }

    // items 推断为 array 类型
    if (!type && (schema.items)) {
        return 'array';
    }

    // anyOf oneOf 不申明 type 字段
    if (!type && (schema.properties || schema.additionalProperties)) {
        return 'object';
    }

    if (type instanceof Array && type.length === 2 && type.includes('null')) {
        return type.find(curType => curType !== 'null');
    }

    return type;
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
export const genId = (function genIdFn() {
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
}());

// 空对象
export function isEmptyObject(obj) {
    if (!obj) return true;

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

// 过滤和转换对象的key
export function filterObject(obj, filterFn) {
    return Object.entries(obj).reduce((preVal, [key, value]) => {
        const newKey = filterFn(key, value);
        if (undefined !== newKey) {
            preVal[newKey] = value;
        }
        return preVal;
    }, {});
}

const f = s => `0${s}`.substr(-2);
export function parseDateString(dateString, includeTime = true) {
    if (!dateString) {
        return {
            year: -1,
            month: -1,
            day: -1,
            hour: includeTime ? -1 : 0,
            minute: includeTime ? -1 : 0,
            second: includeTime ? -1 : 0,
        };
    }
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        throw new Error(`Unable to parse date ${dateString}`);
    }
    return {
        year: date.getFullYear(),
        month: f(date.getMonth() + 1), // oh you, javascript.
        day: f(date.getDate()),
        hour: f(includeTime ? date.getHours() : 0),
        minute: f(includeTime ? date.getMinutes() : 0),
        second: f(includeTime ? date.getSeconds() : 0),
    };
}

export function toDateString(
    {
        year, month, day, hour = 0, minute = 0, second = 0
    },
    time = true
) {
    const utcTime = Date.UTC(year, month - 1, day, hour, minute, second);
    const datetime = new Date(utcTime).toJSON();
    return time ? datetime : datetime.slice(0, 10);
}

export function pad(num, size) {
    let s = String(num);
    while (s.length < size) {
        s = `0${s}`;
    }
    return s;
}

// dataUrl 转 Blob文件对象
export function dataURItoBlob(dataURI) {
    // Split metadata from data
    const splitted = dataURI.split(',');
    // Split params
    const params = splitted[0].split(';');
    // Get mime-type from params
    const type = params[0].replace('data:', '');
    // Filter the name property from params
    const properties = params.filter(param => param.split('=')[0] === 'name');
    // Look for the name and use unknown if no name property.
    let name;
    if (properties.length !== 1) {
        name = 'unknown';
    } else {
        // Because we filtered out the other property,
        // we only have the name case here.
        name = properties[0].split('=')[1];
    }

    // Built the Uint8Array Blob parameter from the base64 string.
    const binary = atob(splitted[1]);
    const array = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    // Create the blob object
    const blob = new window.Blob([new Uint8Array(array)], { type });

    return { blob, name };
}

// 字符串首字母小写
export function lowerCase(str) {
    if (undefined === str) return str;
    return String(str).replace(/^./, s => s.toLocaleLowerCase());
}

// 最大公约数
export function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// 最小公倍数
export function scm(a, b) {
    return (a * b) / gcd(a, b);
}

// 打开新页面
export function openNewPage(url, target = '_blank') {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.target = target;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
