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
                <h3
                    class="skeleton-title"
                    style="width: 30%;"
                ></h3>
                <ul class="skeleton-paragraph">
                    <li
                        v-for="(item, itemIndex) in new Array(itemLength)"
                        :key="itemIndex"
                    ></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Skeleton',
    props: {
        type: {
            type: String,
            default: 'default' // default / img
        },
        length: {
            type: Number,
            default: 4
        },
        animation: {
            type: Boolean,
            default: true
        },
        itemLength: {
            type: Number,
            default: 3
        }
    }
};
</script>

<style>
    @import "./skeleton.css";
</style>
