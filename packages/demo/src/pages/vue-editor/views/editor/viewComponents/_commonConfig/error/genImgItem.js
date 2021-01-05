/**
 * Created by Liu.Jun on 2020/4/30 17:04.
 */

// errorSchema imgItem
export default function () {
    return {
        imgUrl: {
            'err:format': '请正常选择图片',
            'err:required': '请选择你要配置的图片'
        },
        imgLink: {
            'err:format': '请输入合法的链接地址',
            'err:required': '请输入合法的链接地址'
        }
    };
}
