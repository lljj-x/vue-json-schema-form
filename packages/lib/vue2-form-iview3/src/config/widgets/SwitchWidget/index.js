/**
 * Created by Liu.Jun on 2021/1/2 10:53 下午.
 */

export default {
    name: 'SwitchWidget',
    functional: true,
    render(h, context) {
        const { activeText, inactiveText } = context.props;

        // 转换elementUi activeText inactiveText 支持 iview slot
        const childNode = Object.entries({
            open: activeText,
            close: inactiveText,
        }).reduce((preVal, [slot, value]) => {
            if (value !== undefined) {
                preVal.push(h('span', {
                    slot
                }, [value]));
            }

            return preVal;
        }, []);

        return h('i-switch', context.data, childNode);
    }
};
