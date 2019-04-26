const path = require('path')
const DevServerConfig = require('./build/webpack-config/dev-server.js')
const RulesConfig = require('./build/webpack-config/rules.js')
const OptimizationConfig = require('./build/webpack-config/optimization.js')
const PluginsConfig = require('./build/webpack-config/plugins.js')
const baseUrl = process.env.baseUrl
console.log(baseUrl)

module.exports = {
    mode: process.env.NODE_ENV,
    stats: 'errors-only',
    entry: {
        'app': './src/main.ts',
    },
    output: {
        crossOriginLoading: 'anonymous',
        filename: 'js/[name][hash].js',
        chunkFilename: 'js/[name][hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: [ '.ts', '.js', '.json' ],
        mainFiles: [ 'index' ],
        modules: [ 'src', 'node_modules' ],
    },
    performance: {
        hints: false
    },
    optimization: OptimizationConfig,
    plugins: PluginsConfig,
    module: {
        rules: RulesConfig
    },
    devServer: DevServerConfig,
}
