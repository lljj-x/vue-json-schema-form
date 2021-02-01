/**
 * Created by Liu.Jun on 2020/4/24 16:47.
 */

import {
    IconCaretUp, IconCaretDown, IconClose, IconPlus
} from '@lljj/vjsf-utils/icons';
import { h, computed } from 'vue';

// 支持数字排序 ，新增 ，删除等操作
export default {
    name: 'ArrayOrderList',
    emits: ['arrayOperate'],
    props: {
        // 需要被排序的VNode list
        vNodeList: {
            type: Array,
            default: []
        },
        // tuple类型的数组，需要固定前值
        tupleItemsLength: {
            type: Number,
            default: 0
        },
        addable: {
            // 是否启用添加
            type: Boolean,
            default: true
        },
        showIndexNumber: {
            // 是否显示当前序号
            type: Boolean,
            default: false
        },
        sortable: {
            // 是否可排序
            type: Boolean,
            default: true
        },
        removable: {
            // 是否可移除
            type: Boolean,
            default: true
        },
        maxItems: {
            // 最多添加个数
        },
        minItems: {
            // 最少添加个数
        },
        globalOptions: null
    },
    setup(props, { emit }) {
        // 是否可添加
        const canAdd = computed(() => {
            const { addable, maxItems, vNodeList } = props;
            // 配置不可添加
            if (!addable) return false;

            // 配置了最大个数
            if (maxItems !== undefined) {
                return vNodeList.length < maxItems;
            }
            return true;
        });

        // 是否可移除
        const canRemove = computed(() => {
            const { removable, minItems, vNodeList } = props;
            // 配置不可移除
            if (!removable) return false;

            if (minItems !== undefined) {
                return vNodeList.length > minItems;
            }

            return true;
        });

        return () => {
            // 没有数据，且不能添加不渲染该组件
            if (props.vNodeList.length <= 0 && !props.addable) return null;

            // 是否可继续添加元素
            return h(
                'div',
                {
                    class: {
                        arrayOrderList: true
                    }
                },
                props.vNodeList.map(({ key, vNode: VNodeItem }, index) => {
                    const trueIndex = props.tupleItemsLength + index;
                    const indexNumber = index + 1;
                    return h(
                        'div',
                        {
                            key,
                            class: {
                                arrayOrderList_item: true
                            }
                        },
                        [
                            props.showIndexNumber ? h('div', {
                                class: {
                                    arrayListItem_index: true
                                }
                            }, indexNumber) : null,
                            h(
                                'div',
                                {
                                    class: {
                                        arrayListItem_operateTool: true
                                    }
                                },
                                [
                                    h(
                                        'button',
                                        {
                                            // 配置不可排序不显示排序按钮
                                            style: {
                                                ...(!props.sortable ? {
                                                    display: 'none'
                                                } : {})
                                            },
                                            class: {
                                                arrayListItem_btn: true,
                                                'arrayListItem_orderBtn-top': true
                                            },
                                            type: 'button',
                                            disabled: !props.sortable || index === 0,
                                            onClick: () => {
                                                emit('arrayOperate', {
                                                    command: 'moveUp',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        },
                                        [h(IconCaretUp)]
                                    ),
                                    h(
                                        'button',
                                        {
                                            // 配置不可排序不显示排序按钮
                                            style: {
                                                ...(!props.sortable ? {
                                                    display: 'none'
                                                } : {})
                                            },
                                            class: {
                                                arrayListItem_btn: true,
                                                'arrayListItem_orderBtn-bottom': true
                                            },

                                            type: 'button',
                                            disabled: !props.sortable || index === props.vNodeList.length - 1,
                                            onClick: () => {
                                                emit('arrayOperate', {
                                                    command: 'moveDown',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        },
                                        [h(IconCaretDown)]
                                    ),
                                    h(
                                        'button',
                                        {
                                            // 配置不可移除不显示移除按钮
                                            style: {
                                                ...(!props.removable ? {
                                                    display: 'none'
                                                } : {})
                                            },
                                            class: {
                                                arrayListItem_btn: true,
                                                'arrayListItem_btn-delete': true
                                            },
                                            type: 'button',
                                            disabled: !canRemove.value,
                                            onClick: () => {
                                                emit('arrayOperate', {
                                                    command: 'remove',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        },
                                        [h(IconClose)]
                                    )
                                ]
                            ),
                            h(
                                'div',
                                {
                                    class: {
                                        arrayListItem_content: true
                                    }
                                },
                                [VNodeItem]
                            )
                        ]
                    );
                }).concat([
                    h(
                        'p',
                        {
                            style: {
                                ...(!canAdd.value ? {
                                    display: 'none'
                                } : {})
                            },
                            class: {
                                arrayOrderList_bottomAddBtn: true,
                            }
                        },
                        [
                            h(
                                'button',
                                {
                                    class: {
                                        bottomAddBtn: true,
                                        'is-plain': true,
                                        genFormBtn: true
                                    },
                                    type: 'button',
                                    onClick: () => {
                                        emit('arrayOperate', {
                                            command: 'add'
                                        });
                                    }
                                },
                                [
                                    h(IconPlus, {
                                        style: { marginRight: '5px' }
                                    }),
                                    props.maxItems ? `( ${props.vNodeList.length} / ${props.maxItems} )` : ''
                                ]
                            ),
                        ]
                    ),
                ])
            );
        };

    }
};
