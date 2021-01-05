/**
 * Created by Liu.Jun on 2020/7/25 11:25.
 */

export default {
    txt: {
        'ui:placeholder': '输入你的内容',
        'ui:options': {
            getWidget(widgetVm) {
                console.log(widgetVm);
            }
        }
    },
    txtColor: {
        'ui:widget': 'el-color-picker'
    }
};
