/**
 * Created by Liu.Jun on 2020/5/30 10:42 下午.
 */

module.exports = {
    config: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        lang: 'zh-CN',
        title: 'Vue JSON Schema Form',
        description: '基于 Vue 、JSON Schema快速构建一个带完整校验的form表单'
    },
    themeConfig: {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        logo: '/logo.png', // logo
        lastUpdated: '最后更新时间', // string | boolean
        serviceWorker: {
            updatePopup: {
                message: "发现新内容可用.",
                buttonText: "刷新"
            }
        },
        // 顶部导航
        nav: [
            {
                text: '指南',
                ariaLabel: '指南',
                link: '/zh/guide/'
            },
            {
                text: '类型规则',
                ariaLabel: '类型规则',
                items: [
                    { text: 'string', link: '/zh/rules/string.md' },
                    { text: 'number', link: '/zh/rules/number.md' },
                    { text: 'boolean', link: '/zh/rules/boolean.md' },
                    { text: 'null', link: '/zh/rules/null.md' },
                    { text: 'object', link: '/zh/rules/object.md' },
                    { text: 'array', link: '/zh/rules/array.md' },
                    { text: 'combining', link: '/zh/rules/combining.md' },
                ]
            },
            { text: 'Playground', link: 'https://form.lljj.me' },
            { text: '表单Schema生成器', link: 'https://form.lljj.me/schema-generator.html' },
            { text: '活动编辑器', link: 'https://form.lljj.me/vue-editor.html#/editor' },
            { text: 'Github', link: 'https://github.com/lljj-x/vue-json-schema-form' },
        ],

        // 侧边栏
        // 省略 .md 拓展名，同时以 / 结尾的路径将会被视为 */README.md
        sidebar: {
            '/zh/guide/': require('./genConfig').getGuideSidebar(),
            '/zh/config/': require('./genConfig').getConfigSidebar(),
            '/zh/rules/': require('./genConfig').getRulesSidebar(),
        }
    }
}
