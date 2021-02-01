/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */

import { h } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';
import { modelValueComponent } from '../../utils';

const baseComponent = {
    name: 'TimePickerWidget',
    inheritAttrs: false,
    setup(props, { attrs }) {
        return () => h(resolveComponent('a-time-picker'), {
            'value-format': 'HH:mm:ss',
            ...attrs
        });
    }
};

const moduleValeComponent = modelValueComponent(baseComponent, {
    model: 'value'
});

export default moduleValeComponent;
