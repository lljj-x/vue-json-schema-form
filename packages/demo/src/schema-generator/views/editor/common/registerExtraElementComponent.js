/**
 * Created by Liu.Jun on 2020/4/24 10:59.
 */

import Vue from 'vue';

const ExtraComponents = {
    // 需要额外注册的 Field，通过图片选择图片加链接
    LinkImgField: () => import('../fieldComponents/linkImgField/LinkImgField')
};

Object.entries(ExtraComponents).forEach(([key, value]) => {
    Vue.component(key, value);
});
