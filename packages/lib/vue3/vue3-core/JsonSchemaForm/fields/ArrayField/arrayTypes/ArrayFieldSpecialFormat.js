/**
 * Created by Liu.Jun on 2020/9/16 10:25.
 */

import { getWidgetConfig } from '@lljj/vjsf-utils/formUtils';
import vueProps from '../../props';
import Widget from '../../../components/Widget';

export default {
    name: 'ArrayFieldSpecialFormat',
    props: vueProps,
    functional: true,
    render(h, context) {
        const {
            schema, uiSchema, curNodePath, rootFormData, globalOptions
        } = context.props;
        const widgetConfig = getWidgetConfig({
            schema: {
                'ui:widget': globalOptions.WIDGET_MAP.formats[schema.format],
                ...schema
            },
            uiSchema,
            curNodePath,
            rootFormData
        });

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
