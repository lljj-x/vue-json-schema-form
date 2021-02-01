interface HELPERS {
    isMiniDes: (formProps: object) => boolean;
}

declare namespace globalOptions {

    /** WIDGET_MAP 配置 */
    export const WIDGET_MAP:object

    /** COMPONENT_MAP 配置 */
    export const COMPONENT_MAP:object

    /** HELPERS 配置 */
    export const HELPERS: HELPERS
}

export default globalOptions;
