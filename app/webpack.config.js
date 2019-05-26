const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'scrap-ton-vie.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
            ]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 3000,
        writeToDisk: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'scrap-ton-vie.css',
        })
    ]
};