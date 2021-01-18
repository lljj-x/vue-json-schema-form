<template>
    <div :class="$style.box">
        <template v-if="isNoEmpty">
            <h3 :class="$style.title">{{ formData.title }}</h3>
            <div :class="$style.goodsList">
                <a
                    v-for="(item, index) in formData.imgList"
                    :key="index"
                    :href="item.imgLink"
                    :class="$style.goodsItem"
                >
                    <el-image
                        :class="$style.goodsImg"
                        :src="item.imgUrl"
                        fit="cover"
                    >
                    </el-image>
                    <p :class="$style.price">11.1元</p>
                </a>
            </div>
        </template>
        <div
            v-else
            :class="$style.emptyBox"
        >
            点击配置数据
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecommendGoods',
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isNoEmpty() {
            const { formData } = this;
            return formData.imgList && formData.imgList.length > 0;
        }
    }
};
</script>

<style module>
    @import 'demo-common/css/variable.css';
    .box {
        padding: 10px;
        background: #FFFFFF;
    }

    .emptyBox {
        min-height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        padding: 10px 0;
        font-size: 14px;
        font-weight: bold;
    }
    .goodsList {
        width: 100%;
        display: flex;
        place-content: center space-between;
    }
    .goodsItem {
        flex: 0 0 23%;
    }
    .goodsImg {
        width: 100%;
        height: 100px;
    }
    .price {
        padding: 8px 0;
        text-align: center;
        font-size: 12px;
        color: #333333;
    }


</style>
