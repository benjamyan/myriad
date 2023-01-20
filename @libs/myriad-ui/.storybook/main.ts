import type { StorybookConfig } from '@storybook/core-common';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

const config: StorybookConfig = {
    framework: '@storybook/react',
    stories: [
        '*.stories.@(js|jsx|ts|tsx)',
        '../src/*.stories.@(js|jsx|ts|tsx)',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/**/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    staticDirs: [
        '../public',
        // '../src/assets/icons'
        {
            from: '../src/assets/icons',
            to: 'assets/icons/'
        }
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
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            // use: ['style-loader', 'css-loader?url=false', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        },
        {
            test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
            use: ["file-loader"],
        }
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
