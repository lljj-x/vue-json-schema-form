<template>
    <div
        v-loading="loading"
        :class="{
            [$style.previewBox]: isPreview
        }"
    >
        <transition name="el-zoom-in-top">
            <EditorHeader
                v-if="!isPreview"
                v-model="scale"
                @onUpdateScale="fixComponentFormPosition"
                @onPreview="(scale = 100) && (isPreview = true)"
                @onSave="handleSave"
                @onPublish="handlePublish"
            ></EditorHeader>
            <el-button
                v-else
                type="primary"
                style="position: fixed;right: 20px;top: 20px;z-index: 5;"
                @click="isPreview = false"
            >
                结束预览
            </el-button>
        </transition>

        <div :class="[$style.container, showToolBar ? $style.hasTools : '']">
            <span
                :class="$style.leftCaret"
                @click="showToolBar = !showToolBar"
            >
                <i class="el-icon-caret-right"></i>
            </span>
            <div
                v-show="showToolBar"
                :class="$style.toolsBar"
            >
                <EditorToolBar
                    :current-use-component-num="currentUseComponentNum"
                    :drag-group="dragOptions.group"
                    :config-tools="configTools"
                    @onFilter="$message.error('该组件添加数目已达上限！')"
                >
                </EditorToolBar>
            </div>

            <div :class="$style.contentWrap">
                <div :class="[$style.contentBox]">
                    <div
                        ref="domScrollWrap"
                        :class="$style.dragAreaWrap"
                        :style="{transform: `scale(${scale/100})`}"
                    >
                        <draggable
                            ref="draggable"
                            v-model="editComponentList"
                            v-bind="dragOptions"
                            :class="[$style.dragArea]"
                            @change="handleDragChange"
                            @start="handlerStart"
                        >
                            <div
                                v-for="item in trueComponentList"
                                :key="item.id"
                                :slot="item.$$slot || 'default' "
                                :class="{
                                    draggableSlot: item.$$slot,
                                    draggableItem: !item.$$slot,
                                    [`draggableSlot_${item.$$slot}`]: item.$$slot
                                }"
                            >
                                <ViewComponentWrap
                                    :editor-item="item"
                                    :is-preview="isPreview"
                                    @onOperate="handleItemOperate"
                                >
                                    <!-- 传入form使用传入的form组件 -->
                                    <component
                                        :is="item.componentFormName"
                                        v-if="item.componentFormName"
                                        slot="componentForm"
                                        :value="item.componentValue"
                                        @on-change="handleDataChange"
                                        @on-cancel="item.isEdit = false"
                                        @on-submit="handleSaveForm($event, item)"
                                    >
                                    </component>

                                    <!-- schema生成form -->
                                    <VueElementForm
                                        v-else
                                        slot="componentForm"
                                        :schema="item.componentPack.propsSchema"
                                        :ui-schema="item.componentPack.uiSchema"
                                        :error-schema="item.componentPack.errorSchema"
                                        :custom-rule="item.componentPack.customRule"
                                        :value="item.componentValue"
                                        @on-change="handleDataChange"
                                        @on-cancel="item.isEdit = false"
                                        @on-submit="handleSaveForm($event, item)"
                                    >
                                    </VueElementForm>
                                    <component
                                        :is="item.componentViewName"
                                        slot="componentView"
                                        :form-data="item.componentValue"
                                    >
                                    </component>
                                </ViewComponentWrap>
                            </div>
                        </draggable>
                        <div
                            v-if="trueComponentList.length === 0"
                            :class="$style.tipBox"
                        >
                            <img
                                src="./assets/img/empty-tip.png"
                                alt="empty-img"
                            >
                            <p>左边选择模块拖入该区域</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
import VueElementForm, { schemaValidate } from '@lljj/vue-json-schema-form';

import * as arrayMethods from 'demo-common/utils/array';
import componentWithDialog from 'demo-common/components/component-with-dialog';
import JsonPerttyPrint from 'demo-common/components/JsonPerttyPrint.vue';

