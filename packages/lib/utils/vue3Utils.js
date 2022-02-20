/**
 * Created by Liu.Jun on 2020/4/25 14:45.
 */

import { defineComponent, h, resolveComponent as _resolveComponent } from 'vue';

export {
    nodePath2ClassName, isRootNodePath, computedCurPath, getPathVal, path2prop
} from './vueUtils';

// 内部使用 . ，配置数据key不能出现.
const pathSeparator = '.';

// 删除当前path值
export function deletePathVal(vueData, name) {
    delete vueData[name];
}

// 设置当前path值
export function setPathVal(obj, path, value) {
    const pathArr = path.split(pathSeparator);
    for (let i = 0; i < pathArr.length; i += 1) {
        if (pathArr.length - i < 2) {
            // 倒数第一个数据
            obj[pathArr[pathArr.length - 1]] = value;
            break;
        }
        obj = obj[pathArr[i]];
    }
}

export function resolveComponent(component) {
    if (typeof component === 'string') return _resolveComponent(component);

    return component;
}

// 转换antdv、naive等非moduleValue的v-model组件
export const modelValueComponent = (component, {
    model = 'value'
} = {}) => defineComponent({
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
        return () => {
            const {
                modelValue: value,
                'onUpdate:modelValue': onUpdateValue,
                ...otherAttrs
            } = attrs;

            // eg: 'a-input'
            return h(resolveComponent(component), {
                [model]: value,
                [`onUpdate:${model}`]: onUpdateValue,
                ...otherAttrs
            }, slots);
        };
    }
});
