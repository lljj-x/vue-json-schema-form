<template>
    <div v-loading="loading">
        <EditorHeader default-active="4">
            <el-button @click="handleImportSchema">导入Schema</el-button>
            <el-button
                plain
                @click="handleToDemo"
            >
                Playground中验证
            </el-button>
            <el-button
                type="primary"
                plain
                @click="handlePreview"
            >
                预览展示
            </el-button>
            <el-button
                type="primary"
                @click="handleExportSchema"
            >
                导出Schema
            </el-button>
        </EditorHeader>

        <div :class="[$style.container]">
            <div
                :class="{
                    [$style.contentWrap]: true,
                    [$style.closeToolbar]: closeToolbar
                }"
            >
                <div :class="$style.toolBarWrap">
                    <div :class="$style.toolsBar">
                        <EditorToolBar
                            :drag-group="dragOptions.group"
                            :config-tools="configTools"
                            @onFilter="$message.error('该组件添加数目已达上限！')"
                        >
                        </EditorToolBar>
                    </div>
                    <span
                        :class="$style.leftCaret"
                        @click="closeToolbar = !closeToolbar"
                    >
                        <i class="el-icon-caret-right"></i>
                    </span>
                </div>

                <div :class="[$style.contentBox]">
                    <el-form
                        style="height: 100%"
                        :model="rootFormData"
                        v-bind="formProps"
                        class="genFromComponent"
                        :class="{
                            layoutColumn: !formProps.inline,
                            [`layoutColumn-${formProps.layoutColumn}`]: !formProps.inline,
                            formInlineFooter: formProps.inlineFooter,
                            formInline: formProps.inline,
                            // [`genFromComponent_${schema.id}Form`]: !!schema.id,
                        }"
                    >
                        <NestedEditor
                            :child-component-list="componentList"
                            :drag-options="dragOptions"
                            :form-data="rootFormData"
                            :form-props="formProps"
                        >
                            <el-form-item
                                v-if="componentList.length > 0 && formFooter.show"
                                :style="{
                                    display: formProps.inline && formProps.inlineFooter ? 'inline-block' : 'block'
                                }"
                                class="formFooter_item w100 formFooter_item-editor"
                            >
                                <el-button @click="$emit('onCancel')">{{ formFooter.cancelBtn }}</el-button>
                                <el-button
                                    type="primary"
                                    @click="$emit('onSubmit')"
                                >
                                    {{ formFooter.okBtn }}
                                </el-button>
                            </el-form-item>
                        </NestedEditor>
                    </el-form>
                    <div
                        v-if="componentList.length === 0"
                        :class="$style.tipBox"
                    >
                        <p>拖拽左侧栏的组件进行添加</p>
                    </div>
                </div>
                <div :class="$style.rightForm">
                    <el-tabs v-model="activeName">
                        <el-tab-pane
                            v-if="curEditorItem"
                            label="组件配置"
                            name="compConfig"
                        >
                            <VueJsonFrom
                                v-model="curEditorItem.componentValue"
                                :class="$style.configForm"
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
                        </el-tab-pane>
                        <el-tab-pane
                            label="表单配置"
                            name="formConfig"
                        >
                            <VueJsonFrom
                                v-model="formConfig"
                                :class="$style.configForm"
                                :schema="FormConfSchema"
                                :form-props="{
                                    labelPosition: 'right',
                                    labelWidth: '110px'
                                }"
                                :form-footer="{
                                    show: false
                                }"
                            >
                            </VueJsonFrom>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueJsonFrom from '@lljj/vue-json-schema-form';
import componentWithDialog from 'demo-common/components/component-with-dialog';
import { openNewPage } from 'demo-common/utils/url.js';

import EditorHeader from 'demo-common/components/EditorHeader.vue';
import FormConfSchema from './viewComponents/FormConf';
import EditorToolBar from './EditorToolBar.vue';
import ExportSchemaView from './components/ExportSchemaView.vue';
import ImportSchemaView from './components/ImportSchemaView.vue';


import { deepFreeze } from './common/utils';

import configTools from './config/tools';

import NestedEditor from './components/NestedEditor';
import { componentList2JsonSchema, formatFormLabelWidth } from './common/editorData';
import jsonSchema2ComponentList from './common/jsonSchema2ComponentList';

deepFreeze(configTools);

