/**
 * Created by Liu.Jun on 2020/6/2 15:58.
 */

const terser = require('rollup-plugin-terser').terser;

const rollup = require('rollup');

const baseConfig = require('./base.config');

const buildConfig = baseConfig({
    sourcemap: false
});

// 压缩
buildConfig.plugins = [
    ...buildConfig.plugins,
    terser({
        output: {
            comments(node, comment) {
                const text = comment.value;
                const type = comment.type;
                if (type === 'comment2') {
                    // multiline comment
                    return /@preserve|@license|@cc_on/i.test(text);
                }
            },
        },
    })
];

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
