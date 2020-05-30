/**
 * Created by Liu.Jun on 2020/5/30 10:42 下午.
 */

module.exports = {
    config: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        lang: 'en-US',
        title: 'vue-jsonSchema-form',
        description: '基于 Vue 、JsonSchema快速构建一个带完整校验的form表单',
        head: [
            ['link',
                { rel: 'icon', href: '/egg.png' }
                //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
            ],
        ],
    },
    themeConfig: {
        // 多语言下拉菜单的标题
        selectText: 'Languages',
        // 该语言在下拉菜单中的标签
        label: 'English',
        ariaLabel: 'Languages',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        logo: '/egg.png', // logo
        lastUpdated: 'lastUpdated', // string | boolean
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: "Refresh"
            }
        },
        // 顶部导航
        nav: [
            { text: '首页', link: '/' },
            {
                text: '指南',
                ariaLabel: '指南'
            },
            {
                text: '配置',
                ariaLabel: '配置',
                items: [
                    { text: 'schema(数据)', link: '/pages/folder1/test1.md' },
                    { text: 'uiSchema(视图)', link: '/pages/folder2/test4.md' },
                    { text: 'errSchema(校验)', link: '/pages/folder2/test4.md' }
                ]
            },
            { text: '演示', link: 'https://buhuida.com/page_demo/demo-1911/vue-element-schema-demo.html#/demo?type=AllOf' },
            { text: 'Github', link: 'https://github.com/liujunchina' },
        ],

        // 侧边栏
        // 省略 .md 拓展名，同时以 / 结尾的路径将会被视为 */README.md
        sidebar: [
            {
                title: 'Group 1',   // 必要的
                path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/',
                    ['/page-b', 'Explicit link text'] // 显示地指定链接的文字
                ]
            },
            {
                title: 'Group 2',
                children: [ /* ... */ ]
            }
        ]
    }
}
