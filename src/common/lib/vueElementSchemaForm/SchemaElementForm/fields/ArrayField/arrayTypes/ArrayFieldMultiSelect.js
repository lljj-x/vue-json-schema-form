/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */


import vueProps from '../../props';
import {
    getUiConfig, optionsList, retrieveSchema
} from '../../../common/schemaUtils';

import Checkboxes from '../../../widgets/Checkboxes';
import Widget from '../../../fieldComponents/Widget';


export default {
    name: 'ArrayFieldMultiSelect',
    props: {
        ...vueProps,
        itemsFormData: {
            type: Array
        }
    },
    render(h) {
        const {
            widget, title, labelWidth, description, attrs, ...uiProps
        } = getUiConfig({
            schema: this.schema,
            uiSchema: this.schema
        }, () => {
            // 这里需要索引当前节点，通过到schemaField组件的会统一处理
            const itemsSchema = retrieveSchema(this.schema.items, this.rootSchema, this.itemsFormData);
            const enumOptions = optionsList(itemsSchema);
            return {
                widget: Checkboxes,
                enumOptions
            };
        });

        return h(
            Widget,
            {
                props: {
                    ...this.$props,
                    widget,
                    description,
                    label: title,
                    labelWidth,
                    attrs,
                    uiProps,
                }
            }
        );
    }
};
