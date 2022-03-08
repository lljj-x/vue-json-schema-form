declare namespace fieldProps {

    /** 当前节点schema */
    export const schema:object

    /** 当前节点 uiSchema */

    export const uiSchema:object

    /** 当前节点 errorSchema */
    export const errorSchema:object

    /** 自定义校验规则 */
    export const customFormats:object

    /** 根节点 schema */
    export const rootSchema:object

    /** 根节点 formData */
    export const rootFormData:object

    /** 当前节点 路径 */
    export const curNodePath:string

    /** 是否为必填 */
    export const required:boolean

    /** 是否需要校验数据组 */
    export const needValidFieldGroup:boolean
}

export default fieldProps;
