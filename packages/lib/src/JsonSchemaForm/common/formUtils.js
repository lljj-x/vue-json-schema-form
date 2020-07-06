// eslint-disable-next-line import/no-cycle
import FIELDS_MAP from '../config/FIELDS_MAP';
import WIDGET_MAP from '../config/WIDGET_MAP';
import retrieveSchema from './schema/retriev';

import { isObject, getSchemaType } from './utils';

// 根据 format 获取当前渲染组件
function getWidgetByFormat(schema, format) {
    // 定义为渲染函数
    if (typeof format === 'function' || typeof format === 'object') {
        return format;
    }

    // 根据type和format适配合适的widget
    const type = getSchemaType(schema);
    if (typeof format === 'string' && WIDGET_MAP.hasOwnProperty(type) && WIDGET_MAP[type].hasOwnProperty(format)) {
        return WIDGET_MAP[type][format];
    }

    throw new Error(`No widget "${format}" for type "${type}"`);
}

// 解析当前节点 ui widget
export function getUiWidget({
    schema = {},
    uiSchema = {}
}, fallback = () => {}) {
    // usSchema 配置了widget 直接使用
    if (uiSchema['ui:widget']) {
        return {
            widget: uiSchema['ui:widget']
        };
    }

    // schema 配置了format 自动匹配类型
    const format = uiSchema.format || schema.format;
    if (format) {
        return {
            widget: getWidgetByFormat(schema, format)
        };
    }

    // 没配置可以widget 回退到具体field方案配置
    return fallback({ schema, uiSchema });
}

// 解析当前节点 ui field
export function getUiField(
    {
        schema = {},
        uiSchema = {},
    }
) {
    const field = uiSchema['ui:field'];

    // vue 组件
    if (typeof field === 'function' || typeof field === 'object') {
        return field;
    }

    // string - 组件名, 认为是用户已注册的组件
    if (typeof field === 'string') {
        return field;
    }

    // 类型默认 field
    const fieldCtor = FIELDS_MAP[getSchemaType(schema)];
    if (fieldCtor) {
        return fieldCtor;
    }

    // 如果包含 oneOf anyOf 返回空不异常
    // SchemaField 会附加onyOf anyOf信息
    if (!fieldCtor && (schema.anyOf || schema.oneOf)) {
        return null;
    }

    // 不支持的类型
    throw new Error(`不支持的field类型 ${schema.type}`);
}

// 解析用户配置的 uiSchema options
export function getUserUiOptions(uiSchema) {
    return Object.keys(uiSchema)
        .filter(key => key.indexOf('ui:') === 0)
        .reduce((options, key) => {
            const value = uiSchema[key];
            // options 内外合并
            if (key === 'ui:options' && isObject(value)) {
                return { ...options, ...value };
            }
            return { ...options, [key.substring(3)]: value };
        }, {});
}

// 解析当前节点的ui options参数
export function getUiOptions({
    schema,
    uiSchema
}) {
    const spec = {};
    if (undefined !== schema.multipleOf) {
        // 组件计数器步长
        spec.step = schema.multipleOf;
    }
    if (schema.minimum || schema.minimum === 0) {
        spec.min = schema.minimum;
    }
    if (schema.maximum || schema.maximum === 0) {
        spec.max = schema.maximum;
    }

    // 计算ui配置
    return {
        title: schema.title, // 默认使用 schema 的配置
        description: schema.description,
        hidden: uiSchema['ui:widget'] === 'HiddenWidget',
        ...spec,
        ...getUserUiOptions(uiSchema), // 用户配置
    };
}

// 获取当前节点的ui 配置 （options + widget）
export function getWidgetConfig({
    schema,
    uiSchema
}, fallback = () => {}) {
    const widgetConfig = {
        ...getUiOptions({
            schema,
            uiSchema
        }),
        ...getUiWidget({
            schema,
            uiSchema
        }, fallback)
    };

    const {
        widget,
        title,
        labelWidth,
        description,
        attrs,
        emptyValue,
        ...uiProps
    } = widgetConfig;

    return {
        widget,
        label: title,
        labelWidth,
        description,
        attrs,
        emptyValue,
        uiProps
    };
}

