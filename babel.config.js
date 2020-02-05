module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                targets: {
                    esmodules: true,
                    chrome: '58',
                    ie: '11'
                }
            }
        ]
    ]
};
