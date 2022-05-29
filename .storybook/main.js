const {re} = require("@babel/core/lib/vendor/import-meta-resolve");
const path = require("path");
const { mergeConfig } = require('vite');
const vueJsx = require('@vitejs/plugin-vue-jsx');
module.exports = {
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

    return mergeConfig(config, {
      plugins: [
        vueJsx({
          // options are passed on to @vue/babel-plugin-jsx
        }),
      ],
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
          {find: /^~/, replacement: ''}
        ]
      }
    });
  },
}