<template>
    <div :class="$style.box">
        <div :class="$style.logo">
            <h1>Vue Editor</h1>
        </div>
        <div :class="$style.btns">
            <el-select v-model="platform" placeholder="请选择" :class="$style.selectPlatform">
                <el-option label="PC" value="editor"></el-option>
                <el-option label="M" value="editorM"></el-option>
            </el-select>
            <el-button icon="el-icon-minus"
                       :disabled="disabledMinus"
                       :class="$style.scaleBtn"
                       circle
                       @click="handleMinus"
            >
            </el-button>
            <el-button type="text">
                {{ value }}%
            </el-button>
            <el-button icon="el-icon-plus"
                       :disabled="disabledPlus"
                       :class="$style.scaleBtn"
                       circle
                       @click="handlePlus"
            ></el-button>
            <el-button @click="$emit('onPreview')">预览</el-button>
            <el-button type="primary" plain @click="$emit('onSave')">保存</el-button>
            <el-button type="primary" @click="$emit('onPublish')">发布</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditorHeader',
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
    @import "variable.css";
    .box {
        padding: 20px 80px;
        height: auto;
        background: var(--color-white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.2);
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        text-shadow: 0 0 40px #409EFF;
        h1 {
            font-size: 30px;
            text-transform: uppercase;
        }
    }
    .selectPlatform {
        width: 100px;
        margin-right: 20px;
    }
</style>
