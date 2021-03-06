const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
        main: ['./src/index.js', 'webpack-hot-middleware/client?&reload=true'],
        vendor: [
            'lodash',
            'babel-polyfill',
        ]
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/',
    },
    resolve: {
        alias: {
            Base: path.resolve(__dirname, 'src/asset/'),
        },
        extensions: ['.js','.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|svg|jpg|gig)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.jsx?$/,
                exclude:/node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.ejs$/,
                exclude:/node_modules/,
                use: 'ejs-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Management',
            template: 'src/index.tpl.ejs'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
        })
    ],
};

