/**
 * Created by Liu.Jun on 2020/5/30 10:42 下午.
 */

module.exports = {
    config: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        lang: 'en-US',
        title: 'Vue JsonSchema Form',
        description: '基于 Vue 、JsonSchema快速构建一个带完整校验的form表单'
    },
    themeConfig: {
        // 多语言下拉菜单的标题
        selectText: 'Languages',
        // 该语言在下拉菜单中的标签
        label: 'English',
        ariaLabel: 'Languages',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        logo: '/logo.png', // logo
        lastUpdated: 'lastUpdated', // string | boolean
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: "Refresh"
            }
        },
        // 顶部导航
        nav: [],

        // 侧边栏
        // 省略 .md 拓展名，同时以 / 结尾的路径将会被视为 */README.md
        sidebar: []
    }
}