export default {
    name: 'Editor',
    components: {
        VueJsonFrom,
        EditorToolBar,
        EditorHeader,
        NestedEditor
    },
    provide() {
        return {
            genFormProvide: {
                fallbackLabel: true
            }
        };
    },
    data() {
        return {
            closeToolbar: false,
            loading: false,
            configTools,
            rootFormData: {},
            curEditorItem: null, // 选中的formItem
            componentList: [],
            FormConfSchema,
            formConfig: {},
            activeName: 'formConfig'
        };
    },

    computed: {
        formProps() {
            if (!this.formConfig.formProps) return {};
            return {
                ...this.formConfig.formProps,
                labelWidth: formatFormLabelWidth(this.formConfig.formProps.labelWidth)
            };
        },
        formFooter() {
            return this.formConfig.formFooter || {};
        },
        dragOptions() {
            return {
                animation: 300,
                group: 'listComponentsGroup',
                disabled: false,
                ghostClass: 'ghostItem',
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
            this.activeName = editorItem ? 'compConfig' : 'formConfig';
            this.curEditorItem = editorItem;
        });
    },
    methods: {
        getExportCode() {
            const { formFooter, formProps } = this;
            const defaultConfig = {
                formFooter: {
                    show: true,
                    okBtn: '保存',
                    cancelBtn: '取消'
                },
                formProps: {
                    inline: false,
                    inlineFooter: false,
                    layoutColumn: 1,
                    labelPosition: 'top',
                }
            };

            // 不做深度
            const filter = (obj, defaultObj) => Object.keys(obj).reduce((pre, cur) => {
                if (!(obj[cur] === defaultObj[cur])) {
                    pre[cur] = obj[cur];
                }
                return pre;
            }, {});

            return {
                schema: componentList2JsonSchema(this.componentList),
                uiSchema: {},
                formFooter: filter(formFooter, defaultConfig.formFooter),
                formProps: filter(formProps, defaultConfig.formProps)
            };
        },
        handlePreview() {
            const props = this.getExportCode();
            const instance = componentWithDialog({
                VueComponent: VueJsonFrom,
                dialogProps: {
                    title: '预览展示',
                    width: '1000px'
                },
                componentProps: {
                    value: {},
                    ...props
                },
                componentListeners: {
                    toDemo: () => {
                        this.handleToDemo();
                    },
                    'on-cancel': () => {
                        instance.close();
                    },
                    'on-submit': (data) => {
                        // eslint-disable-next-line no-alert
                        alert(JSON.stringify(data, null, 2));
                    }
                }
            });
        },
        handleImportSchema() {
            const instance = componentWithDialog({
                VueComponent: ImportSchemaView,
                dialogProps: {
                    title: '导入Schema',
                    width: '1000px'
                },
                componentListeners: {
                    onImport: (code) => {
                        try {
                            const data = jsonSchema2ComponentList(code, this.configTools);
                            if (!data) return this.$message.warning('请先输入导入Schema');

                            const { errorNode, componentList, formConfig } = data;
                            this.componentList = componentList;
                            if (formConfig.formProps) Object.assign(this.formConfig.formProps, formConfig.formProps);
                            if (formConfig.formFooter) Object.assign(this.formConfig.formFooter, formConfig.formFooter);

                            instance.close();

                            // 存在导入失败的部分节点
                            if (errorNode.length > 0 && Array.isArray(errorNode)) {
                                return this.$msgbox({
                                    title: '如下节点导入失败，请检查数据',
                                    message: this.$createElement(
                                        'div', {
                                            style: {
                                                padding: '10px 0'
                                            }
                                        },
                                        errorNode.map(item => this.$createElement('pre', null, JSON.stringify(item, null, 4)))
                                    )
                                });
                            }

                            return undefined;
                        } catch (e) {
                            this.$alert(e.message, '导入失败，详细查看控制台');
                            throw e;
                        }
                    }
                }
            });
        },
        handleExportSchema() {
            componentWithDialog({
                VueComponent: ExportSchemaView,
                dialogProps: {
                    title: '导出Schema',
                    width: '1000px'
                },
                componentProps: {
                    genCode: this.getExportCode(),
                },
                componentListeners: {
                    toDemo: () => {
                        this.handleToDemo();
                    }
                }
            });
        },
        handleToDemo() {
            const codeObj = this.getExportCode();
            const urlQueryString = Object.keys(codeObj).reduce((pre, cur) => {
                pre.push(`${cur}=${encodeURIComponent(JSON.stringify(codeObj[cur]))}`);
                return pre;
            }, []).join('&');

            const link = `/index.html#/demo?type=Test&${urlQueryString}`;
            openNewPage(link, '_specialViewForm');
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
    @import 'demo-common/css/variable.css';
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
    .toolBarWrap, .rightForm{
        position: absolute;
        top: 0;
        bottom: 0;
        background: var(--color-white);
        box-shadow: 0 0 0 1px rgba(171 171 171,0.3);
        z-index: 2;
    }

    .rightForm, .toolsBar {
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    .toolBarWrap {
        padding-top: 10px;
        width: var(--tool-bar-width);
        left: 0;
        overflow: visible;
    }
    .toolsBar {
        height: 100%;
    }
    .leftCaret {
        cursor: pointer;
        position: absolute;
        display: flex;
        width: 18px;
        height: 38px;
        align-items: center;
        justify-content: center;
        top: 2px;
        right: 0;
        background: #FFFFFF;
        box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2));
        border-radius: 2px 0 0 2px;
        :global .el-icon-caret-right {
            transition: all .3s ease;
            transform: rotate(180deg);
        }
        &:hover {
            box-shadow: 0 0 4px 0 color(var(--color-black) a(0.4));
            opacity: 1;
        }
    }
    .rightForm {
        box-sizing: border-box;
        padding: 10px;
        right: 0;
        width: var(--right-form-width);
    }
    .configForm {
        padding: 0 20px;
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
    .closeToolbar {
        padding-left: 0;
        .toolBarWrap {
            left: calc(0 - var(--tool-bar-width));
            .leftCaret {
                right: -18px;
            }
            :global {
                .el-icon-caret-right {
                    transform: rotate(0);
                }
            }
        }
    }
    .contentBox {
        position: relative;
        padding: 0;
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
</style>
