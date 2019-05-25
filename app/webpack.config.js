const webpack = require('webpack');
const path = require('path');

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
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 3000,
        writeToDisk: true
    }
};