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

        let defaultFileList = attrs.fileList;
        // 优先使用 fileList 参数，否则使用 value 计算
        if (!defaultFileList || defaultFileList.length === 0) {
            defaultFileList = isArrayValue ? curModelValue.map((item, index) => ({
                uid: String(index),
                status: 'done',
                name: `已上传文件（${index + 1}）`,
                url: item
            })) : [{
                uid: '1',
                status: 'done',
                name: '已上传文件',
                url: curModelValue
            }];
        }


        // fileList
        const fileListRef = ref(defaultFileList);

        const emitValue = (emitFileList) => {
            // v-model
            let curValue;

            const geUrl = fileItem => (
                fileItem
                && ((fileItem.response && props.responseFileUrl(fileItem.response)) || fileItem.url))
                || '';

            if (isArrayValue) {
                curValue = emitFileList.length ? emitFileList.reduce((pre, item) => {
                    const url = geUrl(item);
                    if (url) pre.push(url);
                    return pre;
                }, []) : [];
            } else {
                const fileItem = emitFileList[emitFileList.length - 1];
                curValue = geUrl(fileItem);
                fileListRef.value = curValue ? [fileItem] : [];
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
