/**
 * Created by Liu.Jun on 2019/11/27 13:57.
 */

const envConfig = require('./envConfig').getConfig();

module.exports = function fn({ data, des }) {
    if (envConfig.log) {
        console.log(`\n---------- ↓↓↓↓ ${des || ''} ↓↓↓↓ ----------`);
        console.log(data);
        console.log(`---------- ↑↑↑↑ ${des || ''} ↑↑↑↑ ----------\n`);
    }
};
