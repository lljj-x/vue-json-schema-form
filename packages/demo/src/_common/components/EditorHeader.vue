<template>
    <div :class="$style.box">
        <div :class="$style.headerMenuBox">
            <h1>
                <a :class="$style.menuLink" href="https://vue-json-schema-form.lljj.me/">
                    <img :class="$style.logo" src="https://vue-json-schema-form.lljj.me/logo.png" alt="Vue JSON Schema Form">
                </a>
            </h1>
            <Menu :class="$style.menu" v-bind="$attrs"></Menu>
        </div>
        <div :class="$style.btns">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Menu from './Menu';

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
        position: relative;
        margin: 0 auto;
        padding: 0 2%;
        height: auto;
        background: var(--color-white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 8px 1px rgba(0,0,0,.3);
        z-index: 3;
    }
    .headerMenuBox {
        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
            text-shadow: 0 0 40px #409EFF;
            font-size: 26px;
            text-transform: uppercase;
            z-index: 10;
        }
        .logo {
            vertical-align: top;
            height: 30px;
        }
    }
    .menu {
        margin-left: 40px;
    }
</style>
