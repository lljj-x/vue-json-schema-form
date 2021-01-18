<template>
    <div :class="$style.box">
        <div
            v-if="isNoEmpty"
            :class="$style.content"
        >
            <div :class="$style.countdown">
                <div :class="$style.countdownTitle">京东秒杀</div>
                <div :class="$style.countdownTime">
                    <p>活动开始时间：</p>
                    <strong>{{ formData.startTime }}</strong>
                </div>
            </div>
            <div :class="$style.goodsList">
                <el-carousel
                    :autoplay="false"
                    height="260px"
                >
                    <el-carousel-item
                        v-for="(goodsGroup, index) in goodsListGroup"
                        :key="index"
                        :class="$style.goodsGroup"
                        height="260px"
                    >
                        <div
                            v-for="(goodsItem, goodsItemIndex) in goodsGroup"
                            :key="goodsItemIndex"
                            :class="$style.goodsItem"
                        >
                            <a
                                :class="$style.goodsLink"
                                :href="goodsItem.imgLink"
                                target="_blank"
                            >
                                <el-image
                                    :class="$style.goodsImg"
                                    :src="goodsItem.imgUrl"
                                    :style="{
                                        width: '140px',
                                        height: '140px',
                                    }"
                                    class="hover-animation"
                                    fit="cover"
                                    alt=""
                                >
                                </el-image>
                            </a>
                            <div :class="$style.goodsTitle">
                                商品标题，可以结合具体业务活动商品数据
                            </div>
                            <div :class="$style.goodsPrice">
                                <span :class="$style.priceMiaosha">
                                    <i>¥</i>
                                    <span>599.00</span>
                                </span>
                                <span :class="$style.priceOrigin">
                                    <i>¥</i>
                                    <span>849.00</span>
                                </span>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div :class="$style.brand">
                <a
                    :href="formData.seckillBrand.imgLink"
                    target="_blank"
                >
                    <el-image
                        :src="formData.seckillBrand.imgUrl"
                        :style="{
                            width: '160px',
                            height: '206px',
                        }"
                        fit="cover"
                        class="hover-animation"
                    >
                    </el-image>
                </a>
            </div>
        </div>
        <GoodsListView
            v-else
            :line-num="1"
            :line-items="6"
            title="秒杀商品"
        ></GoodsListView>
    </div>
</template>

<script>
import GoodsListView from '../../components/GoodsListView';

export default {
    name: 'FlashSaleGoodsListView',
    components: {
        GoodsListView
    },
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {};
    },
    computed: {
        isNoEmpty() {
            return this.formData.startTime;
        },
        goodsListGroup() {
            const groupLength = 4;
            const preVal = [];

            const goodsListTemp = [...this.formData.goodsList];
            while (goodsListTemp.length > 0) {
                preVal.push(goodsListTemp.splice(0, groupLength));
            }
            return preVal;
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {}
};
</script>

<style module>
    @import 'demo-common/css/variable.css';

    .content {
        height: 260px;
        display: flex;
        flex-direction: row;
        background-color: #FFFFFF;
    }
    .countdown {
        width: 190px;
        position: relative;
        float: left;
        height: 100%;
        color: #fff;
        background-color: #e83632;
        background-image: url(https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/4a15d8883775742e3efbb850ae14def7.png);
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
    }
    .countdownTitle {
        width: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: 700;
        margin-top: 31px;
    }
    .countdownTime {
        margin-top: 100px;
        text-align: center;
        p {
            font-size: 16px;
            padding: 10px 0;
        }
        strong {
            font-size: 18px;
            padding-right: 2px;
            vertical-align: middle;
            display: inline-block;
            margin-top: -1px;
            font-weight: bold;
        }
    }
    .goodsList, .goodsGroup{
        width: 800px;
    }
    .goodsGroup {
        display: flex;
    }
    .goodsItem {
        width: 200px;
        height: 260px;
        padding: 0 20px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .goodsTitle {
            margin-top: 13px;
            line-height: 1;
            font-size: 12px;
            max-width: 100%;
            @mixin nowrap;
        }
        .goodsPrice {
            margin-top: 17px;
            width: 160px;
            height: 24px;
            border: 1px solid #e1251b;
            position: relative;
            box-sizing: border-box;
            line-height: 24px;
            overflow: hidden;
            background-color: #e1251b;
        }
        .priceMiaosha {
            width: 92px;
            height: 100%;
            text-align: center;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            line-height: 22px;
            float: left;
            &:before {
                content: " ";
                width: 0;
                height: 0;
                border-color: transparent white transparent transparent;
                border-style: solid;
                border-width: 22px 8px 0 0;
                position: absolute;
                top: 0;
                left: 84px;
            }
            i {
                font-size: 12px;
                font-weight: 400;
                padding-right: 2px;
            }
        }
        .priceOrigin {
            height: 100%;
            width: 66px;
            float: right;
            background: #fff;
            text-align: center;
            color: #999;
            font-size: 12px;
            line-height: 22px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            text-decoration: line-through;
            vertical-align: top;
        }
    }
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 190px;
    }
</style>
