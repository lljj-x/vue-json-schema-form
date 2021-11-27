<template>
    <div :class="$style.container">
        <EditorHeader
            :show-version="true"
            default-active="2"
        >
            <div :class="$style.btns">
                <span style="font-size: 13px;">标签：</span>
                <el-slider
                    v-model="formProps.labelWidth"
                    style="width: 70px; margin-right: 6px;"
                    size="mini"
                    :format-tooltip="sliderFormat"
                ></el-slider>
                <el-checkbox
                    v-model="formProps.inline"
                    style="margin-right: 6px;"
                    size="mini"
                >
                    Inline
                </el-checkbox>
                <el-checkbox
                    v-model="formFooter.show"
                    style="margin-right: 6px;"
                    size="mini"
                >
                    底部
                </el-checkbox>
                <el-select
                    v-model="formProps.layoutColumn"
                    placeholder="布局"
                    size="small"
                    style="margin-right: 6px;width: 100px;"
                >
                    <el-option
                        :value="1"
                        label="一列显示"
                    ></el-option>
                    <el-option
                        :value="2"
                        label="二列显示"
                    ></el-option>
                    <el-option
                        :value="3"
                        label="三列显示"
                    ></el-option>
                </el-select>
                <el-select
                    v-model="formProps.labelPosition"
                    placeholder="对其"
                    size="small"
                    style="margin-right: 6px;width: 96px;"
                >
                    <el-option
                        value="top"
                        label="Label上"
                    ></el-option>
                    <el-option
                        value="left"
                        label="Label左"
                    ></el-option>
                    <el-option
                        value="right"
                        label="Label右"
                    ></el-option>
                </el-select>
                <el-button
                    icon="el-icon-share"
                    type="primary"
                    size="small"
                    @click="handlePreview"
                >
                    分享
                </el-button>
            </div>
        </EditorHeader>
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
                            ui: curVueForm,
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
            <el-row :gutter="25">
                <el-col
                    :class="$style.middleBox"
                    :span="16"
                >
                    <el-row :gutter="6">
                        <el-col :span="10">
                            <CodeEditor
                                v-model="curFormDataCode"
                                title="FormData"
                            ></CodeEditor>
                        </el-col>
                        <el-col :span="14">
                            <CodeEditor
                                v-model="curSchemaCode"
                                title="Schema"
                            ></CodeEditor>
                        </el-col>
                    </el-row>
                    <el-row
                        :gutter="6"
                        style="margin-top: 10px;"
                    >
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
                <el-col
                    :class="[$style.middleBox, $style.middleBox_form]"
                    :span="8"
                >
                    <el-card
                        shadow="hover"
                        :class="[$style.card, $style.formBox]"
                    >
                        <div
                            slot="header"
                            class="clearfix"
                        >
                            <span>
                                生成表单Ui库：
                                <el-select
                                    v-model="curVueForm"
                                    placeholder="ui"
                                    size="mini"
                                    style="margin-left: 10px;width: 130px;"
                                    @change="handleUiChange"
                                >
                                    <el-option
                                        v-for="item in formComponents"
                                        :key="item.name"
                                        :value="item.component"
                                        :label="item.name"
                                    ></el-option>
                                </el-select>
                            </span>
                        </div>
                        <component
                            :is="curVueForm"
                            ref="schemaForm"
                            :key="pageKey"
                            v-model="formData"
                            :schema="schema"
                            :ui-schema="uiSchema"
                            :error-schema="errorSchema"
                            :custom-formats="customFormats"
                            :form-footer="trueFormFooter"
                            :form-props="trueFormProps"
                            :fallback-label="true"
                            @keyup.native.enter="handleSearch"
                            @on-form-mounted="handleFormMounted"
                            @on-change="handleDataChange"
                            @on-cancel="handleCancel"
                            @on-submit="handleSubmit"
                        >
                        </component>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import EditorHeader from 'demo-common/components/EditorHeader.vue';
import CodeEditor from 'demo-common/components/CodeEditorV2';
import schemaTypes from 'demo-common/schemaTypes';

const VueElementForm = () => import('@lljj/vue-json-schema-form');

const VueIview3Form = async () => {
    // eslint-disable-next-line
    const [iview, ivewForm] = await Promise.all([
        import('demo-common/components/iView/index.js'),
        import('@lljj/vue2-form-iview3')
    ]);

    return ivewForm;
};

const typeItems = Object.keys(schemaTypes);

