const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            "./src/assets/js/index.ts"
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.ts/,
            use: [
                'ts-loader'
            ],
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({ template: './index.html' }),
        new copyWebpackPlugin([{
            from: './src/components',
            to: 'components/[name].[ext]',
            toType: 'template'
        }]),
        new copyWebpackPlugin([{
            from: './src/assets/img',
            to: 'img/[name].[ext]',
            toType: 'template'
        }]),
        new copyWebpackPlugin([{
            from: './src/data/books.json',
            to: 'data/books.json',
            toType: 'file'
        }], {
            ignore: ['*.js', '*.css']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ProvidePlugin({
            Ractive: ["ractive/ractive.min.js"]
        })

    ]
};