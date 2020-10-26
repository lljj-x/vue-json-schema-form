/**
 * Created by Liu.Jun on 2020/10/26 18:24.
 */

const baseSchema = {
    title: '基础Form label配置',
    type: 'object',
    properties: {
        property: {
            title: '属性名',
            type: 'string'
        },
        title: {
            title: '选择文字颜色',
            type: 'string'
        },
        description: {
            title: '描述',
            type: 'string'
        },
        labelWidth: {
            title: '标签宽度',
            type: 'number'
        },
        default: {
            title: '默认值',
            type: 'string'
        },
        disabled: {
            title: '禁用',
            type: 'boolean'
        }
    }
};

export default schema => ({
    type: 'object',
    required: [],
    properties: {
        baseSchema,
        ...schema
    }
});
