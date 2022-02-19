<template>
    <div
        v-if="true"
        class="demo-wrapper"
    >
        <VueElementForm
            v-model="formData"
            strict-mode
            class="demo-form-box"
            :schema="schema"
            @on-submit="handleSubmit"
        >
        </VueElementForm>
    </div>
</template>

<script>
import VueElementForm from '@lljj/vue-json-schema-form/src/index';

export default {
    components: {
        VueElementForm
    },
    data() {
        return {
            formData: {
                item: [
                    {
                        text: '作者'
                    },
                    {
                        imgUrl: '',
                        step: 1,
                        text: '机构'
                    }
                ]
            },
            schema: {
                title: 'DEMO',
                type: 'object',
                properties: {
                    item: {
                        title: '左侧点击栏目',
                        type: 'array',
                        required: [],
                        minItems: 1,
                        items: {
                            title: '栏目类型',
                            type: 'object',
                            anyOf: [
                                {
                                    title: '唯一可点击栏目',
                                    required: ['text', 'imgUrl', 'step'],
                                    properties: {
                                        text: {
                                            type: 'string',
                                            title: '栏目名称'
                                        },
                                        imgUrl: {
                                            title: '点击弹出图',
                                            type: 'string',
                                        },
                                        step: {
                                            title: '第一步',
                                            type: 'number',
                                            const: 1,
                                            default: 1,
                                            'ui:disabled': true,
                                            'ui:hidden': true
                                        }
                                    }
                                },
                                {
                                    title: '其他栏目',
                                    required: ['text'],
                                    properties: {
                                        text: {
                                            type: 'string',
                                            title: '栏目名称'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
        };
    },
    created() {
        // 初始数据
        // this.formData = {
        //     item: [
        //         {
        //             text: '作者'
        //         },
        //         {
        //             imgUrl: '',
        //             step: 1,
        //             text: '机构'
        //         }
        //     ]
        // };
    },
    methods: {
        handleSubmit(formData) {
            debugger;
        }
    }
};
</script>


<style scoped>
    .demo-wrapper {
        z-index: 1000;
        position: fixed;
        width: 100%;
        height: 100%;
        background: #FFFFFF;
    }
    .demo-form-box {
        margin: 0 auto;
        width: 600px;
    }
</style>
