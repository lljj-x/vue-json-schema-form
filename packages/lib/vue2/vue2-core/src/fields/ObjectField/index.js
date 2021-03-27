/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import { orderProperties, getUiOptions } from '@lljj/vjsf-utils/formUtils';
import { computedCurPath, getPathVal } from '@lljj/vjsf-utils/vueUtils';
import { isObject } from '@lljj/vjsf-utils/utils';
import FieldGroupWrap from '@lljj/vjsf-utils/components/FieldGroupWrap';
import vueProps from '../props';
import Widget from '../../components/Widget';

// eslint-disable-next-line import/no-cycle
import SchemaField from '../SchemaField';

export default {
    name: 'ObjectField',
    functional: true,
    props: vueProps,
    render(h, context) {
        const {
            schema,
            uiSchema,
            errorSchema,
            needValidFieldGroup,
            curNodePath,
            rootFormData,
            globalOptions
        } = context.props;

        // required
        const isRequired = name => Array.isArray(schema.required) && !!~schema.required.indexOf(name);

        // 存在 dependencies 配置，需要当前属性是否存在依赖关系 和当前属性是否正在被依赖
        // tip: 判断依赖关系需要使用了 formData 的值来做判断，所以当用户输入的时候会触发整个对象树重新渲染
        // TODO: 每个属性都需要单独来遍历 dependencies 属性可以优化一点点点点点（可通过 key value 反转值加个缓存来计算）
        const isDependOn = (name) => {
            let isDependency = false; // 是否是一个被依赖项
            let curDependent = false; // 当前是否触发依赖

            if (isObject(schema.dependencies)) {
                curDependent = Object.entries(schema.dependencies).some(([key, value]) => {

                    // 是否和当前属性存在依赖关系
                    const tempDependency = !!(Array.isArray(value) && ~value.indexOf(name));

                    // 是否是一个被依赖项
                    isDependency = isDependency || tempDependency;

                    // 当前需要依赖
                    return tempDependency && getPathVal(rootFormData, curNodePath)[key] !== undefined;
                });
            }

            return {
                isDependency,
                curDependent
            };
        };

        const {
            title, description, showTitle, showDescription, order, fieldClass, fieldAttrs, fieldStyle, onlyShowIfDependent
        } = getUiOptions({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        });

        const properties = Object.keys(schema.properties || {});
        const orderedProperties = orderProperties(properties, order);

        // 递归参数
        const propertiesVNodeList = orderedProperties.map((name) => {
            const required = isRequired(name);
            const { isDependency, curDependent } = isDependOn(name);

            // onlyShowWhenDependent 只渲染被依赖的属性
            return (isDependency && onlyShowIfDependent && !curDependent) ? null : h(
                SchemaField,
                {
                    key: name,
                    props: {
                        ...context.props,
                        schema: schema.properties[name],
                        uiSchema: uiSchema[name],
                        errorSchema: errorSchema[name],
                        required: required || curDependent,
                        curNodePath: computedCurPath(curNodePath, name)
                    }
                }
            );
        });

        return h(
            FieldGroupWrap,
            {
                props: {
                    title,
                    description,
                    showTitle,
                    showDescription,
                    curNodePath
                },
                class: { ...context.data.class, ...fieldClass },
                attrs: fieldAttrs,
                style: fieldStyle
            },
            [
                h(
                    'template',
                    {
                        slot: 'default'
                    },
                    [
                        ...propertiesVNodeList,

                        // 插入一个Widget，校验 object组 - minProperties. maxProperties. oneOf 等需要外层校验的数据
                        needValidFieldGroup ? h(Widget, {
                            key: 'validateWidget-object',
                            class: {
                                validateWidget: true,
                                'validateWidget-object': true
                            },
                            props: {
                                schema: Object.entries(schema).reduce((preVal, [key, value]) => {
                                    if (
                                        schema.additionalProperties === false
                                        || !['properties', 'id', '$id'].includes(key)
                                    ) preVal[key] = value;
                                    return preVal;
                                }, {}),
                                uiSchema,
                                errorSchema,
                                curNodePath,
                                rootFormData,
                                globalOptions
                            }
                        }) : null
                    ]
                )
            ]
        );
    }
};
