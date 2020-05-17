/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */


import vueProps from '../../props';
import {
    allowAdditionalItems, getDefaultFormState, getUiOptions
} from '../../../common/schemaUtils';

import { cutOff } from '../../../common/arrayUtils';

import SchemaField from '../../SchemaField';
import FieldGroupWrap from '../../../fieldComponents/FieldGroupWrap';
import ArrayOrderList from '../components/ArrayOrderList';

export default {
    name: 'ArrayFieldTuple',
    props: {
        ...vueProps,
        itemsFormData: {
            type: Array
        }
    },
    created() {
        this.fixItemsFormData();
    },
    methods: {
        // 兼容数据 长度不足的的场景
        fixItemsFormData() {
            const isNoArray = !Array.isArray(this.itemsFormData);
            if (isNoArray || this.itemsFormData < this.schema.items) {
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
        if (!Array.isArray(this.itemsFormData)) return false;

        const {
            schema, uiSchema, errorSchema
        } = this.$props;

        const {
            title, description, addable, sortable, removable
        } = getUiOptions({
            schema,
            uiSchema
        });

        // 拆分为 tuple 和 additional
        const cutOfArr = cutOff(this.itemsFormData, this.schema.items.length - 1);

        const tupleVnodeArr = cutOfArr[0].map((item, index) => h(
            SchemaField,
            {
                key: index,
                props: {
                    ...this.$props,
                    required: !([].concat(schema.items[index].type).includes('null')),
                    schema: schema.items[index],
                    uiSchema: uiSchema.items ? uiSchema.items[index] : {},
                    errorSchema: errorSchema.items ? errorSchema.items[index] : {},
                    curNodePathArr: this.curNodePathArr.concat(index)
                }
            }
        ));

        const additionalVnodeArr = cutOfArr[1].map((item, index) => h(
            SchemaField,
            {
                key: index,
                props: {
                    ...this.$props,
                    schema: schema.additionalItems,
                    required: !([].concat(schema.additionalItems.type).includes('null')),
                    uiSchema: uiSchema.additionalItems,
                    errorSchema: errorSchema.additionalItems,
                    curNodePathArr: this.curNodePathArr.concat(index + schema.items.length)
                }
            }
        ));

        // 是否可添加同时受限于 additionalItems 属性
        const trueAddable = (addable === undefined ? true : addable) && allowAdditionalItems(this.schema);

        // 默认循环固定配置的数据 长度外的使用ArrayOrderList渲染
        return h(
            FieldGroupWrap,
            {
                props: {
                    title,
                    description,
                }
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
                            sortable,
                            removable,
                            maxItems: schema.maxItems,
                            minItems: schema.minItems,
                        },
                        on: this.$listeners
                    }
                )
            ]
        );
    }
};
