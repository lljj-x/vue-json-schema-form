import mergeAllOf from 'json-schema-merge-allof';
import union from 'lodash/union';
import jsonpointer from 'jsonpointer';
// eslint-disable-next-line import/no-cycle
import { COMPONENT_TYPES, FIELDS_MAPS } from '../config/COMPONENT_TYPES';

import { fillObj } from './arrayUtils';

import validateFormData, { isValid } from './schemaValidate';
import WIDGET_MAP from '../config/WIDGET_MAP';

import {
    mergeObjects,
    isObject,
    deepEquals,
} from './utils';

export const ADDITIONAL_PROPERTY_FLAG = '__additional_property';

/* Gets the type of a given schema. */
export function getSchemaType(schema) {
    const { type } = schema;

    if (!type && schema.const) {
        return guessType(schema.const);
    }

    if (!type && schema.enum) {
        return 'string';
    }

    if (!type && (schema.properties || schema.additionalProperties)) {
        return 'object';
    }

    if (type instanceof Array && type.length === 2 && type.includes('null')) {
        return type.find(curType => curType !== 'null');
    }

    return type;
}

// 根据schema 计算默认值
function computeDefaults(
    _schema,
    parentDefaults,
    rootSchema,
    rawFormData = {},
    includeUndefinedValues = false
) {
    let schema = isObject(_schema) ? _schema : {};
    const formData = isObject(rawFormData) ? rawFormData : {};
    // Compute the defaults recursively: give highest priority to deepest nodes.
    let defaults = parentDefaults;
    if (isObject(defaults) && isObject(schema.default)) {
        // For object defaults, only override parent defaults that are defined in
        // schema.default.
        defaults = mergeObjects(defaults, schema.default);
    } else if ('default' in schema) {
        // Use schema defaults for this node.
        defaults = schema.default;
    } else if ('$ref' in schema) {
        // Use referenced schema defaults for this node.
        const refSchema = findSchemaDefinition(schema.$ref, rootSchema);
        return computeDefaults(
            refSchema,
            defaults,
            rootSchema,
            formData,
            includeUndefinedValues
        );
    } else if ('dependencies' in schema) {
        const resolvedSchema = resolveDependencies(schema, rootSchema, formData);
        return computeDefaults(
            resolvedSchema,
            defaults,
            rootSchema,
            formData,
            includeUndefinedValues
        );
    } else if (isFixedItems(schema)) {
        defaults = schema.items.map((itemSchema, idx) => computeDefaults(
            itemSchema,
            Array.isArray(parentDefaults) ? parentDefaults[idx] : undefined,
            rootSchema,
            formData,
            includeUndefinedValues
        ));
    } else if ('oneOf' in schema) {
        schema = schema.oneOf[getMatchingOption(undefined, schema.oneOf, rootSchema)];
    } else if ('anyOf' in schema) {
        schema = schema.anyOf[getMatchingOption(undefined, schema.anyOf, rootSchema)];
    }

    // Not defaults defined for this node, fallback to generic typed ones.
    if (typeof defaults === 'undefined') {
        defaults = schema.default;
    }

    // eslint-disable-next-line default-case
    switch (getSchemaType(schema)) {
    // We need to recur for object schema inner default values.
    case 'object':
        return Object.keys(schema.properties || {}).reduce((acc, key) => {
            // Compute the defaults for this node, with the parent defaults we might
            // have from a previous run: defaults[key].
            const computedDefault = computeDefaults(
                schema.properties[key],
                (defaults || {})[key],
                rootSchema,
                (formData || {})[key],
                includeUndefinedValues
            );
            if (includeUndefinedValues || computedDefault !== undefined) {
                acc[key] = computedDefault;
            }
            return acc;
        }, {});

    case 'array':
        // Inject defaults into existing array defaults
        if (Array.isArray(defaults)) {
            defaults = defaults.map((item, idx) => computeDefaults(
                schema.items[idx] || schema.additionalItems || {},
                item,
                rootSchema,
                {},
                includeUndefinedValues
            ));
        }

        // Deeply inject defaults into already existing form data
        if (Array.isArray(rawFormData)) {
            defaults = rawFormData.map((item, idx) => computeDefaults(
                schema.items,
                (defaults || {})[idx],
                rootSchema,
                item,
                {},
                includeUndefinedValues
            ));
        }
        if (schema.minItems) {
            if (!isMultiSelect(schema, rootSchema)) {
                const defaultsLength = defaults ? defaults.length : 0;
                if (schema.minItems > defaultsLength) {
                    const defaultEntries = defaults || [];
                    // populate the array with the defaults
                    const fillerSchema = Array.isArray(schema.items)
                        ? schema.additionalItems
                        : schema.items;

                    const fillerEntries = fillObj(
                        new Array(schema.minItems - defaultsLength), computeDefaults(
                            fillerSchema, fillerSchema.defaults, rootSchema, {}, includeUndefinedValues
                        )
                    );
                    return defaultEntries.concat(fillerEntries);
                }
            } else {
                return defaults || [];
            }
        }

        // undefined 默认一个空数组
        defaults = defaults === undefined ? [] : defaults;
    }
    return defaults;
}

