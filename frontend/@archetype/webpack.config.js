const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default; // Require the plugin

module.exports = {
    entry: "./src/index.tsx",
    mode: process.env.NODE_ENV || "development",
    resolve: { 
        extensions: ['.js', '.ts', '.tsx'],
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ],
        fallback: {
            'react/jsx-runtime': 'react/jsx-runtime.js',
            'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
        }
    },
    devServer: { 
        static: { 
            directory: path.join(__dirname, "src") 
        },
        compress: false,
        port: 3001
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    output: {
        publicPath: ""
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            filename: 'component.html',
            template: path.join(__dirname, "public", "component.html"),
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: path.join(__dirname, "public", "index.html")
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.(ts|js|scss|css)$/]),
        new HTMLInlineCSSWebpackPlugin({
            leaveCSSFile: false,
            replace: {
                target: '<!-- inline_css_plugin -->',
                position: 'after',
                removeTarget: true
            }
        })
        
    ]
};