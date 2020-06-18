/**
 * Created by Liu.Jun on 2020/4/23 10:50.
 */

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
            widget: 'el-switch'
        }));

        widgetConfig.uiProps.enumOptions = enumOptions;

        // debugger;
        return h(
            Widget,
            {
                class: {
                    BooleanFieldWrap: true
                },
                props: {
                    ...this.$props,
                    ...widgetConfig
                }
            }
        );
    }
};
