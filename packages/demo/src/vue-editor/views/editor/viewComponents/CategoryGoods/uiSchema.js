/**
 * Created by Liu.Jun on 2020/7/25 15:47.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    title: {
        'ui:placeholder': '请输入标题'
    },
    subTitle: {
        'ui:placeholder': '请输入副标题'
    },
    banner: {
        link: {
            ...genImgItem()
        },
        bannerTitle: {
            'ui:placeholder': '请输入banner标题'
        },
        bannerSubTitle: {
            'ui:placeholder': '请输入banner副标题'
        }
    },
    goodsList: {
        'ui:showIndexNumber': true,
        items: {
            ...genImgItem()
        }
    }
};
