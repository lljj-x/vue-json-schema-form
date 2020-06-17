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
    plugins: {
        'demo-block': {
            settings: {
                jsLib: [
                    'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.13.2/index.js',
                    'https://unpkg.com/@lljj/vue-json-schema-form@0.0.5/dist/vueJsonSchemaForm.umd.min.js'
                ], // 在线示例(jsfiddle, codepen)中的js依赖
                cssLib: ['https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css'], // 在线示例中的css依赖
                vue: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js', // 在线示例中的vue依赖
                jsfiddle: true, // 是否显示 jsfiddle 链接
                codepen: true, // 是否显示 codepen 链接
                horizontal: false // 是否展示为横向样式
            }
        }
    },
    // plugins: [
    //     'demo-block',
    //     {
    //         settings: {
    //             jsLib: [
    //                 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.13.2/index.js',
    //                 'https://unpkg.com/@lljj/vue-json-schema-form@0.0.5/dist/vueJsonSchemaForm.umd.min.js'
    //             ], // 在线示例(jsfiddle, codepen)中的js依赖
    //             cssLib: ['https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css'], // 在线示例中的css依赖
    //             vue: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js', // 在线示例中的vue依赖
    //             jsfiddle: true, // 是否显示 jsfiddle 链接
    //             codepen: true, // 是否显示 codepen 链接
    //             horizontal: false // 是否展示为横向样式
    //         }
    //     }
    // ],
    head: [
        ['link', { rel: 'icon', href: `/icons/ico.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/ico.png` }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/ico.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js' }], // vue
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.13.2/index.js' }], // elementUi js
        ['link', { rel: 'stylesheet', href: 'https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css' }],  // elementUi css
        ['script', { src: 'https://unpkg.com/@lljj/vue-json-schema-form@0.0.5/dist/vueJsonSchemaForm.umd.min.js' }],

        // ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }],
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
        // docsDir: 'packages/docs/docs',
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
