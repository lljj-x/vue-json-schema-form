/**
 * Created by Liu.Jun on 2020/12/9 16:59.
 */

import { formUtils, getDefaultFormState } from '@lljj/vue-json-schema-form';
import { generateEditorItem, deFormatFormLabelWidth } from './editorData';
import { isObject } from './utils';

function flatToolItems(toolItems) {
    return toolItems.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);
}

const getDefaultFormDataBySchema = (() => {
    // cache 避免重复计算了
    const cacheValueMap = new Map();

    return (schema) => {
        if (!cacheValueMap.has(schema)) {
            // 获取到配置的数据结构
            const formData = getDefaultFormState(schema, {}, schema);
            cacheValueMap.set(schema, formData);
        }

        return cacheValueMap.get(schema);
    };
})();

function schemaIncludes(target = {}, baseSchema = {}) {
    const keys = Object.keys(baseSchema);
    return keys.every((k) => {
        // 跳过title 属性
        if (k === 'title') return true;

        // Array 类型暂不需要对比
        if (Array.isArray(target[k])) return true;

        // 对象递归
        if (isObject(target[k]) && isObject(baseSchema[k])) {
            return schemaIncludes(target[k], baseSchema[k]);
        }

        return target[k] === baseSchema[k];
    });
}

function viewSchemaMatch(target, toolItem) {
    const baseViewSchema = toolItem.componentPack.viewSchema;

    // 计算 target 包含 toolItem
    // 如果导入的属性包含了 ui:widget 那原始值也必须包含
    return schemaIncludes(target, baseViewSchema)
        && (target['ui:widget'] ? !!baseViewSchema['ui:widget'] : true)
        && (target.format ? !!baseViewSchema.format : true);
}

const errorNode = [];

function getUserConfigByViewSchema(curSchema, toolConfigList) {
    const toolItem = toolConfigList.find(item => viewSchemaMatch(curSchema, item));

    if (toolItem) {
        let componentValue = {};

        // 需要计算 value
        if (curSchema.$$key) {
            const curSchemaUiOptions = formUtils.getUserUiOptions({
                schema: curSchema
            });
            const emptyComponentValue = getDefaultFormDataBySchema(toolItem.componentPack.propsSchema);

            componentValue.property = curSchema.$$key;
            componentValue = ['baseValue', 'options', 'rules'].reduce((preVal, curVal) => {
                if (emptyComponentValue[curVal]) {
                    preVal[curVal] = {};

                    const { schemaOptions, uiOptions } = emptyComponentValue[curVal];

                    // 回填 schema options
                    if (schemaOptions) {
                        preVal[curVal].schemaOptions = {};
                        for (const k in schemaOptions) {
                            if (schemaOptions.hasOwnProperty(k)) {
                                const tmpVal = curSchema[k];
                                if (tmpVal !== undefined) preVal[curVal].schemaOptions[k] = tmpVal;
                            }
                        }
                    }

                    // 回填 ui options
                    if (uiOptions) {
                        preVal[curVal].uiOptions = {};
                        for (const k in uiOptions) {
                            if (uiOptions.hasOwnProperty(k)) {
                                const tmpVal = curSchemaUiOptions[k];
                                if (tmpVal !== undefined) preVal[curVal].uiOptions[k] = k === 'labelWidth' ? deFormatFormLabelWidth(tmpVal) : tmpVal;
                            }
                        }
                    }
                }

                return preVal;
            }, componentValue);
        }

        return generateEditorItem({
            ...toolItem,

            // todo:计算默认值
            componentValue
        });
    }

    // 错误只记录 title 和type
    errorNode.push({
        title: curSchema.title,
        type: curSchema.type,
    });

    // 异常数据
    return null;
}

export default function jsonSchema2ComponentList(code, toolItems) {
    // 清空错误信息
    errorNode.length = 0;

    if (String(code).trim() === '') return null;

    const toolConfigList = flatToolItems(toolItems);
    const data = JSON.parse(code);
    const {
        schema, formFooter, formProps, /* uiSchema, */
    } = data;

    // 广度队列
    let eachQueue = [schema];

    // 记录输出的list
    const componentList = [];

    //
    const getChildList = curSchema => (curSchema.$$parentEditorItem && curSchema.$$parentEditorItem.childList) || componentList;

    // 删除附加数据
    const deleteAdditionalData = (curSchema) => {
        delete curSchema.$$parentEditorItem;
        delete curSchema.$$key;
    };

    while (eachQueue.length > 0) {
        const curSchema = eachQueue.shift();

        if (curSchema.properties || (curSchema.items && curSchema.items.properties)) {
            // 对象 || 数组内对象
            const curObjNode = curSchema.properties ? curSchema : curSchema.items;

            // 计算当前节点
            const curItem = getUserConfigByViewSchema(curSchema, toolConfigList);

            // 关联父子
            (getChildList(curSchema)).push(curItem);
            deleteAdditionalData(curSchema);

            // 处理子节点
            const properties = Object.keys(curObjNode.properties);
            const orderedProperties = formUtils.orderProperties(properties, curObjNode['ui:order']);

            // 直接扩展当前节点了
            const childSchema = orderedProperties.map(item => ({
                $$parentEditorItem: curItem,
                $$key: item,
                ...curObjNode.properties[item],
                'ui:required': curObjNode.required && curObjNode.required.includes(item)
            }));

            eachQueue = [...eachQueue, ...childSchema];
        } else {
            // 计算当前节点
            const curItem = getUserConfigByViewSchema(curSchema, toolConfigList);

            // 关联父子
            if (curItem) {
                (getChildList(curSchema)).push(curItem);
            }
            deleteAdditionalData(curSchema);
        }
    }

    const formConfig = {};
    if (formFooter) formConfig.formFooter = formFooter;
    if (formProps) {
        formConfig.formProps = {
            ...formProps,
            ...formProps.labelWidth ? {
                labelWidth: deFormatFormLabelWidth(formProps.labelWidth)
            } : {}
        };
    }

    return {
        componentList: componentList[0].childList,
        errorNode,
        formConfig
    };
}
