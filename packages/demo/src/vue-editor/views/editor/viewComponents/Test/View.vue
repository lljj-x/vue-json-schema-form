<template>
    <div :class="$style.box">
        <JsonPerttyPrint :json-string="formData"></JsonPerttyPrint>
    </div>
</template>

<script>
    import JsonPerttyPrint from '@/_common/components/JsonPerttyPrint.vue';

    export default {
        name: 'TestView',
        components: {
            JsonPerttyPrint
        },
        props: {
            formData: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {};
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style module>
    .box {
        padding: 40px 0;
        font-size: 20px;
        text-align: center;
    }
</style>
