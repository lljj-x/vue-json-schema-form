// 默认主题配置
// https://www.vuepress.cn/zh/theme/default-theme-config.html

// ---
//     tags:
// - 配置
// - 主题
// - 索引
// ---

const lang = {
    zh: {
        path: '/',
        configPack: require('./zh.config')
    },
    en: {
        path: '/en',
        configPack: require('./en.config')
    }
}

module.exports = {
    locales: {
        [lang.zh.path]: lang.zh.configPack.config,
        // [lang.en.path]: lang.en.configPack.config,
    },
    themeConfig: {
        locales: {
            [lang.zh.path]: lang.zh.configPack.themeConfig,
            // [lang.en.path]: lang.en.configPack.themeConfig,
        }
    }
}
