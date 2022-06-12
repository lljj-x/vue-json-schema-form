/**
 * Created by Liu.Jun on 2020/9/16 10:25.
 */

import { h, computed } from 'vue';
import { getWidgetConfig } from '@lljj/vjsf-utils/formUtils';
import vueProps from '../../props';
import Widget from '../../../components/Widget';

export default {
    name: 'ArrayFieldSpecialFormat',
    props: vueProps,
    setup(props, { attrs }) {
        const widgetConfig = computed(() => getWidgetConfig({
            schema: {
                'ui:widget': props.globalOptions.WIDGET_MAP.formats[props.schema.format],
                ...props.schema
            },
            uiSchema: props.uiSchema,
            curNodePath: props.curNodePath,
            rootFormData: props.rootFormData
        }));

        return () => h(
            Widget,
            {
                ...attrs,
                ...props,
                ...widgetConfig.value
            }
        );
    }
};
