<template>
    <div v-loading="loading">
        <EditorHeader
            @onSave="handleSave"
        ></EditorHeader>

        <div :class="[$style.container]">
            <div :class="$style.contentWrap">
                <div :class="$style.toolsBar">
                    <EditorToolBar
                        :current-use-component-num="currentUseComponentNum"
                        :drag-group="dragOptions.group"
                        :config-tools="configTools"
                        @onFilter="$message.error('该组件添加数目已达上限！')"
                    >
                    </EditorToolBar>
                </div>
                <div :class="[$style.contentBox]">
                    <el-form
                        style="height: 100%"
                        :model="formData"
                        label-width="80px"
                    >
                        <draggable ref="draggable"
                                   v-model="editComponentList"
                                   v-bind="dragOptions"
                                   :class="[$style.dragArea]"
                                   @change="handleDragChange"
                        >
                            <div v-for="item in trueComponentList"
                                 :key="item.id"
                                 :slot="item.$$slot || 'default' "
                                 :class="{
                                     draggableSlot: item.$$slot,
                                     draggableItem: !item.$$slot,
                                     [`draggableSlot_${item.$$slot}`]: item.$$slot
                                 }"
                            >
                                <ViewComponentWrap
                                    :formData="formData"
                                    :editor-item="item"
                                    @onOperate="handleItemOperate"
                                ></ViewComponentWrap>
                            </div>
                        </draggable>
                    </el-form>
                    <div v-if="trueComponentList.length === 0" :class="$style.tipBox">
                        <p>拖拽左侧栏的组件进行添加</p>
                    </div>
                </div>
                <div :class="$style.rightForm">
                    <div :class="$style.configForm">
                        <h3>表单配置</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable';
    import * as arrayMethods from '@/_common/utils/array';
    import componentWithDialog from '@/_common/components/component-with-dialog';

    import JsonPerttyPrint from '@/_common/components/JsonPerttyPrint.vue';
    import EditorToolBar from './EditorToolBar.vue';
    import EditorHeader from './EditorHeader.vue';
    import ViewComponentWrap from './components/ViewComponentWrap.vue';

    import { vm2Api, api2VmToolItem } from './data';
    // import { deepFreeze } from './common/utils';

    import configTools from './config/tools';

    import { generateEditorItem } from './common/editorData';

    import './common/registerExtraElementComponent';

    Object.freeze(configTools);

    export default {
        name: 'Editor',
        components: {
            Draggable,
            EditorToolBar,
            EditorHeader,
            ViewComponentWrap
        },
        data() {
            return {
                loading: false,
                configTools,
                editComponentList: [],
                editHeaderComponentList: [], // 兼容header slot ，插件内部实现导致必须分割多分数据
                editFooterComponentList: [], // 兼容footer slot ，插件内部实现导致必须分割多分数据
                formData: {}
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
            }
        },
        mounted() {
            // todo: 通过计算获取
            window.document.body.classList.add('page-decorate-design');
        },
        destroyed() {
            window.document.body.classList.remove('page-decorate-design');
        },
        created() {
            this.initEditorData();
        },
        methods: {
            async initEditorData() {
                // 使用默认值
                const dataList = api2VmToolItem(configTools, []);

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

            // 用户操作数据
            handleDataChange() {
                //
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
    .dragArea {
        background-color: #f5f5f5;
        border: 1px dashed #bbb;
        height: calc(100% - 44px);
        padding: 15px;
        overflow: auto;
        :global {
            .draggableToolItem {
                width: 100%;
                max-width: 100%;
                &:local {
                    &.ghost {
                        background-color: color(var(--color-primary) a(0.4)) !important;
                        height: 20px;
                        padding: 10px 0;
                        margin-bottom: 15px;
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
