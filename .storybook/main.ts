import { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../packages/**/src/**/*.mdx",
    "../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  async viteFinal(config, options) {
    // Add your configuration here
    return {
      ...config,
      build: {
        ...config.build,
        rollupOptions: {
          external: [ './sb-preview/runtime.js' ],
          output: {
            // 入口文件名
            // 块文件名
            chunkFileNames: 'assets/github_[name]-[hash].js',
          },
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
          @import "@douyinfe/semi-theme-default/scss/global.scss";
          @import "@douyinfe/semi-theme-default/scss/index.scss";
          @import "../packages/semi-ui-vue/src/docDemo.scss";
        `,
          }
        }
      },
    };
  },
  "docs": {
    "autodocs": "tag"
  }
};
export default config;
