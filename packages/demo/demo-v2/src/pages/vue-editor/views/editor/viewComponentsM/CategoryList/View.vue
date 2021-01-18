<template>
    <div :class="$style.box">
        <div
            v-if="isNoEmpty"
            :class="$style.catelist"
        >
            <a
                v-for="(item, index) in formData.imgList"
                :key="index"
                :href="item.img.imgLink"
                :class="$style.cateItem"
            >
                <el-image
                    :class="$style.cateItemImg"
                    :src="item.img.imgUrl"
                    :style="{
                        width: '50px',
                        height: '50px',
                    }"
                    fit="cover"
                >
                </el-image>
                <span :class="$style.cateItemName">{{ item.name }}</span>
            </a>
        </div>
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
    name: 'CategoryList',
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
        padding: 10px 0;
        background: #FFFFFF;
    }

    .emptyBox {
        min-height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .catelist {
        border: 0px solid black;
        position: relative;
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: horizontal;
        flex-direction: row;
        place-content: flex-start center;
        flex-shrink: 0;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
    }

    .cateItem {
        text-decoration: none;
        text-align: center;
    }

    .cateItemImg {
        margin: 5.48px 12.056px 2.192px;
    }

    .cateItemName {
        white-space: pre-wrap;
        border: 0px solid black;
        position: relative;
        box-sizing: border-box;
        display: block;
        -webkit-box-orient: vertical;
        flex-direction: column;
        align-content: flex-start;
        flex-shrink: 0;
        font-size: 13px;
        text-align: center;
        line-height: 16.44px;
        align-self: center;
        color: rgb(0, 0, 0);
    }
</style>