// 解析用户配置的 errorSchema options
export function getUserErrOptions(errorSchema) {
    return Object.keys(errorSchema)
        .filter(key => key.indexOf('err:') === 0)
        .reduce((options, key) => {
            const value = errorSchema[key];
            // options 内外合并
            if (key === 'err:options' && isObject(value)) {
                return { ...options, ...value };
            }
            return { ...options, [key.substring(4)]: value };
        }, {});
}

// ui:order object-> properties 排序
export function orderProperties(properties, order) {
    if (!Array.isArray(order)) {
        return properties;
    }

    const arrayToHash = arr => arr.reduce((prev, curr) => {
        prev[curr] = true;
        return prev;
    }, {});
    const errorPropList = arr => (arr.length > 1
        ? `properties '${arr.join("', '")}'`
        : `property '${arr[0]}'`);
    const propertyHash = arrayToHash(properties);
    const orderFiltered = order.filter(
        prop => prop === '*' || propertyHash[prop]
    );
    const orderHash = arrayToHash(orderFiltered);

    const rest = properties.filter(prop => !orderHash[prop]);
    const restIndex = orderFiltered.indexOf('*');
    if (restIndex === -1) {
        if (rest.length) {
            throw new Error(
                `uiSchema order list does not contain ${errorPropList(rest)}`
            );
        }
        return orderFiltered;
    }
    if (restIndex !== orderFiltered.lastIndexOf('*')) {
        throw new Error('uiSchema order list contains more than one wildcard item');
    }

    const complete = [...orderFiltered];
    complete.splice(restIndex, 1, ...rest);
    return complete;
}

/**
 * 单个匹配
 * 常量，或者只有一个枚举
 */
export function isConstant(schema) {
    return (
        (Array.isArray(schema.enum) && schema.enum.length === 1)
        || schema.hasOwnProperty('const')
    );
}

export function toConstant(schema) {
    if (Array.isArray(schema.enum) && schema.enum.length === 1) {
        return schema.enum[0];
    } if (schema.hasOwnProperty('const')) {
        return schema.const;
    }
    throw new Error('schema cannot be inferred as a constant');
}

/**
 * 是否为选择列表
 * 枚举 或者 oneOf anyOf 每项都只有一个固定常量值
 * @param _schema
 * @param rootSchema
 * @returns {boolean|*}
 */
export function isSelect(_schema, rootSchema = {}) {
    const schema = retrieveSchema(_schema, rootSchema);
    const altSchemas = schema.oneOf || schema.anyOf;
    if (Array.isArray(schema.enum)) {
        return true;
    } if (Array.isArray(altSchemas)) {
        return altSchemas.every(altSchemasItem => isConstant(altSchemasItem));
    }
    return false;
}

// items 都为一个对象
export function isFixedItems(schema) {
    return (
        Array.isArray(schema.items)
        && schema.items.length > 0
        && schema.items.every(item => isObject(item))
    );
}

// 是否为多选
export function isMultiSelect(schema, rootSchema = {}) {
    if (!schema.uniqueItems || !schema.items) {
        return false;
    }
    return isSelect(schema.items, rootSchema);
}

// array additionalItems
// https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
export function allowAdditionalItems(schema) {
    if (schema.additionalItems === true) {
        console.warn('additionalItems=true is currently not supported');
    }
    return isObject(schema.additionalItems);
}

// 下拉选项
export function optionsList(schema) {
    if (schema.enum) {
        return schema.enum.map((value, i) => {
            const label = (schema.enumNames && schema.enumNames[i]) || String(value);
            return { label, value };
        });
    }
    const altSchemas = schema.oneOf || schema.anyOf;
    return altSchemas.map((curSchema, i) => {
        const value = toConstant(curSchema);
        const label = curSchema.title || String(value);
        return { label, value };
    });

}
