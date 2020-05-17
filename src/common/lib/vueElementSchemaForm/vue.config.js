/**
 * Created by Liu.Jun on 2020/4/23 10:35 下午.
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    css: {
        extract: false
    },
    configureWebpack: {
        externals: {
            vue: 'Vue',
            ELEMENT: 'ELEMENT',
            VueRouter: 'VueRouter',
        },
        plugins: process.env.npm_config_report ? [
            new BundleAnalyzerPlugin()
        ] : []
    }
};

// module.exports = {
//     chainWebpack: (config) => {
//         if (process.env.npm_config_report) {
//             // eslint-disable-next-line global-require
//             const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//             config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
//         }
//     }
// };
