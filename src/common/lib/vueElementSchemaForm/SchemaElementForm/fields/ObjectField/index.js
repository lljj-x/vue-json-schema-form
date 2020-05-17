/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import {
    orderProperties,
    ADDITIONAL_PROPERTY_FLAG,
    getUiOptions
} from '../../common/schemaUtils';

import FieldGroupWrap from '../../fieldComponents/FieldGroupWrap';
import vueProps from '../props';

// eslint-disable-next-line import/no-cycle
import SchemaField from '../SchemaField';

export default {
    name: 'ObjectField',
    props: vueProps,
    methods: {
        isRequired(name) {
            const schema = this.schema;
            return Array.isArray(schema.required) && !!~schema.required.indexOf(name);
        }
    },
    render(h) {
        const self = this;
        const props = this.$props;
        const {
            schema,
            uiSchema,
            errorSchema,
        } = props;

        const properties = Object.keys(schema.properties || {});
        const orderedProperties = orderProperties(properties, uiSchema['ui:order']);

        const propertiesVNodeList = orderedProperties.map((name) => {
            const addedByAdditionalProperties = schema.properties[name].hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);

            // 递归参数
            return h(
                SchemaField,
                {
                    props: {
                        ...props,
                        schema: schema.properties[name],
                        uiSchema: addedByAdditionalProperties ? uiSchema.additionalProperties : uiSchema[name],
                        errorSchema: errorSchema[name],
                        required: self.isRequired(name),
                        curNodePathArr: props.curNodePathArr.concat(name)
                    }
                }
            );
        });

        const { title, description } = getUiOptions({
            schema,
            uiSchema
        });

        // debugger;
        return h(
            FieldGroupWrap,
            {

                class: {
                    ObjectFieldWrap: true
                },
                props: {
                    title,
                    description,
                },
            },
            [
                h(
                    'template',
                    {
                        slot: 'default'
                    },
                    propertiesVNodeList
                )
            ]
        );
    }
};