// 获取默认form data
export function getDefaultFormState(
    _schema,
    formData,
    rootSchema = {},
    includeUndefinedValues = true
) {
    if (!isObject(_schema)) {
        throw new Error(`Invalid schema: ${_schema}`);
    }
    const schema = retrieveSchema(_schema, rootSchema, formData);

    const defaults = computeDefaults(
        schema,
        _schema.default,
        rootSchema,
        formData,
        includeUndefinedValues
    );

    if (typeof formData === 'undefined') {
        // No form data? Use schema defaults.
        return defaults;
    }

    // 传入formData时，合并传入数据
    if (isObject(formData) || Array.isArray(formData)) {
        return mergeDefaultsWithFormData(defaults, formData);
    }
    if (formData === 0 || formData === false || formData === '') {
        return formData;
    }
    return formData || defaults;
}

/**
 * When merging defaults and form data, we want to merge in this specific way:
 * - objects are deeply merged
 * - arrays are merged in such a way that:
 *   - when the array is set in form data, only array entries set in form data
 *     are deeply merged; additional entries from the defaults are ignored
 *   - when the array is not set in form data, the default is copied over
 * - scalars are overwritten/set by form data
 */
export function mergeDefaultsWithFormData(defaults, formData) {
    if (Array.isArray(formData)) {
        if (!Array.isArray(defaults)) {
            defaults = [];
        }
        return formData.map((value, idx) => {
            if (defaults[idx]) {
                return mergeDefaultsWithFormData(defaults[idx], value);
            }
            return value;
        });
    } if (isObject(formData)) {
        const acc = Object.assign({}, defaults); // Prevent mutation of source object.
        return Object.keys(formData).reduce((preAcc, key) => {
            preAcc[key] = mergeDefaultsWithFormData(
                defaults ? defaults[key] : {},
                formData[key]
            );
            return preAcc;
        }, acc);
    }
    return formData;

}

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
function getUiWidget({
    schema = {},
    uiSchema = {}
}, fallback = () => {}) {
    // usSchema 配置了widget 直接使用
    if (uiSchema['ui:widget']) {
        return {
            widget: uiSchema['ui:widget']
        };
    }

    // schema 配置了format 自动匹配类型 - 匹配失败报错提示
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

    // string - 组件名 , 优先获取内部field，否则认为是用户已注册的组件
    if (typeof field === 'string') {
        if (FIELDS_MAPS[field]) {
            return FIELDS_MAPS[field];
        }
        return field;
    }

    // 类型默认 field
    const fieldName = COMPONENT_TYPES[getSchemaType(schema)];
    if (fieldName in FIELDS_MAPS) {
        return FIELDS_MAPS[fieldName];
    }

    // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
    // render a field and let the MultiSchemaField component handle the form display
    if (!fieldName && (schema.anyOf || schema.oneOf)) {
        return () => null;
    }

    // 不支持的类型
    throw new Error(`不支持的field类型 ${schema.type}`);
}

// 解析用户配置的 uiSchema options
function getUserOptions(uiSchema) {
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
    // 计算ui配置
    return {
        title: schema.title, // 默认使用 schema 的配置
        description: schema.description,
        hidden: uiSchema['ui:widget'] === 'hidden',
        ...getUserOptions(uiSchema), // 用户配置
    };
}

// 获取当前节点的ui 配置 （options + widget）
export function getUiConfig({
    schema,
    uiSchema
}, fallback = () => {}) {
    return {
        ...getUiOptions({
            schema,
            uiSchema
        }),
        ...getUiWidget({
            schema,
            uiSchema
        }, fallback)
    };
}

