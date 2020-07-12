// 默认主题配置
// https://www.vuepress.cn/zh/theme/default-theme-config.html
// https://github.com/vuejs/vuepress/blob/master/packages/docs/docs/.vuepress/config.js

// ---
//     tags:
// - 配置
// - 主题
// - 索引
// ---

const lang = {
    zh: {
        path: '/',
        configPack: require('./localesConfig/zh.config')
    },
    en: {
        path: '/en/',
        configPack: require('./localesConfig/en.config')
    }
}

module.exports = {
    // dest: '../../vuepress',
    markdown: {
        plugins: ['task-lists']
    },
    plugins: [
        ['@vuepress/medium-zoom'],
        [
            require('./plugins/demo-container/src'),
            {
                elementVersion: '2.13.2',
                vjsfVersion: require('../../package.json').version
            }
        ],
        [
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: true
            }
        ]
    ],
    head: [
        ['link', { rel: 'icon', href: `/icons/ico.png` }],
        ['script', '',
            'var __replaceUrl = ~window.location.host.indexOf(\'buhuida.com\') ? window.location.href.replace(/.*?buhuida\\.com/, \'https://vue-json-schema-form.lljj.me\') : (window.location.protocol === \'http:\' && ~window.location.host.indexOf(\'lljj.me\') ? window.location.href.replace(/^http/, \'https\') : \'\');\n' +
            '__replaceUrl && window.location.replace(__replaceUrl);'
        ],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/ico.png` }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/ico.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    locales: {
        [lang.zh.path]: lang.zh.configPack.config,
        [lang.en.path]: lang.en.configPack.config,
    },
    extraWatchFiles: [
        '.vuepress/localesConfig/en.config.js',
        '.vuepress/localesConfig/genConfig.js',
        '.vuepress/localesConfig/zh.config.js',
    ],
    themeConfig: {
        // repo: 'vuejs/vuepress',
        editLinks: true,
        docsDir: 'packages/docs/docs',
        // #697 Provided by the official algolia team.
        // algolia: ctx.isProd ? ({
        //     apiKey: '3a539aab83105f01761a137c61004d85',
        //     indexName: 'vuepress'
        // }) : null,
        smoothScroll: true,
        locales: {
            [lang.zh.path]: lang.zh.configPack.themeConfig,
            [lang.en.path]: lang.en.configPack.themeConfig,
        }
    }
}
