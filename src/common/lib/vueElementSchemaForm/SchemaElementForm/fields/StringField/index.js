/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import vueProps from '../props';
import { getUiConfig, isSelect, optionsList } from '../../common/schemaUtils';
import Widget from '../../fieldComponents/Widget';

export default {
    name: 'StringField',
    props: vueProps,
    render(h) {
        const {
            schema, uiSchema
        } = this.$props;

        const {
            widget, title, labelWidth, description, attrs, ...uiProps
        } = getUiConfig({
            schema,
            uiSchema
        }, () => {
            // 可能是枚举数据默认 select组件，否则使用 input
            const enumOptions = isSelect(schema) && optionsList(schema);
            const isNumber = schema.type === 'number' || schema.type === 'integer';
            return {
                widget: enumOptions ? 'el-select' : isNumber ? 'el-input-number' : 'el-input',
                enumOptions
            };
        });

        // debugger;
        return h(
            Widget,
            {
                class: {
                    IntegerField: schema.type === 'integer'
                },
                props: {
                    ...this.$props,
                    widget,
                    description,
                    label: title,
                    labelWidth,
                    attrs,
                    uiProps,
                }
            }
        );
    }
};
