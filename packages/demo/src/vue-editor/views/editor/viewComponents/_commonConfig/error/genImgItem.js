/**
 * Created by Liu.Jun on 2020/4/30 17:04.
 */

// errorSchema imgItem
export default function () {
    return {
        imgUrl: {
            format: '请正常选择图片',
            required: '请选择你要配置的图片'
        },
        imgLink: {
            format: '请输入合法的链接地址',
            required: '请输入合法的链接地址'
        }
    };
}
