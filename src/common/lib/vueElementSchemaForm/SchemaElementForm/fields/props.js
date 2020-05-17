/**
 * Created by Liu.Jun on 2020/4/22 18:58.
 */

// 递归参数，统一props
export default {
    schema: {
        type: Object,
        default: () => ({})
    },
    uiSchema: {
        type: Object,
        default: () => ({})
    },
    errorSchema: {
        type: Object,
        default: () => ({})
    },
    rootSchema: {
        type: Object,
        default: () => ({})
    },
    // 根节点的数据
    rootFormData: {
        type: Object,
        default: () => ({})
    },
    // 当前节点路径
    curNodePathArr: {
        type: Array,
        default: () => []
    },
    required: {
        type: Boolean,
        default: false
    }
};
