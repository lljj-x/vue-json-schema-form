<template>
    <div :class="$style.box">
        <div
            v-for="(group, index) in configTools"
            :key="index"
            :class="$style.group"
        >
            <template v-if="!group.hidden">
                <h3 :class="$style.groupName">
                    {{ group.groupName }}({{ group.componentList.length }})
                </h3>
                <draggable
                    v-model="group.componentList"
                    :class="$style.groupList"
                    :sort="false"
                    :filter="`.${$style.disabled}`"
                    :group="{ name: dragGroup, pull: 'clone', put: false }"
                    :clone="cloneDog"
                    @filter="$emit('onFilter')"
                    @start="$emit('onDragStart')"
                    @end="$emit('onDragEnd')"
                >
                    <div
                        v-for="item in group.componentList"
                        :key="item.title"
                        :class="{
                            [$style.listItem]: true,
                            draggableToolItem: true,
                            [$style.disabled]: (currentUseComponentNum[item.componentPack.componentViewName] || 0) >= item.maxNum
                        }"
                    >
                        <div>
                            <p :class="[$style.line, $style.lineIcon]">
                                <i :class="item.icon"></i>
                            </p>
                            <p :class="[$style.line, $style.lineTitle]">
                                {{ item.title }}
                            </p>
                            <p :class="[$style.line, $style.lineUseNum]">
                                {{ currentUseComponentNum[item.componentPack.componentViewName] || 0 }} / {{ item.maxNum }}
                            </p>
                        </div>
                    </div>
                </draggable>
            </template>
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';

import { generateEditorItem } from './common/editorData';

export default {
    name: 'EditorToolBar',
    components: {
        Draggable,
    },
    props: {
        configTools: {
            type: Array,
            default: () => []
        },
        currentUseComponentNum: {
            default: () => ({}),
            type: Object
        },
        dragGroup: {
            default: '',
            type: String
        }
    },
    watch: {
        currentUseComponentNum(newVal) {
            // console.log(newVal);
        }
    },
    methods: {
        // clone 当前模块
        cloneDog(toolItem) {
            return generateEditorItem(toolItem);
        }
    }
};
</script>

<style module>
    @import "demo-common/css/variable.css";
    .box{
        padding: 20px;
    }
    .group {
        margin-top: 20px;
        &:first-child {
            margin-top: 0;
        }
    }
    .groupName {
        font-size: 12px;
        line-height: 18px;
    }
    .groupList {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
        justify-content: space-between;
    }
    .listItem {
        position: relative;
        width: 50%;
        max-width: 120px;  /* 避免拖动ghost样式异常 */
        height: 80px;
        cursor: move;
        flex-shrink: 0;
        transition: box-shadow 0.3s ease;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        &:hover {
            background-color: var(--background-color-selected);
            box-shadow: 0 0 8px 1px rgba(0,0,0,.2);
        }
    }
    .line {
        font-size: 12px;
        line-height: 18px;
    }
    .lineIcon {
        color: var(--color-text-third);
        font-size: 14px;
    }
    .disabled {
        cursor: no-drop;
        opacity: 0.8;
    }
</style>
