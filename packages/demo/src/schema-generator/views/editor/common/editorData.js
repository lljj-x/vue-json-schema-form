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
    const id = genId();

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
        id
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
        ...editorItem.componentPack.viewSchema,
        default: defaultValue,
    };

    return {
        rootSchema: schema,
        schema,
        rootFormData: formData,
        curNodePath: editorItem.componentValue.property || '',
        uiSchema: {
            'ui:options': {
                ...uiOptions,
                ...editorItem.componentValue.options,
                ...editorItem.componentValue.rules
            },
        }
    };

}
