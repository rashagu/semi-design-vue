import 'vitepress/dist/client/theme-default/styles/fonts.css';
import 'vitepress/dist/client/theme-default/styles/vars.css';
import 'vitepress/dist/client/theme-default/styles/base.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';
import '@vue/repl/style.css'
import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue';
import Layout from './Layout.vue';
// Note: if we add more optional components here, i.e. components that are not
// used in the theme by default unless the user imports them, make sure to update
// the `lazyDefaultThemeComponentsRE` regex in src/node/build/bundle.ts.
export { default as VPImage } from 'vitepress/dist/client/theme-default/components/VPImage.vue';
export { default as VPButton } from 'vitepress/dist/client/theme-default/components/VPButton.vue';
export { default as VPHomeHero } from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue';
export { default as VPHomeFeatures } from 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue';
export { default as VPHomeSponsors } from 'vitepress/dist/client/theme-default/components/VPHomeSponsors.vue';
export { default as VPDocAsideSponsors } from 'vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue';
export { default as VPSponsors } from 'vitepress/dist/client/theme-default/components/VPSponsors.vue';
export { default as VPTeamPage } from 'vitepress/dist/client/theme-default/components/VPTeamPage.vue';
export { default as VPTeamPageTitle } from 'vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue';
export { default as VPTeamPageSection } from 'vitepress/dist/client/theme-default/components/VPTeamPageSection.vue';
export { default as VPTeamMembers } from 'vitepress/dist/client/theme-default/components/VPTeamMembers.vue';
export { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar';
const theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component('Badge', VPBadge);
  }
};
export default theme;
