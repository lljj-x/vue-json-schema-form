/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    imgList: {
        'ui:options': {
            title: '添加图片',
            description: '图片宽度1920px，高度固定500px。<span>这里使用默认的field和校验提示</span>',
            showIndexNumber: true
        },
        items: {
            ...genImgItem({
                width: 1920,
                height: 500,
            }),
            'ui:title': '轮播图片配置'
        }
    }
};
