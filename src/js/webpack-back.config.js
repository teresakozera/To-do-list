const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

// https://medium.com/code-oil/webpack-javascript-bundling-for-both-front-end-and-back-end-b95f1b429810

module.exports = {
    //  W TYM MIEJSCU DODAJEMY JS DO BACK-ENDU
    entry: {
        app: ['./index.js']
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, '../js'),
        filename: 'bundle-back.js'
    },
    externals: [nodeExternals()]
};