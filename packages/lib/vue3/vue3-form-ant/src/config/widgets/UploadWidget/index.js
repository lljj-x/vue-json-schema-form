/**
 * Created by Liu.Jun on 2020/11/26 10:01 下午.
 */

import { h, ref } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

// mock
// https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca

export default {
    name: 'UploadWidget',
    props: {
        modelValue: {
            default: null,
            type: [String, Array]
        },
        responseFileUrl: {
            default: () => res => (res ? (res.url || (res.data && res.data.url)) : ''),
            type: [Function]
        },
        btnText: {
            type: String,
            default: '点击上传'
        },
        // 传入 VNode
        slots: {
            type: null,
            default: null
        }
    },
    inheritAttrs: false,
    setup(props, { attrs, emit }) {
        // 设置默认 fileList
        const curModelValue = props.modelValue;
        const isArrayValue = Array.isArray(curModelValue);

        const defaultFileList = attrs.fileList || (() => {
            if (isArrayValue) {
                return curModelValue.map((item, index) => ({
                    uid: String(index),
                    status: 'done',
                    name: `已上传文件（${index + 1}）`,
                    url: item
                }));
            }
            if (curModelValue) {
                return [{
                    uid: '1',
                    status: 'done',
                    name: '已上传文件',
                    url: curModelValue
                }];
            }

            return [];
        })();


        // fileList
        const fileListRef = ref(defaultFileList);

        const getUrl = fileItem => (
            fileItem
            && ((fileItem.response && props.responseFileUrl(fileItem.response)) || fileItem.url))
            || '';

        const emitValue = (emitFileList) => {
            // v-model
            let curValue;

            if (isArrayValue) {
                curValue = emitFileList.length ? emitFileList.reduce((pre, item) => {
                    const url = getUrl(item);
                    if (url) {
                        item.url = url;
                        pre.push(url);
                    }
                    return pre;
                }, []) : [];
            } else {
                const fileItem = emitFileList[emitFileList.length - 1];
                curValue = getUrl(fileItem);
                if (fileItem && curValue) {
                    fileItem.url = curValue;
                    fileListRef.value = [fileItem];
                } else {
                    fileListRef.value = [];
                }
            }

            emit('update:modelValue', curValue);
        };

        return () => h(resolveComponent('a-upload'), {
            ...attrs,
            fileList: fileListRef.value,
            'onUpdate:fileList': function updateFileList(val) {
                fileListRef.value = val;
            },
            onChange(changeData) {
                if (changeData.file.status !== 'uploading') {
                    emitValue(changeData.fileList);
                }

                if (attrs.onChange) {
                    attrs.onChange.call(this, changeData);
                }
            }
        }, {
            default: () => h(
                resolveComponent('a-button'),
                {
                    type: 'primary'
                },
                {
                    default: () => props.btnText
                }
            ),
            ...(props.slots || {}),
        });
    }
};
