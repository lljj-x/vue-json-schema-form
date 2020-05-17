<template>
    <el-form-item :class="$style.item">
        <el-button size="small" @click="$emit('onCancel')">取消</el-button>
        <el-button size="small" type="primary" @click="$emit('onSubmit')">保存</el-button>
    </el-form-item>
</template>

<script>
    export default {
        name: 'FormFooter',
        props: {
            okBtn: {
                type: String,
                default: '保存'
            },
            cancelBtn: {
                type: String,
                default: '取消'
            },
        }
    };
</script>

<style module>
    .item {
        text-align: right;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        padding-top: 10px;
    }
</style>
