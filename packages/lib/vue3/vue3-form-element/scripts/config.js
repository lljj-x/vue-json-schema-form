/**
 * Created by Liu.Jun on 2020/6/2 16:00.
 */

const path = require('path');

const resolve = p => path.resolve(__dirname, '../', p);

const packageData = require('../package.json');

// eslint-disable-next-line max-len
const banner = `/** @license ${packageData.name} (c) 2020-${new Date().getFullYear()} ${packageData.author} License: ${packageData.license} */`;

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
        file: 'vue3-form-element', // 导出文件名，自动拼接 format
        name: 'vue3FormElement', // umd 注册的全局变量名称
        format: ['esm', 'umd']
    }
};
