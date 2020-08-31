/**
 * Created by Liu.Jun on 2020/5/30 10:42 下午.
 */

module.exports = {
    config: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        lang: 'en-US',
        title: 'Vue JSON Schema Form',
        description: 'Quickly build a form with complete verification based on Vue and JsonSchema'
    },
    themeConfig: {
        // 多语言下拉菜单的标题
        selectText: 'Languages',
        // 该语言在下拉菜单中的标签
        label: 'English',
        ariaLabel: 'Languages',
        // 编辑链接文字
        editLinkText: 'Edit this page on GitHub',
        logo: '/logo.png', // logo
        lastUpdated: 'lastUpdated', // string | boolean
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: "Refresh"
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
            { text: '演示', link: 'https://form.lljj.me' },
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
