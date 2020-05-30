/**
 * Created by Liu.Jun on 2018/5/31.
 */

// envConfig 分为两部分参数 1、根据入口文件携带的固定参数 2、根具 npm_config 获取参数可以覆盖1的参数
// 不同入口文件需要自己调用 initConfig

const argv = require('yargs').argv;

const manifestAlias = {
    lgb: 'log',
    dgb: 'dir',
    rgb: 'report',
};

exports.getConfig = () => {
    try {
        return JSON.parse(process.env.npm_config_argv).original.slice(2).reduce((preVal, item) => {
            const param = item.replace(/^--/, '');
            const [key, value] = param.split('=');
            preVal[key] = value || !0;

            // 别名
            if (manifestAlias[key]) {
                preVal[manifestAlias[key]] = preVal[key];
            }
            return preVal;
        }, argv);
    } catch (e) {
        //
        console.warn('JSON parse "process.env.npm_config_argv" fail !');
    }
    return {};
};
