/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */

import { h } from 'vue';

import {
    getWidgetConfig, optionsList
} from '@lljj/vjsf-utils/formUtils';
import retrieveSchema from '@lljj/vjsf-utils/schema/retriev';
import vueProps from '../../props';

import Widget from '../../../components/Widget';

export default {
    name: 'ArrayFieldMultiSelect',
    props: {
        ...vueProps
    },
    setup(props, { attrs }) {
        return () => {
            const {
                schema, rootSchema, uiSchema, curNodePath, rootFormData, globalOptions
            } = props;

            // 这里需要索引当前节点，通过到schemaField组件的会统一处理
            const itemsSchema = retrieveSchema(schema.items, rootSchema);

            const enumOptions = optionsList(itemsSchema, uiSchema, curNodePath, rootFormData);

            const widgetConfig = getWidgetConfig({
                schema,
                uiSchema,
                curNodePath,
                rootFormData
            }, () => ({
                widget: globalOptions.WIDGET_MAP.common.checkboxGroup
            }));

            // 存在枚举数据列表 传入 enumOptions
            widgetConfig.uiProps.multiple = true;

            if (enumOptions && !widgetConfig.uiProps.enumOptions) {
                widgetConfig.uiProps.enumOptions = enumOptions;
            }

            return h(
                Widget,
                {
                    ...attrs,
                    ...props,
                    ...widgetConfig
                }
            );
        };
    }
};
