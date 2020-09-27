<template>
    <el-select v-model="selectList"
               v-bind="$attrs"
    >
        <el-option v-for="(item, index) in enumOptions" :key="index" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'SelectWidget',
        props: {
            value: {
                default: null,
                type: null
            },
            enumOptions: {
                default: () => [],
                type: [Array]
            }
        },
        computed: {
            selectList: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        }
    };
</script>
