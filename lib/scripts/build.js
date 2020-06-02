/**
 * Created by Liu.Jun on 2020/6/2 15:58.
 */

const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify').uglify;

const baseConfig = require('./base.config');

const buildConfig = baseConfig({
    sourcemap: false
});

// 压缩
buildConfig.plugins = [
    ...buildConfig.plugins,
    uglify({
        output: {
            comments: /@license/,
        },
    })
];

// build
rollup.rollup(buildConfig);
