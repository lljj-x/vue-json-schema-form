/**
 * Created by Liu.Jun on 2020/6/2 16:00.
 */

const path = require('path');

const resolve = p => path.resolve(__dirname, '../', p);

const packageData = require('../package.json');

const banner = `/*!
 * ${packageData.name} v${packageData.version}
 * (c) 2020-${new Date().getFullYear()} ${packageData.author}
 * Released under the ${packageData.license} License.
 */
`;

module.exports = {
    entry: resolve('src/index.js'),
    banner,
    external: ['vue'],
    globals: {
        vue: 'Vue'
    },
    extractcss: false,
    output: {
        path: resolve('dist/'),
        file: 'vueJsonSchemaForm', // 导出文件名，自动拼接 format
        name: 'vueJsonSchemaForm', // umd 注册的全局变量名称
        format: ['esm', 'umd']
    }
};
