<template>
    <div class="FieldGroupWrap">
        <template>
            <h3
                v-if="title"
                class="FieldGroupWrap_title"
            >
                {{ title }}
            </h3>
            <p
                v-if="description"
                class="FieldGroupWrap_des"
                v-html="description"
            >
            </p>
        </template>
        <div class="FieldGroupWrap_box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FieldGroupWrap',
        props: {
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
