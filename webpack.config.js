const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');

const app_dir = process.cwd();

let common = {
    entry: {
        carengo: path.resolve(app_dir, 'src', 'app', 'index.jsx')
    },
    output: {
        path: path.resolve(app_dir, 'static'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : path.join(app_dir, 'src', 'app'),
                loader : 'babel-loader',
                query: {
                    "presets": ["es2015", "react", "stage-2"],
                    "plugins": []
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'sass-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
                loader: "file-loader?name=[name].[ext]",
                query: {
                    name: 'assets/[name].[ext]',
                    publicPath: '/'
                }
            },
            {
                test: /\.json$/,
                loader: "file-loader?name=[name].[ext]",
                query: {
                    name: 'data/[name].[ext]',
                    publicPath: '/'
                }
            },
        ]
    },
    plugins: [
        //new CleanPlugin([path.resolve(app_dir, "dist")]),
        new  ExtractTextPlugin("css/[name].css", {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendors", "manifest"]
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
            path.resolve(app_dir, 'src', 'app'),
            'node_modules'
        ]
    }
};

let develop = {
    devtool: 'cheap-module-source-map'
};

let release = {
    devtool: 'cheap-module-source-map'
};

if ('production' === process.env.NODE_ENV) {
    module.exports = merge(common, release);
}
else {
    module.exports = merge(common, develop);
}
