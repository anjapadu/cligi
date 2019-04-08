const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');
const DefinePlugin = require('webpack').DefinePlugin;
module.exports = [
    new WebpackBar(),
    new DefinePlugin({
        'IS_DEV': JSON.stringify("true"),
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        // favicon: 'favicon.ico'
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    new CompressionPlugin({
        // asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8
    })
]
