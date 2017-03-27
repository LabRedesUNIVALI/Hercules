const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: path.join(__dirname, 'src', 'app', 'app.module.js'),
        vendor: [
            'angular',
            'angular-animate',
            'angular-aria',
            'angular-cookies',
            'angular-material',
            'angular-material-data-table',
            'angular-messages',
            'angular-route',
            'angular-sanitize',
            'angular-translate',
            'angular-ui-mask',
            'jspdf'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devtool: 'eval',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:3000/api'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: path.join(__dirname, 'src', 'index.ejs')
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: [/node_modules/],
                use: ['ngtemplate-loader', 'html-loader']
            },
            {
                test: /\.js/,
                use: [{
                    loader: 'ng-annotate-loader'
                }, {
                    loader: 'babel-loader',
                    options: { presets: 'es2015' }
                }]
            },
            {
                test: /\.scss$/,
                use: ['styles-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['styles-loader', 'css-loader']
            }
        ]
    }
};

module.exports = config;
