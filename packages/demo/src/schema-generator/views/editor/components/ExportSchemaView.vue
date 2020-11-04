<template>
    <div style="text-align: right;">
        <el-button @click="toCopy">复制代码</el-button>
        <el-button type="primary" @click="toDemo">在 Demo 页验证</el-button>
        <JsonPrettyPrint :json-string="genCode"></JsonPrettyPrint>
    </div>
</template>

<script>
    import JsonPrettyPrint from '@/_common/components/JsonPerttyPrint.vue';
    import { openNewPage } from '@/_common/utils/url.js';
    import { componentList2JsonSchema } from '../common/editorData';

    export default {
        name: 'ExportSchemaView',
        components: {
            JsonPrettyPrint
        },
        props: {
            componentList: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                genType: 1
            };
        },
        computed: {
            genCode() {
                return componentList2JsonSchema(this.componentList);
            }
        },
        methods: {
            toDemo() {
                const schema = encodeURIComponent(JSON.stringify(this.genCode));
                const link = `https://form.lljj.me/#/demo?type=Test&schema=${schema}`;
                openNewPage(link);
            },
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
