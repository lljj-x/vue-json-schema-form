<template>
    <div :class="$style.box">
        <div :class="$style.typeList">
            <router-link
                v-for="item in typeItems"
                :key="item"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
                :class="{
                    [$style.linkItem]: true,
                    [$style.active]: item === curType
                }"
                :to="{
                    name: 'demo',
                    query: {
                        type: item
                    }
                }"
            >
                <el-button
                    :type="item === curType ? 'primary' : ''"
                    size="small"
                    @click="navigate"
                >
                    {{ item }}
                </el-button>
            </router-link>
        </div>
        <el-row :gutter="60">
            <el-col :class="$style.middleBox" :span="16">
                <el-row :gutter="6">
                    <el-col :span="12">
                        <CodeEditor
                            v-model="curSchemaCode"
                            title="Schema"
                        ></CodeEditor>
                    </el-col>
                    <el-col :span="12">
                        <CodeEditor
                            v-model="curFormDataCode"
                            title="FormData"
                        ></CodeEditor>
                    </el-col>
                </el-row>
                <el-row :gutter="6" style="margin-top: 10px;">
                    <el-col :span="12">
                        <CodeEditor
                            v-model="curUiSchemaCode"
                            title="Ui Schema"
                        ></CodeEditor>
                    </el-col>
                    <el-col :span="12">
                        <CodeEditor
                            v-model="curErrorSchemaCode"
                            title="Error Schema"
                        ></CodeEditor>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :class="$style.middleBox" :span="8">
                <el-card
                    shadow="hover"
                    :class="$style.card"
                >
                    <div slot="header" class="clearfix">
                        <span>生成表单：</span>
                    </div>
                    <VueElementForm
                        v-model="formData"
                        :schema="schema"
                        :ui-schema="uiSchema"
                        :error-schema="errorSchema"
                        @onChange="handleDataChange"
                        @onCancel="handleCancel"
                        @onSubmit="handleSubmit"
                    >
                    </VueElementForm>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VueElementForm from 'common/lib/vueElementSchemaForm';

    import CodeEditor from '../../components/CodeEditor';
    import schemaTypes from './schemaTypes';

    const typeItems = Object.keys(schemaTypes);

    export default {
        name: 'Demo',
        components: {
            CodeEditor,
            VueElementForm
        },
        data() {
            return {
                typeItems,
                ...this.getDefaultSchemaMap()
            };
        },
        computed: {
            curType() {
                return this.$route.query.type;
            },

            curSchemaCode: {
                get() {
                    return this.genCodeStrComputedGetter('schema');
                },
                set(val) {
                    return this.genCodeStrComputedSetter('schema', val);
                }
            },
            curUiSchemaCode: {
                get() {
                    return this.genCodeStrComputedGetter('uiSchema');
                },
                set(val) {
                    return this.genCodeStrComputedSetter('uiSchema', val);
                }
            },
            curFormDataCode: {
                get() {
                    return this.genCodeStrComputedGetter('formData');
                },
                set(val) {
                    return this.genCodeStrComputedSetter('formData', val);
                }
            },
            curErrorSchemaCode: {
                get() {
                    return this.genCodeStrComputedGetter('errorSchema');
                },
                set(val) {
                    return this.genCodeStrComputedSetter('errorSchema', val);
                }
            }
        },
        watch: {
            $route() {
                this.initData();
            }
        },
        created() {
            this.initData();
        },
        methods: {
            getDefaultSchemaMap() {
                return {
                    schema: {},
                    uiSchema: {},
                    formData: {},
                    errorSchema: {}
                };
            },
            genCodeStrComputedGetter(vmKey) {
                try {
                    return this[vmKey] ? JSON.stringify(this[vmKey], null, 4) : '{}';
                } catch (e) {
                    return '{}';
                }
            },
            genCodeStrComputedSetter(vmKey, val) {
                try {
                    this[vmKey] = val ? JSON.parse(val) : {};
                } catch (e) {
                    // 无法解析时不更新数据
                    // this[vmKey] = {};
                }
            },
            initData() {
                const curPack = schemaTypes[this.curType];
                Object.assign(this, this.getDefaultSchemaMap(), curPack);
            },
            handleDataChange() {
                console.log('Data change');
            },
            handleCancel() {
                console.log('Cancel');
            },
            handleSubmit() {
                console.log('Submit');
            }
        }
    };
</script>

<style module>
    .box {
        overflow: hidden;
    }
    .typeList {
        padding: 10px 0;
    }
    .linkItem {
        &+.linkItem {
            margin-left: 8px;
        }
    }
    .middleBox {
        :global {
            .el-card {
                border-top: none;
                overflow: visible;
            }
            .el-card__header {
                border-top: 1px solid #EBEEF5;
                position: sticky;
                padding: 10px 20px;
                top: 0;
                font-size: 14px;
                font-weight: bold;
                background: #FFFFFF;
                z-index: 3;
            }
        }
    }
    .middleBox {
        height: calc(100vh - 140px);
        overflow: auto;
    }
</style>
