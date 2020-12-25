interface Options {
    schema: object,
    uiSchema: object
}

declare namespace formUtils {

    /** 解析当前节点 ui field */
    function getUiField(schemaOption: Options): object | null;

    /** 解析用户配置的 uiSchema options */
    function getUserUiOptions(schemaOption: Options): object;

     /** 解析当前节点的ui options参数 */
    function getUiOptions(schemaOption: Options): object;

     /** 获取当前节点的ui 配置 （options + widget） */
    function getWidgetConfig(schemaOption: Options): object;

     /** 获取当前节点的ui 配置 （options + widget） */
    function getUserErrOptions(schemaOption: Options): object;

     /** ui:order object-> properties 排序 */
    function orderProperties(properties: object, order): object;

     /** 当前schema 值是否为常量 */
    function isConstant(schema: object): boolean;

    function toConstant(schema: object): object | null;

    /** 是否为选择列表 **/
    function isSelect(_schema: object, rootSchema: object): boolean;

    /** type array items 都为一个对象 **/
    function isFixedItems(schema: object): boolean;

    /** 是否为多选 **/
    function isMultiSelect(schema: object, rootSchema: object): boolean;

    function allowAdditionalItems(schemaOption: Options): boolean;

    /** 下拉选项 **/
    function optionsList(schemaOption: Options);
}

export default formUtils;
