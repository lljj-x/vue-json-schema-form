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


const path = require('path');
const config = require('./config');

const onwarn = (warning) => {
    // Silence circular dependency warning for moment package
    if (
        warning.code === 'CIRCULAR_DEPENDENCY'
        && !warning.importer.indexOf(path.normalize('src/JsonSchemaForm/'))
    ) {
        return;
    }

    console.warn(`(!) ${warning.message}`);
};

module.exports = ({
    sourcemap = true
} = {}) => ({
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
        babel({
            exclude: 'node_modules/**'
        }),
        postcss({
            extract: config.extractcss
        }),
        commonjs(),
        vue({
            //
        }),
        filesize(),
    ],
    output: (config.output.format || ['esm', 'umd']).map(format => ({
        format,
        file: path.resolve(config.output.path, `${config.output.file}.${format}.js`),
        sourcemap,
        name: config.output.name,
        exports: 'named', /** Disable warning for default imports */
        globals: config.globals
    }))
});
