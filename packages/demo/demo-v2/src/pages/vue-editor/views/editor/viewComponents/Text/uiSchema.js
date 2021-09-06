/**
 * Created by Liu.Jun on 2020/7/25 11:25.
 */

export default {
    txt: {
        'ui:options': {
            renderScopedSlots(h) {
                return {
                    append: () => h('span', '.com')
                };
            },
            widgetListeners: {
                input(event) {
                    console.log('ui input', event);
                }
            },
            renderChildren(h) {
                return [
                    h('span', {
                        slot: 'suffix',
                    }, '后缀')
                ];
            },
            getWidget(widgetVm) {
                console.log(widgetVm);
            },
            onChange(data) {
                console.log('change:', data);
            }
        }
    }
};
