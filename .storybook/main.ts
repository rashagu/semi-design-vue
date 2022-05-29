// .storybook/main.ts

import type { StorybookViteConfig } from '@storybook/builder-vite';
import path from "path";

const config: StorybookViteConfig = {
  "stories": [
    "../story/__stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../story/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config, options) {
    // Add your configuration here
    config = {
      ...config,
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
          @import "~@douyinfe/semi-theme-default/scss/global.scss";
          @import "~@douyinfe/semi-theme-default/scss/index.scss";
        `,
          }
        }
      },
      resolve: {
        alias: [
          {find: /^~/, replacement: ''},
          {find: '@kousum/semi-icons-vue', replacement: path.resolve('../pagckages/semi-icons-vue/index')},
          {find: '@kousum/semi-animation-vue', replacement: path.resolve('../pagckages/semi-animation-vue/index')},
          {find: '@kousum/semi-illustrations-vue', replacement: path.resolve('../pagckages/semi-illustrations-vue/index')}
        ]
      }
    }
    return config;
  },
};

export default config;