<template>
    <div :class="$style.box">
        <template v-if="isNoEmpty">
            <el-carousel
                :autoplay="true"
                height="420px"
            >
                <el-carousel-item
                    v-for="(item, index) in formData.imgList"
                    :key="index"
                    height="400px"
                >
                    <a
                        :class="$style.imgitem"
                        :href="item.imgLink"
                        target="_blank"
                    >
                        <el-image
                            class="hover-animation"
                            :class="$style.imgitem_img"
                            :src="item.imgUrl"
                            :style="{
                                width: '1920px',
                                height: '420px',
                            }"
                            fit="cover"
                            alt=""
                        >
                        </el-image></a>
                </el-carousel-item>
            </el-carousel>
        </template>

        <div
            v-else
            :class="$style.emptyBox"
        >
            <div>
                <p
                    :class="$style.iconBox"
                    class="viewEmpty_IconBox"
                >
                    <i class="el-icon-picture"></i>
                </p>
                <p
                    :class="$style.iconBox"
                    class="viewEmpty_IconBox"
                >
                    <i class="el-icon-more"></i>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CarouselImg',
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isNoEmpty() {
            const { formData } = this;
            return !!(formData.imgList && formData.imgList.length > 0 && formData.imgList[0].imgUrl);
        }
    }
};
</script>

<style module>
    @import 'demo-common/css/variable.css';
    .box {
        background-color: #FFFFFF;
        width: 1920px;
    }
    .emptyBox {
        min-height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgitem_img {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
