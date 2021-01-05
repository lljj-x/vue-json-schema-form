<template>
    <div style="text-align: right;">
        <div style="margin: -10px 0 10px; text-align: left;color: #999;">
            <p>如果导出的数据手动修改过再次导入可能会导入失败，同时配置组件做了细化拆分方便导入匹配正确结果，可能得不偿失，有点鸡肋 Orz . ...</p>
        </div>
        <el-input
            v-model="importStr"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder="注意：导入数据格式请参考导出数据格式"
        >
        </el-input>
        <p style="margin-top: 20px;">
            <el-button
                type="primary"
                @click="$emit('onImport', importStr)"
            >
                导入
            </el-button>
        </p>
    </div>
</template>

<script>

export default {
    name: 'ImportSchemaView',
    data() {
        return {
            importStr: ''
        };
    }
};
</script>
