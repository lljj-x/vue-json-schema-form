/**
 * Created by Liu.Jun on 2020/11/26 10:01 下午.
 */

import { h, ref, getCurrentInstance } from 'vue';
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
    setup(props, { attrs, emit }) {
        // 设置默认 fileList
        const curModelValue = props.modelValue;
        const isArrayValue = Array.isArray(curModelValue);

        let defaultFileList = attrs.fileList;
        // 优先使用 fileList 参数，否则使用 value 计算
        if (!defaultFileList || defaultFileList.length === 0) {
            defaultFileList = isArrayValue ? curModelValue.map((item, index) => ({
                name: `已上传文件（${index + 1}）`,
                url: item
            })) : [{
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
            }

            emit('update:modelValue', curValue);
        };

        const globalProperties = getCurrentInstance().appContext.config.globalProperties;

        return () => {
            const data = {
                fileList: fileListRef.value,
                'on-exceed': () => {
                    if (globalProperties.$message) {
                        globalProperties.$message.warning('超出文件上传数');
                    }
                },
                'on-error': () => {
                    if (globalProperties.$message) {
                        globalProperties.$message.error('文件上传失败');
                    }
                },
                ...attrs,
                'on-remove': (file, fileList) => {
                    emitValue(fileList);
                    if (attrs['on-remove']) {
                        attrs['on-remove'](file, fileList);
                    }
                },
                'on-success': (response, file, fileList) => {
                    emitValue(fileList);
                    // 用户注册的 onSuccess
                    if (attrs['on-success']) {
                        attrs['on-success'](response, file, fileList);
                    }
                }
            };

            if (!isArrayValue) data.limit = 1;

            const childVNode = {
                default: () => h(
                    resolveComponent('el-button'),
                    {
                        type: 'primary'
                    },
                    {
                        default: () => props.btnText
                    }
                ),
                ...(props.slots || {}),
            };

            return h(resolveComponent('el-upload'), data, childVNode);
        };
    }
};
