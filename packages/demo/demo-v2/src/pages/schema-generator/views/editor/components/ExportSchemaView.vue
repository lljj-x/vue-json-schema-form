<template>
    <div style="text-align: right;">
        <el-button @click="toCopy">复制代码</el-button>
        <el-button
            type="primary"
            @click="$emit('toDemo')"
        >
            在 Playground 页验证
        </el-button>
        <JsonPrettyPrint :json-string="genCode"></JsonPrettyPrint>
    </div>
</template>

<script>
import JsonPrettyPrint from 'demo-common/components/JsonPerttyPrint.vue';

export default {
    name: 'ExportSchemaView',
    components: {
        JsonPrettyPrint
    },
    props: {
        genCode: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            genType: 1
        };
    },
    methods: {
        toCopy() {
            if (this.copied) {
                return;
            }
            const pre = this.$el.querySelectorAll('pre')[0];
            pre.setAttribute('contenteditable', 'true');
            pre.focus();
            document.execCommand('selectAll', false, null);
            this.copied = document.execCommand('copy');
            pre.removeAttribute('contenteditable');
            setTimeout(() => {
                this.copied = false;
                this.$message.success('复制成功');
            }, 300);
        }
    }
};
</script>
