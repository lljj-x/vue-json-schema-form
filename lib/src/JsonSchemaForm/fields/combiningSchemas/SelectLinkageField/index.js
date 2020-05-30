/**
 * Created by Liu.Jun on 2020/5/19 10:15 下午.
 */

import { getPathVal, setPathVal, deletePathVal } from '../../../common/vueUtils';
import { isEmptyObject, filterObject, guessType } from '../../../common/utils';

import { getWidgetConfig, getUserUiOptions, getUserErrOptions } from '../../../common/formUtils';

import retrieveSchema from '../../../common/schema/retriev';
import getDefaultFormState from '../../../common/schema/getDefaultFormState';
import { getMatchingOption } from '../../../common/schema/validate';

import vueProps from '../../props';
import Widget from '../../../fieldComponents/Widget';
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
    data() {
        const curSelectIndex = this.computedCurSelectIndexByFormData(getPathVal(this.rootFormData, this.curNodePathArr));
        return {
            curSelectIndex
        };
    },
    methods: {
        computedCurSelectIndexByFormData(formData) {
            const index = getMatchingOption(formData, this.selectList, this.rootSchema);
            if (index !== 0) return index;

            // 找不到默认等于原本的值
            return this.curSelectIndex || 0;
        }
    },
    watch: {
        // 对象 切换了select
        // 如果object 类型 option有添加属性 这里做移除
        // 对新option计算默认值
        curSelectIndex(newVal, oldVal) {
            const curFormData = getPathVal(this.rootFormData, this.curNodePathArr);

            // 移除旧key
            if (guessType(curFormData) === 'object') {
                const oldSelectSchema = retrieveSchema(
                    this.selectList[oldVal],
                    this.rootSchema,
                    curFormData
                );
                if (oldSelectSchema.type === 'object' || oldSelectSchema.properties) {
                    // 移除旧schema添加的属性
                    // Object.keys(oldSelectSchema.properties)
                    for (const key in oldSelectSchema.properties) {
                        if (Object.prototype.hasOwnProperty.call(oldSelectSchema.properties, key)) {
                            deletePathVal(curFormData, key);
                            // delete curFormData[key];
                        }
                    }
                }
            }

            // 设置新值
            const newOptionValue = getDefaultFormState(this.selectList[newVal], undefined, this.rootSchema);
            if (guessType(newOptionValue) === 'object') {
                Object.entries(newOptionValue).forEach(([key, value]) => {
                    setPathVal(curFormData, [key], value);
                });
            } else {
                setPathVal(this.rootFormData, this.curNodePathArr, newOptionValue || curFormData);
            }
        }
    },
    render(h) {
        // 下拉选项参数
        const selectWidgetConfig = getWidgetConfig({
            schema: {}, // 所有参数直接通过 uiSchema获取
            uiSchema: this.uiSchema[`${this.combiningType}Select`] || {} // 通过 uiSchema['oneOf'] 配置ui信息
        }, () => ({
            // 枚举参数
            widget: 'SelectWidget'
        }));

        const uiSchemaSelectList = this.uiSchema[this.combiningType] || [];
        selectWidgetConfig.uiProps.enumOptions = this.selectList.map((option, index) => ({
            label: (uiSchemaSelectList[index] && uiSchemaSelectList[index]['ui:title']) || option.title || `选项 ${index + 1}`,
            value: index,
        }));

        // 选择框 vnode
        const selectVnode = h(
            Widget,
            {
                class: {
                    [`FieldSelect_${this.combiningType}`]: true
                },
                props: {
                    isFormData: false,
                    curValue: this.curSelectIndex,
                    ...selectWidgetConfig
                },
                on: {
                    onChange: (event) => {
                        this.curSelectIndex = event;
                    }
                }
            }
        );

        let originVnode = null;
        const childrenVnode = [selectVnode];

        // object 需要保持原有属性，如果存在原有属性这里单独渲染
        const isTypeObject = (this.schema.type === 'object' || this.schema.properties);
        if (isTypeObject && !isEmptyObject(this.schema.properties)) {
            const origSchema = Object.assign({}, this.schema);
            delete origSchema[this.combiningType];

            originVnode = h(SchemaField, {
                class: {
                    [`${this.combiningType}_origin`]: true
                },
                props: {
                    ...this.$props,
                    schema: origSchema,
                    // needValidFieldGroup: false // 单独校验，这里无需处理
                }
            });
        }

        // 当前选中的oneOf vnode
        // oneOf option 渲染
        let curSelectSchema = this.selectList[this.curSelectIndex];
        if (curSelectSchema) {
            // 覆盖父级的属性
            curSelectSchema = Object.assign({}, this.schema, curSelectSchema);
            delete curSelectSchema[this.combiningType];

            // 当前节点的ui err配置
            const userUiOptions = filterObject(getUserUiOptions(this.uiSchema), key => (key === this.combiningType ? undefined : `ui:${key}`));
            const userErrOptions = filterObject(getUserErrOptions(this.errorSchema), key => (key === this.combiningType ? undefined : `err:${key}`));

            childrenVnode.push(
                h(
                    SchemaField,
                    {
                        props: {
                            ...this.$props,
                            schema: curSelectSchema,
                            required: this.required,
                            uiSchema: {
                                ...userUiOptions, // 合并oneOf 级的配置
                                ...((this.uiSchema[this.combiningType] || [])[this.curSelectIndex])
                            },
                            errorSchema: {
                                ...userErrOptions, // 合并oneOf 级的配置
                                ...((this.errorSchema[this.combiningType] || [])[this.curSelectIndex])
                            },
                            // needValidFieldGroup: false // 单独校验，这里无需处理
                        }
                    }
                )
            );
        }

        // oneOf 校验 vnode
        childrenVnode.push(
            h(Widget, {
                class: {
                    validateWidget: true,
                    [`validateWidget_${this.combiningType}`]: true
                },
                props: {
                    schema: this.schema,
                    errorSchema: this.errorSchema,
                    curNodePathArr: this.curNodePathArr,
                    rootFormData: this.rootFormData,
                }
            })
        );

        return h('div', [
            originVnode,
            h('div', {
                class: {
                    AppendCombining_box: true,
                    [`${this.combiningType}_AppendCombining`]: true
                }
            }, [childrenVnode])
        ]);
    }
};
