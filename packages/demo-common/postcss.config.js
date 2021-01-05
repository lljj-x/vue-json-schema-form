module.exports = {
    plugins: [
        require('postcss-import')({
            path: ['src/_common/css/'],
        }),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-color-mod-function'),
        require('postcss-cssnext')({
            warnForDuplicates: false,
        }),
    ]
};
