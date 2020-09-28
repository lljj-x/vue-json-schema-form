<template>
    <el-form-item class="formFooter_item">
        <el-button @click="$emit('onCancel')">{{ cancelBtn }}</el-button>
        <el-button type="primary" @click="$emit('onSubmit')">{{ okBtn }}</el-button>
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
