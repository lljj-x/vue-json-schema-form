/**
 * Created by Liu.Jun on 2020/4/23 10:35 下午.
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    css: {
        extract: false
    },
    // transpileDependencies: [/.*/], // 通过所有
    configureWebpack: {
        plugins: process.env.npm_config_report ? [
            new BundleAnalyzerPlugin()
        ] : []
    }
};
