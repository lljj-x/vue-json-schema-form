<template>
    <div :class="$style.box">
        <div :class="$style.logo">
            <h1>Schema 生成器</h1>
        </div>
        <div :class="$style.btns">
            <el-button @click="$emit('onPreview')">预览</el-button>
            <el-button type="primary" @click="$emit('onPublish')">发布</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditorHeader'
    };
</script>

<style module>
    @import "variable.css";
    .box {
        padding: 20px 80px;
        height: auto;
        background: var(--color-white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.2);
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        text-shadow: 0 0 40px #409EFF;
        h1 {
            font-size: 30px;
            text-transform: uppercase;
        }
    }
</style>
