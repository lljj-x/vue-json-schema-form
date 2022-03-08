<template>
    <div :class="$style.box">
        <el-menu
            v-bind="$attrs"
            :class="$style.menu"
            mode="horizontal"
            text-color="#333"
            active-text-color="#2b9939"
        >
            <el-menu-item
                index="1"
                style="display: none;"
            >
                <a
                    :class="$style.menuLink"
                    href="https://vue-json-schema-form.lljj.me/"
                >
                    文档
                </a>
            </el-menu-item>
            <el-menu-item index="2">
                <a
                    :class="$style.menuLink"
                    href="/"
                >
                    Playground
                </a>
            </el-menu-item>
            <el-menu-item
                v-if="$attrs.version==='vue2'"
                index="3"
            >
                <a
                    :class="$style.menuLink"
                    href="/vue-editor.html#/editor"
                >
                    活动编辑器
                </a>
            </el-menu-item>
            <el-menu-item
                v-if="$attrs.version==='vue2'"
                index="4"
            >
                <a
                    :class="$style.menuLink"
                    href="/schema-generator.html#/index"
                >
                    Schema 生成器
                </a>
            </el-menu-item>
            <el-menu-item index="5">
                <a
                    :class="$style.menuLink"
                    href="https://github.com/lljj-x/vue-json-schema-form"
                    target="_blank"
                >
                    Github
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
        .el-menu--horizontal>.el-menu-item {
            padding-left: 8px;
            padding-right: 8px;
            margin: 0 20px;
            height: 54px;
            line-height: 54px;
        }
    }
    .menuLink {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
    .menuIcon {
        position: absolute;
        left: -8px;
        font-size: 14px;
        margin-right: 0;
        color: #666666;
    }
}

</style>
