/**
 * Created by Liu.Jun on 2020/4/24 11:23.
 */


import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';

import {
    allowAdditionalItems, isFixedItems, isMultiSelect
} from '@lljj/vjsf-utils/formUtils';
import { getPathVal, setPathVal } from '@lljj/vjsf-utils/vueUtils';
import { genId, lowerCase } from '@lljj/vjsf-utils/utils';

import * as arrayMethods from '@lljj/vjsf-utils/arrayUtils';
import Widget from '../../components/Widget';

import vueProps from '../props';

import ArrayFieldNormal from './arrayTypes/ArrayFieldNormal';
import ArrayFieldMultiSelect from './arrayTypes/ArrayFieldMultiSelect';
import ArrayFieldTuple from './arrayTypes/ArrayFieldTuple';
import ArrayFieldSpecialFormat from './arrayTypes/ArrayFieldSpecialFormat';

export default {
    name: 'ArrayField',
    props: vueProps,
    data() {
        return {
            // 通过维护一份key，一份值 来解决list key的问题
            formKeys: this.getCuFormData().map(() => genId())
        };
    },
    computed: {
        itemsFormData() {
            const formKeys = this.$data.formKeys;
            return this.curFormData.map((item, index) => ({
                key: formKeys[index],
                value: item
            }));
        },
        curFormData() {
            return this.getCuFormData();
        }
    },
    watch: {
        curFormData(newVal, oldVal) {
            // 引用类型，当值不相等，说明是被重新赋值
            if (newVal !== oldVal && Array.isArray(newVal)) {
                this.formKeys = newVal.map(() => genId());
            }
        }
    },
    methods: {
        // 获取当前的值
        getCuFormData() {
            const { rootFormData, curNodePath } = this.$props;
            const value = getPathVal(rootFormData, curNodePath);

            if (Array.isArray(value)) return value;

            console.error('error: type array，值必须为 array 类型');

            return [];
        },
        // 获取一个新item
        getNewFormDataRow() {
            const { schema, rootSchema } = this.$props;
            let itemSchema = schema.items;

            // https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
            // 数组为项的集合搭配additionalItems属性需要特殊处理
            if (isFixedItems(this.schema) && allowAdditionalItems(this.schema)) {
                itemSchema = schema.additionalItems;
            }
            return getDefaultFormState(itemSchema, undefined, rootSchema);
        },

        // 数组排序相关操作
        handleArrayOperate({
            command,
            data
        }) {
            // 统一处理数组数据的 新增，删除，排序等变更
            const strategyMap = {
                moveUp(target, { index }) {
                    arrayMethods.moveUpAt(target, index);
                },
                moveDown(target, { index }) {
                    arrayMethods.moveDownAt(target, index);
                },
                remove(target, { index }) {
                    arrayMethods.removeAt(target, index);
                },
                add(target, { newRowData }) {
                    target.push(newRowData);
                },
                batchPush(target, { pushArray }) {
                    pushArray.forEach((item) => {
                        target.push(item);
                    });
                },
                setNewTarget(target, { formData, nodePath, newTarget }) {
                    setPathVal(formData, nodePath, newTarget);
                }
            };

            const curStrategy = strategyMap[command];
            if (curStrategy) {
                let formDataPrams = data;
                let keysParams = data;

                if (command === 'add') {
                    // 单个添加
                    formDataPrams = { newRowData: this.getNewFormDataRow() };
                    keysParams = { newRowData: genId() };
                } else if (command === 'batchPush') {
                    // 批量添加
                    keysParams = {
                        pushArray: formDataPrams.pushArray.map(item => genId())
                    };
                } else if (command === 'setNewTarget') {
                    // 设置
                    formDataPrams = {
                        formData: this.rootFormData,
                        nodePath: this.curNodePath,
                        newTarget: formDataPrams.newTarget
                    };
                    keysParams = {
                        formData: this.$data,
                        nodePath: 'formKeys',
                        newTarget: formDataPrams.newTarget.map(item => genId())
                    };
                }

                // 同步修改 formData keys
                curStrategy.apply(this, [this.$data.formKeys, keysParams]);

                // 修改formData数据
                curStrategy.apply(this, [this.curFormData, formDataPrams]);
            } else {
                throw new Error(`错误 - 未知的操作：[${command}]`);
            }
        }
    },
    render(h) {
        const self = this;
        const {
            schema,
            uiSchema,
            rootSchema,
            rootFormData,
            curNodePath,
            globalOptions
        } = this.$props;

        if (!schema.hasOwnProperty('items')) {
            throw new Error(`[${schema}] 请先定义 items属性`);
        }

        // 多选类型
        if (isMultiSelect(schema, rootSchema)) {
            // item 为枚举固定值
            return h(ArrayFieldMultiSelect, {
                props: this.$props,
                class: {
                    [lowerCase(ArrayFieldMultiSelect.name)]: true
                }
            });
        }

        // 特殊处理 date datetime time url-upload
        // array 支持配置 ui:widget
        // 时间日期区间 或者 ui:widget 特殊配置
        if (schema.format || schema['ui:widget'] || uiSchema['ui:widget']) {
            return h(ArrayFieldSpecialFormat, {
                props: this.$props,
                class: {
                    [lowerCase(ArrayFieldSpecialFormat.name)]: true
                }
            });
        }

        // https://json-schema.org/understanding-json-schema/reference/array.html#list-validation
        // https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
        const CurrentField = isFixedItems(schema) ? ArrayFieldTuple : ArrayFieldNormal;

        return h('div', [
            h(CurrentField, {
                props: {
                    itemsFormData: this.itemsFormData,
                    ...this.$props,
                },
                class: {
                    [lowerCase(CurrentField.name)]: true
                },
                on: {
                    onArrayOperate: this.handleArrayOperate
                }
            }),

            // 插入一个Widget，校验 array - maxItems. minItems. uniqueItems 等items外的属性校验
            this.needValidFieldGroup ? h(Widget, {
                key: 'validateWidget-array',
                class: {
                    validateWidget: true,
                    'validateWidget-array': true
                },
                props: {
                    schema: Object.entries(self.$props.schema).reduce((preVal, [key, value]) => {
                        if (key !== 'items') preVal[key] = value;
                        return preVal;
                    }, {}),
                    uiSchema,
                    errorSchema: this.errorSchema,
                    curNodePath,
                    rootFormData,
                    globalOptions
                }
            }) : null
        ]);
    }
};
