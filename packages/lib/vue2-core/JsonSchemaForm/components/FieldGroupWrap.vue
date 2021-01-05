<template>
    <div class="fieldGroupWrap">
        <template>
            <h3
                v-if="showTitle && title"
                class="fieldGroupWrap_title"
            >
                {{ title }}
            </h3>
            <p
                v-if="showDescription && description"
                class="fieldGroupWrap_des"
                v-html="description"
            >
            </p>
        </template>
        <div class="fieldGroupWrap_box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FieldGroupWrap',
    props: {
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
    }
};
</script>
