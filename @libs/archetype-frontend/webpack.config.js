const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        compress: false
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
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
            { 
                test: /\.(ts|tsx)$/, 
                use: 'ts-loader' 
            },
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
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
};