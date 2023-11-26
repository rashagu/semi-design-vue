import { defineConfig } from 'vitest/config';
import path from "path";
import Vue from "@vitejs/plugin-vue";
import Jsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [Vue(), Jsx()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: "v8",
      exclude:[
        "**/icons/**",
        "**/__tests__/**",
        "**/__test__/**",
        "**/__stories__/**",
        "storybook-static/**",
        "docs/**",
        ".storybook/**",
        "coverage/**",
        "**/dist/**",
        "**/locale/source/**",
        "**/lib/**",
        "**/scripts/**",
        "script/**",
        "**/stories/**",
        "dist/**",
        "packages/*/test{,s}/**",
        "**/*.d.ts",
        "cypress/**",
        "test{,s}/**",
        "test{,-*}.{js,cjs,mjs,ts,tsx,jsx}",
        "**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}",
        "**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}",
        "**/__tests__/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
        "**/.{eslint,mocha,prettier}rc.{js,cjs,yml}",
      ]
    },
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
  resolve:{
    alias:[
      {find: '@kousum/semi-icons-vue', replacement: path.resolve('./packages/semi-icons-vue/src/icons/index')},
      {find: '@kousum/semi-animation-vue', replacement: path.resolve('./packages/semi-animation-vue/index')},
      {find: '@kousum/semi-illustrations-vue', replacement: path.resolve('./packages/semi-illustrations-vue/index')}
    ]
  }
});
