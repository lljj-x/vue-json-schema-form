<template>
    <el-radio-group v-model="checkList" v-bind="$attrs">
        <el-radio v-for="(item, index) in enumOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
    </el-radio-group>
</template>

<script>
    export default {
        name: 'RadioWidget',
        props: {
            value: {
                default: () => '',
                type: [String, Number, Boolean]
            },
            enumOptions: {
                default: () => [],
                type: [Array]
            }
        },
        computed: {
            checkList: {
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
