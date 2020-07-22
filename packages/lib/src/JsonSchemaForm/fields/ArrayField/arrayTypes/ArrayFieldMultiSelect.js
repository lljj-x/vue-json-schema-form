/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */


import vueProps from '../../props';
import {
    getWidgetConfig, optionsList
} from '../../../common/formUtils';
import retrieveSchema from '../../../common/schema/retriev';

import WIDGET_MAP from '../../../config/WIDGET_MAP';
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
        // 这里需要索引当前节点，通过到schemaField组件的会统一处理
        const itemsSchema = retrieveSchema(this.schema.items, this.rootSchema, this.itemsFormData);
        const enumOptions = optionsList(itemsSchema, this.uiSchema);

        const widgetConfig = getWidgetConfig({
            schema: this.schema,
            uiSchema: this.uiSchema
        }, () => ({
            widget: WIDGET_MAP.common.checkboxGroup
        }));

        // 存在枚举数据列表 传入 enumOptions
        if (enumOptions) {
            widgetConfig.uiProps.enumOptions = enumOptions;
        }

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
