/**
 * Created by Liu.Jun on 2020/7/22 11:07 下午.
 */

export default {
    schema: {
        title: '隐藏表单项',
        type: 'object',
        description: `
            隐藏表单项可以使用多种配置方案，可以结合实际需要
            <br> 1. ui:widget: "hidden"
            <br> 2. ui:widget: "HiddenWidget"
            <br> 3. ui:hidden: true
         `,
        properties: {
            hidden2: {
                title: 'hidden2',
                type: 'string',
                'ui:widget': 'HiddenWidget',
                default: 'hidden2'
            },
            hidden3: {
                title: 'hidden1',
                type: 'string',
                'ui:hidden': true,
                default: 'hidden3'
            }
        }
    }
};
