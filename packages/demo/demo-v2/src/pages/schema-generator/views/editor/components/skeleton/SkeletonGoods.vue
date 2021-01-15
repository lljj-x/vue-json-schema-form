<template>
    <div
        :class="[animation ? 'skeleton-active' : '', `skeleton-type-${type}`]"
        class="skeleton"
    >
        <div
            v-if="type === 'default'"
            class="skeleton-content"
        >
            <div
                v-for="(item, index) in new Array(length)"
                :key="index"
                class="skeleton-item"
            >
                <div class="skeleton-goods-img viewEmpty_IconBox">
                    <i class="el-icon-goods skeleton-goods-img-icon"></i>
                </div>
                <h3
                    class="skeleton-title"
                    style="width: 100%; height: 32px;"
                ></h3>
                <ul class="skeleton-paragraph">
                    <li
                        v-for="(innerItem, itemIndex) in new Array(itemLength)"
                        :key="itemIndex"
                        style="width: 61%;"
                    ></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkeletonGoods',
    props: {
        type: {
            type: String,
            default: 'default' // default / img
        },
        length: {
            type: Number,
            default: 1
        },
        animation: {
            type: Boolean,
            default: true
        },
        itemLength: {
            type: Number,
            default: 1
        }
    }
};
</script>

<style>
    @import "./skeleton.css";
</style>
