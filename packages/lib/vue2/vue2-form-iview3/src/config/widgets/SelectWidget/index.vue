<template>
    <i-select
        v-bind="$attrs"
        v-on="$listeners"
    >
        <i-option
            v-for="(item, index) in enumOptions"
            :key="index"
            :value="item.value"
        >
            {{ item.label }}
        </i-option>
    </i-select>
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
