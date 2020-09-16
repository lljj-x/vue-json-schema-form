/**
 * Created by Liu.Jun on 2020/9/16 10:25.
 */

import vueProps from '../../props';
import Widget from '../../../fieldComponents/Widget';
import { getWidgetConfig } from '../../../common/formUtils';
import WIDGET_MAP from '../../../config/WIDGET_MAP';

export default {
    name: 'ArrayFieldDateRange',
    props: vueProps,
    functional: true,
    render(h, context) {
        const { schema, uiSchema } = context.props;
        const widgetConfig = getWidgetConfig({
            schema,
            uiSchema: {
                'ui:widget': WIDGET_MAP.formats[schema.format],
                ...uiSchema
            }
        });

        return h(
            Widget,
            {
                props: {
                    ...context.props,
                    ...widgetConfig
                }
            }
        );
    }
};
