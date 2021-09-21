import retrieveSchema from './schema/retriev';
import { getPathVal } from './vueUtils';

import { getSchemaType, isObject } from './utils';

// 通用的处理表达式方法
// 这里打破 JSON Schema 规范
const regExpression = /{{(.*)}}/;
function handleExpression(rootFormData, curNodePath, expression, fallBack) {
    // 未配置
    if (undefined === expression) {
        return undefined;
    }

    // 配置了 mustache 表达式
    const matchExpression = regExpression.exec(expression);
    regExpression.lastIndex = 0; // 重置索引
    if (matchExpression) {
        const code = matchExpression[1].trim();

        // eslint-disable-next-line no-new-func
        const fn = new Function('parentFormData', 'rootFormData', `return ${code}`);

        return fn(getPathVal(rootFormData, curNodePath, 1), rootFormData);
    }

    // 回退
    return fallBack();
}

export function replaceArrayIndex({ schema, uiSchema } = {}, index) {
    const itemUiOptions = getUiOptions({
        schema,
        uiSchema,
        containsSpec: false
    });

    return ['title', 'description'].reduce((preVal, curItem) => {
        if (itemUiOptions[curItem]) {
            preVal[`ui:${curItem}`] = String(itemUiOptions[curItem]).replace(/\$index/g, index + 1);
        }
        return preVal;
    }, {});
}

// 是否为 hidden Widget
export function isHiddenWidget({
    schema = {},
    uiSchema = {},
    curNodePath = '',
    rootFormData = {}
}) {
    const widget = uiSchema['ui:widget'] || schema['ui:widget'];
    const hiddenExpression = uiSchema['ui:hidden'] || schema['ui:hidden'];

    // 支持配置 ui:hidden 表达式
    return widget === 'HiddenWidget'
        || widget === 'hidden'
        || !!handleExpression(rootFormData, curNodePath, hiddenExpression, () => {
            // 配置了函数 function
            if (typeof hiddenExpression === 'function') {
                return hiddenExpression(getPathVal(rootFormData, curNodePath, 1), rootFormData);
            }

            // 配置了常量 ？？
            return hiddenExpression;
        });
}

// 解析当前节点 ui field
export function getUiField(FIELDS_MAP, {
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
    uiSchema = {},
    curNodePath, // undefined 不处理 表达式
    rootFormData = {}
}) {
    // 支持 uiSchema配置在 schema文件中
    return Object.assign({}, ...[schema, uiSchema].map(itemSchema => Object.keys(itemSchema)
        .reduce((options, key) => {
            const value = itemSchema[key];
            // options 内外合并
            if (key === 'ui:options' && isObject(value)) {
                return { ...options, ...value };
            }

            if (key.indexOf('ui:') === 0) {
                // 只对 ui:xxx 配置形式支持表达式
                return {
                    ...options,
                    [key.substring(3)]: curNodePath === undefined ? value : handleExpression(rootFormData, curNodePath, value, () => value)
                };
            }

            return options;
        }, {})));
}

// 解析当前节点的ui options参数
export function getUiOptions({
    schema = {},
    uiSchema = {},
    containsSpec = true,
    curNodePath,
    rootFormData,
}) {
    const spec = {};
    if (containsSpec) {
        spec.readonly = !!schema.readOnly;
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

        if (schema.minLength || schema.minLength === 0) {
            spec.minlength = schema.minLength;
        }
        if (schema.maxLength || schema.maxLength === 0) {
            spec.maxlength = schema.maxLength;
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
    }

    if (schema.title) spec.title = schema.title;
    if (schema.description) spec.description = schema.description;

    // 计算ui配置
    return {
        ...spec,

        // 用户配置最高优先级
        ...getUserUiOptions({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        })
    };
}

// 获取当前节点的ui 配置 （options + widget）
// 处理成 Widget 组件需要的格式
export function getWidgetConfig({
    schema = {},
    uiSchema = {},
    curNodePath,
    rootFormData,
}, fallback = null) {
    const uiOptions = getUiOptions({
        schema,
        uiSchema,
        curNodePath,
        rootFormData,
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
        widgetListeners,
        fieldAttrs,
        fieldStyle,
        fieldClass,
        emptyValue,
        width,
        getWidget,
        renderScopedSlots,
        renderChildren,
        onChange,
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
        width,
        fieldStyle,
        fieldClass,
        emptyValue,
        getWidget,
        renderScopedSlots,
        renderChildren,
        onChange,
        widgetListeners,
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
        .reduce((options, key) => {
            const value = itemSchema[key];
            // options 内外合并
            if (key === 'err:options' && isObject(value)) {
                return { ...options, ...value };
            }

            if (key.indexOf('err:') === 0) {
                return { ...options, [key.substring(4)]: value };
            }

            return options;
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
export function optionsList(schema, uiSchema, curNodePath, rootFormData) {
    // enum
    if (schema.enum) {
        const uiOptions = getUserUiOptions({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
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
            uiSchema: altUiSchemas[i],
            curNodePath,
            rootFormData
        }) : {};
        const value = toConstant(curSchema);
        const label = uiOptions.title || curSchema.title || String(value);
        return { label, value };
    });

}

export function fallbackLabel(oriLabel, isFallback, curNodePath) {
    if (oriLabel) return oriLabel;
    if (isFallback) {
        const backLabel = curNodePath.split('.').pop();

        // 过滤纯数字字符串
        if (backLabel && (backLabel !== `${Number(backLabel)}`)) return backLabel;
    }

    return '';
}
