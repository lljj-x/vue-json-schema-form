/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    imgItem1_1: {
        'ui:title': '图片上',
        ...genImgItem({
            width: 1920,
            height: 420,
        })
    },
    imgItem2_1: {
        'ui:title': '图片下左',
        ...genImgItem({
            width: 580,
            height: 500,
        })
    },
    imgItem2_2: {
        'ui:title': '图片下右',
        ...genImgItem({
            width: 580,
            height: 500,
        })
    }
};
