<template>
    <div :class="$style.box">
        <template v-if="isNoEmpty">
            xxx
        </template>
        <div v-else class="emptyBox" style="min-height: 260px;">
            <span class="module-name-tip">秒杀商品</span>
            <div>
                <p :class="$style.iconBox" class="viewEmpty_IconBox">
                    <i class="el-icon-picture"></i>
                </p>
                <p :class="$style.iconBox" class="viewEmpty_IconBox">
                    <i class="el-icon-more"></i>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FlashSaleGoodsListView',
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
    .box {
        height: 260px;
    }
</style>
