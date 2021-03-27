/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */
import { allowAdditionalItems, getUiOptions, replaceArrayIndex } from '@lljj/vjsf-utils/formUtils';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { computedCurPath } from '@lljj/vjsf-utils/vueUtils';
import { cutOff } from '@lljj/vjsf-utils/arrayUtils';
import FieldGroupWrap from '@lljj/vjsf-utils/components/FieldGroupWrap';
import vueProps from '../../props';

import SchemaField from '../../SchemaField';
import ArrayOrderList from '../components/ArrayOrderList';

export default {
    name: 'ArrayFieldTuple',
    props: {
        ...vueProps,
        itemsFormData: {
            type: Array,
            default: () => []
        }
    },
    created() {
        this.fixItemsFormData();
    },
    methods: {
        // 兼容数据 长度不足的的场景
        fixItemsFormData() {
            const isNoArray = !Array.isArray(this.itemsFormData);
            if (isNoArray || this.itemsFormData.length < this.schema.items.length) {
                // 这里需要补齐默认数据，计算出需要的数据
                const curSchemaState = getDefaultFormState(this.schema, undefined, this.rootSchema);

                if (isNoArray) {
                    // 数据修复 - 重置一个新的值
                    this.$emit('onArrayOperate', {
                        command: 'setNewTarget',
                        data: {
                            newTarget: curSchemaState
                        }
                    });
                } else {
                    // 修复数据 - 追加不足的数据
                    this.$emit('onArrayOperate', {
                        command: 'batchPush',
                        data: {
                            pushArray: curSchemaState.slice(this.itemsFormData.length)
                        }
                    });
                }
            }
        }
    },
    render(h) {
        if (!Array.isArray(this.itemsFormData)) return null;

        const {
            schema, uiSchema, errorSchema, curNodePath, globalOptions
        } = this.$props;

        const {
            title,
            description,
            addable,
            showIndexNumber,
            sortable,
            removable,
            showTitle,
            showDescription,
            fieldClass,
            fieldAttrs,
            fieldStyle,
        } = getUiOptions({
            schema,
            uiSchema,
            curNodePath,
            rootFormData: this.rootFormData,
        });

        // 拆分为 tuple 和 additional
        const cutOfArr = cutOff(this.itemsFormData, this.schema.items.length - 1);

        const tupleVnodeArr = cutOfArr[0].map((item, index) => h(
            SchemaField,
            {
                key: item.key,
                props: {
                    ...this.$props,
                    required: !([].concat(schema.items[index].type).includes('null')),
                    schema: schema.items[index],
                    uiSchema: uiSchema.items ? uiSchema.items[index] : {},
                    errorSchema: errorSchema.items ? errorSchema.items[index] : {},
                    curNodePath: computedCurPath(curNodePath, index)
                }
            }
        ));

        // 通过order组件做可排序处理
        const additionalVnodeArr = cutOfArr[1].map((item, index) => {
            const tempUiSchema = replaceArrayIndex({
                schema: schema.additionalItems,
                uiSchema: uiSchema.additionalItems
            }, index);

            return {
                key: item.key,
                vNode: h(
                    SchemaField,
                    {
                        key: item.key,
                        props: {
                            ...this.$props,
                            schema: schema.additionalItems,
                            required: !([].concat(schema.additionalItems.type).includes('null')),
                            uiSchema: {
                                ...uiSchema.additionalItems,
                                ...tempUiSchema
                            },
                            errorSchema: errorSchema.additionalItems,
                            curNodePath: computedCurPath(curNodePath, index + schema.items.length)
                        }
                    }
                )
            };
        });

        // 是否可添加同时受限于 additionalItems 属性
        const trueAddable = (addable === undefined ? true : addable) && allowAdditionalItems(this.schema);

        // 默认循环固定配置的数据 长度外的使用ArrayOrderList渲染
        return h(
            FieldGroupWrap,
            {
                props: {
                    title,
                    description,
                    showTitle,
                    showDescription,
                    curNodePath
                },
                class: fieldClass,
                attrs: fieldAttrs,
                style: fieldStyle,
            },
            [
                // 先显示Tuple固定项
                ...tupleVnodeArr,

                // additional items
                h(
                    ArrayOrderList,
                    {
                        props: {
                            vNodeList: additionalVnodeArr,
                            tupleItemsLength: schema.items.length,
                            addable: trueAddable,
                            showIndexNumber,
                            sortable,
                            removable,
                            maxItems: schema.maxItems,
                            minItems: schema.minItems,
                            globalOptions
                        },
                        on: this.$listeners
                    }
                )
            ]
        );
    }
};
