/**
 * 根据schema计算出formData的初始值
 * 源码来自：react-jsonschema-form 做了细节调整，重写了allOf实现逻辑
 * https://github.com/rjsf-team/react-jsonschema-form/blob/master/packages/core/src/utils.js#L283
 */

import { getSchemaType, isObject, mergeObjects } from '../utils';
import findSchemaDefinition from './findSchemaDefinition';
import { getMatchingOption } from './validate';
import { fillObj } from '../arrayUtils';
import { isFixedItems, isMultiSelect } from '../formUtils';
import retrieveSchema, { /* resolveDependencies, */ resolveAllOf } from './retriev';

/**
 * When merging defaults and form data, we want to merge in this specific way:
 * - objects are deeply merged
 * - arrays are merged in such a way that:
 *   - when the array is set in form data, only array entries set in form data
 *     are deeply merged; additional entries from the defaults are ignored
 *   - when the array is not set in form data, the default is copied over
 * - scalars are overwritten/set by form data
 */
function mergeDefaultsWithFormData(defaults, formData) {
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

function computeDefaults(
    _schema,
    parentDefaults,
    rootSchema,
    rawFormData = {},
    includeUndefinedValues = false
) {
    let schema = isObject(_schema) ? _schema : {};
    const formData = isObject(rawFormData) ? rawFormData : {};

    // allOf 处理合并数据
    if ('allOf' in schema) {
        schema = resolveAllOf(schema, rootSchema, formData);
    }

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
    } else if /* ('dependencies' in schema) {
        const resolvedSchema = resolveDependencies(schema, rootSchema, formData);
        return computeDefaults(
            resolvedSchema,
            defaults,
            rootSchema,
            formData,
            includeUndefinedValues
        );
    } else if */ (isFixedItems(schema)) {
        defaults = schema.items.map((itemSchema, idx) => computeDefaults(
            itemSchema,
            Array.isArray(parentDefaults) ? parentDefaults[idx] : undefined,
            rootSchema,
            formData,
            includeUndefinedValues
        ));
    } else if ('oneOf' in schema) {
        const matchSchema = retrieveSchema(
            schema.oneOf[getMatchingOption(formData, schema.oneOf, rootSchema)],
            rootSchema,
            formData
        );

        schema = mergeObjects(schema, matchSchema);
        delete schema.oneOf;

        // if (schema.properties && matchSchema.properties) {
        //     // 对象 oneOf 需要合并原属性和 oneOf 属性
        //     const mergeSchema = mergeObjects(schema, matchSchema);
        //     delete mergeSchema.oneOf;
        //     schema = mergeSchema;
        // } else {
        //     schema = matchSchema;
        // }
    } else if ('anyOf' in schema) {
        const matchSchema = retrieveSchema(
            schema.anyOf[getMatchingOption(formData, schema.anyOf, rootSchema)],
            rootSchema,
            formData
        );

        schema = mergeObjects(schema, matchSchema);
        delete schema.anyOf;

        // if (schema.properties && matchSchema.properties) {
        //     // 对象 anyOf 需要合并原属性和 anyOf 属性
        //     const mergeSchema = mergeObjects(schema, matchSchema);
        //     delete mergeSchema.anyOf;
        //     schema = mergeSchema;
        // } else {
        //     schema = matchSchema;
        // }
    }
    // Not defaults defined for this node, fallback to generic typed ones.
    if (typeof defaults === 'undefined') {
        defaults = schema.default;
    }
    // eslint-disable-next-line default-case
    switch (getSchemaType(schema)) {
    case 'null':
        return null;

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
export default function getDefaultFormState(
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
