let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let contextPath = path.resolve(__dirname, './');
let outputPath = 'hugo/published/dev/dist/js';

let config = {
    entry: {
        'bundle': './dev/js/bundle.js',
        //'preloader': './dev/js/preloader.js',
        //'inline-images': './dev/js/inline-images.js',
    },

    output: {
        path: path.resolve(contextPath, outputPath),
        filename: '[name].js',
        publicPath: outputPath
    },

    resolve: {
        modules: [
            'dev/js',
            'node_modules',
        ]
    },

    module: {
        loaders: [
            { test: /\.js/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.less$/, include: path.resolve(contextPath, './dev/css'), loader: ExtractTextPlugin.extract(
                [{
                    loader: 'css-loader', options: { sourceMap: true }
                }, {
                    loader: 'less-loader', options: { sourceMap: true }
                }])
            },
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?name=[name]-[hash].[ext]' },
            { test: /\.exec\.js$/, loader: 'script-loader' },
            { test: /\.legacy\.js$/, loader: 'legacy-loader' },
        ],
    },

    plugins: [
        new ExtractTextPlugin({ filename: (getPath) => { return getPath('../css/[name].css'); }, allChunks: true }),
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }),
    ],

    context: contextPath
};

module.exports = config