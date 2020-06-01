/**
 * Created by Liu.Jun on 2020/5/30 10:42 下午.
 */

module.exports = {
    config: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        lang: 'zh-CN',
        title: 'Vue JsonSchema Form',
        description: '基于 Vue 、JsonSchema快速构建一个带完整校验的form表单'
    },
    themeConfig: {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        logo: '/hero.png', // logo
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
                text: '配置',
                ariaLabel: '配置',
                items: [
                    { text: 'schema(数据)', link: '/zh/guide/schema.md' },
                    { text: 'uiSchema(视图)', link: '/zh/guide/uiSchema.md' },
                    { text: 'errSchema(校验)', link: '/zh/guide/errSchema.md' }
                ]
            },
            {
                text: '类型规则',
                ariaLabel: '类型规则',
                items: [
                    { text: 'Array', link: '/zh/rules/Array.md' },
                    { text: 'Null', link: '/zh/rules/Null.md' },
                    { text: 'Number', link: '/zh/rules/Number.md' },
                    { text: 'Object', link: '/zh/rules/Object.md' },
                    { text: 'String', link: '/zh/rules/String.md' },
                ]
            },
            { text: '演示', link: 'https://buhuida.com/page_demo/demo-1911/vue-element-schema-demo.html#/demo?type=AllOf' },
            { text: 'Github', link: 'https://github.com/liujunchina' },
        ],

        // 侧边栏
        // 省略 .md 拓展名，同时以 / 结尾的路径将会被视为 */README.md
        sidebar: {
            '/zh/guide/': require('./genConfig').getGuideSidebar(['指南', '深入']),
            '/zh/config/': require('./genConfig').getConfigSidebar(),
        }
    }
}
