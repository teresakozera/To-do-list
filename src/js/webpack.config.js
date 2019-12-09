const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// https://github.com/babel/babel-loader            <-  kompresja js
// https://github.com/jantimon/html-webpack-plugin  <-  tworzenie html z danym js
// https://github.com/webpack/webpack-dev-server    <-  praca na żywo <- uruchamiane za pomocą 'npm run dev',
//                                                      potem trzeba przejść pod odpowiedni adres jaki sie wyświetli 
//                                                      (prawdopodobnie 'http://localhost:8080/')

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