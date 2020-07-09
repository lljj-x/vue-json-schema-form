<template>
    <div :class="$style.box">
        <h4 :class="$style.title">{{ title }}</h4>
        <div v-for="(item, index) in lineNumArr" :key="index" :class="$style.goodsLine">
            <div v-for="(innerItem, innerIndex) in lineItemsArr" :key="innerIndex" :class="$style.goodsItem">
                <SkeletonGoods :animation="false" :length="1"></SkeletonGoods>
            </div>
        </div>
    </div>
</template>

<script>
    import SkeletonGoods from './skeleton/SkeletonGoods';

    export default {
        name: 'GoodsAllListView',
        components: {
            SkeletonGoods
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            lineNum: {
                type: Number,
                default: 1
            },
            lineItems: {
                type: Number,
                default: 1
            }
        },
        computed: {
            lineNumArr() {
                return Array(this.lineNum).fill(null);
            },
            lineItemsArr() {
                return Array(this.lineItems).fill(null);
            }
        }
    };
</script>

<style module>
    .box {
        background: #FFFFFF;
    }
    .title {
        text-align: center;
        font-size: 18px;
        padding: 20px;
    }
    .goodsLine {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .goodsItem {
        width: 272.5px;
    }
    .goodsImg {
        width: 100px;
        height: 100px;
        background: #409EFF;
    }
</style>
