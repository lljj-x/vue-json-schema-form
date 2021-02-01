declare namespace vueUtils {

    /** nodePath 转css类名 */
    function nodePath2ClassName(path: string): string;

    /** 是否为根节点 */
    function isRootNodePath(path: string): boolean;

    /** 计算当前节点path */
    function computedCurPath(prePath: string, curKey: string): string;

    /** 计算当前节点name */
    function deletePathVal(vueData: object, name: string): void;

    /** 设置当前path值 */
    function setPathVal(vueData: object, path: string, value: any): void;

    /** 设置当前path值 */
    function getPathVal(vueData: object, path: string): object;

    /** 设置当前path值 */
    function path2prop(path: string): string;
}

export default vueUtils;
