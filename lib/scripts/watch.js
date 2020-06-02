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
        include: resolve('src'),
        exclude: resolve('node_modules'),
    }
});

watcher.on('event', (event) => {
    // event.code can be one of:
    //   START        — watcher 已启动
    //   BUNDLE_START — 正在创建 bundle
    //   BUNDLE_END   — 已创建 bundle
    //   END          — 已创建所有 bundles
    //   ERROR        — 打包时出错
    //   FATAL        — 发生不可恢复的错误
    console.log('eventcode: ', event.code);
});
