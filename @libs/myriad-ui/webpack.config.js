const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: "./src/index.ts",
        components: "./src/components/index.ts"
    },
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
        port: 4000
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
            //     options: {
            //         exportType: "css-style-sheet",
            //     }
            // },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader'
            },

            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    // CHANGE HERE
                    {
                        loader: 'resolve-url-loader',
                        options: {
                          root: '/lib', // considering all your images are placed in specified folder. Note: this is just a string that will get as prefix to image path
                          includeRoot: true,
                          absolute: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false,
                        },
                    },

                ],
            },
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         "css-loader",
            //         "postcss-loader",
            //         "sass-loader",
            //     ],
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ],
    },
    output: {
        library: 'shared',
        // module: true,
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        // libraryTarget: 'module'
        // enabledLibraryTypes: ['module'],
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: path.join(__dirname, "public", "index.html"),
    //     }),
    // ],
};