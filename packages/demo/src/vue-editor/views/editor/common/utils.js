/**
 * Created by Liu.Jun on 2019/11/28 18:37.
 */

export function getComponentsConfig(configTools) {
    // 平铺开所有组
    const componentList = configTools.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);

    // 注册组件结构
    return componentList.reduce((preVal, { componentPack }) => {
        if (componentPack.componentFormName) {
            preVal[componentPack.componentFormName] = componentPack.Form;
        }
        preVal[componentPack.componentViewName] = componentPack.View;
        return preVal;
    }, {});
}
