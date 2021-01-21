/**
 * Created by Liu.Jun on 2020/6/2 15:58.
 */

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const filesize = require('rollup-plugin-filesize');
const postcss = require('rollup-plugin-postcss');
// const buble = require('rollup-plugin-buble');
const babel = require('rollup-plugin-babel');
const del = require('rollup-plugin-delete');
const vue = require('rollup-plugin-vue');
const json = require('rollup-plugin-json');
const terser = require('rollup-plugin-terser').terser;
const visualizer = require('rollup-plugin-visualizer');
const eslint = require('rollup-plugin-eslint').eslint;

const path = require('path');
const config = require('./config');

const onwarn = (warning) => {
    // Silence circular dependency warning for moment package
    if (
        warning.code === 'CIRCULAR_DEPENDENCY'
    ) {
        return;
    }

    console.warn(`(!) ${warning.message}`);
};

module.exports = ({
    sourcemap = true,
    uglify = false
} = {}) => {
    // output
    let output = (config.output.format || ['esm', 'umd']).map(format => ({
        format,
        file: path.resolve(config.output.path, `${config.output.file}.${format}.js`),
        banner: config.banner,
        sourcemap,
        name: config.output.name,
        exports: 'named', /** Disable warning for default imports */
        globals: config.globals
    }));

    // 添加压缩mini js
    if (uglify) {
        output = [
            ...output,
            ...output.map(item => ({
                ...item,
                file: path.resolve(config.output.path, `${config.output.file}.${item.format}.min.js`),
                plugins: [terser({
                    output: {
                        comments(node, comment) {
                            const text = comment.value;
                            const type = comment.type;
                            // multiline comment
                            return type === 'comment2' && /@preserve|@license|@cc_on/i.test(text);
                        },
                    },
                    compress: {
                        drop_console: true,
                    }
                })]
            }))
        ];
    }

    return {
        input: config.entry,
        external: config.external,
        onwarn,
        plugins: [
            del({ targets: [config.output.path] }),
            json(),
            nodeResolve({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
                browser: true
            }),
            eslint(),
            vue({
                normalizer: '~vue-runtime-helpers/dist/normalize-component.js'
            }),
            babel({
                exclude: /node_modules\/(?!(@lljj)\/).*/,
                extensions: ['.js', '.vue'],
            }),
            postcss({
                extract: config.extractcss
            }),
            commonjs({
                include: /node_modules/,
            }),
            filesize(),

            // 打包文件分析
            ...(process.env.npm_config_report ? [visualizer({
                open: true
            })] : [visualizer()])
        ],
        output
    };
};
