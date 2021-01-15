/**
 * Created by Liu.Jun on 2020/4/23 10:50.
 */

import { getWidgetConfig, optionsList } from '@lljj/vjsf-utils/formUtils';

import Widget from '../../components/Widget';
import vueProps from '../props';

export default {
    name: 'BooleanField',
    props: vueProps,
    functional: true,
    render(h, context) {
        const {
            schema, uiSchema, curNodePath, rootFormData, globalOptions
        } = context.props;

        // Bool 会默认传入枚举类型选项 true false
        const enumOptions = optionsList({
            enumNames: schema.enumNames || ['true', 'false'],
            enum: schema.enum || [true, false]
        }, uiSchema, curNodePath, rootFormData);

        const widgetConfig = getWidgetConfig({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        }, () => ({
            widget: globalOptions.WIDGET_MAP.types.boolean
        }));

        widgetConfig.uiProps.enumOptions = widgetConfig.uiProps.enumOptions || enumOptions;

        return h(
            Widget,
            {
                ...context.data,
                props: {
                    ...context.props,
                    ...widgetConfig
                }
            }
        );
    }
};