// 尝试转成float数字
export function tryToFloatNumber(value) {
    if (value === '') {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    const n = parseFloat(value);
    const valid = typeof n === 'number' && !Number.isNaN(n);

    return valid ? n : value;
}

// ui:order 排序
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
 * This function checks if the given schema matches a single
 * constant value.
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

// 是否为选择列表
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

// 文件数组
export function isFilesArray(schema, uiSchema, rootSchema = {}) {
    if (uiSchema['ui:widget'] === 'files') {
        return true;
    } if (schema.items) {
        const itemsSchema = retrieveSchema(schema.items, rootSchema);
        return itemsSchema.type === 'string' && itemsSchema.format === 'data-url';
    }
    return false;
}

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

// $ref 引用
export function findSchemaDefinition($ref, rootSchema = {}) {
    const origRef = $ref;
    if ($ref.startsWith('#')) {
        // Decode URI fragment representation.
        $ref = decodeURIComponent($ref.substring(1));
    } else {
        throw new Error(`Could not find a definition for ${origRef}.`);
    }
    const current = jsonpointer.get(rootSchema, $ref);
    if (current === undefined) {
        throw new Error(`Could not find a definition for ${origRef}.`);
    }
    if (current.hasOwnProperty('$ref')) {
        return findSchemaDefinition(current.$ref, rootSchema);
    }
    return current;
}

// In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining
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

// This function will create new "properties" items for each key in our formData
export function stubExistingAdditionalProperties(
    schema,
    rootSchema = {},
    formData = {}
) {
    // Clone the schema so we don't ruin the consumer's original
    schema = {
        ...schema,
        properties: { ...schema.properties },
    };

    Object.keys(formData).forEach((key) => {
        if (schema.properties.hasOwnProperty(key)) {
            // No need to stub, our schema already has the property
            return;
        }

        let additionalProperties;
        if (schema.additionalProperties.hasOwnProperty('$ref')) {
            additionalProperties = retrieveSchema(
                { $ref: schema.additionalProperties.$ref },
                rootSchema,
                formData
            );
        } else if (schema.additionalProperties.hasOwnProperty('type')) {
            additionalProperties = { ...schema.additionalProperties };
        } else {
            additionalProperties = { type: guessType(formData[key]) };
        }

        // The type of our new key should match the additionalProperties value;
        schema.properties[key] = additionalProperties;
        // Set our additional property flag so we know it was dynamically added
        schema.properties[key][ADDITIONAL_PROPERTY_FLAG] = true;
    });

    return schema;
}

export function resolveSchema(schema, rootSchema = {}, formData = {}) {
    if (schema.hasOwnProperty('$ref')) {
        return resolveReference(schema, rootSchema, formData);
    } if (schema.hasOwnProperty('dependencies')) {
        const resolvedSchema = resolveDependencies(schema, rootSchema, formData);
        return retrieveSchema(resolvedSchema, rootSchema, formData);
    } if (schema.hasOwnProperty('allOf')) {
        return {
            ...schema,
            allOf: schema.allOf.map(allOfSubschema => retrieveSchema(allOfSubschema, rootSchema, formData)),
        };
    }
    // No $ref or dependencies attribute found, returning the original schema.
    return schema;

}

function resolveReference(schema, rootSchema, formData) {
    // Retrieve the referenced schema definition.
    const $refSchema = findSchemaDefinition(schema.$ref, rootSchema);
    // Drop the $ref property of the source schema.
    // eslint-disable-next-line no-unused-vars
    const { $ref, ...localSchema } = schema;
    // Update referenced schema definition with local schema properties.
    return retrieveSchema(
        { ...$refSchema, ...localSchema },
        rootSchema,
        formData
    );
}

export function retrieveSchema(schema, rootSchema = {}, formData = {}) {
    if (!isObject(schema)) {
        return {};
    }
    let resolvedSchema = resolveSchema(schema, rootSchema, formData);
    if ('allOf' in schema) {
        try {
            resolvedSchema = mergeAllOf({
                ...resolvedSchema,
                allOf: resolvedSchema.allOf,
            });
        } catch (e) {
            console.warn(`could not merge subschemas in allOf:\n${e}`);
            // eslint-disable-next-line no-unused-vars
            const { allOf, ...resolvedSchemaWithoutAllOf } = resolvedSchema;
            return resolvedSchemaWithoutAllOf;
        }
    }
    const hasAdditionalProperties = resolvedSchema.hasOwnProperty('additionalProperties') && resolvedSchema.additionalProperties !== false;
    if (hasAdditionalProperties) {
        return stubExistingAdditionalProperties(
            resolvedSchema,
            rootSchema,
            formData
        );
    }

    return resolvedSchema;
}

function resolveDependencies(schema, rootSchema, formData) {
    // Drop the dependencies from the source schema.
    const { dependencies = {} } = schema;
    let { ...resolvedSchema } = schema;
    if ('oneOf' in resolvedSchema) {
        resolvedSchema = resolvedSchema.oneOf[
            getMatchingOption(formData, resolvedSchema.oneOf, rootSchema)
        ];
    } else if ('anyOf' in resolvedSchema) {
        resolvedSchema = resolvedSchema.anyOf[
            getMatchingOption(formData, resolvedSchema.anyOf, rootSchema)
        ];
    }
    return processDependencies(
        dependencies,
        resolvedSchema,
        rootSchema,
        formData
    );
}

function processDependencies(
    dependencies,
    resolvedSchema,
    rootSchema,
    formData
) {
    // Process dependencies updating the local schema properties as appropriate.
    for (const dependencyKey in dependencies) {
        // Skip this dependency if its trigger property is not present.
        if (formData[dependencyKey] === undefined) {
            // eslint-disable-next-line no-continue
            continue;
        }
        // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)
        if (
            resolvedSchema.properties
            && !(dependencyKey in resolvedSchema.properties)
        ) {
            // eslint-disable-next-line no-continue
            continue;
        }
        const {
            [dependencyKey]: dependencyValue,
            ...remainingDependencies
        } = dependencies;
        if (Array.isArray(dependencyValue)) {
            resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue);
        } else if (isObject(dependencyValue)) {
            resolvedSchema = withDependentSchema(
                resolvedSchema,
                rootSchema,
                formData,
                dependencyKey,
                dependencyValue
            );
        }
        return processDependencies(
            remainingDependencies,
            resolvedSchema,
            rootSchema,
            formData
        );
    }
    return resolvedSchema;
}

