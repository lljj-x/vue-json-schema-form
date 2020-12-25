/**
 * Created by Liu.Jun on 2020/4/20 9:55 下午.
 */

import { getUiField, isSelect, isHiddenWidget } from '@lljj/vjsf-utils/formUtils';
import { nodePath2ClassName } from '@lljj/vjsf-utils/vueUtils';
import { lowerCase } from '@lljj/vjsf-utils/utils';
import retrieveSchema from '@lljj/vjsf-utils/schema/retriev';
import FIELDS_MAP from '../../FIELDS_MAP';
import vueProps from '../props';

export default {
    name: 'SchemaField',
    props: vueProps,
    functional: true,
    render(h, context) {
        const props = context.props;
        const { rootSchema } = props;

        // 目前不支持schema依赖和additionalProperties 展示不需要传递formData
        // const schema = retrieveSchema(props.schema, rootSchema, formData);
        const schema = retrieveSchema(props.schema, rootSchema);

        // 当前参数
        const curProps = {
            ...props,
            schema
        };

        // 空数据
        if (Object.keys(schema).length === 0) {
            return null;
        }

        // 获取节点Ui配置渲染field组件
        const {
            field: fieldComponent,
            fieldProps
        } = getUiField(FIELDS_MAP, curProps);

        // hidden
        const hiddenWidget = isHiddenWidget({
            schema,
            uiSchema: props.uiSchema,
            curNodePath: props.curNodePath,
            rootFormData: props.rootFormData
        });

        const pathClassName = nodePath2ClassName(props.curNodePath);

        if (schema.anyOf && schema.anyOf.length > 0 && !isSelect(schema)) {
            // anyOf
            return h(FIELDS_MAP.anyOf, {
                class: {
                    [`${pathClassName}-anyOf`]: true,
                    fieldItem: true,
                    anyOfField: true
                },
                props: curProps
            });
        } if (schema.oneOf && schema.oneOf.length > 0 && !isSelect(schema)) {
            // oneOf
            return h(FIELDS_MAP.oneOf, {
                class: {
                    [`${pathClassName}-oneOf`]: true,
                    fieldItem: true,
                    oneOfField: true
                },
                props: curProps
            });
        }
        return (fieldComponent && !hiddenWidget) ? h(fieldComponent, {
            props: {
                ...curProps,
                fieldProps
            },
            class: {
                ...context.data.class,
                [lowerCase(fieldComponent.name) || fieldComponent]: true,
                hiddenWidget,
                fieldItem: true,
                [pathClassName]: true
            }
        }) : null;
    }
};
