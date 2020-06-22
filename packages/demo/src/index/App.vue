<template>
    <div :class="$style.wrap">
        <header :class="$style.header">
            <h1>vue-json-schema-form</h1>
        </header>
        <router-view></router-view>
        <footer :class="$style.footer">
            <a href="https://vue-json-schema-form.buhuida.com/">vue-json-schema-form</a>
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
        padding: 0 20px;
    }
    .header {
        h1 {
            padding: 10px 0;
            color: #000;
            line-height: 26px;
            font-size: 18px;
            border-bottom: 1px solid #f1f1f1;
        }
    }
    .footer {
        font-size: 14px;
        padding: 10px 0;
        text-align: center;
    }
</style>
