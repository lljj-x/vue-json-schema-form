import Vue from 'vue';

declare class VueForm extends Vue {
    /** formFooter 配置 */
    formFooter: object

    /** value / v-model */
    value: object

    /** 传递给form的props */
    formProps: object

    /** schema 配置 */
    schema: object

    /** uiSchema 配置 */
    uiSchema: object

    /** 重置自定义错误 */
    errorSchema: object

    /** 自定义校验规则 */
    customFormats: object

    /** 自定义校验规则 */
    customRule: null
}

export default VueForm;
