const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, '..', 'dist'),
        compress: true,
        port: 9000,
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        open: !true,
        noInfo: true,
        overlay: { warnings: false, errors: true },
        // publicPath: "./",
        // necessary for FriendlyErrorsPlugin
        quiet: !true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('src/index.html'),
            inject: true,
            // favicon: resolve("favicon.ico"),
        }),
    ],
})

module.exports = webpackConfig
