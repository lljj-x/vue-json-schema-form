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
                    <i
                        class="el-icon-s-home"
                        :class="$style.menuIcon"
                    ></i>文档
                </a>
            </el-menu-item>
            <el-menu-item index="2">
                <a
                    :class="$style.menuLink"
                    href="/"
                >
                    <i
                        class="el-icon-lollipop"
                        :class="$style.menuIcon"
                    ></i>Playground
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
                    <i
                        class="el-icon-ice-cream-round"
                        :class="$style.menuIcon"
                    ></i>活动编辑器
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
                    <i
                        class="el-icon-cold-drink"
                        :class="$style.menuIcon"
                    ></i>Schema 生成器
                </a>
            </el-menu-item>
            <el-menu-item index="5">
                <a
                    :class="$style.menuLink"
                    href="https://github.com/lljj-x/vue-json-schema-form"
                    target="_blank"
                >
                    <i
                        class="el-icon-star-off"
                        :class="$style.menuIcon"
                    ></i>Github
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
    margin: 0 auto;
    :global {
        .el-menu.el-menu--horizontal {
            border-bottom: none;
        }
        .el-menu--horizontal>.el-menu-item.is-active {
            border-bottom-width: 3px;
        }
        .el-menu--horizontal>.el-menu-item {
            padding-left: 14px;
            padding-right: 0;
            margin: 0 20px;
            height: 80px;
            line-height: 80px;
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
