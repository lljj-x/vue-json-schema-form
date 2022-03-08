/**
 * Created by Liu.Jun on 2021/2/23 10:21 下午.
 */

import { h } from 'vue';
import { resolveComponent, modelValueComponent } from '@lljj/vjsf-utils/vue3Utils';

const baseComponent = {
    name: 'CheckboxesWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    },
    setup(props, { attrs }) {
        return () => h(resolveComponent('n-checkbox-group'), attrs, {
            default() {
                return h(resolveComponent('n-space'), {
                    itemStyle: 'display: flex'
                }, {
                    default() {
                        return props.enumOptions.map((item, index) => h(resolveComponent('n-checkbox'), {
                            key: index,
                            value: item.value
                        }, {
                            default: () => item.label
                        }));
                    }
                });
            }
        });
    }
};

const moduleValeComponent = modelValueComponent(baseComponent, {
    model: 'value'
});

export default moduleValeComponent;
