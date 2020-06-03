/**
 * Created by Liu.Jun on 2020/4/16 10:47 下午.
 */

export default {
    formFooter: {
        type: Object,
        default: () => ({
            show: true,
            okBtn: '保存',
            cancelBtn: '取消',
        }),
    },
    value: {
        type: null,
        default: () => ({}),
        required: true
    },
    formProps: {
        type: Object,
        default: () => ({}),
    },
    schema: {
        type: Object,
        default: () => ({}),
        required: true
    },
    // 重置ui样式
    uiSchema: {
        type: Object,
        default: () => ({})
    },
    // 自定义校验规则
    customFormats: {
        type: Object,
        default: () => ({})
    },
    // 额外的错误配置
    extraErrors: {
        type: Object,
        default: () => ({})
    },
    // 重置自定义错误
    errorSchema: {
        type: Object,
        default: () => ({})
    }
};
