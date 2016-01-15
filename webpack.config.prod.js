var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:  [
        './src'
    ],
    output: {
        path: path.join(__dirname),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'shared'],
        extensions:         ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test:    /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?experimental'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer!resolve-url-loader!sass-loader')
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: 'production'
        })
    ],
    sassLoader: {
        outputStyle: 'compressed'
    }
};
