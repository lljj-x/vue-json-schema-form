<template>
    <i-select v-model="selectList"
              v-bind="$attrs"
    >
        <i-option v-for="(item, index) in enumOptions" :key="index" :value="item.value">{{ item.label }}</i-option>
    </i-select>
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
