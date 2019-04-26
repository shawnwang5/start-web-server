const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    minimizer: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [ 'default', { discardComments: { removeAll: true } } ],
            },
            canPrint: true
        }),
        new UglifyJsPlugin({
            test: /\.js$/i,
            extractComments: false,
            uglifyOptions: {
                warnings: false,
                mangle: true,
                keep_fnames: false,
            },
        }),
    ],
    splitChunks: {
        chunks: 'all',
        maxSize: 500 * 1024 * 1024,
        minChunks: 1,
        maxInitialRequests: 3,
        automaticNameDelimiter: '.',
        name: 'vendors'
    },
}