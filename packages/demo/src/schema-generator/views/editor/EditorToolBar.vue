<template>
    <div :class="$style.box">
        <div v-for="(group, index) in configTools"
             :key="index"
             :class="$style.group"
        >
            <template v-if="!group.hidden">
                <h3 :class="$style.groupName">
                    {{ group.groupName }}({{ group.componentList.length }})
                </h3>
                <draggable v-model="group.componentList"
                           :class="$style.groupList"
                           :sort="false"
                           :filter="`.${$style.disabled}`"
                           :group="{ name: dragGroup, pull: 'clone', put: false }"
                           :clone="cloneDog"
                           @filter="$emit('onFilter')"
                           @start="$emit('onDragStart')"
                           @end="$emit('onDragEnd')"
                >
                    <div v-for="(item, cIndex) in group.componentList"
                         :key="cIndex"
                         :class="{
                             [$style.listItem]: true,
                             draggableToolItem: true
                         }"
                    >
                        {{ item.title }}
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
            dragGroup: {
                default: '',
                type: String
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
    @import "variable.css";
    .box{
        padding: 10px;
    }
    .group {
        margin-top: 20px;
        &:first-child {
            margin-top: 0;
        }
    }
    .groupName {
        font-size: 15px;
        font-weight: bold;
        line-height: 18px;
    }
    .groupList {
        margin-top: -10px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        justify-content: space-between;
    }
    .listItem {
        position: relative;
        margin-top: 10px;
        width: 47%;
        max-width: 120px;  /* 避免拖动ghost样式异常 */
        height: 36px;
        line-height: 36px;
        cursor: move;
        flex-shrink: 0;
        transition: box-shadow 0.3s ease;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        background-color: var(--background-color-selected);
        border: 1px dashed transparent;
        font-size: 12px;
        &:hover {
            color: #409eff;
            border: 1px dashed #409eff;
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
