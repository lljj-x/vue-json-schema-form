/* eslint-disable global-require */
// https://github.com/michael-ciniawsky/postcss-load-config

// const path = require('path');

module.exports = {
    plugins: [
        require('postcss-import')({
            path: ['src/common/css/'],
        }),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-color-mod-function'),
        // require('postcss-extend'), // mixins 代替
        // require('postcss-apply'), // mixins 代替
        require('postcss-cssnext')({
            warnForDuplicates: false,
        }),
        // optimize-css-assets-webpack-plugin 会调用
        // require('cssnano')({
        //     sourcemap: true,
        //     autoprefixer: false,
        //     safe: true,
        //     discardComments: {
        //         removeAll: true,
        //     },
        //     discardUnused: false,
        //     zindex: false,
        // }),
    ]
};
