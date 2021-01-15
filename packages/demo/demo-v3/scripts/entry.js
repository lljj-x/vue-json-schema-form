/**
 * Created by Liu.Jun on 2018/5/31.
 */

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const envConfig = require('./envConfig');

// n个数组获取交集
// const arrayIntersection = (...arg) => {
//     arg.reduce((previousValue, currentValue) => previousValue.filter(v => currentValue.includes(v)), arg[0]);
// };

// 判断是否为当前 entry
const isEntry = (filePath, curDir) => {
    // 需要忽略的文件夹
    const exclude = ['/template/', '/component/', '/components/', '/module/', '/modules/'];

    // 同名 判断最后一级文件夹名等于文件名
    const isSame = (path.dirname(filePath).split('/').pop() === path.basename(filePath).split('.')[0]);

    // 排除特殊文件夹
    const isEntryFile = isSame && exclude.every(exStr => !filePath.includes(exStr));

    if (isEntryFile && curDir.length > 0) {
        // 包含路径
        return curDir.some(dirItem => ~filePath.indexOf(dirItem));
    }
    return isEntryFile;
};

// 默认的模板文件
const defaultTemp = path.resolve(__dirname, '../default.html');

function entryFn({ dir, chunks = [] }) {
    // entry 文件相对的目录
    const dirPath = path.normalize(path.resolve(__dirname, '../src/pages'));

    // entry 文件
    const filePath = path.normalize(path.resolve(__dirname, '../src/pages/**/*.js'));

    const temFiles = glob.sync(filePath);
    const curDir = dir ? String(dir).split(',') : [];

    // isEntry + 非component 做排除文件夹
    const files = temFiles.filter(v => isEntry(v, curDir));

    let openPage = null;
    const entries = files.reduce((preValue, entry, index) => {
        const dirName = path.normalize(path.dirname(entry));
        const entryName = dirName.substring(path.normalize(dirPath).length + 1).replace(/\\/g, '/');

        // const fileName = path.basename(entry, path.extname(entry));

        // 第一个 entry 为浏览器默认打开页面
        if (index === 0) openPage = `${entryName}.html`;

        preValue[entryName] = {
            entry,
            template: fs.existsSync(entry.replace('.js', '.html')) ? entry.replace('.js', '.html') : defaultTemp,
            filename: `${entryName}.html`,
            title: `${entryName} - Test Demo`,
            chunks: [
                entryName,
                ...chunks
            ]
            // chunks to include on this pages, by default includes
            // extracted common chunks and vendor chunks.
            // chunks: ['chunk-runtime', 'chunk-vendors-polyfill', 'index']
        };
        return preValue;
    }, {});

    return {
        entries,
        openPage
    };
}

module.exports = ({
    chunks = []
} = {}) => {
    // 相对于 根目录
    const {
        dir, // 指定编译的目录
    } = envConfig.getConfig();

    return entryFn({
        dir,
        chunks
    });
};
