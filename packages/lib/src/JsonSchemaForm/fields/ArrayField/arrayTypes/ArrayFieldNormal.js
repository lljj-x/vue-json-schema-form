/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */

import { computedCurPath } from '../../../common/vueUtils';
import { getUiOptions } from '../../../common/formUtils';

import SchemaField from '../../SchemaField';
import FieldGroupWrap from '../../../fieldComponents/FieldGroupWrap';
import ArrayOrderList from '../components/ArrayOrderList';

import vueProps from '../../props';

export default {
    name: 'ArrayFieldNormal',
    props: {
        ...vueProps,
        itemsFormData: {
            type: Array,
            // default: () => []
        }
    },
    render(h) {
        const {
            schema, uiSchema, errorSchema
        } = this.$props;

        const {
            title, description, addable, sortable, removable, showTitle, showDescription
        } = getUiOptions({
            schema,
            uiSchema
        });

        const arrayItemsVNodeList = this.itemsFormData.map((item, index) => ({
            key: item.key,
            vNode: h(
                SchemaField,
                {
                    key: item.key,
                    props: {
                        ...this.$props,
                        schema: schema.items,
                        required: !([].concat(schema.items.type).includes('null')),
                        uiSchema: uiSchema.items,
                        errorSchema: errorSchema.items,
                        curNodePath: computedCurPath(this.curNodePath, index)
                    }
                }
            )
        }));

        return h(
            FieldGroupWrap,
            {
                props: {
                    title,
                    description,
                    showTitle,
                    showDescription
                },
            },
            [
                h(
                    ArrayOrderList,
                    {
                        props: {
                            vNodeList: arrayItemsVNodeList,
                            addable,
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
