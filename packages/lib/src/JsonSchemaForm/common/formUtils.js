// eslint-disable-next-line import/no-cycle
import FIELDS_MAP from '../config/FIELDS_MAP';
import retrieveSchema from './schema/retriev';

import { isObject, getSchemaType } from './utils';

// 是否为 hidden Widget
export function isHiddenWidget({
    schema = {},
    uiSchema = {}
}) {
    const widget = uiSchema['ui:widget'] || schema['ui:widget'];
    return widget === 'HiddenWidget' || widget === 'hidden';
}

// 解析当前节点 ui field
export function getUiField({
    schema = {},
    uiSchema = {},
}) {
    const field = schema['ui:field'] || uiSchema['ui:field'];

    // vue 组件，或者已注册的组件名
    if (typeof field === 'function' || typeof field === 'object' || typeof field === 'string') {
        return {
            field,
            fieldProps: uiSchema['ui:fieldProps'] || schema['ui:fieldProps'], // 自定义field ，支持传入额外的 props
        };
    }

    // 类型默认 field
    const fieldCtor = FIELDS_MAP[getSchemaType(schema)];
    if (fieldCtor) {
        return {
            field: fieldCtor
        };
    }

    // 如果包含 oneOf anyOf 返回空不异常
    // SchemaField 会附加onyOf anyOf信息
    if (!fieldCtor && (schema.anyOf || schema.oneOf)) {
        return {
            field: null
        };
    }

    // 不支持的类型
    throw new Error(`不支持的field类型 ${schema.type}`);
}

// 解析用户配置的 uiSchema options
export function getUserUiOptions({
    schema = {},
    uiSchema = {}
}) {
    // 支持 uiSchema配置在 schema文件中
    return Object.assign({}, ...[schema, uiSchema].map(itemSchema => Object.keys(itemSchema)
        .filter(key => key.indexOf('ui:') === 0)
        .reduce((options, key) => {
            const value = itemSchema[key];
            // options 内外合并
            if (key === 'ui:options' && isObject(value)) {
                return { ...options, ...value };
            }
            return { ...options, [key.substring(3)]: value };
        }, {})));
}

// 解析当前节点的ui options参数
export function getUiOptions({
    schema = {},
    uiSchema = {}
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

    if (schema.format === 'date-time' || schema.format === 'date') {
        // 数组类型 时间区间
        // 打破了schema的规范，type array 配置了 format
        if (schema.type === 'array') {
            spec.isRange = true;
            spec.isNumberValue = !(schema.items && schema.items.type === 'string');
        } else {
            // 字符串 ISO 时间
            spec.isNumberValue = !(schema.type === 'string');
        }
    }

    // 计算ui配置
    return {
        title: schema.title, // 默认使用 schema 的配置
        description: schema.description,

        // 特殊处理部分
        ...spec,

        // 用户配置最高优先级
        ...getUserUiOptions({
            schema,
            uiSchema,
        })
    };
}

// 获取当前节点的ui 配置 （options + widget）
// 处理成 Widget 组件需要的格式
export function getWidgetConfig({
    schema = {},
    uiSchema = {}
}, fallback = null) {
    const uiOptions = getUiOptions({
        schema,
        uiSchema
    });

    // 没有配置 Widget ，各个Field组件根据类型判断
    if (!uiOptions.widget && fallback) {
        Object.assign(uiOptions, fallback({
            schema,
            uiSchema
        }));
    }

    const {
        widget,
        title: label,
        labelWidth,
        description,
        attrs: widgetAttrs,
        class: widgetClass,
        style: widgetStyle,
        fieldAttrs,
        fieldStyle,
        fieldClass,
        emptyValue,
        ...uiProps
    } = uiOptions;

    return {
        widget,
        label,
        labelWidth,
        description,
        widgetAttrs,
        widgetClass,
        widgetStyle,
        fieldAttrs,
        fieldStyle,
        fieldClass,
        emptyValue,
        uiProps
    };
}

// 解析用户配置的 errorSchema options
export function getUserErrOptions({
    schema = {},
    uiSchema = {},
    errorSchema = {}
}) {
    return Object.assign({}, ...[schema, uiSchema, errorSchema].map(itemSchema => Object.keys(itemSchema)
        .filter(key => key.indexOf('err:') === 0)
        .reduce((options, key) => {
            const value = itemSchema[key];
            // options 内外合并
            if (key === 'err:options' && isObject(value)) {
                return { ...options, ...value };
            }
            return { ...options, [key.substring(4)]: value };
        }, {})));
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
export function optionsList(schema, uiSchema) {
    // enum
    if (schema.enum) {
        const uiOptions = getUserUiOptions({
            schema,
            uiSchema
        });

        // ui配置 enumNames 优先
        const enumNames = uiOptions.enumNames || schema.enumNames;
        return schema.enum.map((value, i) => {
            const label = (enumNames && enumNames[i]) || String(value);
            return { label, value };
        });
    }

    // oneOf | anyOf
    const altSchemas = schema.oneOf || schema.anyOf;
    const altUiSchemas = uiSchema.oneOf || uiSchema.anyOf;
    return altSchemas.map((curSchema, i) => {
        const uiOptions = (altUiSchemas && altUiSchemas[i]) ? getUserUiOptions({
            schema: curSchema,
            uiSchema: altUiSchemas[i]
        }) : {};
        const value = toConstant(curSchema);
        const label = uiOptions.title || curSchema.title || String(value);
        return { label, value };
    });

}
