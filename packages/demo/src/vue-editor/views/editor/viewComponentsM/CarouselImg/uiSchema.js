/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../../viewComponents/_commonConfig/ui/genImgItem';

export default {
    imgList: {
        'ui:options': {
            title: '添加图片',
            description: '图片宽度750px，高度固定400px。<span>这里使用默认的field和校验提示</span>'
        },
        items: {
            ...genImgItem({
                width: 1920,
                height: 500,
            }),
            imgLink: {
                'err:format': '请输入正确的的链接地址',
                'err:required': '不能为空'
            },
            'ui:title': '轮播图片配置'
        }
    }
};
