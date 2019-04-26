const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const projectPath = __dirname.replace(`build${path.sep}webpack-config`, '')
const baseUrl = process.env.baseUrl

module.exports = [
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            notes: [ '编译成功' ]
        },
        clearConsole: true,
    }),
    new CleanWebpackPlugin({
        dry: false,
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns: [ '/dist/*' ],
        dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
        minify: {
            removeRedundantAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            collapseBooleanAttributes: true
        },
        template: path.resolve(projectPath, 'public/index.html'),
    }),
]