<template>
    <BaseEditorHeader default-active="3">
        <el-select
            v-model="platform"
            placeholder="请选择"
            :class="$style.selectPlatform"
        >
            <el-option
                label="PC"
                value="editor"
            ></el-option>
            <el-option
                label="M"
                value="editorM"
            ></el-option>
        </el-select>
        <el-button
            icon="el-icon-minus"
            :disabled="disabledMinus"
            :class="$style.scaleBtn"
            circle
            @click="handleMinus"
        >
        </el-button>
        <el-button type="text">
            {{ value }}%
        </el-button>
        <el-button
            icon="el-icon-plus"
            :disabled="disabledPlus"
            :class="$style.scaleBtn"
            circle
            @click="handlePlus"
        ></el-button>
        <el-button @click="$emit('onPreview')">预览</el-button>
        <el-button
            type="primary"
            plain
            @click="$emit('onSave')"
        >
            保存
        </el-button>
        <el-button
            type="primary"
            @click="$emit('onPublish')"
        >
            发布
        </el-button>
    </BaseEditorHeader>
</template>

<script>
import BaseEditorHeader from 'demo-common/components/EditorHeader.vue';

export default {
    name: 'EditorHeader',
    components: {
        BaseEditorHeader
    },
    props: {
        value: {
            type: Number,
            default: 60
        },
        minScale: {
            type: Number,
            default: 40
        },
        stepNum: {
            type: Number,
            default: 5
        }
    },
    computed: {
        platform: {
            get() {
                return this.$route.name;
            },
            set(routerName) {
                this.$router.replace({
                    name: routerName
                });
            }
        },
        disabledMinus() {
            return this.value <= this.minScale;
        },
        disabledPlus() {
            return this.value >= 100;
        },
    },
    methods: {
        handlePlus() {
            const curScale = this.value + this.stepNum;
            this.emitUpdateScale(curScale);
        },
        handleMinus() {
            const curScale = this.value - this.stepNum;
            this.emitUpdateScale(curScale);
        },
        emitUpdateScale(curScale) {
            this.$emit('input', curScale);
            this.$emit('onUpdateScale', {
                scale: curScale
            });
        }
    }
};
</script>

<style module>
    @import "demo-common/css/variable.css";
    .box {
        padding: 10px 2%;
        height: auto;
        background: var(--color-white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 8px 1px rgba(0,0,0,.3);
    }
    .headerMenu {
        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
            display: none;
            text-shadow: 0 0 40px #409EFF;
            font-size: 26px;
            text-transform: uppercase;
            z-index: 10;
        }
    }
    .selectPlatform {
        width: 100px;
        margin-right: 20px;
    }
</style>
