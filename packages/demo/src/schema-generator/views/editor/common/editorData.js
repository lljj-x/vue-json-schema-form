/**
 * Created by Liu.Jun on 2020/3/31 11:30 上午.
 */

import { getDefaultFormState } from '@lljj/vue-json-schema-form';
import { genId } from '@/_common/utils/id';

function isObject(obj) {
    return (Object.prototype.toString.call(obj) === '[object Object]');
}

function isEmptyObject(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

// 生成一个新的editor item
export function generateEditorItem(toolItem) {
    const currentComponentPack = toolItem.componentPack;

    const ids = [currentComponentPack.viewSchema.format, currentComponentPack.viewSchema.type, genId()];
    const id = ids.filter(item => !!item).join('_');

    return {
        ...toolItem,
        isEdit: false,
        toolBar: {
            moveDownDisabled: false,
            moveUpDisabled: false,
            copyDisabled: false,
            removeDisabled: false,
        },
        componentValue: {
            ...!toolItem.componentValue || isEmptyObject(toolItem.componentValue) ? getDefaultFormState(
                currentComponentPack.propsSchema,
                {}, // 初始值为空
                currentComponentPack.propsSchema
            ) : toolItem.componentValue,
            property: id
        },
        id,
        ...(currentComponentPack.viewSchema.properties || (currentComponentPack.viewSchema.items && currentComponentPack.viewSchema.items.properties))
            ? { childList: [] }
            : {}
    };
}

// formLabel格式化
export function formatFormLabelWidth(value) {
    return value ? `${value * 4}px` : undefined;
}

function filterObj(obj, filter = (key, value) => (isObject(value) && !isEmptyObject(value)) || value !== undefined) {
    const result = {};
    if (!isObject(obj)) return result;

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const filterVal = filter(key, obj[key]);
            // 返回值Bool
            const isBoolOrUndefined = filterVal === undefined || Boolean(filterVal) === filterVal;

            // 如果是 Boolean 类型，使用原值
            if (isBoolOrUndefined && filterVal) {
                result[key] = obj[key];
            }

            // 非Boolean类型 使用返回后的值
            if (!isBoolOrUndefined) {
                result[key] = filterVal;
            }
        }
    }

    return result;
}

export function editorItem2SchemaFieldProps(editorItem, formData) {
    // baseValue
    const {
        schemaOptions: baseSchemaOptions,
        uiOptions: baseUiOptions
    } = editorItem.componentValue.baseValue;

    // options
    const {
        schemaOptions,
        uiOptions
    } = editorItem.componentValue.options || {};

    // rules
    const {
        schemaOptions: ruleSchemaOptions,
        uiOptions: {
            required = false,
            ruleUiOptions
        } = {}
    } = editorItem.componentValue.rules || {};

    // schema
    const schema = {
        ...JSON.parse(JSON.stringify(editorItem.componentPack.viewSchema)),
        ...filterObj({
            ...baseSchemaOptions,
            ...schemaOptions,
            ...ruleSchemaOptions
        })
    };

    // false 时可省略的属性值
    // todo: 这里需要优化自动对比default的值
    const ignoreAttrs = {
        // slider
        showInput: false,
        showStops: false,
        showInputControls: true,
        showTooltip: true,
        debounce: 300,

        // input number
        controlsPosition: 'default',
        stepStrictly: false,

        // input
        clearable: false,
        disabled: false,
        showPassword: false,
        showWordLimit: false,
        type: 'text'
    };

    // uiSchema
    const {
        hidden, widget, field, fieldProps, ...mergeUiOptions
    } = filterObj({
        ...baseUiOptions,
        ...uiOptions,
        ...ruleUiOptions
    }, (key, value) => {
        // 省略掉默认值
        if (ignoreAttrs[key] === value) return false;

        if (key === 'labelWidth') {
            return formatFormLabelWidth(value);
        }

        // 过滤undefined
        return value !== undefined;
    });

    const uiSchema = {
        ...Object.entries({
            hidden, widget, field, fieldProps
        }).reduce((preVal, [key, value]) => {
            if (value !== undefined) {
                preVal[`ui:${key}`] = value;
            }
            return preVal;
        }, {}),
        ...isEmptyObject(mergeUiOptions) ? {} : {
            'ui:options': mergeUiOptions
        }
    };

    return {
        rootSchema: schema,
        schema,
        required,
        rootFormData: formData,
        curNodePath: editorItem.componentValue.property || '',
        uiSchema
    };
}

function genBaseObj() {
    return {
        type: 'object',
        required: [],
        properties: {},
        'ui:order': []
    };
}

export function componentList2JsonSchema(componentList) {
    const baseObj = genBaseObj();

    let parentObj = baseObj;
    let stack = [{ $$parentFlag: parentObj }, ...componentList];

    const hasChild = data => Array.isArray(data.childList) && data.childList.length > 0;

    // 广度，同时标记父节点
    while (stack.length) {
        // 出栈
        const item = stack.shift();

        // 标记节点 切换parent
        if (item.$$parentFlag) {
            parentObj = item.$$parentFlag;
        } else {
            const { schema, required, uiSchema } = editorItem2SchemaFieldProps(item, {});
            const curSchema = {
                ...schema,
                ...uiSchema
            };

            // 入栈
            if (hasChild(item)) {
                stack = [...stack, { $$parentFlag: curSchema }, ...item.childList];
            }

            // 连接数据
            (parentObj.properties || parentObj.items.properties)[item.componentValue.property] = curSchema;

            // 设置 ui:order
            (parentObj['ui:order'] || parentObj.items['ui:order']).push(item.componentValue.property);

            // 设置 required
            if (required) {
                (parentObj.required || parentObj.items.required).push(item.componentValue.property);
            }
        }
    }

    return baseObj;
}
