
const _ = require('lodash');
module.exports = {
  "stories": [
    "../../story/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    {
      name: "@storybook/preset-scss",
      options: {
        sassLoaderOptions:{
          additionalData: `
          @import "~@douyinfe/semi-theme-default/scss/global.scss";
          @import "~@douyinfe/semi-theme-default/scss/index.scss";
        `,
        }
      }
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-actions'
  ],
  "framework": "@storybook/vue3",
  core: {
    builder: 'webpack5',
  }
  // "core": {
  //   "builder": "storybook-builder-vite"
  // }
}
