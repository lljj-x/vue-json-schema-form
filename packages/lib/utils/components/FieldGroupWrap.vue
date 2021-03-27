<template>
    <div class="fieldGroupWrap">
        <h3
            v-if="showTitle && trueTitle"
            class="fieldGroupWrap_title"
        >
            {{ trueTitle }}
        </h3>
        <p
            v-if="showDescription && description"
            class="fieldGroupWrap_des"
            v-html="description"
        >
        </p>
        <div class="fieldGroupWrap_box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FieldGroupWrap',
    inject: ['genFormProvide'],
    props: {
        // 当前节点路径
        curNodePath: {
            type: String,
            default: ''
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        showDescription: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        }
    },
    computed: {
        trueTitle() {
            const title = this.title;
            if (title) {
                return title;
            }

            const genFormProvide = this.genFormProvide.value || this.genFormProvide;

            const backTitle = genFormProvide.fallbackLabel && this.curNodePath.split('.').pop();
            if (backTitle !== `${Number(backTitle)}`) return backTitle;

            return '';
        }
    }
};
</script>
