<template>
    <el-form-item
        label="（使用 ui:field）收件人地址"
        required
    >
        <Distpicker
            :province="defaultVal.province"
            :city="defaultVal.city"
            :area="defaultVal.area"
            v-bind="fieldProps"
            @selected="onSelected"
        ></Distpicker>
    </el-form-item>
</template>

<script>
    import Distpicker from 'v-distpicker';
    import { fieldProps, vueUtils } from '@lljj/vue-json-schema-form';

    export default {
        name: 'DistpickerField',
        components: {
            Distpicker
        },
        props: {
            // 统一的 field props
            ...fieldProps,

            // 如果配置 ui:fieldProps，这里申明参数
            fieldProps: {
                type: null,
                default: null
            }
        },
        data() {
            return {
                // 默认值只做初始化 不需要响应式
                defaultVal: vueUtils.getPathVal(this.rootFormData, this.curNodePath)

                // 如下：也可以直接读取 rootFormData 的值，但固定了路径就不能通用
                // defaultVal: this.rootFormData.address1
            };
        },
        methods: {
            onSelected(data) {
                const curVal = Object.entries(data).reduce((preVal, [key, {code}]) => {
                    preVal[key] = code;
                    return preVal;
                }, {});

                vueUtils.setPathVal(this.rootFormData, this.curNodePath, curVal);

                // 如下：也可以直接设置 rootFormData 的值，但固定了路径就不能通用
                // this.rootFormData.address1 = curVal;
            }
        }
    };
</script>
