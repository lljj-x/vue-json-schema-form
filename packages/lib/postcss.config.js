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
        require('postcss-cssnext')({
            warnForDuplicates: false,
        }),
        require('cssnano')({
            sourcemap: false,
            autoprefixer: false,
            safe: true,
            discardComments: {
                removeAll: true,
            },
            discardUnused: false,
            zindex: false,
        }),
    ]
};
