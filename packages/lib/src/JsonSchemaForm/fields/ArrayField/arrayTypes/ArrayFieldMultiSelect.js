/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */


import vueProps from '../../props';
import {
    getWidgetConfig, optionsList
} from '../../../common/formUtils';
import retrieveSchema from '../../../common/schema/retriev';

import CheckboxesWidget from '../../../widgets/CheckboxesWidget';
import Widget from '../../../fieldComponents/Widget';


export default {
    name: 'ArrayFieldMultiSelect',
    props: {
        ...vueProps,
        itemsFormData: {
            type: Array,
            default: () => []
        }
    },
    render(h) {
        const widgetConfig = getWidgetConfig({
            schema: this.schema,
            uiSchema: this.schema
        }, () => {
            // 这里需要索引当前节点，通过到schemaField组件的会统一处理
            const itemsSchema = retrieveSchema(this.schema.items, this.rootSchema, this.itemsFormData);
            const enumOptions = optionsList(itemsSchema);
            return {
                widget: CheckboxesWidget,
                enumOptions
            };
        });

        return h(
            Widget,
            {
                props: {
                    ...this.$props,
                    ...widgetConfig
                }
            }
        );
    }
};
