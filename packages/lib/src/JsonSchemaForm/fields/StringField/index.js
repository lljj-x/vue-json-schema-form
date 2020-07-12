/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import vueProps from '../props';
import { getWidgetConfig, isSelect, optionsList } from '../../common/formUtils';
import Widget from '../../fieldComponents/Widget';
import SelectWidget from '../../widgets/SelectWidget';

export default {
    name: 'StringField',
    props: vueProps,
    render(h) {
        const {
            schema, uiSchema
        } = this.$props;

        // 可能是枚举数据使用select组件，否则使用 input
        const enumOptions = isSelect(schema) && optionsList(schema);

        const widgetConfig = getWidgetConfig({
            schema,
            uiSchema
        }, () => {
            const isNumber = schema.type === 'number' || schema.type === 'integer';

            return {
                widget: enumOptions ? SelectWidget : isNumber ? 'el-input-number' : 'el-input'
            };
        });

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
