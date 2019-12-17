const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// https://github.com/babel/babel-loader            <-  kompresja js
// https://github.com/jantimon/html-webpack-plugin  <-  tworzenie html z danym js
// https://github.com/webpack-contrib/mini-css-extract-plugin   <-  tworzenie html z danym css
// https://github.com/webpack/webpack-dev-server    <-  praca na żywo <- uruchamiane za pomocą 'npm run dev',
//                                                      potem trzeba przejść pod odpowiedni adres jaki sie wyświetli 
//                                                      (prawdopodobnie 'http://localhost:8080/')

module.exports = {
    entry: {
        //  W TYM MIEJSCU DODAJEMY ZALEŻNE JS (tylko front-end) I CSS, A NIE W HTML
        loginPage: [
            './src/js/start.js',
            './src/js/register.js',
            './src/js/login.js',
            './src/css/index.css'
        ],
        mainPage: [
            './src/js/to-do-list-main.js',
            './src/js/logout.js',
            './src/css/to-do-list.css',
            './src/css/fontello/css/fontello.css'
        ]
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, './dist'),
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
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: "file-loader",
                    options: {}
                }]
            },
            {
                test: /\.svg$/,
                loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=font/[name].[ext]'
            },
            {
                test: /\.woff$/,
                loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=font/[name].[ext]'
            },
            {
                test: /\.woff2$/,
                loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=font/[name].[ext]'
            },
            {
                test: /\.[ot]tf$/,
                loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=font/[name].[ext]'
            },
            {
                test: /\.eot$/,
                loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=font/[name].[ext]'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            chunks: ['loginPage']
        }),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './src/html/to-do-list-main.html',
            chunks: ['mainPage']
        })
    ]
};