export default {
    name: 'Demo',
    components: {
        CodeEditor,
        EditorHeader,
        VueElementForm,
        // eslint-disable-next-line vue/no-unused-components
        VueIview3Form,
    },
    data() {
        return {
            typeItems,
            curVueForm: this.$route.query.ui || 'VueElementForm',
            ...this.getDefaultSchemaMap(),
            formComponents: [{
                name: 'ElementUi',
                component: 'VueElementForm'
            }, {
                name: 'Iview3',
                component: 'VueIview3Form'
            }],
            customFormats: {
                price(value) {
                    return value !== '' && /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) && value >= 0 && value <= 999999.99;
                }
            }
        };
    },
    computed: {
        pageKey() {
            return this.$route.query.type;
        },
        trueFormProps() {
            if (!this.formProps) return {};
            return {
                ...this.formProps,
                labelWidth: this.formProps.labelWidth ? `${this.formProps.labelWidth * 4}px` : undefined
            };
        },
        trueFormFooter() {
            return this.formFooter || {};
        },
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
        },
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
        async handleSearch() {
            console.log('$$uiFormRef', this.$refs.schemaForm.$$uiFormRef);
        },
        handleUiChange(value) {
            const formatStr = jsonCode => JSON.stringify(JSON.parse(jsonCode));

            this.$router.replace({
                query: {
                    ...this.$route.query,
                    ui: value,
                    schema: formatStr(this.curSchemaCode),
                    formData: formatStr(this.curFormDataCode),
                    uiSchema: formatStr(this.curUiSchemaCode),
                    errorSchema: formatStr(this.curErrorSchemaCode),
                    formFooter: formatStr(JSON.stringify(this.trueFormFooter)),
                    formProps: formatStr(JSON.stringify(this.trueFormProps)),
                }
            });
            window.location.reload();
        },
        sliderFormat(value) {
            return value ? `${value * 4}px` : undefined;
        },
        getDefaultSchemaMap() {
            return {
                schema: {},
                uiSchema: {},
                formData: {},
                errorSchema: {},
                formFooter: {
                    show: true
                },
                formProps: {
                    labelWidth: 25,
                    inline: false,
                    labelPosition: 'top',
                    inlineFooter: false,
                    layoutColumn: 1
                }
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
            const { type, ui, ...queryParams } = this.$route.query;

            let queryParamsObj = {};
            try {
                queryParamsObj = Object.entries(queryParams).reduce((preVal, [key, value]) => {
                    preVal[key] = JSON.parse(String(value));
                    return preVal;
                }, {});
            } catch (e) {
                // nothing ...
            }

            // 还原 labelWidth
            if (queryParamsObj.formProps && queryParamsObj.formProps.labelWidth) {
                queryParamsObj.formProps.labelWidth = parseFloat(queryParamsObj.formProps.labelWidth) / 4;
            }

            const defaultState = this.getDefaultSchemaMap();
            const formProps = {
                ...defaultState.formProps,
                ...(queryParamsObj.formProps || {})
            };

            Object.assign(this, defaultState, Object.assign(schemaTypes[this.curType], queryParamsObj, {
                formProps
            }));
        },
        handleFormMounted(formRef) {
            console.log('Ui form component:', formRef);
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
        handleCancel() {},
        handlePreview() {
            const formatStr = jsonCode => JSON.stringify(JSON.parse(jsonCode));

            const genRoute = this.$router.resolve({
                query: {
                    ui: this.curVueForm,
                    type: 'Test',
                    schema: formatStr(this.curSchemaCode),
                    formData: formatStr(this.curFormDataCode),
                    uiSchema: formatStr(this.curUiSchemaCode),
                    errorSchema: formatStr(this.curErrorSchemaCode),
                    formFooter: formatStr(JSON.stringify(this.trueFormFooter)),
                    formProps: formatStr(JSON.stringify(this.trueFormProps)),
                }
            });
            const url = `${window.location.origin}${window.location.pathname}${genRoute.href}`;

            if (this.clipboard(url)) {
                this.$message.success('复制预览地址成功');
            }
        }
    }
};
</script>

<style module>
    .btns {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .box {
        padding: 0 15px;
    }
    .typeList {
        padding: 15px 0 20px;
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
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                background: #FFFFFF;
                z-index: 3;
            }
        }
    }
    .middleBox_form {
        position: sticky;
        top: 0;
    }
    .formBox {
        max-height: calc(100vh - 40px);
        overflow: auto !important;
        :global .el-card__header{
            position: sticky;
            top: 0;
        }
    }
</style>
