/**
 * Created by Liu.Jun on 2021/1/2 10:56 下午.
 */

export default {
    name: 'SwitchWidget',
    functional: true,
    render(h, context) {
        // iview3 input number undefined 会默认为 1，需要抹平差异

        // 实际的数据为 undefined 保持和jsonSchema 一致
        // 传递给 iview 时转换为 null，兼容iview3清空场景
        if (context.data.attrs.value === undefined) context.data.attrs.value = null;

        return h('input-number', context.data, context.children);
    }
};
