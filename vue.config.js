/**
 * Created by Liu.Jun on 2019/10/25 15:42.
 */

const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const chalk = require('chalk');

const log = require('./scripts/log');
const envConfig = require('./scripts/envConfig').getConfig();

const {
    entries,
    openPage
} = require('./scripts/entry.js')();

console.log('!!!!! ***** !!!!!');
console.log('!!!!! ***** !!!!!');

log({
    data: chalk.green(openPage),
    des: 'openPage'
});

log({
    data: Object.entries(entries).map(([key, value]) => ({
        [key]: value.entry
    })),
    des: 'entry'
});

const isProduction = process.env.NODE_ENV === 'production';

// config var
const outputDir = path.resolve(__dirname, `./demo`);

module.exports = {
    // cdn
    publicPath: isProduction ? `/vue-element-schema-form/demo` : '/',

    // 资源目录
    outputDir,

    assetsDir: 'static',

    filenameHashing: true,

    pages: entries,

    lintOnSave: true,

    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: true,

    transpileDependencies: [],

    // 生产环境 sourceMap
    productionSourceMap: false,

    // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
    // corsUseCredentials: false,

    configureWebpack: (config) => {
        config.externals = {
            vue: 'Vue',
            ELEMENT: 'ELEMENT',
            VueRouter: 'VueRouter',
        };
        config.resolve.alias = {
            ...config.resolve.alias,
            common: path.resolve(__dirname, './src/common'),
            js: path.resolve(__dirname, './src/common/js'),
            css: path.resolve(__dirname, './src/common/css'),
        };
    },

    // webpack 链接 API，用于生成和修改 webpack 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {
        // 添加runtime
        // config.optimization.runtimeChunk({
        //     name: 'user-runtime'
        // });

        // 指定文件提取
        // const splitConfig = {
        //     cacheGroups: {
        //         vendors: {
        //             name: 'user-vendors-polyfill',
        //             chunks: 'initial',
        //             priority: 12,
        //             test: module => /[\\/]node_modules[\\/]/.test(module.context) && /@gb|vue|vuex|vue-router/.test(module.context),
        //         },
        //         elementUi: {
        //             name: 'user-element-ui',
        //             chunks: 'initial',
        //             priority: 10,
        //             test: module => /[\\/]node_modules[\\/]/.test(module.context) && /element-ui/.test(module.context),
        //         },
        //         asyncVendor: {
        //             name: 'chunk-vendors-async',
        //             chunks: 'async',
        //             priority: 8,
        //             minChunks: 5,
        //         }
        //     }
        // };

        config.optimization.splitChunks({});

        // js 文件名调整
        if (isProduction) {
            // 资源表
            config.plugin('manifest').use(ManifestPlugin, [{
                fileName: 'manifest.json',
                filter: (obj) => {
                    const ext = path.extname(obj.name);
                    const includeExts = ['.js', '.css'];
                    return includeExts.includes(ext) && !obj.name.includes('chunk-');
                }
            }]);
        }

        // report
        if (envConfig.report) {
            // eslint-disable-next-line global-require
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
        }

        // 移除 prefetch 插件
        Object.keys(entries).forEach((item) => {
            config.plugins.delete(`prefetch-${item}`);
        });
    },

    css: {
        requireModuleExtension: true,
        sourceMap: !isProduction,
        extract: isProduction
    },

    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        clientLogLevel: 'info',
        open: true,
        openPage,
        port: 8800,
        host: '127.0.0.1',
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        proxy: {
            '/api-dev': {
                target: 'http://www.api.com',
                hot: true,
                open: true,
                contentBase: false,
                historyApiFallback: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-dev': ''
                }
            }
        }
    },

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // 第三方插件配置
    pluginOptions: {}
};
