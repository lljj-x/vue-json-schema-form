/**
 * Created by Liu.Jun on 2019/11/29 11:27.
 */

import SchemaElementForm from '../../SchemaElementForm';

export default function (schema, {
    formFooter,
    uiSchema,
    errorSchema,
} = {}) {

    // 保持props和formData数据相同
    // 主要是为了保证同步、异步组件都使用props传入参数，直接作为data的值
    return {
        name: 'ElementFromWrap',
        render(h) {
            const self = this;
            return h(
                SchemaElementForm,
                {
                    // 对组件传入 scope slot
                    scopedSlots: this.$scopedSlots,
                    props: {
                        schema,
                        formFooter,
                        uiSchema,
                        errorSchema,
                        ...self.$attrs
                    },
                    on: self.$listeners,
                }
            );
        }
    };
}
