/**
 * Created by Liu.Jun on 2020/3/31 11:30 上午.
 */

import { getDefaultFormState } from '@lljj/vue-json-schema-form';
import { genId } from '@/_common/utils/id';

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
    const id = `${currentComponentPack.viewSchema.type || ''}_${genId()}`;

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
        ...(['array', 'object'].includes(currentComponentPack.viewSchema.type) ? {
            childList: []
        } : {})
    };
}

// editor item 转出为 SchemaField 的数据结构
export function formatFormConfig(key, value) {
    switch (key) {

    case 'labelWidth':
        return `${value * 4}px`;

    default: {
        return value;
    }

    }
}

function filterUndefined(obj) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
            result[key] = obj[key];
        }
    }
    return result;
}

export function editorItem2SchemaFieldProps(editorItem, formData) {
    const baseValue = editorItem.componentValue.baseValue;

    // baseValue
    const { default: defaultValue, uiOptions } = Object.keys(editorItem.componentValue.baseValue).reduce((preVal, curVal) => {
        if (curVal === 'default') {
            preVal.default = baseValue[curVal];
        } else if (baseValue[curVal]) {
            preVal.uiOptions = preVal.uiOptions || {};
            preVal.uiOptions[curVal] = formatFormConfig(curVal, baseValue[curVal]);
        }

        return preVal;
    }, {});

    // options


    // rules
    const schema = {
        ...JSON.parse(JSON.stringify(editorItem.componentPack.viewSchema)),
        default: defaultValue,
    };

    return {
        rootSchema: schema,
        schema,
        rootFormData: formData,
        curNodePath: editorItem.componentValue.property || '',
        uiSchema: {
            'ui:options': filterUndefined({
                ...uiOptions,
                ...editorItem.componentValue.options,
                ...editorItem.componentValue.rules
            }),
        }
    };
}

function genBaseObj() {
    return {
        type: 'object',
        required: [],
        properties: {}
    };
}

export function componentList2JsonSchema(componentList) {
    const baseObj = genBaseObj();

    let parentObj = baseObj;
    let stack = [{ $$parentFlag: parentObj }, ...componentList];

    const hasChild = data => Array.isArray(data.childList) && data.childList.length > 0;

    // 广度，同时标记父节点
    while (stack.length) {
        const item = stack.shift();

        if (item.$$parentFlag) {
            parentObj = item.$$parentFlag;
        } else {
            const { schema, uiSchema } = editorItem2SchemaFieldProps(item, {});
            const curSchema = {
                ...schema,
                ...isEmptyObject(uiSchema['ui:options']) ? {} : {
                    'ui:options': uiSchema['ui:options']
                }
            };

            if (hasChild(item)) {
                stack = [...stack, { $$parentFlag: curSchema }, ...item.childList];
            }

            (parentObj.properties || parentObj.items.properties)[item.componentValue.property] = curSchema;
        }
    }

    console.log(baseObj);

    return baseObj;
}
