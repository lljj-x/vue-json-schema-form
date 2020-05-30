/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import {
    orderProperties,
    getUiOptions
} from '../../common/formUtils';

import { ADDITIONAL_PROPERTY_FLAG } from '../../common/schema/retriev';

import FieldGroupWrap from '../../fieldComponents/FieldGroupWrap';
import vueProps from '../props';

import Widget from '../../fieldComponents/Widget';

// eslint-disable-next-line import/no-cycle
import SchemaField from '../SchemaField';

export default {
    name: 'ObjectField',
    props: {
        ...vueProps
    },
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
                    [
                        ...propertiesVNodeList,

                        // 插入一个Widget，校验 object组 - minProperties. maxProperties. oneOf 等需要外层校验的数据
                        this.needValidFieldGroup ? h(Widget, {
                            class: {
                                validateWidget: true,
                                validateWidget_object: true
                            },
                            props: {
                                schema: Object.entries(self.$props.schema).reduce((preVal, [key, value]) => {
                                    if (key !== 'properties') preVal[key] = value;
                                    return preVal;
                                }, {}),
                                errorSchema: this.errorSchema,
                                curNodePathArr: props.curNodePathArr,
                                rootFormData: this.rootFormData
                            }
                        }) : null
                    ]
                )
            ]
        );
    }
};
