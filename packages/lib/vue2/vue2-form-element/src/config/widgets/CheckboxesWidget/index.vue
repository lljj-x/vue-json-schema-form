<template>
    <el-checkbox-group
        v-bind="$attrs"
        v-on="$listeners"
    >
        <el-checkbox
            v-for="(item, index) in enumOptions"
            :key="index"
            :label="item.value"
        >
            {{ item.label }}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script>
export default {
    name: 'CheckboxesWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    }
};
</script>
