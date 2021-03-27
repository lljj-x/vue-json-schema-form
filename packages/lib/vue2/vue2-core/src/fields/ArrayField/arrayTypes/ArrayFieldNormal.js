/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */

import { computedCurPath } from '@lljj/vjsf-utils/vueUtils';
import { getUiOptions, replaceArrayIndex } from '@lljj/vjsf-utils/formUtils';

import FieldGroupWrap from '@lljj/vjsf-utils/components/FieldGroupWrap';
import SchemaField from '../../SchemaField';
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
            schema, uiSchema, curNodePath, rootFormData, itemsFormData, errorSchema, globalOptions
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
            uiSchema,
            curNodePath,
            rootFormData,
        });

        const arrayItemsVNodeList = itemsFormData.map((item, index) => {
            const tempUiSchema = replaceArrayIndex({
                schema: schema.items,
                uiSchema: uiSchema.items
            }, index);

            return {
                key: item.key,
                vNode: h(
                    SchemaField,
                    {
                        key: item.key,
                        props: {
                            ...context.props,
                            schema: schema.items,
                            required: !([].concat(schema.items.type).includes('null')),
                            uiSchema: {
                                ...uiSchema.items,
                                ...tempUiSchema, // 处理过 $index 的标识
                            },
                            errorSchema: errorSchema.items,
                            curNodePath: computedCurPath(curNodePath, index)
                        }
                    }
                )
            };
        });

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
                            globalOptions
                        },
                        on: context.listeners
                    }
                )
            ]
        );
    }
};
