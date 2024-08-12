
// dependencies
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('dotenv').config();

// console.log(env, environment, backendUrl);

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, "dist"),
        filename: "index_bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: JSON.stringify(process.env.API_URL)
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};
