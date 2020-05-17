/**
 * Created by Liu.Jun on 2020/5/13 9:06 下午.
 */

const files = require.context('.', true, /\.js$/);

const modules = files.keys().reduce((preVal, curKey) => {
    if (curKey !== './index.js') {
        preVal[curKey.replace(/(\.\/\d+\.|\/index\.js)/g, '')] = files(curKey).default;
    }
    return preVal;
}, {});

export default modules;
