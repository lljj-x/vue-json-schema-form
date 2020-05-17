/**
 * Created by Liu.Jun on 2020/4/20 9:55 下午.
 */

import { retrieveSchema, getUiField } from '../../common/schemaUtils';

import vueProps from '../props';

export default {
    name: 'SchemaField',
    props: vueProps,
    render(h) {
        const props = this.$props;
        const { rootSchema } = props;

        // 检索当前schema 节点 （）
        // todo: 不需要 anyOf oneOf 可以不传递 formData 参数
        // const schema = retrieveSchema(props.schema, rootSchema, formData);
        const schema = retrieveSchema(props.schema, rootSchema);

        // 当前参数
        const curParams = {
            ...props,
            schema
        };

        // 空数据
        if (Object.keys(schema).length === 0) {
            return null;
        }

        // 获取节点Ui配置渲染field组件
        const fieldComponent = getUiField(curParams);

        // 渲染对应子组件
        return h(fieldComponent, {
            props: curParams,
            class: {
                [fieldComponent.name || fieldComponent]: true
            }
        });
    }
};
