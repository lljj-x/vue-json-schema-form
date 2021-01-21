/**
 * Created by Liu.Jun on 2020/9/16 10:25.
 */

import { h } from 'vue';
import { getWidgetConfig } from '@lljj/vjsf-utils/formUtils';
import vueProps from '../../props';
import Widget from '../../../components/Widget';

export default {
    name: 'ArrayFieldSpecialFormat',
    props: vueProps,
    setup(props, { attrs }) {
        const {
            schema, uiSchema, curNodePath, rootFormData, globalOptions
        } = props;
        const widgetConfig = getWidgetConfig({
            schema: {
                'ui:widget': globalOptions.WIDGET_MAP.formats[schema.format],
                ...schema
            },
            uiSchema,
            curNodePath,
            rootFormData
        });

        return () => h(
            Widget,
            {
                ...attrs,
                ...props,
                ...widgetConfig
            }
        );
    }
};
