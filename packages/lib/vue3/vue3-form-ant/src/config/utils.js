/**
 * Created by Liu.Jun on 2021/2/21 9:38 下午.
 */

import { defineComponent, h } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

// 转换antdv 非moduleValue的v-model组件
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

// 转换antdv 时间日期选择，moment format时间戳number类型报错兼容
export const numberTimeComponent = component => defineComponent({
    inheritAttrs: false,
    setup(props, { attrs, slots }) {

        return () => {
            const {
                isNumberValue, isRange, value, ...otherAttrs
            } = attrs;

            // antdv moment format 必须接受字符串时间戳
            const newValue = isNumberValue
                ? (isRange
                    ? (value || []).map(item => (typeof item === 'number' ? String(item) : item))
                    : typeof value === 'number' ? String(value) : value
                )
                : value;

            const trueAttrs = {
                ...attrs,
                value: newValue,
                'onUpdate:value': function updateValue(upValue) {
                    if (isNumberValue) {
                        upValue = isRange ? upValue.map(item => +item) : +upValue;
                    }
                    otherAttrs['onUpdate:value'].call(this, upValue);
                }
            };

            return h(resolveComponent(component), trueAttrs, slots);
        };
    }
});
