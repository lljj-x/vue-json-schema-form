<template>
    <div
        :class="{
            [$style.viewBox]: true,
            [$style.active]: editorItem.isEdit,
            js_viewComponentWrap: true
        }"
        @click="handleClickView"
    >
        <span :class="$style.formProperty"> {{ attrs.curNodePath }}</span>
        <div
            v-if="editorItem.isEdit"
            :class="$style.editBar"
        >
            <button
                :disabled="editorItem.toolBar.moveUpDisabled"
                :class="$style.toolBarBtn"
                class="el-icon-caret-top"
                title="上移"
                type="button"
                @click="$emit('onOperate', { item: editorItem, command: 'moveUp'})"
            ></button>
            <button
                :disabled="editorItem.toolBar.moveDownDisabled"
                :class="$style.toolBarBtn"
                class="el-icon-caret-bottom"
                title="下移"
                type="button"
                @click="$emit('onOperate', { item: editorItem, command: 'moveDown'})"
            ></button>
            <button
                :disabled="editorItem.toolBar.copyDisabled"
                :class="[$style.toolBarBtn]"
                class="el-icon-copy-document"
                title="复制"
                type="button"
                @click="$emit('onOperate', { item: editorItem, command: 'copy' })"
            ></button>
            <button
                :disabled="editorItem.toolBar.removeDisabled"
                :class="$style.toolBarBtn"
                class="el-icon-delete"
                title="移除"
                type="button"
                @click="$emit('onOperate', { item: editorItem, command: 'remove' })"
            ></button>
        </div>
        <SchemaField
            v-bind="attrs"
        >
        </SchemaField>

        <NestedEditor
            v-if="showNestedEditor(editorItem)"
            :child-component-list="editorItem.childList"
            :drag-options="dragOptions"
            :form-data="formData"
            :form-props="formProps"
        >
        </NestedEditor>
    </div>
</template>

<script>
import { SchemaField, globalOptions } from '@lljj/vue-json-schema-form';
import emitter from '../../../mixins/emitter.js';
import NestedEditor from './NestedEditor';
import { editorItem2SchemaFieldProps } from '../common/editorData';

export default {
    name: 'ViewComponentWrap',
    components: {
        SchemaField,
        NestedEditor
    },
    mixins: [emitter],
    props: {
        showNestedEditor: {
            type: Function,
            default: () => {}
        },
        editorItem: {
            type: Object,
            default: () => ({})
        },
        dragOptions: {
            type: Object,
            default: () => ({})
        },
        formData: {
            type: Object,
            default: () => ({})
        },
        formProps: {
            type: null,
            default: null
        }
    },
    computed: {
        attrs() {
            return {
                formProps: this.formProps,
                globalOptions,
                ...editorItem2SchemaFieldProps(this.editorItem, this.formData)
            };
        }
    },
    beforeDestroy() {
        this.hideEditForm();
    },
    methods: {
        // 点击只能打开，并且打开状态下只能执行一次
        handleClickView(e) {
            // 阻止浏览器默认事件
            e.stopPropagation();
            if (!this.editorItem.isEdit) {
                this.showEditForm();
            } else {
                // 设置当前选中tab
                this.setCurEditorItem(this.editorItem);
            }
        },

        // 显示编辑form
        showEditForm() {
            this.editorItem.isEdit = true;
            // 打开时才注册一个关闭事件，关闭弹窗时移除事件
            this.closeHandle = (event) => {
                // 点击的自己兄弟view关闭自己
                const $el = this.$el;
                const isChildEle = this.$el.contains(event.target);
                const parentWrapEle = event.target.closest('.js_viewComponentWrap');

                // 点击非自身的item 关闭自己，或者点击了自己的子item 关闭自己
                if ((!isChildEle && parentWrapEle) || (isChildEle && $el !== parentWrapEle && $el.contains(parentWrapEle))) {
                    this.hideEditForm();
                }
            };

            // 点击其它弹窗关闭这里
            document.addEventListener('click', this.closeHandle, true);

            this.setCurEditorItem(this.editorItem);
        },
        hideEditForm() {
            this.editorItem.isEdit = false;
            document.removeEventListener('click', this.closeHandle, true);
            this.setCurEditorItem(null);
        },

        setCurEditorItem(editorItem) {
            this.dispatch('Editor', 'onSetCurEditorItem', {
                editorItem
            });
        },
    }
};
</script>

<style module>
    @import "demo-common/css/variable.css";
    .viewBox {
        position: relative;
        margin-bottom: 10px;
        padding: 30px 10px 10px;
        cursor: move;
        outline: none;
        border: 1px dashed #bbb;
        overflow: hidden;
        background-color: #ffffff;
        @nest :global .draggableSlot :local & {
            cursor: no-drop;
        }
        &:after {
            pointer-events: none;
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            transition: box-shadow 0.3s ease;
            z-index: 2;
        }

        &.active {
            border: 1px dashed transparent;
            &:after {
                box-shadow: 0 0 2px 1px var(--color-primary) inset;
            }
        }
    }
    .formProperty {
        position: absolute;
        padding: 10px;
        top: 0;
        right: 0;
        font-size: 13px;
    }

    .editBar {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 26px;
        border-top-left-radius: 8px;
        background: var(--color-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        &> .toolBarBtn {
            -webkit-appearance: none;
            appearance: none;
            padding: 0;
            margin: 0;
            outline: none;
            border: none;
            cursor: pointer;
            display: block;
            width: 26px;
            line-height: 30px;
            text-align: center;
            background-color: transparent;
            font-size: 16px;
            color: #ffffff;
            &[disabled] {
                display: none;
            }
            &:hover {
                opacity: 0.6;
            }
        }
    }
</style>
