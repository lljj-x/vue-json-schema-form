"use strict";

module.exports = {
    root: true,
    env: {
        browser: true,
        worker: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    plugins: ['vue'],
    extends: [
        '@lljj/eslint-config',
        '@lljj/eslint-config/vue'
    ],
    rules: {
        // 递归组件导致了循环依赖
        'import/no-cycle': 'off',
    },
    globals: {
        'self': true
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                "indent": "off",
            }
        }
    ]
};
