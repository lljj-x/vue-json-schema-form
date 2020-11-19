<template>
    <div :class="$style.box">
        <el-menu v-bind="$attrs"
                 :class="$style.menu"
                 mode="horizontal"
                 text-color="#000"
                 active-text-color="#409EFF"
        >
            <el-menu-item index="1">
                <a :class="$style.menuLink" href="https://vue-json-schema-form.lljj.me/">
                    <i class="el-icon-s-home" :class="$style.menuIcon"></i>查看文档
                </a>
            </el-menu-item>
            <el-menu-item index="2">
                <a :class="$style.menuLink" href="https://form.lljj.me/">
                    <i class="el-icon-lollipop" :class="$style.menuIcon"></i>Playground
                </a>
            </el-menu-item>
            <el-menu-item index="3">
                <a :class="$style.menuLink" href="https://form.lljj.me/vue-editor.html#/editor">
                    <i class="el-icon-ice-cream-round" :class="$style.menuIcon"></i>Vue活动编辑器
                </a>
            </el-menu-item>
            <el-menu-item index="4">
                <a :class="$style.menuLink" href="https://form.lljj.me/schema-generator.html#/index">
                    <i class="el-icon-cold-drink" :class="$style.menuIcon"></i>表单Schema生成器
                </a>
            </el-menu-item>
            <el-menu-item index="5">
                <a :class="$style.menuLink" href="https://github.com/lljj-x/vue-json-schema-form">
                    <i class="el-icon-loading el-icon-star-on" :class="$style.menuIcon"></i>Github
                </a>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'Menu'
    };
</script>

<style module>
.box {
    :global {
        .el-menu.el-menu--horizontal {
            border-bottom: none;
        }
        .el-menu--horizontal>.el-menu-item.is-active {
            border-bottom-width: 3px;
        }
    }
}
.menuLink {
    display: flex;
    align-items: center;
    text-decoration: none;
}
.menuIcon {
    font-size: 14px;
    margin-right: 0;
    color: #666666;
}
</style>
