/**
 * Created by Liu.Jun on 2020/11/27 16:42.
 */
export default {
    schema: {
        title: '文件上传',
        type: 'object',
        description: '文件上传 使用 el-upload组件，只是所有的 el-upload 参数，<br/>slot 可以通过 slots参数传入数组VNode list',
        properties: {
            imgUrl: {
                title: '单个图片',
                type: 'string',
                default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
                'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                'ui:widget': 'UploadWidget',
                'ui:btnText': '上传按钮文案配置'
            },
            imgUrlList: {
                title: '多图',
                type: 'array',
                'ui:widget': 'UploadWidget',
                'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                // eslint-disable-next-line max-len
                default: ['http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp'],
                items: {
                    type: 'string',
                }
            }
        }
    },
    formData: {}
};
