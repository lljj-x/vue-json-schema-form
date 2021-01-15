module.exports = {
    plugins: [
        // '@babel/plugin-proposal-export-default-from'
    ],
    presets: [
        [
            '@lljj/babel-preset-app',
            {
                useBuiltIns: false,
                regenerator: true,
                helpers: true
            }
        ]
    ]
};
