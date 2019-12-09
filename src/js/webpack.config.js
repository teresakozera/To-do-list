const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        loginPage: [
            './start.js'
        ],
        mainPage: [
            './to-do-list-main.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '../html/index.html',
            chunks: ['loginPage']
        }),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: '../html/to-do-list-main.html',
            chunks: ['mainPage']
        })
    ]
};