<template>
    <div :class="$style.wrap">
        <header :class="$style.header">
            <h1>Vue JSON Schema Form</h1>
            <Menu default-active="2"></Menu>
        </header>
        <router-view></router-view>
        <footer :class="$style.footer">
            <a href="https://github.com/lljj-x/vue-json-schema-form">vue-json-schema-form</a>
        </footer>
    </div>
</template>

<script>
    import Menu from '@/_common/components/Menu';

    export default {
        name: 'App',
        components: {
            Menu
        }
    };
</script>

<style module>
    .wrap {
        min-width: 1000px;
    }
    .header {
        display: flex;
        margin-bottom: 25px;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        justify-content: space-between;
        padding: 10px 2%;
        box-shadow: 0 0 8px 1px rgba(0,0,0,.3);
        h1 {
            color: #000;
            line-height: 26px;
            font-size: 18px;
        }
    }
    .footer {
        font-size: 14px;
        padding: 10px 0;
        text-align: center;
    }
</style>
