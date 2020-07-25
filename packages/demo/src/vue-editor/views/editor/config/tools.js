/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

// 轮播图
import * as componentPackCarouselImg from '../viewComponents/CarouselImg';

// 秒杀商品
import * as componentPackFlashSaleGoodsList from '../viewComponents/FlashSaleGoodsList';

// 纯文本
import * as componentPackText from '../viewComponents/Text';

// 多图模块一排5个
import * as componentPackMultipleImg5 from '../viewComponents/MultipleImg5';

// 多图模块 2-3
import * as componentPackMultipleImg23 from '../viewComponents/MultipleImg2_3';

// 多图模块 1-2
import * as componentPackMultipleImg13 from '../viewComponents/MultipleImg1_3';

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
            title: '秒杀商品',
            maxNum: 3,
            icon: 'el-icon-picture',
            componentPack: componentPackFlashSaleGoodsList
        }, {
            title: '多图(5)',
            maxNum: 5,
            icon: 'el-icon-picture',
            componentPack: componentPackMultipleImg5
        }, {
            title: '多图(2-3)',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            componentPack: componentPackMultipleImg23
        }, {
            title: '多图(1-3)',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            componentPack: componentPackMultipleImg13
        }, {
            title: '纯文本',
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
