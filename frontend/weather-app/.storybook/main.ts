import type { StorybookConfig } from '@storybook/core-common';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

const config: StorybookConfig = {
    framework: '@storybook/react',
    staticDirs: [
        '../public',
        // '../src/assets/icons'
        // {
        //     from: '../src/assets/icons',
        //     to: 'assets/icons/'
        // }
    ],
    stories: [
        '*.stories.@(js|jsx|ts|tsx)',
        '../src/*.stories.@(js|jsx|ts|tsx)',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/**/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        // '@storybook/react',
        // '@storybook/preset-create-react-app',
        '@storybook/addon-interactions',
    ],
    typescript: {
        check: true,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        }
    },
    core: {
        builder: 'webpack5',
        disableTelemetry: true,
        enableCrashReports: false,
    },
    features: {
        postcss: true,
    },
    webpackFinal: async (config, { configType }) => {
      // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
      // You can change the configuration based on that.
      // 'PRODUCTION' is used when building the static version of storybook.
  
      // Make whatever fine-grained changes you need
      if (!config.module) config.module = {};
      if (!config.module.rules) config.module.rules = [];
      config.module?.rules?.push(
        // {
        //     test: /\.scss$/,
        //     use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        //     // use: ['style-loader', 'css-loader?url=false', 'sass-loader'],
        //     include: path.resolve(__dirname, '../'),
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

        // {
        //     test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        //     use: ["file-loader"],
        // },  
        // {
        //     test: /\.(jpg|jpeg|svg|gif|png)$/,
        //     loader: "file-loader",
        //     options: {
        //         // name: '[path][name].[ext]',
        //         name(resourcePath, resourceQuery) {
        //             console.log(resourcePath)
        //             console.log(resourceQuery)
        //             return `${resourcePath.split(__dirname + '/')[1]}`
        //         //   if (process.env.NODE_ENV === 'development') {
        //         //     return '[path][name].[ext]';
        //         //   }
       
        //         //   return '[contenthash].[ext]';
        //         },
        //     }
        // }, 
        // {
        //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
        //     type: 'asset/resource',
        // },

        // {
        //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
        //     loader: "file-loader",
        //     options: {
        //         // name: '[path][name].[ext]',
        //         name(resourcePath, resourceQuery) {
        //             console.log(resourcePath)
        //             console.log(resourceQuery)
        //             return `${resourcePath.split(__dirname + '/')[1]}`
        //         //   if (process.env.NODE_ENV === 'development') {
        //         //     return '[path][name].[ext]';
        //         //   }
       
        //         //   return '[contenthash].[ext]';
        //         },
        //     }
        // }, 
      );

      if (!config.plugins) config.plugins = [];
      config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }))

      // Return the altered config
      return config;
    },
    // refs: {
    //     'design-system': {
    //         title: 'Storybook Design System',
    //         url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
    //     },
    // },
};
module.exports = config;
