/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

// 轮播图
import * as componentPackCarouselImg from '../viewComponents/CarouselImg';

// Tuple数组
import * as componentPackTupleArray from '../viewComponents/TupleArray';

// 测试
import * as componentPackTest from '../viewComponents/Test';

// 多图模块 1
// import * as componentPackMultipleImg1 from '../viewComponents/MultipleImg1';

// 多图模块 2
// import * as componentPackMultipleImg2 from '../viewComponents/MultipleImg2';

// 多图模块 3
import * as componentPackMultipleImg3 from '../viewComponents/MultipleImg3';

// 多图模块 3
import * as componentPackText from '../viewComponents/Text';

// 热销
// import * as componentPackHotPickGoodsList from '../viewComponents/HotPickGoodsList';

// 推荐
import * as componentPackRecommendedGoodsList from '../viewComponents/RecommendedGoodsList';

// 所有商品
import * as componentPackAllGoodsList from '../viewComponents/AllGoodsList';

// 优惠券
import * as componentPackCoupon from '../viewComponents/Coupon';


/**
 * hidden 隐藏，不显示在工具栏
 * maxNum Number 最大可配置数
 * topDisplay Bool 最顶部显示
 * bottomDisplay Bool 最底部显示
 * onlyCanConfig Bool 是否只能配置数据，不能删除 copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: '图文类',
        componentList: [{
            title: '轮播 (普通数组)',
            maxNum: 2,
            viewWidth: '1920px',
            icon: 'el-icon-picture',
            componentPack: componentPackCarouselImg
        }, {
            title: '地址 (Tuple数组)',
            maxNum: 2,
            icon: 'el-icon-picture',
            componentPack: componentPackTupleArray
        }, {
            title: '测试数据',
            maxNum: 1,
            icon: 'el-icon-picture',
            componentPack: componentPackTest
        }, {
            title: '多图',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            componentPack: componentPackMultipleImg3
        }, {
            title: '文本',
            maxNum: 20,
            icon: 'el-icon-notebook-1',
            componentPack: componentPackText
        }]
    },
    {
        groupName: '商品类',
        componentList: [{
            title: '全部商品',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            componentPack: componentPackAllGoodsList,
            additional: {
                bottomDisplay: true,
                unRemove: true // 不可移除
            }
        }, {
            title: '推荐商品',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            componentPack: componentPackRecommendedGoodsList
        }]
    },
    {
        groupName: '营销互动类',
        componentList: [{
            title: '优惠券',
            maxNum: 1,
            icon: 'el-icon-s-ticket',
            componentPack: componentPackCoupon
        }]
    }
];

export default tools;
