<template>
    <div :class="$style.box">
        <h2>{{ formData.txt || '请配置标题' }}</h2>
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
        h2 {
            text-align: center;
            font-size: 38px;
            padding: 40px 10px;
            font-weight: bold;
        }
    }
</style>
