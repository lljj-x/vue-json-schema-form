/**
 * Created by Liu.Jun on 2020/4/23 10:50.
 */

import { getUiConfig } from '../../common/schemaUtils';
import Widget from '../../fieldComponents/Widget';
import vueProps from '../props';

export default {
    name: 'BooleanField',
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
        }, () => ({
            widget: 'el-switch'
        }));

        // debugger;
        return h(
            Widget,
            {
                class: {
                    BooleanFieldWrap: true
                },
                props: {
                    ...this.$props,
                    widget,
                    label: title,
                    labelWidth,
                    description,
                    attrs,
                    uiProps,
                }
            }
        );
    }
};
