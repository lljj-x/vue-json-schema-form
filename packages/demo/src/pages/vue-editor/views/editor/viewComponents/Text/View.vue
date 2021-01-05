<template>
    <div :class="$style.box">
        <h2
            :style="{
                color: formData.txtColor
            }"
        >
            {{ formData.txt || '请配置标题' }}
        </h2>
    </div>
</template>

<script>
export default {
    name: 'TextView',
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style module>
    .box {
        background-color: #FFFFFF;
        h2 {
            text-align: center;
            font-size: 38px;
            padding: 30px 10px;
            font-weight: bold;
        }
    }
</style>
