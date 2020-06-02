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
// buildConfig.plugins = [
//     ...buildConfig.plugins,
//     uglify({
//         output: {
//             comments: /@license/,
//         },
//     })
// ];

// see below for details on the options
const { output: outputList, ...inputOptions } = buildConfig;

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // 循环输出每种格式
    for (const outputOptions of outputList) {
        // or write the bundle to disk
        // eslint-disable-next-line no-await-in-loop
        await bundle.write(outputOptions);
    }
}

build().catch((error) => {
    debugger;
});
