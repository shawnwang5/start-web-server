const path = require('path')
const projectPath = __dirname.replace(`build${path.sep}webpack-config`, '')

module.exports = {
    watchContentBase: true,
    useLocalIp: true,
    open: true,
    clientLogLevel: 'warning',
    openPage: 'index.html',
    host: '0.0.0.0',
    compress: true,
    overlay: true,
    contentBase: projectPath,
    disableHostCheck: true,
    port: 9000,
    hot: true,
    hotOnly: true,
    inline: true,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            pathRewrite: { '^/api': '' }
        }
    },
    historyApiFallback: {
        rewrites: [
            { from: /^\/$/, to: '/index.html' },
            { from: /./, to: '/index.html' }
        ]
    },
    before: function (app, server) {
        app.get('/some/path', function (req, res) {
            res.json({ custom: 'response' })
        })
    },
    after (app, server) {
    },
    allowedHosts: []
}