import EditorToolBar from './EditorToolBar.vue';
import EditorHeader from './EditorHeader.vue';
import ViewComponentWrap from './components/ViewComponentWrap.vue';

import { vm2Api, api2VmToolItem } from './data';

import configTools from './config/mTools';
import configDefaultItems from './config/mDefaultItems';

import { getComponentsAndInitToolsConfig } from './common/utils';

import { generateEditorItem } from './common/editorData';
import './common/registerExtraElementComponent';

// 工具栏配置的组件
const components = getComponentsAndInitToolsConfig(configTools);

export default {
    name: 'Editor',
    components: {
        ...components,
        VueElementForm,
        Draggable,
        EditorToolBar,
        EditorHeader,
        ViewComponentWrap
    },
    data() {
        return {
            loading: false,
            isPreview: false,
            configTools,
            scale: 100,
            editComponentList: [],
            editHeaderComponentList: [], // 兼容header slot ，插件内部实现导致必须分割多分数据
            editFooterComponentList: [], // 兼容footer slot ，插件内部实现导致必须分割多分数据
            showToolBar: true,
        };
    },

    computed: {
        dragOptions() {
            return {
                animation: 300,
                group: 'listComponentsGroup',
                disabled: this.isPreview,
                ghostClass: this.$style.ghost,
                filter: this.$style.disabled,
                draggable: '.draggableItem',
                tag: 'div',
                swapThreshold: 0.3,
                // forceFallback: true
                // fallbackTolerance: 0
            };
        },
        // 头部、中间、底部各个list集合
        componentListGroup() {
            return [this.editHeaderComponentList, this.editComponentList, this.editFooterComponentList];
        },

        // 真实使用的组件 - 包含顶部、底部、不可拖动的模块平铺
        trueComponentList() {
            return [].concat(...this.componentListGroup);
        },

        // 计算出各个模块当前的使用数量
        currentUseComponentNum() {
            return this.trueComponentList.reduce((preVal, curVal) => {
                preVal[curVal.componentViewName] = preVal[curVal.componentViewName]
                    ? (preVal[curVal.componentViewName] + 1)
                    : 1;
                return preVal;
            }, {});
        }
    },
    watch: {
        trueComponentList() {
            this.computedComponentToolBarStatus();

            // 修复form弹窗位置
            this.fixComponentFormPosition();
        }
    },
    mounted() {
        window.document.body.classList.add('page-decorate-design');
    },
    destroyed() {
        window.document.body.classList.remove('page-decorate-design');
    },
    created() {
        this.initEditorData();
    },
    methods: {
        validateDataList(validateData = false) {
            if (this.trueComponentList.length <= 0) {
                this.$message.warning('请先拖入需要配置的组件');
                return false;
            }

            // 是否检测数据格式
            if (!validateData) return true;

            // 完整校验整个数据格式是否正确
            for (let i = 0; i < this.trueComponentList.length; i += 1) {
                const item = this.trueComponentList[i];

                let hasError = false;

                // schema 直接校验数据
                if (item.componentPack.propsSchema) {
                    // 验证失败
                    hasError = !schemaValidate.isValid(item.componentPack.propsSchema, item.componentValue);
                } else {
                    // 这里需要执行校验，也可以统一配置在每个pack中 需要使用者自行处理
                    // 推荐使用schema
                    this.$message.warning('使用非schema生成表单 需要自行校验数据!');
                }

                if (hasError) {
                    // 通过触发事件打开弹窗，保持和点击行为一致
                    document.querySelectorAll('.js_viewComponentBox')[i].click();
                    this.$message.error('数据配置校验不通过，请检查!');
                    return false;
                }
            }
            return true;
        },
        async initEditorData() {
            // 使用默认值
            const dataList = api2VmToolItem(configTools, configDefaultItems);

            // 重新插入数据
            dataList.forEach((toolItemData) => {
                if (!toolItemData.componentPack) {
                    console.warn('存在一条异常数据，请检查：');
                    console.log(dataList);
                    return;
                }
                const editorData = generateEditorItem(toolItemData);
                // 模拟拖入组件插入数据
                this.editComponentList.push(editorData);
                if (editorData.additional) {
                    // 新加的元素处理特殊配置信息
                    this.additionalStrategy(editorData.additional, editorData);
                }
            });
        },
        handleSave(validData) {
            if (!this.validateDataList(validData)) return;

            componentWithDialog({
                VueComponent: JsonPerttyPrint,
                dialogProps: {
                    title: '提交数据',
                },
                componentProps: {
                    jsonString: vm2Api(this.trueComponentList)
                }
            });
        },
        handlePublish() {
            this.handleSave(true);
        },
        // 计算各个组件状态栏按钮状态
        computedComponentToolBarStatus() {
            this.componentListGroup.forEach((componentList) => {
                componentList.forEach((component, componentIndex) => {
                    Object.assign(component.toolBar, {
                        moveUpDisabled: componentIndex === 0, // 是否可上移动
                        moveDownDisabled: componentIndex === componentList.length - 1, // 是否可下移
                        copyDisabled: (this.currentUseComponentNum[component.componentViewName] || 0) >= component.maxNum, // 是否可copy
                        removeDisabled: component.additional && component.additional.unRemove // 是否可移除
                    });
                });
            });
        },

        // 计算当前item 位于哪个list
        getCurrentListByItem(item) {
            for (const value of this.componentListGroup) {
                if (value.includes(item)) return value;
            }

            return [];
        },

        // 修复form 弹窗位置
        fixComponentFormPosition() {
            // Popper 通过、父滚动容器 scroll 和window resize 来触发重新计算位置
            // https://github.com/ElemeFE/element/blob/dev/src/utils/popper.js#L464
            setTimeout(() => {
                const evt = window.document.createEvent('UIEvents');
                evt.initUIEvent('scroll', true, false, window, 0);
                this.$refs.domScrollWrap.dispatchEvent(evt);

                // const curLeft = this.$refs.domScrollWrap.scrollLeft;
                // this.$refs.domScrollWrap.scrollLeft = curLeft - 1;
                // this.$refs.domScrollWrap.scrollLeft = curLeft;
            }, 10);
        },

        // 用户操作数据
        handleDataChange() {
            this.fixComponentFormPosition();
        },

        // 操作单个组件
        handleItemOperate({ item, command }) {
            const strategyMap = {
                moveUp(target, arrayItem) {
                    return arrayMethods.moveUp(target, arrayItem);
                },
                moveDown(target, arrayItem) {
                    return arrayMethods.moveDown(target, arrayItem);
                },
                copy(target, arrayItem) {
                    // 不copy数据
                    // eslint-disable-next-line no-unused-vars
                    const { componentValue, ...emptyPack } = arrayItem;

                    return target.splice(target.indexOf(arrayItem) + 1, 0, generateEditorItem(emptyPack));
                },
                remove(target, arrayItem) {
                    return arrayMethods.remove(target, arrayItem);
                }
            };

            const curStrategy = strategyMap[command];

            if (curStrategy) {
                curStrategy.apply(this, [this.getCurrentListByItem(item), item]);
            } else {
                this.$message.error(`系统错误 - 未知的操作：[${command}]`);
            }
        },

        // 提交表单
        handleSaveForm(data, item) {
            Object.assign(item, {
                componentValue: data,
                isEdit: false
            });
        },

        /**
         * 移动一个模块到两端 顶或者底部
         * @param element
         * @param position  0 移动到顶部/ 1 移动到底部
         */
        moveToBothEnds(element, position) {
            const curIndex = this.editComponentList.indexOf(element);
            if (curIndex >= 0) {
                // 移除放入到不同的list
                (position === 0 ? this.editHeaderComponentList : this.editFooterComponentList)
                    .push(this.editComponentList.splice(curIndex, 1)[0]);
            }
        },

        /**
         * 需要置顶或置底的需要移入另一个数组 - 同数组元素拖到存在置顶或置底元素会导致异常
         * @param additional
         * @param element
         */
        additionalStrategy(additional, element) {
            const Strategy = {
                topDisplay() {
                    element.$$slot = 'header';
                    this.moveToBothEnds(element, 0);
                },
                bottomDisplay() {
                    element.$$slot = 'footer';
                    this.moveToBothEnds(element, 1);
                }
            };

            Object.entries(additional).forEach(([key, value]) => {
                if (Strategy[key]) {
                    Strategy[key].apply(this, [].concat(value));
                }
            });
        },

        handlerStart(evt) {
            // 无法重置拖动效果图 ？？
            // evt.originalEvent.dataTransfer.setDragImage(document.querySelector('H1'), 50, 50);
        },
        // 处理DragChange - 新加元素需要做特殊处理
        handleDragChange(evt) {
            if (evt.added && evt.added.element.additional) {
                // 新加的元素处理特殊配置信息
                this.additionalStrategy(evt.added.element.additional, evt.added.element);
            }
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
        --drag-area-width: 375px;
        --drag-area-height: 630px;
    }
    /*预览模式 同步样式重置*/
    .previewBox {
        .toolsBar,.leftCaret {
            display: none;
        }
        .container {
            height: 100vh;
            padding-left: 0;
        }
        .dragAreaWrap{
            overflow-x: hidden;
        }
        :global {
            .vueEditor_viewComponentBox {
                margin-left: 50%;
                transform: translate(-50%, 0);
                cursor: auto;
                box-shadow: none;
                &:after {
                    display: none;
                    content: none;
                }
            }
        }
    }
    .container {
        position: relative;
        box-sizing: border-box;
        padding-left: 0;
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
    .leftCaret {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: absolute;
        width: 18px;
        height: 50px;
        background: var(--color-white);
        top: 50%;
        margin-top: -25px;
        box-shadow: 0 0 4px 0 color(var(--color-black) a(0.1));
        transition: all ease 0.3s;
        border-radius: 0 10px 10px 0;
        z-index: 9;
        &:hover {
            box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2));
            opacity: 1;
        }
    }
    .toolsBar {
        position: absolute;
        left: 0;
        top: 2px;
        bottom: 0;
        background: var(--color-white);
        width: var(--tool-bar-width);
        overflow: auto;
        box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2));
        z-index: 2;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    /*content area*/
    .dragAreaWrap {
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
        &::-webkit-scrollbar-track {
            background-color: var(--background-color-base);
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: var(--color-text-placeholder);
        }
    }
    .contentWrap {
        position: relative;
        height: 100%;
        width: 100%;
    }
    .contentBox {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: auto;
        min-height: 100%;
    }
    .dragAreaWrap {
        transform-origin: top center;
        width: var(--drag-area-width);
        height: var(--drag-area-height);
        overflow-x: hidden;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.3);
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
    .dragArea {
        height: 100%;
        background-color: #ffffff;
        :global {
            .draggableToolItem {
                width: 100%;
                max-width: 100%;
                &:local {
                    &.ghost {
                        background-color: color(var(--color-primary) a(0.4)) !important;
                        box-shadow: 0 3px 14px 3px color(var(--color-primary) a(0.6)), 0 10px 10px 1px color(var(--color-primary) a(0.5));
                        height: 120px !important;
                        padding: 20px;
                        &>div {
                            width: 100%;
                            height: 100%;
                            background-color: var(--color-white);
                        }
                        p {
                            font-size: 16px;
                            line-height: 24px;
                        }
                    }
                }
            }
            .emptyBox {
                min-height: 350px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .viewEmpty_IconBox {
                color: color(var(--checkbox-color) a(0.7));
                font-size: 50px;
                text-align: center;
            }
            .el-image {
                vertical-align: top;
            }
        }
    }
    .ghost {
        opacity: 0.5;
    }
</style>