function withDependentProperties(schema, additionallyRequired) {
    if (!additionallyRequired) {
        return schema;
    }
    const required = Array.isArray(schema.required)
        ? Array.from(new Set([...schema.required, ...additionallyRequired]))
        : additionallyRequired;
    return { ...schema, required };
}

function withDependentSchema(
    schema,
    rootSchema,
    formData,
    dependencyKey,
    dependencyValue
) {
    const { oneOf, ...dependentSchema } = retrieveSchema(
        dependencyValue,
        rootSchema,
        formData
    );
    schema = mergeSchemas(schema, dependentSchema);
    // Since it does not contain oneOf, we return the original schema.
    if (oneOf === undefined) {
        return schema;
    } if (!Array.isArray(oneOf)) {
        throw new Error(`invalid: it is some ${typeof oneOf} instead of an array`);
    }
    // Resolve $refs inside oneOf.
    const resolvedOneOf = oneOf.map(subschema => (subschema.hasOwnProperty('$ref')
        ? resolveReference(subschema, rootSchema, formData)
        : subschema));
    return withExactlyOneSubschema(
        schema,
        rootSchema,
        formData,
        dependencyKey,
        resolvedOneOf
    );
}

function withExactlyOneSubschema(
    schema,
    rootSchema,
    formData,
    dependencyKey,
    oneOf
) {
    // eslint-disable-next-line array-callback-return,consistent-return
    const validSubschemas = oneOf.filter((subschema) => {
        if (!subschema.properties) {
            return false;
        }
        const { [dependencyKey]: conditionPropertySchema } = subschema.properties;
        if (conditionPropertySchema) {
            const conditionSchema = {
                type: 'object',
                properties: {
                    [dependencyKey]: conditionPropertySchema,
                },
            };
            const { errors } = validateFormData({
                formData,
                schema: conditionSchema
            });
            return errors.length === 0;
        }
    });
    if (validSubschemas.length !== 1) {
        console.warn(
            "ignoring oneOf in dependencies because there isn't exactly one subschema that is valid"
        );
        return schema;
    }
    const subschema = validSubschemas[0];
    const {
        // eslint-disable-next-line no-unused-vars
        [dependencyKey]: conditionPropertySchema,
        ...dependentSubschema
    } = subschema.properties;
    const dependentSchema = { ...subschema, properties: dependentSubschema };
    return mergeSchemas(
        schema,
        retrieveSchema(dependentSchema, rootSchema, formData)
    );
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

// react should render 对比数据
export function shouldRender(comp, nextProps, nextState) {
    const { props, state } = comp;
    return !deepEquals(props, nextProps) || !deepEquals(state, nextState);
}

// id Schema
export function toIdSchema(
    schema,
    id,
    rootSchema,
    formData = {},
    idPrefix = 'root'
) {
    const idSchema = {
        $id: id || idPrefix,
    };
    if ('$ref' in schema || 'dependencies' in schema || 'allOf' in schema) {
        // eslint-disable-next-line no-underscore-dangle
        const _schema = retrieveSchema(schema, rootSchema, formData);
        return toIdSchema(_schema, id, rootSchema, formData, idPrefix);
    }
    if ('items' in schema && !schema.items.$ref) {
        return toIdSchema(schema.items, id, rootSchema, formData, idPrefix);
    }
    if (schema.type !== 'object') {
        return idSchema;
    }
    for (const name in schema.properties || {}) {
        const field = schema.properties[name];
        const fieldId = `${idSchema.$id}_${name}`;
        idSchema[name] = toIdSchema(
            isObject(field) ? field : {},
            fieldId,
            rootSchema,
            // It's possible that formData is not an object -- this can happen if an
            // array item has just been added, but not populated with data yet
            (formData || {})[name],
            idPrefix
        );
    }
    return idSchema;
}

export function toPathSchema(schema, name = '', rootSchema, formData = {}) {
    const pathSchema = {
        $name: name.replace(/^\./, ''),
    };
    if ('$ref' in schema || 'dependencies' in schema || 'allOf' in schema) {
        // eslint-disable-next-line no-underscore-dangle
        const _schema = retrieveSchema(schema, rootSchema, formData);
        return toPathSchema(_schema, name, rootSchema, formData);
    }
    if (schema.hasOwnProperty('items') && Array.isArray(formData)) {
        formData.forEach((element, i) => {
            pathSchema[i] = toPathSchema(
                schema.items,
                `${name}.${i}`,
                rootSchema,
                element
            );
        });
    } else if (schema.hasOwnProperty('properties')) {
        for (const property in schema.properties) {
            pathSchema[property] = toPathSchema(
                schema.properties[property],
                `${name}.${property}`,
                rootSchema,
                // It's possible that formData is not an object -- this can happen if an
                // array item has just been added, but not populated with data yet
                (formData || {})[property]
            );
        }
    }
    return pathSchema;
}

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
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1, // oh you, javascript.
        day: date.getUTCDate(),
        hour: includeTime ? date.getUTCHours() : 0,
        minute: includeTime ? date.getUTCMinutes() : 0,
        second: includeTime ? date.getUTCSeconds() : 0,
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

export function rangeSpec(schema) {
    const spec = {};
    if (schema.multipleOf) {
        spec.step = schema.multipleOf;
    }
    if (schema.minimum || schema.minimum === 0) {
        spec.min = schema.minimum;
    }
    if (schema.maximum || schema.maximum === 0) {
        spec.max = schema.maximum;
    }
    return spec;
}

export function getMatchingOption(formData, options, rootSchema) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < options.length; i++) {
        const option = options[i];

        // If the schema describes an object then we need to add slightly more
        // strict matching to the schema, because unless the schema uses the
        // "requires" keyword, an object will match the schema as long as it
        // doesn't have matching keys with a conflicting type. To do this we use an
        // "anyOf" with an array of requires. This augmentation expresses that the
        // schema should match if any of the keys in the schema are present on the
        // object and pass validation.
        if (option.properties) {
            // Create an "anyOf" schema that requires at least one of the keys in the
            // "properties" object
            const requiresAnyOf = {
                anyOf: Object.keys(option.properties).map(key => ({
                    required: [key],
                })),
            };

            let augmentedSchema;

            // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"
            if (option.anyOf) {
                // Create a shallow clone of the option
                const { ...shallowClone } = option;

                if (!shallowClone.allOf) {
                    shallowClone.allOf = [];
                } else {
                    // If "allOf" already exists, shallow clone the array
                    shallowClone.allOf = shallowClone.allOf.slice();
                }

                shallowClone.allOf.push(requiresAnyOf);

                augmentedSchema = shallowClone;
            } else {
                augmentedSchema = Object.assign({}, option, requiresAnyOf);
            }

            // Remove the "required" field as it's likely that not all fields have
            // been filled in yet, which will mean that the schema is not valid
            delete augmentedSchema.required;

            if (isValid(augmentedSchema, formData)) {
                return i;
            }
        } else if (isValid(options[i], formData)) {
            return i;
        }
    }
    return 0;
}
