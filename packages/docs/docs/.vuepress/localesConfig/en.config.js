/**
 * Created by Liu.Jun on 2020/5/30 10:42 下午.
 */

module.exports = {
    config: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        lang: 'en-US',
        title: 'Vue JSON Schema Form',
        description: 'Quickly build a form with complete verification based on Vue and JSON Schema'
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
            // {
            //     text: 'Guide',
            //     ariaLabel: 'Guide',
            //     link: '/en/guide/'
            // },
            // {
            //     text: 'Type rules',
            //     ariaLabel: 'Type rules',
            //     items: [
            //         { text: 'string', link: '/en/rules/string.md' },
            //         { text: 'number', link: '/en/rules/number.md' },
            //         { text: 'boolean', link: '/en/rules/boolean.md' },
            //         { text: 'null', link: '/en/rules/null.md' },
            //         { text: 'object', link: '/en/rules/object.md' },
            //         { text: 'array', link: '/en/rules/array.md' },
            //         { text: 'combining', link: '/en/rules/combining.md' },
            //     ]
            // },
            { text: 'Playground', link: 'https://form.lljj.me' },
            { text: 'Github', link: 'https://github.com/lljj-x/vue-json-schema-form' },
        ],

        // 侧边栏
        // 省略 .md 拓展名，同时以 / 结尾的路径将会被视为 */README.md
        sidebar: {
            // '/en/guide/': require('./genConfig').getGuideSidebar([
            //     'Guide',
            //     'Configuration',
            //     'Principle',
            //     'Update plan'
            // ]),
            // '/en/config/': require('./genConfig').getConfigSidebar(),
            // '/en/rules/': require('./genConfig').getRulesSidebar(),
        }
    }
}
