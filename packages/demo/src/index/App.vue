<template>
    <div :class="$style.wrap">
        <header :class="$style.header">
            <h1>vue-json-schema-form</h1>
            <a :class="$style.vueEditorLink" target="_blank" href="/vue-editor.html">Vue 可视化活动编辑器</a>
        </header>
        <router-view></router-view>
        <footer :class="$style.footer">
            <a href="https://github.com/lljj-x/vue-json-schema-form">vue-json-schema-form</a>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'App',
    };
</script>

<style module>
    .wrap {
        min-width: 1000px;
        padding: 0 10px;
    }
    .header {
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        h1 {
            color: #000;
            line-height: 26px;
            font-size: 18px;
        }
        .vueEditorLink {
            margin-left: 20px;
            font-size: 14px;
            font-weight: bold;
            text-decoration: none;
            color: #409eff;
            &:hover {
                color: #409eff;
                text-decoration: underline;
            }
        }
    }
    .footer {
        font-size: 14px;
        padding: 10px 0;
        text-align: center;
    }
</style>
