/**
 * Created by Liu.Jun on 2020/12/27 9:53 下午.
 */

export default {
    name: 'FormFooter',
    props: {
        okBtn: {
            type: String,
            default: '保存'
        },
        cancelBtn: {
            type: String,
            default: '取消'
        },
        globalOptions: null
    },
    render(h) {
        const self = this;
        const { okBtn, cancelBtn, globalOptions: { COMPONENT_MAP } } = this.$props;

        return h(COMPONENT_MAP.formItem, {
            class: {
                formFooter_item: true
            }
        }, [
            h(COMPONENT_MAP.button, {
                on: {
                    click() {
                        self.$emit('onCancel');
                    }
                }
            }, cancelBtn),
            h(COMPONENT_MAP.button, {
                style: {
                    marginLeft: '10px'
                },
                props: {
                    type: 'primary'
                },
                on: {
                    click() {
                        self.$emit('onSubmit');
                    }
                }
            }, okBtn)
        ]);

    }
};
