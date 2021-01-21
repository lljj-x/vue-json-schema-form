<template>
    <el-select
        v-bind="$attrs"
        v-on="$listeners"
    >
        <el-option
            v-for="(item, index) in enumOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    name: 'SelectWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    }
};
</script>
