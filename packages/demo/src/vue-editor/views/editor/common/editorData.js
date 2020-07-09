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
    return {
        ...toolItem,
        isEdit: false,
        toolBar: {
            moveDownDisabled: false,
            moveUpDisabled: false,
            copyDisabled: false,
            removeDisabled: false,
        },
        componentValue: !toolItem.componentValue || isEmptyObject(toolItem.componentValue) ? getDefaultFormState(
            toolItem.componentPack.propsSchema,
            {}, // 初始值为空
            toolItem.componentPack.propsSchema
        ) : toolItem.componentValue,
        componentViewName: currentComponentPack.componentViewName,
        componentFormName: currentComponentPack.componentFormName,
        // id: `${currentComponentPack.componentViewName}_${+new Date()}`,
        id: genId(),
    };
}
