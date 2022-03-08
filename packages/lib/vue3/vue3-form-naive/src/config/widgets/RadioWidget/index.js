/**
 * Created by Liu.Jun on 2021/2/23 10:21 下午.
 */

import { h } from 'vue';
import { modelValueComponent, resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

const baseComponent = {
    name: 'RadioWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    },
    setup(props, { attrs }) {
        return () => h(resolveComponent('n-radio-group'), attrs, {
            default() {
                return props.enumOptions.map((item, index) => h(resolveComponent('n-radio'), {
                    key: index,
                    value: item.value
                }, {
                    default: () => item.label
                }));
            }
        });
    }
};

const moduleValeComponent = modelValueComponent(baseComponent, {
    model: 'value'
});

export default moduleValeComponent;
