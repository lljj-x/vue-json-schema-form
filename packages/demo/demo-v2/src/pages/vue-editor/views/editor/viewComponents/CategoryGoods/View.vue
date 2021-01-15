<template>
    <div :class="$style.box">
        <div
            v-if="isNoEmpty"
            :class="$style.content"
        >
            <div :class="$style.titleBox">
                <i :class="$style.colorMark"></i>
                <span :class="$style.title">{{ formData.title }}</span>
                <span :class="$style.subTitle">{{ formData.subTitle }}</span>
            </div>
            <div :class="$style.contentBox">
                <div :class="$style.bannerBox">
                    <a
                        :href="formData.banner.link.imgLink"
                        target="_blank"
                    >
                        <el-image
                            :src="formData.banner.link.imgUrl"
                            :style="{
                                width: '235px',
                                height: '618px',
                            }"
                            class="hover-animation"
                            fit="cover"
                        >
                        </el-image>
                        <div :class="$style.bannerText">
                            <span :class="$style.bannerTitle">{{ formData.banner.bannerTitle }}</span>
                            <span :class="$style.bannerSubTitle">{{ formData.banner.bannerSubTitle }}</span>
                        </div>
                        <div :class="$style.detailWrap">
                            <img src="https://img.alicdn.com/tfs/TB1IQBtXaagSKJjy0FbXXa.mVXa-68-68.png">
                        </div>
                    </a>
                </div>
                <div :class="$style.goodsList">
                    <div
                        v-for="(goodsItem, goodsItemIndex) in formData.goodsList"
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
                                    width: '185px',
                                    height: '185px',
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
                            ￥69.8
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <GoodsListView
            v-else
            :line-num="2"
            :line-items="5"
            title="分类管区"
        ></GoodsListView>
    </div>
</template>

<script>
import GoodsListView from '../../components/GoodsListView';

export default {
    name: 'CategoryGoodsView',
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
        return {
        };
    },
    computed: {
        isNoEmpty() {
            const { formData: { goodsList } } = this;
            return goodsList && goodsList.length > 0 && goodsList[0].imgUrl;
        }
    }
};
</script>

<style module>
    .titleBox {
        padding: 20px 0;
        display: flex;
        align-items: center;
        .colorMark {
            display: inline-block;
            background-color: #333;
            width: 5px;
            height: 18px;
            vertical-align: middle;
        }
        .title {
            margin-left: 10px;
            font-size: 18px;
            color: #000;
        }
        .subTitle {
            font-size: 14px;
            color: #000;
            margin-left: 10px;
        }
    }
    .contentBox {
        overflow: hidden;
        display: flex;
        height: 618px;
        justify-content: space-between;
    }
    .bannerBox {
        position: relative;
    }
    .bannerText {
        position: absolute;
        vertical-align: middle;
        bottom: 20%;
        width: 218px;
        height: 64px;
        line-height: 24px;
        font-size: 18px;
        text-align: center;
        color: #FFF;
        .bannerTitle {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            background: rgba(0,0,0,.9);
            width: 70px;
            padding: 0 14px;
            height: 64px;
            overflow: hidden;
        }
        .bannerSubTitle {
            box-sizing: border-box;
            display: flex;
            padding: 0 22px;
            align-items: center;
            left: 70px;
            top: 0;
            position: absolute;
            background: rgba(0,0,0,.6);
            overflow: hidden;
            width: 128px;
            height: 64px;
        }
    }
    .detailWrap {
        background-image: linear-gradient(-180deg,rgba(0,0,0,0) 4%,rgba(0,0,0,.36) 100%);
        width: 100%;
        height: 60px;
        position: absolute;
        bottom: 0;
        left: 0;
        img {
            position: absolute;
            bottom: 15px;
            right: 15px;
            width: 32px;
            height: 32px;
        }
    }
    .goodsList {
        width: 938px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .goodsItem {
        width: 220px;
        height: 300px;
        padding-top: 20px;
        box-sizing: border-box;
        background-color: #FFFFFF;
        border: 1px solid #FFFFFF;;
        text-align: center;
    }
    .goodsImg {
        vertical-align: middle;
    }
    .goodsTitle {
        width: 135px;
        height: 40px;
        font-size: 14px;
        color: #333;
        line-height: 20px;
        overflow: hidden;
        margin: 8px auto;
    }
    .goodsPrice {
        font-size: 18px;
        color: #FF0036;
        line-height: 18px;
        margin: 10px auto;
    }
</style>
