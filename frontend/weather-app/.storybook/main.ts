// .storybook/main.js

// module.exports = {
//     addons: ['@storybook/addon-essentials'],
//     babel: async (options) => ({
//         // Update your babel configuration here
//         ...options,
//     }),
//     framework: '@storybook/react',
//     stories: ['../src/**/*.stories.@(ts|tsx)'],
//     // stories: ['../src/**/*.stories.@(js|mdx)'],
//     webpackFinal: async (config, { configType }) => {
//         // Make whatever fine-grained changes you need
//         // Return the altered config
//         return config;
//     },
// };


// .storybook/main.ts

// Imports the Storybook's configuration API
import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
    staticDirs: ['../public'],
    stories: [
        '../src/**/*.stories.mdx', 
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    framework: '@storybook/react',
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
        postcss: false,
    },
    // refs: {
    //     'design-system': {
    //         title: 'Storybook Design System',
    //         url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
    //     },
    // },
};
module.exports = config;
