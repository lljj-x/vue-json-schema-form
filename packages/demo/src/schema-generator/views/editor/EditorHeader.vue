<template>
    <div :class="$style.box">
        <div :class="$style.headerMenu">
            <h1>Schema 生成器</h1>
            <Menu default-active="4"></Menu>
        </div>
        <div :class="$style.btns">
            <el-button @click="$emit('toDemo')">在 Demo 页验证</el-button>
            <el-button type="primary" @click="$emit('onExport')">导出Schema</el-button>
        </div>
    </div>
</template>

<script>
    import Menu from '@/_common/components/Menu';

    export default {
        name: 'EditorHeader',
        components: {
            Menu
        }
    };
</script>

<style module>
    @import "variable.css";
    .box {
        padding: 10px 2%;
        height: auto;
        background: var(--color-white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 8px 1px rgba(0,0,0,.3);
    }
    .headerMenu {
        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
            display: none;
            text-shadow: 0 0 40px #409EFF;
            font-size: 26px;
            text-transform: uppercase;
            z-index: 10;
        }
    }
</style>
