const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './path/to/my/entry/file.js',
    mode: 'production',
    target: 'web',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
    },
    devServer: {
        port:8081,
        historyApiFallback: true,
        open: true,
        compress: true,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: "style-loader"
                },
                {
                  loader: "css-loader"
                }
                ],
            },
          {
            test: /\.svg$/,
            type: 'asset/resource',
          },
          {
            test: /\.png$/,
            type: 'asset/resource',
          },
          { test: /\.txt$/, use: 'raw-loader' }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
