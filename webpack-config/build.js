let version = require('../package.json').version;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RunNodeWebpackPlugin = require('run-node-webpack-plugin');

let path = require('path');
let tool = require('../helper/tool');
tool.write('./src/version.js', 'export default \'' + version + '\';');

module.exports = {
    entry: path.resolve('./', 'src/index.js'),
    output: {
        path: path.resolve('./', 'npm'),
        filename: 'tc-editor.min.js',
        library: 'TCEditor',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /(.js)$/,
                use: [{
                    loader: 'babel-loader',
                }]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/index.d.ts', to: 'tc-editor.min.d.ts'},
                {from: 'README.md'},
                {from: 'LICENSE'}
            ]
        }),
        new RunNodeWebpackPlugin({scriptToRun: './helper/sync-npm-version.js'})
    ]
};