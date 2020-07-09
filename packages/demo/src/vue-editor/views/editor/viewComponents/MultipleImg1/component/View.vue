<template>
    <div :class="[$style.iconBox, !isNoEmpty ? $style.emptyBox : $style.contentBox]" class="viewEmpty_IconBox">
        <div :class="[$style.line1, $style.block]">
            <div :class="$style.imgItem">
                <a v-if="formData.imgItem1_1 && formData.imgItem1_1.imgLink"
                   :href="formData.imgItem1_1.imgLink"
                >
                    <el-image
                        :src="formData.imgItem1_1.imgUrl"
                        :style="{
                            width: '1190px',
                            height: '420px',
                        }"
                        :lazy="true"
                        height="500px"
                        fit="cover"
                        alt=""
                    ></el-image>
                </a>
                <i v-else class="el-icon-picture"></i>
            </div>
        </div>
        <div :class="[$style.line2, $style.block]">
            <div :class="$style.imgItem">
                <a v-if="formData.imgItem2_1 && formData.imgItem2_1.imgLink"
                   :href="formData.imgItem2_1.imgLink"
                >
                    <el-image
                        :src="formData.imgItem2_1.imgUrl"
                        :style="{
                            width: line2ImgWidth,
                            height: '500px',
                        }"
                        :lazy="true"
                        height="500px"
                        fit="cover"
                        alt=""
                    ></el-image>
                </a>
                <i v-else class="el-icon-picture"></i>
            </div>
            <div :class="$style.imgItem">
                <a v-if="formData.imgItem2_2 && formData.imgItem2_2.imgLink"
                   :href="formData.imgItem2_2.imgLink"
                >
                    <el-image
                        :src="formData.imgItem2_2.imgUrl"
                        :style="{
                            width: line2ImgWidth,
                            height: '500px',
                        }"
                        :lazy="true"
                        height="500px"
                        fit="cover"
                        alt=""
                    ></el-image>
                </a>
                <i v-else class="el-icon-picture"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MultipleImg1',
        props: {
            formData: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                line2ImgWidth: '585px'
            };
        },
        computed: {
            isNoEmpty() {
                // 配置了一个图片就不为空
                return !!(this.formData.imgItem1_1.imgUrl && this.formData.imgItem1_1.imgLink);
            }
        },
    };
</script>

<style module>
    @import 'variable.css';
    /* 空壳 */
    .emptyBox {
        .imgItem {
            height: 200px;
            background-color: var(--background-color-selected);
        }
        .block {
            padding: 20px;
        }
        .line2 {
            margin-top: -20px;
            .imgItem {
                width: 565px;
            }
        }
    }
    /* 数据 */
    .contentBox {
        .line2 {
            margin-top: 20px;
        }
        img {
            vertical-align: top;
        }
    }

    .imgItem {
        flex-shrink: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .line1 {
        width: 100%;
    }
    .line2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .imgitem_img {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
