<template>
    <el-form
        ref="form"
        :model="formData"
    >
        <el-form-item label="请配置标题">
            <el-input v-model="formData.txt"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
            <el-button @click="$emit('on-cancel')">取消</el-button>
            <el-button
                type="primary"
                @click="onSubmit"
            >
                保存
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'Form',
    props: {
        value: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            // 简单copy数据
            formData: this.$props.value ? JSON.parse(JSON.stringify(this.$props.value)) : {}
        };
    },
    watch: {
        formData: {
            deep: true,
            handler(value) {
                this.$emit('input', value);
                this.$emit('on-change', value);
            }
        }
    },
    methods: {
        async onSubmit() {
            await this.$refs.form.validate();
            this.$emit('on-submit', this.formData);
        }
    }
};
</script>
