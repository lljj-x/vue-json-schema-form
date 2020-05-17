/**
 * Created by Liu.Jun on 2020/4/17 15:08.
 */

export default {
    null: {
        type: null,
        default: null
    },
    string: {
        type: String,
        default: ''
    },
    boolean: {
        type: Boolean,
        default: false
    },
    number: {
        type: Number,
        default: 0
    },
    integer: {
        type: Number,
        default: 0
    },
    object: {
        type: Object,
        default: () => ({}), // 引用类型特殊处理
    },
    array: {
        type: Array,
        default: () => [],
    }
};
