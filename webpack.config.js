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
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
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

/*

var webpack = require('webpack');

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

var is_production =  process.env.NODE_ENV === 'production';
if (is_production) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        })
    );
}

module.exports = {
    entry: [
        './src'
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }]
    },
    output: {
        library: 'binary-live-api',
        libraryTarget: 'umd',
        path: 'dist',
        filename: is_production ? 'binary-live-api.min.js' : 'binary-live-api.js'
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js']
    }
};

*/
