<script setup lang="ts">
import { type OutputModes, Repl, useStore, useVueImportMap } from '@vue/repl';
// import Monaco from '@vue/repl/monaco-editor'
import CodeMirror from '@vue/repl/codemirror-editor'
import { onMounted, PropType, ref } from 'vue';
import {useData} from "vitepress";

const props = defineProps({
  files: {
    type: Object,
  },
  layout: String as PropType<'vertical' | 'horizontal'>
})

const {isDark} = useData();

// retrieve some configuration options from the URL
const query = new URLSearchParams(location.search)


const {
  importMap: builtinImportMap,
  vueVersion,
  productionMode,
} = useVueImportMap({
  // specify the default URL to import Vue runtime from in the sandbox
  // default is the CDN link from jsdelivr.com with version matching Vue's version
  // from peerDependency
  // runtimeDev: import.meta.env.BASE_URL + 'vue.runtime.esm-browser.js',
  runtimeProd: import.meta.env.BASE_URL + 'runtime-dom.esm-browser.prod.js',
  // serverRenderer: import.meta.env.BASE_URL + 'server-renderer.esm-browser.js',
})
builtinImportMap.value.imports = {
  "@kousum/semi-ui-vue": import.meta.env.BASE_URL + 'semi/semi-ui-vue.js',
  "@kousum/semi-icons-vue": import.meta.env.BASE_URL + 'semiIcons/semi-icons-vue.js',
}

const store = useStore(
  {
    // pre-set import map
    builtinImportMap,
    vueVersion,
    // starts on the output pane (mobile only) if the URL has a showOutput query
    showOutput: ref(query.has('showOutput')),
    // starts on a different tab on the output pane if the URL has a outputMode query
    // and default to the "preview" tab
    outputMode: ref((query.get('outputMode') || 'preview') as OutputModes),

  },
  // initialize repl with previously serialized state
  // location.hash,
)


const previewOptions = {
  headHTML: `
<link rel="stylesheet" href="${import.meta.env.BASE_URL}reset.css" data-n-g="">
<link rel="stylesheet" href="${import.meta.env.BASE_URL}semi/style.css" data-n-g="">
<link rel="stylesheet" href="${import.meta.env.BASE_URL}semiIcons/style.css" data-n-g="">
<style>

@font-face {
  font-family: "Inter";
  src: url("${import.meta.env.BASE_URL}font/Inter-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "Inter-Bold";
  src: url("${import.meta.env.BASE_URL}font/Inter-Bold.ttf") format("truetype");
}

.grid .semi-row,.grid .semi-row-flex {
    text-align: center
}

.grid .semi-row-flex .semi-col,.grid .semi-row .semi-col {
    min-height: 30px;
    line-height: 30px;
    background: var(--semi-color-primary-light-default);
    outline: 1px solid var(--semi-color-primary-light-active)
}

.grid.grid-gutter .semi-col .col-content,.grid.grid-gutter .semi-col .gutter-box {
    background: var(--semi-color-primary-light-hover)
}

.grid-flex .semi-row-flex {
    height: 50px;
    background: var(--semi-color-fill-0)
}

.components-layout-demo {
    box-sizing: border-box;
    position: relative;
    text-align: center;
    margin: 60px;
    border-top: 22px solid var(--semi-color-fill-1);
    border-radius: 5px 5px 0 0;
    box-shadow: var(--semi-shadow-elevated);
    color: var(--semi-color-text-1);
}
.components-layout-demo:before {
    content: "";
    position: absolute;
    top: -14px;
    left: 12px;
    display: block;
    width: 6px;
    height: 6px;
    background-color: rgba(var(--semi-red-4), 1);
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(var(--semi-red-4), 1), 15px 0 0 2px rgba(var(--semi-yellow-4), 1), 30px 0 0 2px rgba(var(--semi-green-4), 1);
}

</style>
<script>

const mql = window.matchMedia('(prefers-color-scheme: dark)');

function matchMode(e) {
    const body = document.body;
    if (e.matches) {
        if (!body.hasAttribute('theme-mode')) {
            body.setAttribute('theme-mode', 'dark');
            body.setAttribute('style', "background-color: var(--semi-color-nav-bg);color: #fff;")
        }
    } else {
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
            body.removeAttribute('style')
        }
    }
}

mql.addEventListener('change', matchMode);
document.addEventListener('DOMContentLoaded', function() {
  if (${isDark.value}){
    matchMode({matches: true})
  }
});

<\/script>
`
}


store.setFiles({
  'tsconfig.json': store.getFiles()['tsconfig.json'],
  'import-map.json': store.getFiles()['import-map.json'],
  ...props.files
}, Object.keys(props.files)[0]).then(()=>{
  // store.setFiles(store.getFiles())
})


// production mode is enabled
productionMode.value = true
</script>

<template>
  <Repl :theme="'dark'" :layout="layout" :layoutReverse="true" :preview-options="previewOptions" style="width: 100%;height: 100%;" :store="store" :editor="CodeMirror" :showCompileOutput="true" />
</template>
