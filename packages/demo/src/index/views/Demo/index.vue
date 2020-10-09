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
                        :custom-formats="customFormats"
                        :form-footer="formFooter"
                        @on-change="handleDataChange"
                        @on-cancel="handleCancel"
                        @on-submit="handleSubmit"
                    >
                    </VueElementForm>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VueElementForm from '@lljj/vue-json-schema-form';

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
                ...this.getDefaultSchemaMap(),
                customFormats: {
                    price(value) {
                        return value !== '' && /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) && value >= 0 && value <= 999999.99;
                    }
                }
            };
        },
        computed: {
            formFooter() {
                return {
                    show: true,
                    okBtn: '保存',
                    cancelBtn: this.isTestPage ? '生成预览链接' : '取消'
                };
            },
            curType() {
                return this.$route.query.type;
            },
            isTestPage() {
                return this.curType === 'Test';
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
                // eslint-disable-next-line no-unused-vars
                const { type, ...queryParams } = this.$route.query;

                let queryParamsObj = {};
                try {
                    queryParamsObj = Object.entries(queryParams).reduce((preVal, [key, value]) => {
                        preVal[key] = JSON.parse(decodeURIComponent(String(value)));
                        return preVal;
                    }, {});
                } catch (e) {
                    // nothing ...
                }

                Object.assign(this, this.getDefaultSchemaMap(), Object.assign(schemaTypes[this.curType], queryParamsObj));
            },
            handleDataChange() {
                console.log('Data change');
            },
            handleSubmit() {
                console.log('Submit');
            },
            clipboard(value) {
                if (document.execCommand) {
                    const input = document.createElement('input');
                    document.body.appendChild(input);
                    input.setAttribute('value', value);
                    input.select();

                    document.execCommand('copy');
                    document.body.removeChild(input);

                    return true;
                }

                this.$message.info(value);
                return false;
            },
            handleCancel() {
                if (this.isTestPage) {
                    const genRoute = this.$router.resolve({
                        query: {
                            type: 'Test',
                            schema: encodeURIComponent(this.curSchemaCode),
                            formData: encodeURIComponent(this.curFormDataCode),
                            uiSchema: encodeURIComponent(this.curUiSchemaCode),
                            errorSchema: encodeURIComponent(this.curErrorSchemaCode),
                        }
                    });
                    const url = `${window.location.origin}${window.location.pathname}${genRoute.href}`;

                    if (this.clipboard(url)) {
                        this.$message.success('复制预览地址成功');
                    }
                }
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
        margin-right: 8px;
        margin-top: 8px;
        margin-left: auto !important;
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
