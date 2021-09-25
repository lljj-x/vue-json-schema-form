/**
 * Created by Liu.Jun on 2020/5/19 10:15 下午.
 */


import { ref, watch, h } from 'vue';
import {
    getPathVal, setPathVal, deletePathVal, nodePath2ClassName
} from '@lljj/vjsf-utils/vue3Utils';
import {
    isEmptyObject, filterObject, isObject, getSchemaType
} from '@lljj/vjsf-utils/utils';

import {
    getWidgetConfig, getUiOptions, getUserErrOptions
} from '@lljj/vjsf-utils/formUtils';

import retrieveSchema from '@lljj/vjsf-utils/schema/retriev';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { getMatchingOption } from '@lljj/vjsf-utils/schema/validate';

import vueProps from '../../props';
import Widget from '../../../components/Widget';
import SchemaField from '../../SchemaField';

export default {
    name: 'SelectLinkageField',
    props: {
        ...vueProps,
        combiningType: {
            type: String,
            default: 'anyOf' // anyOf oneOf
        },
        selectList: {
            type: Array,
            require: true
        }
    },
    setup(props) {
        const computedCurSelectIndexByFormData = (formData) => {
            const index = getMatchingOption(formData, props.selectList, props.rootSchema, true);
            return index || 0;
        };

        // 当前选中 option 项
        const curSelectIndex = ref(computedCurSelectIndexByFormData(getPathVal(props.rootFormData, props.curNodePath)));

        // 下拉选项 VNode
        const getSelectBoxVNode = () => {
            // 下拉选项参数
            const selectWidgetConfig = getWidgetConfig({
                schema: props.schema[`${props.combiningType}Select`] || {}, // 扩展 oneOfSelect,anyOfSelect字段
                uiSchema: props.uiSchema[`${props.combiningType}Select`] || {}, // 通过 uiSchema['oneOf'] 配置ui信息
                curNodePath: props.curNodePath,
                rootFormData: props.rootFormData,
            }, () => ({
                // 枚举参数
                widget: 'SelectWidget'
            }));

            // title description 回退到 schema 配置，但这里不使用 uiSchema配置
            // select ui配置需要使用 (oneOf|anyOf)Select
            selectWidgetConfig.label = selectWidgetConfig.label || props.schema.title;
            selectWidgetConfig.description = selectWidgetConfig.description || props.schema.description;

            // 下拉列表枚举值
            if (!selectWidgetConfig.uiProps.enumOptions) {
                const uiSchemaSelectList = props.uiSchema[props.combiningType] || [];
                selectWidgetConfig.uiProps.enumOptions = props.selectList.map((option, index) => {
                    const curUiOptions = getUiOptions({
                        schema: option,
                        uiSchema: uiSchemaSelectList[index],
                        containsSpec: false,
                        // curNodePath: props.curNodePath,
                        // rootFormData: props.rootFormData,
                    });
                    return {
                        label: curUiOptions.title || `选项 ${index + 1}`,
                        value: index,
                    };
                });
            }

            // oneOf option 渲染
            // 选择框 VNode
            return h(
                Widget,
                {
                    key: `fieldSelect_${props.combiningType}`,
                    class: {
                        [`fieldSelect_${props.combiningType}`]: true
                    },
                    isFormData: false,
                    curValue: curSelectIndex.value,
                    globalOptions: props.globalOptions,
                    ...selectWidgetConfig,
                    onOtherDataChange: (event) => {
                        curSelectIndex.value = event;
                    }
                }
            );
        };

        // 对象 切换了select
        // 如果object 类型 option有添加属性 这里做移除
        // 对新option计算默认值
        watch(curSelectIndex, (newVal, oldVal) => {
            const curFormData = getPathVal(props.rootFormData, props.curNodePath);

            // 计算出 新选项默认值
            const newOptionData = getDefaultFormState(props.selectList[newVal], undefined, props.rootSchema);

            const hasOwn = Object.prototype.hasOwnProperty;

            // 移除旧key
            if (isObject(curFormData)) {
                const oldSelectSchema = retrieveSchema(
                    props.selectList[oldVal],
                    props.rootSchema
                );
                if (getSchemaType(oldSelectSchema) === 'object') {
                    // 移除旧schema添加的属性
                    // Object.keys(oldSelectSchema.properties)
                    for (const key in oldSelectSchema.properties) {
                        if (
                            hasOwn.call(oldSelectSchema.properties, key)
                            && !hasOwn.call(newOptionData, key)
                        ) {
                            deletePathVal(curFormData, key);
                        }
                    }
                }
            }

            // 设置新值
            if (isObject(newOptionData)) {
                Object.entries(newOptionData).forEach(([key, value]) => {
                    if (
                        value !== undefined
                        && (
                            curFormData[key] === undefined
                            || props.selectList[newVal].properties[key].const !== undefined
                            || isObject(value)
                        )
                    ) {
                        // 这里没找到一个比较合理的新旧值合并方式
                        //
                        // 1. 如果anyOf里面同名属性中的schema包含了 const 配置，产生了新的值这里做覆盖处理
                        // 2. 其它场景保留同名key的旧的值
                        setPathVal(curFormData, key, value);
                    }
                });
            } else {
                setPathVal(props.rootFormData, props.curNodePath, newOptionData || curFormData);
            }
        });

        return () => {
            const { curNodePath } = props;
            const pathClassName = nodePath2ClassName(curNodePath);

            // is object
            const isTypeObject = (props.schema.type === 'object' || props.schema.properties);

            // 选择附加的节点
            const childrenVNodeList = [getSelectBoxVNode()];

            // 当前option内容
            let curSelectSchema = props.selectList[curSelectIndex.value];

            // 当前选中节点合并schema
            if (curSelectSchema) {
                // 覆盖父级的属性
                const {
                    // eslint-disable-next-line no-unused-vars
                    properties,
                    // eslint-disable-next-line no-unused-vars
                    [props.combiningType]: combiningType,
                    // eslint-disable-next-line no-unused-vars
                    [`${props.combiningType}Select`]: combiningTypeSelect,
                    ...parentSchema
                } = props.schema;

                curSelectSchema = Object.assign({}, parentSchema, curSelectSchema);
            }

            // object类型但没有附加属性
            const isObjectEmptyAttachProperties = isTypeObject && isEmptyObject(curSelectSchema && curSelectSchema.properties);

            if (curSelectSchema && !isObjectEmptyAttachProperties) {
                // 当前节点的ui err配置，用来支持所有选项的统一配置
                // 取出 oneOf anyOf 同级配置，然后再合并到 当前选中的schema中
                const userUiOptions = filterObject(getUiOptions({
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    containsSpec: false,
                    curNodePath,
                    rootFormData: props.rootFormData,
                }), key => (key === props.combiningType ? undefined : `ui:${key}`));

                const userErrOptions = filterObject(getUserErrOptions({
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema
                }), key => (key === props.combiningType ? undefined : `err:${key}`));

                childrenVNodeList.push(
                    h(
                        SchemaField,
                        {
                            key: `appendSchema_${props.combiningType}`,
                            ...props,
                            schema: {
                                'ui:showTitle': false, // 默认不显示title
                                'ui:showDescription': false, // 默认不显示描述
                                ...curSelectSchema,
                            },
                            required: props.required,
                            uiSchema: {
                                ...userUiOptions, // 合并oneOf 级的配置
                                ...((props.uiSchema[props.combiningType] || [])[curSelectIndex.value])
                            },
                            errorSchema: {
                                ...userErrOptions, // 合并oneOf 级的配置
                                ...((props.errorSchema[props.combiningType] || [])[curSelectIndex.value])
                            },
                            // needValidFieldGroup: false // 单独校验，这里无需处理
                        }
                    )
                );
            }

            // object 需要保持原有属性，如果存在原有属性这里单独渲染
            let originVNode = null;
            if (isTypeObject && !isEmptyObject(props.schema.properties)) {
                const {
                    // eslint-disable-next-line no-unused-vars
                    title, description, properties, ...optionSchema
                } = curSelectSchema;

                // object 原始项渲染也需要合并anyOf的内容
                const origSchema = Object.assign({}, props.schema, optionSchema);
                delete origSchema[props.combiningType];

                originVNode = h(SchemaField, {
                    key: `origin_${props.combiningType}`,
                    class: {
                        [`${props.combiningType}_originBox`]: true,
                        [`${pathClassName}-originBox`]: true
                    },
                    ...props,
                    schema: origSchema,
                    // needValidFieldGroup: false // 单独校验，这里无需处理
                });
            }

            // oneOf 校验 VNode
            childrenVNodeList.push(
                h(Widget, {
                    key: `validateWidget-${props.combiningType}`,
                    class: {
                        validateWidget: true,
                        [`validateWidget-${props.combiningType}`]: true
                    },
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema,
                    curNodePath: props.curNodePath,
                    rootFormData: props.rootFormData,
                    globalOptions: props.globalOptions
                })
            );

            return h('div', [
                originVNode,
                h('div', {
                    key: `appendBox_${props.combiningType}`,
                    class: {
                        appendCombining_box: true,
                        [`${props.combiningType}_appendBox`]: true,
                        [`${pathClassName}-appendBox`]: true
                    }
                }, childrenVNodeList)
            ]);
        };
    }
};
