/**
 * Created by Liu.Jun on 2019/11/29 12:27.
 */

import { valueMap } from '../schemaTypeMap';

// 生成vue的默认参数格式，不遵循 required等策略
function copyJson(data) {
    return JSON.parse(JSON.stringify(data));
}

function gen(json) {
    // 配置了默认值直接使用返回值
    if ('default' in json) {
        return typeof json.default === 'object' ? copyJson(json.default) : json.default;
    }

    // 没有下一级直接返回值
    const type = [].concat(json.type)[0];
    if (type !== 'object') {
        return typeof valueMap[type] === 'function' ? valueMap[type]() : valueMap[type];
    }

    // object 无 properties 属性直接返回 null
    if (!json.properties) return null;

    // object 需要递归
    return Object.entries(json.properties).reduce((preVal, [key, value]) => {
        preVal[key] = gen(value);
        return preVal;
    }, {});
}

export default schemaJson => gen(schemaJson);
