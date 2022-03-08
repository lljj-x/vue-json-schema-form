/**
 * Created by Liu.Jun on 2021/2/23 10:21 下午.
 */

import { h } from 'vue';
import { modelValueComponent, resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

const baseComponent = {
    name: 'SelectWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    },
    setup(props, { attrs }) {
        return () => h(resolveComponent('n-select'), {
            options: props.enumOptions,
            ...attrs,
        });
    }
};

const moduleValeComponent = modelValueComponent(baseComponent, {
    model: 'value'
});

export default moduleValeComponent;
