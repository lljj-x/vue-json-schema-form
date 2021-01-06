/**
 * Created by Liu.Jun on 2020/5/19 9:49 下午.
 */

import SelectLinkageField from '../SelectLinkageField';

export default {
    name: 'oneOfField',
    functional: true,
    render(h, context) {
        const { props, ...otherData } = context.data;
        return h(SelectLinkageField, {
            ...otherData,
            props: {
                ...props,
                combiningType: 'oneOf',
                selectList: props.schema.oneOf
            }
        }, context.children);
    }
};
