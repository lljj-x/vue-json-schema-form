/**
 * Created by Liu.Jun on 2019/11/27 13:57.
 */

module.exports = function ({ data, des }) {
    if (process.env.npm_config_log) {
        console.log(`\n---------- ↓↓↓↓ ${des || ''} ↓↓↓↓ ----------`);
        console.log(data);
        console.log(`---------- ↑↑↑↑ ${des || ''} ↑↑↑↑ ----------\n`);
    }
};
