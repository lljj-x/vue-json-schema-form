/**
 * Created by Liu.Jun on 2020/7/22 11:07 下午.
 */

export default {
    schema: {
        title: 'uiSchema 配置表达式',
        type: 'object',
        description: '<ui><li><b>rootFormData</b>：根节点的值</li><li><b>parentFormData</b>：当前父节点的值</li></ui>',
        properties: {
            age: {
                type: 'integer',
                title: '输入年龄',
                maximum: 80,
                minimum: 16,
                'ui:title': '{{ parentFormData.age > 18 ? "呵呵呵" : "嘿嘿嘿" }}',
            },
            bio: {
                type: 'string',
                title: 'Bio',
                minLength: 10,
                'ui:type': '{{ parentFormData.bio && parentFormData.bio.length ?  "textarea" : undefined }}'
            },
            selectWidgetOptions: {
                title: 'Custom select widget with options',
                type: 'string',
                // eslint-disable-next-line max-len
                'ui:style': '{{ parentFormData.selectWidgetOptions === "foo"  ?  { boxShadow: "0 0 6px 2px pink"} : { boxShadow: "0 0 6px 2px red"} }}',
                'ui:title': '{{ parentFormData.a === "1" ? "呵呵呵" : "嘿嘿嘿" }}',
                enum: [
                    'foo',
                    'bar'
                ],
                enumNames: [
                    'Foo',
                    'Bar'
                ]
            }
        }
    },
    formData: {
        a: '111'
    }
};
