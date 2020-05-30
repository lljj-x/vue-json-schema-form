"use strict";

module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    env: {
        browser: true
    },
    extends: ["@lljj/eslint-config", "plugin:vue/recommended"],
    plugins: ["vue"],
    rules: {
        // 修改vue/html中缩进
        "vue/html-indent": [
            "error",
            4
        ],

        "vue/no-v-html": "off",
        // 关闭属性换行
        "vue/max-attributes-per-line": "off",
        // 关闭HTML标签自闭合
        "vue/html-self-closing": "off",
        "vue/html-closing-bracket-spacing": "off",
        // 关闭在打开标签（`<template>`）后需要1个换行符
        "vue/singleline-html-element-content-newline": "off",
        // 设置 vue 文件中 script 代码顶级缩进 1 倍 indent
        'vue/script-indent': [
            'error',
            4,
            {
                'baseIndent': 1
            }
        ]
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
