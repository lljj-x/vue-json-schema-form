/**
 * Created by Liu.Jun on 2020/6/2 15:58.
 */

const path = require('path');
const rollup = require('rollup');
const baseConfig = require('./base.config');

const resolve = p => path.resolve(__dirname, '../', p);

const watchConfig = baseConfig({
    sourcemap: true
});

// watch
const watcher = rollup.watch({
    ...watchConfig,
    watch: {
        buildDelay: 300,
        include: resolve('src/**'),
        exclude: resolve('node_modules/**'),
        clearScreen: true
    }
});

watcher.on('event', (event) => {
    // event.code can be one of:
    //   START        — the watcher is (re)starting
    //   BUNDLE_START — building an individual bundle
    //   BUNDLE_END   — finished building a bundle
    //   END          — finished building all bundles
    //   ERROR        — encountered an error while bundling
    console.log(`Watch Event Code: ${event.code}`);
});

// stop watching
// watcher.close();
