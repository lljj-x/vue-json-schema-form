/**
 * Created by Liu.Jun on 2020/4/23 10:50.
 */

import WIDGET_MAP from '../../config/WIDGET_MAP';

import { getWidgetConfig, optionsList } from '../../common/formUtils';
import Widget from '../../fieldComponents/Widget';
import vueProps from '../props';

export default {
    name: 'BooleanField',
    props: vueProps,
    render(h) {
        const {
            schema, uiSchema
        } = this.$props;

        // Bool 会默认传入枚举类型选项 true false
        const enumOptions = optionsList({
            enum: schema.enum || [true, false]
        });

        const widgetConfig = getWidgetConfig({
            schema,
            uiSchema
        }, () => ({
            widget: WIDGET_MAP.types.boolean
        }));

        widgetConfig.uiProps.enumOptions = enumOptions;

        // debugger;
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
