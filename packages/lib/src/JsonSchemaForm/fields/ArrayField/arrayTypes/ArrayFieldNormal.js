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
    functional: true,
    props: {
        ...vueProps,
        itemsFormData: {
            type: Array,
            // default: () => []
        }
    },
    render(h, context) {
        const {
            schema, uiSchema, curNodePath, itemsFormData, errorSchema
        } = context.props;

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
            uiSchema
        });

        const arrayItemsVNodeList = itemsFormData.map((item, index) => ({
            key: item.key,
            vNode: h(
                SchemaField,
                {
                    key: item.key,
                    props: {
                        ...context.props,
                        schema: schema.items,
                        required: !([].concat(schema.items.type).includes('null')),
                        uiSchema: uiSchema.items,
                        errorSchema: errorSchema.items,
                        curNodePath: computedCurPath(curNodePath, index)
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
                class: {
                    ...context.data.class,
                    ...fieldClass
                },
                attrs: fieldAttrs,
                style: fieldStyle,
            },
            [
                h(
                    ArrayOrderList,
                    {
                        props: {
                            vNodeList: arrayItemsVNodeList,
                            showIndexNumber,
                            addable,
                            sortable,
                            removable,
                            maxItems: schema.maxItems,
                            minItems: schema.minItems,
                        },
                        on: context.listeners
                    }
                )
            ]
        );
    }
};
