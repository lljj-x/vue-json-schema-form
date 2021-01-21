<template>
    <radio-group
        v-bind="$attrs"
        v-on="$listeners"
    >
        <radio
            v-for="(item, index) in enumOptions"
            :key="index"
            :label="item.value"
        >
            {{ item.label }}
        </radio>
    </radio-group>
</template>

<script>
export default {
    name: 'RadioWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    }
};
</script>
