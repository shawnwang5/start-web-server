const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV !== 'production'

module.exports = [
    {
        test: /\.(png|svg|jpg|gif)$/, use: [ {
            loader: 'file-loader',
            options: { name: 'img/[name].[hash].[ext]' }
        } ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/, use: [ {
            loader: 'file-loader',
            options: { name: 'img/[name].[hash].[ext]' }
        } ]
    },
    { test: /\.vue$/, use: [ 'vue-loader' ] },
    {
        test: /\.s?css$/,
        use: [
            isProduction ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'
        ]
    },
    {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [ /\.vue$/ ] },
        exclude: /node_modules/
    },
    {
        test: /\.js$/,
        exclude: (resource) => {
            if (/node_modules/.test(resource)) {
                return !/muse-ui/.test(resource)
            }
        },
        use: [ 'babel-loader' ]
    },
]