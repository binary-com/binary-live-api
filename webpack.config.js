const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.js',
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'src'),
        }, {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: path.join(__dirname, 'src'),
        }],
    },
    output: {
        library: 'binary-live-api',
        libraryTarget: 'umd',
        path: 'lib',
        filename: 'binary-live-api.js',
    },
};
