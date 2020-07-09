<template>
    <div class="box">
        <h2>视频video</h2>
        {{ formData.videoUrl || '--' }}
    </div>
</template>

<script>
    export default {
        name: 'SVideoView',
        props: {
            formData: {
                type: Object,
                default: () => ({})
            }
        },
    };
</script>

<style>
    .box {

    }
</style>
