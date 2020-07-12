/**
 * Created by Liu.Jun on 2020/4/20 9:55 下午.
 */

import FIELDS_MAP from '../../config/FIELDS_MAP';
import { getUiField, isSelect } from '../../common/formUtils';
import { nodePath2ClassName } from '../../common/vueUtils';
import retrieveSchema from '../../common/schema/retriev';
import vueProps from '../props';

export default {
    name: 'SchemaField',
    props: vueProps,
    functional: true,
    render(h, context) {
        const props = context.props;
        const { rootSchema } = props;

        // 检索当前schema 节点 （）
        // todo: 不需要 anyOf oneOf 可以不传递 formData 参数，避免被getter捕获到依赖
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
        const fieldComponent = getUiField(curProps);

        // hidden 可以通过如下2种任意一种配置
        const isHiddenWidget = props.uiSchema['ui:widget'] === 'HiddenWidget'
            || props.uiSchema['ui:widget'] === 'hidden';

        // functional 渲染多节点
        const renderList = [];

        const pathClassName = nodePath2ClassName(context.props.curNodePath);

        if (schema.anyOf && schema.anyOf.length > 0 && !isSelect(schema)) {
            // anyOf
            renderList.push(
                h(FIELDS_MAP.anyOf, {
                    class: {
                        [`${pathClassName}-anyOf`]: true,
                        AnyOfField: true
                    },
                    props: curProps
                })
            );
        } else if (schema.oneOf && schema.oneOf.length > 0 && !isSelect(schema)) {
            // oneOf
            renderList.push(
                h(FIELDS_MAP.oneOf, {
                    class: {
                        [`${pathClassName}-oneOf`]: true,
                        OneOfField: true
                    },
                    props: curProps
                })
            );
        } else {
            renderList.push(
                // 渲染对应子组件
                fieldComponent && h(isHiddenWidget ? 'div' : fieldComponent, {
                    props: {
                        ...curProps
                    },
                    class: {
                        ...context.data.class,
                        [fieldComponent.name || fieldComponent]: true,
                        HiddenWidget: isHiddenWidget,
                        [pathClassName]: true
                    }
                })
            );
        }

        return renderList;
    }
};
