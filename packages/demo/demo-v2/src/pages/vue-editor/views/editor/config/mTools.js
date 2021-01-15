/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

// 轮播图
import componentPackCarouselImg from '../viewComponentsM/CarouselImg';

// 纯文本
import componentPackText from '../viewComponentsM/Text';

// 分类条
import CategoryList from '../viewComponentsM/CategoryList';

// 分类条
import RecommendGoods from '../viewComponentsM/RecommendGoods';

// 分类条
import Test from '../viewComponentsM/Test';


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
            viewWidth: '100%',
            icon: 'el-icon-picture',
            componentPack: componentPackCarouselImg
        }, {
            title: '纯文本',
            maxNum: 20,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            componentPack: componentPackText
        }, {
            title: '分类条',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            componentPack: CategoryList
        }, {
            title: '推荐商品',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            componentPack: RecommendGoods
        }, {
            title: '测试自定义form',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            componentPack: Test
        }]
    }
];

export default tools;
