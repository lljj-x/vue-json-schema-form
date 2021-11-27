export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'Text',
    title: '单文本输入组件',
    description: '单文本输入组件，用于在页面配置一条文字信息',
    type: 'object',
    required: ['txt'],
    properties: {
        imgUrl: {
            title: '测试图片上传',
            type: 'string',
            default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
            'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
            'ui:widget': 'UploadWidget',
            'ui:btnText': '上传按钮文案配置',
            'ui:responseFileUrl': (res) => {}
        },
        txt: {
            title: '文字',
            type: 'string',
            'ui:placeholder': '输入你的内容',
            'err:required': '必须输入标题文字内容'
        },
        txtColor: {
            title: '选择文字颜色',
            type: 'string',
            format: 'color',
            default: '#ff0132'
        }
    }
};
