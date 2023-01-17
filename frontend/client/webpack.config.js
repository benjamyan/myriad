const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            // {
            //     test: /\.(css|scss|sass)$/,
            //     use: ["style-loader", "css-loader", "sass-loader"],
            // },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    // CHANGE HERE
                    {
                        loader: 'resolve-url-loader',
                        options: {
                          root: '/', // considering all your images are placed in specified folder. Note: this is just a string that will get as prefix to image path
                          includeRoot: true,
                          absolute: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            // sourceMapContents: false,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: ["file-loader"],
                // loader:require.resolve("url-loader") + "?name=../[path][name].[ext]"
            },
            // {
            //     test: /\.svg$/,
            //     use: [
            //         {
            //             loader: 'svg-url-loader',
            //             options: {
            //                 limit: 10000,
            //             },
            //         },
            //     ],
            // },
            // {
            //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //   use: [
            //     {
            //       loader: 'file-loader',
            //       options: {
            //         name: '[name].[ext]',
            //         outputPath: 'fonts/'
            //       }
            //     }
            //   ]
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
};