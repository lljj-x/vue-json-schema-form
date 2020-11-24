/**
 * Created by Liu.Jun on 2020/5/19 10:15 下午.
 */

import {
    getPathVal, setPathVal, deletePathVal, nodePath2ClassName
} from '../../../common/vueUtils';
import {
    isEmptyObject, filterObject, guessType, isObject
} from '../../../common/utils';

import {
    getWidgetConfig, getUiOptions, getUserErrOptions
} from '../../../common/formUtils';

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
        const curSelectIndex = this.computedCurSelectIndexByFormData(getPathVal(this.rootFormData, this.curNodePath));
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
        },

        // 下拉选项 Vnode
        getSelectBoxVnode() {
            // 下拉选项参数
            const selectWidgetConfig = getWidgetConfig({
                schema: this.schema[`${this.combiningType}Select`] || {}, // 扩展 oneOfSelect,anyOfSelect字段
                uiSchema: this.uiSchema[`${this.combiningType}Select`] || {}, // 通过 uiSchema['oneOf'] 配置ui信息
                curNodePath: this.curNodePath,
                rootFormData: this.rootFormData,
            }, () => ({
                // 枚举参数
                widget: 'SelectWidget'
            }));

            // title description 回退到 schema 配置，但这里不使用 uiSchema配置
            // select ui配置需要使用 (oneOf|anyOf)Select
            selectWidgetConfig.label = selectWidgetConfig.label || this.schema.title;
            selectWidgetConfig.description = selectWidgetConfig.description || this.schema.description;

            // 下拉列表枚举值
            if (!selectWidgetConfig.uiProps.enumOptions) {
                const uiSchemaSelectList = this.uiSchema[this.combiningType] || [];
                selectWidgetConfig.uiProps.enumOptions = this.selectList.map((option, index) => {
                    const curUiOptions = getUiOptions({
                        schema: option,
                        uiSchema: uiSchemaSelectList[index],
                        containsSpec: false,
                        // curNodePath: this.curNodePath,
                        // rootFormData: this.rootFormData,
                    });
                    return {
                        label: curUiOptions.title || `选项 ${index + 1}`,
                        value: index,
                    };
                });
            }

            // oneOf option 渲染
            // 选择框 vnode
            return this.$createElement(
                Widget,
                {
                    key: `fieldSelect_${this.combiningType}`,
                    class: {
                        [`fieldSelect_${this.combiningType}`]: true
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
        }
    },
    watch: {
        // 对象 切换了select
        // 如果object 类型 option有添加属性 这里做移除
        // 对新option计算默认值
        curSelectIndex(newVal, oldVal) {
            const curFormData = getPathVal(this.rootFormData, this.curNodePath);

            // 移除旧key
            if (isObject(curFormData)) {
                const oldSelectSchema = retrieveSchema(
                    this.selectList[oldVal],
                    this.rootSchema
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
                    setPathVal(curFormData, key, value);
                });
            } else {
                setPathVal(this.rootFormData, this.curNodePath, newOptionValue || curFormData);
            }
        }
    },
    render(h) {
        const { curNodePath } = this.$props;
        const pathClassName = nodePath2ClassName(curNodePath);

        // object 需要保持原有属性，如果存在原有属性这里单独渲染
        let originVnode = null;
        const isTypeObject = (this.schema.type === 'object' || this.schema.properties);
        if (isTypeObject && !isEmptyObject(this.schema.properties)) {
            const origSchema = Object.assign({}, this.schema);
            delete origSchema[this.combiningType];

            originVnode = h(SchemaField, {
                key: `origin_${this.combiningType}`,
                class: {
                    [`${this.combiningType}_originBox`]: true,
                    [`${pathClassName}-originBox`]: true
                },
                props: {
                    ...this.$props,
                    schema: origSchema,
                    // needValidFieldGroup: false // 单独校验，这里无需处理
                }
            });
        }

        // 选择附加的节点
        const childrenVnodeList = [this.getSelectBoxVnode()];

        // 当前选中的 oneOf 附加的节点
        let curSelectSchema = this.selectList[this.curSelectIndex];
        if (curSelectSchema) {
            // 覆盖父级的属性
            const {
                // eslint-disable-next-line no-unused-vars
                properties,
                // eslint-disable-next-line no-unused-vars
                [this.combiningType]: combiningType,
                // eslint-disable-next-line no-unused-vars
                [`${this.combiningType}Select`]: combiningTypeSelect,
                ...parentSchema
            } = this.schema;

            curSelectSchema = Object.assign({}, parentSchema, curSelectSchema);

            // 当前节点的ui err配置，用来支持所有选项的统一配置
            // 取出 oneOf anyOf 同级配置，然后再合并到 当前选中的schema中
            const userUiOptions = filterObject(getUiOptions({
                schema: this.schema,
                uiSchema: this.uiSchema,
                containsSpec: false,
                curNodePath,
                rootFormData: this.rootFormData,
            }), key => (key === this.combiningType ? undefined : `ui:${key}`));

            const userErrOptions = filterObject(getUserErrOptions({
                schema: this.schema,
                uiSchema: this.uiSchema,
                errorSchema: this.errorSchema
            }), key => (key === this.combiningType ? undefined : `err:${key}`));

            childrenVnodeList.push(
                h(
                    SchemaField,
                    {
                        key: `appendSchema_${this.combiningType}`,
                        props: {
                            ...this.$props,
                            schema: {
                                'ui:showTitle': false, // 默认不显示title
                                'ui:showDescription': false, // 默认不显示描述
                                ...curSelectSchema,
                            },
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
        childrenVnodeList.push(
            h(Widget, {
                class: {
                    validateWidget: true,
                    [`validateWidget-${this.combiningType}`]: true
                },
                props: {
                    schema: this.schema,
                    uiSchema: this.uiSchema,
                    errorSchema: this.errorSchema,
                    curNodePath: this.curNodePath,
                    rootFormData: this.rootFormData,
                }
            })
        );

        return h('div', [
            originVnode,
            h('div', {
                key: `appendBox_${this.combiningType}`,
                class: {
                    appendCombining_box: true,
                    [`${this.combiningType}_appendBox`]: true,
                    [`${pathClassName}-appendBox`]: true
                }
            }, childrenVnodeList)
        ]);
    }
};
