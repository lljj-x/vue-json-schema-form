<template>
    <div v-loading="loading">
        <EditorHeader
            @toDemo="handleToDemo"
            @onExport="handleExportSchema"
        ></EditorHeader>

        <div :class="[$style.container]">
            <div :class="$style.contentWrap">
                <div :class="$style.toolsBar">
                    <EditorToolBar
                        :drag-group="dragOptions.group"
                        :config-tools="configTools"
                        @onFilter="$message.error('该组件添加数目已达上限！')"
                    >
                    </EditorToolBar>
                </div>
                <div :class="[$style.contentBox]">
                    <el-form
                        style="height: 100%"
                        label-position="top"
                        label-suffix="："
                        :model="rootFormData"
                        label-width="80px"
                        class="genFromComponent"
                    >
                        <NestedEditor
                            :child-component-list="componentList"
                            :drag-options="dragOptions"
                            :form-data="rootFormData"
                        >
                        </NestedEditor>
                    </el-form>
                    <div v-if="componentList.length === 0" :class="$style.tipBox">
                        <p>拖拽左侧栏的组件进行添加</p>
                    </div>
                </div>
                <div :class="$style.rightForm">
                    <div v-if="curEditorItem" :class="$style.configForm">
                        <div style="padding: 20px 0;">
                            <VueJsonFrom
                                v-model="curEditorItem.componentValue"
                                :schema="curEditorItem.componentPack.propsSchema"
                                :form-props="{
                                    labelPosition: 'right',
                                    labelWidth: '110px'
                                }"
                                :form-footer="{
                                    show: false
                                }"
                            >
                            </VueJsonFrom>
                        </div>
                    </div>
                    <div v-else>
                        请先点击你要编辑的formItem
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueJsonFrom from '@lljj/vue-json-schema-form';
    import componentWithDialog from '@/_common/components/component-with-dialog';
    import { openNewPage } from '@/_common/utils/url.js';

    import EditorToolBar from './EditorToolBar.vue';
    import EditorHeader from './EditorHeader.vue';
    import ExportSchemaView from './components/ExportSchemaView.vue';

    import { deepFreeze } from './common/utils';

    import configTools from './config/tools';

    import './common/registerExtraElementComponent';

    import NestedEditor from './components/NestedEditor';
    import { componentList2JsonSchema } from './common/editorData';

    deepFreeze(configTools);

    export default {
        name: 'Editor',
        components: {
            VueJsonFrom,
            EditorToolBar,
            EditorHeader,
            NestedEditor
        },
        data() {
            return {
                loading: false,
                configTools,
                rootFormData: {},
                curEditorItem: null, // 选中的formItem
                componentList: []
            };
        },

        computed: {
            dragOptions() {
                return {
                    animation: 300,
                    group: 'listComponentsGroup',
                    disabled: false,
                    ghostClass: this.$style.ghost,
                    filter: this.$style.disabled,
                    draggable: '.draggableItem',
                    tag: 'div',
                    swapThreshold: 0.3,
                    // forceFallback: true
                    // fallbackTolerance: 0
                };
            },
        },
        mounted() {
            window.document.body.classList.add('page-decorate-design');
        },
        destroyed() {
            window.document.body.classList.remove('page-decorate-design');
        },
        created() {
            this.$on('onSetCurEditorItem', ({ editorItem }) => {
                this.curEditorItem = editorItem;
            });
        },
        methods: {
            handleExportSchema() {
                componentWithDialog({
                    VueComponent: ExportSchemaView,
                    dialogProps: {
                        title: '导出Schema',
                        width: '1000px'
                    },
                    componentProps: {
                        componentList: this.componentList
                    },
                    componentListeners: {
                        toDemo: () => {
                            this.handleToDemo();
                        }
                    }
                });
            },
            handleToDemo() {
                const schema = componentList2JsonSchema(this.componentList);
                const schemaEncode = encodeURIComponent(JSON.stringify(schema));
                const link = `https://form.lljj.me/#/demo?type=Test&schema=${schemaEncode}`;
                openNewPage(link);
            }
        }
    };
</script>

<style>
    body.page-decorate-design{
        overflow: hidden;
    }
    .flip-list-move {
        transition: transform 0.3s;
    }
    .no-move {
        transition: transform 0s;
    }
</style>
<style module>
    @import 'variable.css';
    :root {
        --site-top-height: 80px;
        --tool-bar-width: 260px;
        --right-form-width: 380px;
        --drag-area-width: auto;
    }
    /*预览模式 同步样式重置*/
    .container {
        position: relative;
        box-sizing: border-box;
        padding-top: 10px;
        height: calc(100vh - var(--site-top-height));
        transition: 0.2s ease;
    }
    .hasTools {
        padding-left: var(--tool-bar-width);
        :global .el-icon-caret-right {
            transform: rotate(180deg);
        }
    }
    /*tools*/
    .toolsBar, .rightForm{
        position: absolute;
        top: 0;
        bottom: 0;
        background: var(--color-white);
        overflow: auto;
        box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2)),  0 0 2px 0 color(var(--color-black) a(0.4));
        z-index: 2;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
    .toolsBar {
        left: 0;
        width: var(--tool-bar-width);
    }
    .rightForm {
        box-sizing: border-box;
        padding: 10px;
        right: 0;
        width: var(--right-form-width);
    }
    .configForm {
        padding: 10px;
        &>h3 {
            font-size: 15px;
            font-weight: bold;
        }
    }

    /*content area*/
    .contentWrap {
        position: relative;
        overflow: auto;
        height: 100%;
        padding-left: var(--tool-bar-width);
        padding-right: var(--right-form-width);
        &::-webkit-scrollbar {
            width: 6px;
            height: 10px;
        }
        &::-webkit-scrollbar-track {
            background-color: var(--background-color-base);
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: var(--color-text-placeholder);
        }
    }
    .contentBox {
        position: relative;
        padding: 0 10px;
        height: 100%;
    }
    .tipBox{
        pointer-events: none;
        top: 20px;
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
        margin: 30vh 0;
        p {
            margin: 20px 0;
            font-size: 16px;
        }
    }
    .ghost {
        opacity: 0.5;
    }
</style>
