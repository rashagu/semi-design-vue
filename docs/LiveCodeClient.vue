<script setup lang="ts">
import { type OutputModes, Repl, useStore, useVueImportMap } from '@vue/repl';
// import Monaco from '@vue/repl/monaco-editor'
import CodeMirror from '@vue/repl/codemirror-editor';
import { onMounted, PropType, ref } from 'vue';
import { useData } from 'vitepress';

const props = defineProps({
  files: {
    type: Object,
  },
  layout: String as PropType<'vertical' | 'horizontal'>,
});

const { isDark } = useData();

// retrieve some configuration options from the URL
const query = new URLSearchParams(location.search);

const {
  importMap: builtinImportMap,
  vueVersion,
  productionMode,
} = useVueImportMap({
  // specify the default URL to import Vue runtime from in the sandbox
  // default is the CDN link from jsdelivr.com with version matching Vue's version
  // from peerDependency
  // runtimeDev: import.meta.env.BASE_URL + 'vue.runtime.esm-browser.js',
  runtimeProd: import.meta.env.BASE_URL + 'runtime-dom.esm-browser.js',
  // serverRenderer: import.meta.env.BASE_URL + 'server-renderer.esm-browser.js',
});
builtinImportMap.value.imports = {
  '@kousum/semi-ui-vue': import.meta.env.BASE_URL + 'semi/semi-ui-vue.js',
  '@kousum/semi-icons-vue': import.meta.env.BASE_URL + 'semiIcons/semi-icons-vue.js',
  '@kousum/semi-icons-lab-vue': import.meta.env.BASE_URL + 'semiIconsLab/semi-icons-lab-vue.js',
  'lodash': import.meta.env.BASE_URL + 'lodash.js',
  'date-fns': import.meta.env.BASE_URL + 'date-fns.js',
  '@kousum/semi-illustrations-vue': import.meta.env.BASE_URL + 'semiIllustrations/semi-illustrations-vue.js',
};

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
  }
  // initialize repl with previously serialized state
  // location.hash,
);

const previewOptions = {
  headHTML: `
<!--<link rel="stylesheet" href="${import.meta.env.BASE_URL}reset.css">-->
<link rel="stylesheet" href="${import.meta.env.BASE_URL}semi/semi-ui-vue.css">
<link rel="stylesheet" href="${import.meta.env.BASE_URL}semiIcons/semi-icons-vue.css">
<link rel="stylesheet" href="${import.meta.env.BASE_URL}semiIconsLab/semi-icons-lab-vue.css">
<style>
#app{
padding: 10px;
}

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



.components-layout-demo {
  box-sizing: border-box;
  position: relative;
  text-align: center;
  margin: 60px;
  border-top: 22px solid var(--semi-color-fill-1);
  border-radius: 5px 5px 0 0;
  box-shadow: var(--semi-shadow-elevated);
  color: var(--semi-color-text-1)
}

.components-layout-demo:before {
  content: "";
  position: absolute;
  top: -14px;
  left: 12px;
  display: block;
  width: 6px;
  height: 6px;
  background-color: rgba(var(--semi-red-4),1);
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(var(--semi-red-4),1),15px 0 0 2px rgba(var(--semi-yellow-4),1),30px 0 0 2px rgba(var(--semi-green-4),1)
}

.components-layout-demo .semi-layout-sider-children {
  display: flex;
  align-items: center;
  margin: 0 36px
}

.components-banner-demo .semi-banner-info.semi-banner-bordered {
  border: 1px solid var(--semi-color-primary-disabled)
}

.components-banner-demo .semi-banner-warning.semi-banner-bordered {
  border: 1px solid var(--semi-color-warning-light-active)
}

.components-banner-demo .semi-banner-danger.semi-banner-bordered {
  border: 1px solid var(--semi-color-danger-light-active)
}

.components-banner-demo .semi-banner-success.semi-banner-bordered {
  border: 1px solid var(--semi-color-success-light-active)
}


.components-select-demo-renderOptionItem .custom-option-render {
    font-size: 14px;
    line-height: 20px;
    word-break: break-all;
    padding: 8px 12px;
    color: var(--semi-color-text-0);
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box
}

.components-select-demo-renderOptionItem .custom-option-render .option-right {
  margin-left: 8px;
  display: inline-flex;
  align-items: center
}

.components-select-demo-renderOptionItem .custom-option-render:active {
  background-color: var(--semi-color-fill-1)
}

.components-select-demo-renderOptionItem .custom-option-render-focused {
  background-color: var(--semi-color-fill-0)
}

.components-select-demo-renderOptionItem .custom-option-render-disabled {
  color: var(--semi-color-disabled-text);
  cursor: not-allowed
}

.components-select-demo-renderOptionItem .custom-option-render:first-of-type {
  margin-top: 4px
}

.components-select-demo-renderOptionItem .custom-option-render:last-of-type {
  margin-bottom: 4px
}

.components-typography-demo {
  word-break: break-word;
  word-break: break-all
}

.components-cascader-demo .semi-cascader-option-lists {
  max-width: 510px;
  overflow-x: auto
}

.component-list-demo-booklist .list-item:hover {
  background-color: var(--semi-color-fill-0)
}

.component-list-demo-booklist .list-item:active {
  background-color: var(--semi-color-fill-1)
}

body>.component-list-demo-drag-item {
  font-size: 14px
}

.component-list-demo-booklist-active-item {
  background-color: var(--semi-color-fill-0)
}



.component-chat-demo-custom-render .time {
  font-size: 12px;
  color: var(--semi-color-text-2);
  visibility: hidden
}

.component-chat-demo-custom-render .title {
  display: flex;
  align-items: center;
  column-gap: 10px
}

.component-chat-demo-custom-render .semi-chat-chatBox:hover .time {
  visibility: visible
}

.component-chat-demo-custom-render .semi-chat-chatBox-right .title {
  flex-direction: row-reverse
}

.btn-margin-right button{
  margin-right: 10px;
}

#components-table-demo-drag-sorting tr.drop-over-downward td {
  border-bottom: 2px dashed #1890ff;
}
#components-table-demo-drag-sorting tr.drop-over-upward td {
  border-top: 2px dashed #1890ff;
}
.grid .semi-row, .grid .semi-row-flex {
  text-align: center;
}
.grid .semi-row .semi-col, .grid .semi-row-flex .semi-col {
  min-height: 30px;
  line-height: 30px;
  background: var(--semi-color-primary-light-default);
  outline: 1px solid var(--semi-color-primary-light-active);
}
.grid.grid-gutter .semi-col .gutter-box, .grid.grid-gutter .semi-col .col-content {
  background: var(--semi-color-primary-light-hover);
}
.grid-flex .semi-row-flex {
  height: 50px;
  background: var(--semi-color-fill-0);
}
#components-table-demo-resizable-column .my-resizing {
  border-right: 2px solid red;
}
#components-table-demo-resizable-column .react-resizable-handle:hover {
  background-color: red;
}
#components-table-demo-resizable-column .my-resizing:hover .react-resizable-handle {
  background-color: inherit;
}
#components-table-demo-drag-sorting tr.drop-over-downward td {
  border-bottom: 2px dashed #1890ff;
}
#components-table-demo-drag-sorting tr.drop-over-upward td {
  border-top: 2px dashed #1890ff;
}
.semi-right-item-drag-handler {
  margin-right: 8px;
  cursor: pointer;
}
.components-transfer-demo-selected-item .semi-icon-close {
  visibility: hidden;
  color: var(--semi-color-tertiary);
}
.components-transfer-demo-selected-item:hover .semi-icon-close {
  cursor: pointer;
  visibility: visible;
}
.component-transfer-demo-custom-panel .sp-font {
  color: rgba(var(--semi-grey-9), 1);
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
}
.component-transfer-demo-custom-panel .empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.component-transfer-demo-custom-panel .panel-item {
  flex-shrink: 0;
  height: 56px;
  border-radius: 4px;
  padding: 8px 12px;
  flex-wrap: wrap;
  background-color: rgba(22, 24, 35, 0.03);
}
.component-transfer-demo-custom-panel .panel-item-main {
  flex-grow: 1;
}
.component-transfer-demo-custom-panel .panel-item p {
  margin: 0 12px;
  flex-basis: 100%;
}
.component-transfer-demo-custom-panel .panel-item .panel-item-remove {
  cursor: pointer;
  color: var(--semi-color-primary);
}
.component-transfer-demo-custom-panel .panel-header {
  padding: 10px 12px;
  border: 1px solid rgba(22, 24, 35, 0.16);
  border-radius: 4px 4px 0 0;
  height: 38px;
  box-sizing: border-box;
  background-color: var(--semi-color-tertiary-light-default);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.component-transfer-demo-custom-panel .panel-header .clear {
  cursor: pointer;
  color: var(--semi-color-primary);
}
.component-transfer-demo-custom-panel .source-panel {
  display: flex;
  flex-direction: column;
  width: 482px;
  height: 353px;
  margin-right: 16px;
}
.component-transfer-demo-custom-panel .source-panel .panel-main {
  border: 1px solid var(--semi-color-border);
  border-top: none;
}
.component-transfer-demo-custom-panel .source-panel .panel-main .panel-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 8px;
  overflow-y: auto;
  height: 214px;
  margin-left: 12px;
  margin-right: 12px;
  padding-bottom: 8px;
}
.component-transfer-demo-custom-panel .source-panel .panel-controls {
  margin: 10px 12px;
  font-size: 12px;
  line-height: 20px;
}
.component-transfer-demo-custom-panel .source-panel .panel-controls .semi-button {
  margin-left: 8px;
  font-size: 12px;
}
.component-transfer-demo-custom-panel .source-panel .panel-item {
  width: 176px;
}
.component-transfer-demo-custom-panel .selected-panel {
  width: 200px;
  height: 353px;
}
.component-transfer-demo-custom-panel .selected-panel .panel-main {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 12px;
  border: 1px solid var(--semi-color-border);
  border-top: none;
  height: 323px;
  box-sizing: border-box;
  row-gap: 8px;
}
.components-transfer-demo-selected-item, .components-transfer-demo-source-item {
  height: 52px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
}
.components-transfer-demo-selected-item:hover, .components-transfer-demo-source-item:hover {
  background-color: var(--semi-color-fill-0);
}
.components-transfer-demo-selected-item .info, .components-transfer-demo-source-item .info {
  margin-left: 8px;
  flex-grow: 1;
}
.components-transfer-demo-selected-item .name, .components-transfer-demo-source-item .name {
  font-size: 14px;
  line-height: 20px;
}
.components-transfer-demo-selected-item .email, .components-transfer-demo-source-item .email {
  font-size: 12px;
  line-height: 16px;
  color: var(--semi-color-text-2);
}
.components-upload-demo-drag-area {
  border-radius: var(--semi-border-radius-small);
  border: 2px dashed var(--semi-color-border);
  width: 100%;
  padding: 12px;
  background-color: var(--semi-color-tertiary-light-default);
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
  justify-content: center;
}
.components-upload-demo-drag-area:hover {
  background-color: var(--semi-color-primary-light-default);
  border-color: var(--semi-color-primary);
}
.components-transfer-demo-selected-item .semi-icons-close {
  visibility: hidden;
  color: var(--semi-color-tertiary);
}
.components-transfer-demo-selected-item:hover .semi-icons-close {
  visibility: visible;
}
.components-transfer-demo-selected-item, .components-transfer-demo-source-item {
  height: 52px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
}
.components-transfer-demo-selected-item:hover, .components-transfer-demo-source-item:hover {
  background-color: var(--semi-color-fill-0);
}
.components-transfer-demo-selected-item .info, .components-transfer-demo-source-item .info {
  margin-left: 8px;
  flex-grow: 1;
}
.components-transfer-demo-selected-item .name, .components-transfer-demo-source-item .name {
  font-size: 14px;
  line-height: 20px;
}
.components-transfer-demo-selected-item .email, .components-transfer-demo-source-item .email {
  font-size: 12px;
  line-height: 16px;
  color: var(--semi-color-text-2);
}
.components-datepicker-demo-day-inrange, .components-datepicker-demo-day-hover {
  background: var(--semi-color-primary-light-hover);
}
.components-datepicker-demo-day-selected, .components-datepicker-demo-day-selected-start, .components-datepicker-demo-day-selected-end {
  color: var(--semi-color-bg-2);
  background: var(--semi-color-primary);
}
.components-datepicker-demo-slot .semi-tabs-content {
  padding: 0;
}
.components-datepicker-demo-slot .semi-tabs-bar-line.semi-tabs-bar-top {
  border-bottom: none;
}
.avatar-upload .semi-upload-add {
  border-radius: 50%;
}
.btn-margin-right .semi-button, .btn-margin-right.semi-button {
  margin-right: 8px;
}
.tag-margin-right .semi-tag, .tag-margin-right.semi-tag {
  margin-right: 8px;
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
.components-layout-demo::before {
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
.components-layout-demo .semi-layout-content {
  box-sizing: border-box;
  height: 300px;
  line-height: 300px;
}
.components-layout-demo .semi-layout-header, .components-layout-demo .semi-layout-footer {
  box-sizing: border-box;
  height: 64px;
  line-height: 64px;
  padding-left: 50px;
  padding-right: 50px;
  background: var(--semi-color-fill-0);
}
.components-layout-demo .semi-layout-sider {
  box-sizing: border-box;
  width: 120px;
  background: var(--semi-color-fill-2);
}
.components-layout-demo .semi-layout-sider-children {
  display: flex;
  align-items: center;
  margin: 0 36px;
}
.components-banner-demo .semi-banner-info.semi-banner-bordered {
  border: 1px solid var(--semi-color-primary-disabled);
}
.components-banner-demo .semi-banner-warning.semi-banner-bordered {
  border: 1px solid var(--semi-color-warning-light-active);
}
.components-banner-demo .semi-banner-danger.semi-banner-bordered {
  border: 1px solid var(--semi-color-danger-light-active);
}
.components-banner-demo .semi-banner-success.semi-banner-bordered {
  border: 1px solid var(--semi-color-success-light-active);
}
.components-select-demo-renderOptionItem .custom-option-render {
  display: flex;
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: var(--semi-color-text-0);
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
}
.components-select-demo-renderOptionItem .custom-option-render .option-right {
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
}
.components-select-demo-renderOptionItem .custom-option-render:active {
  background-color: var(--semi-color-fill-1);
}
.components-select-demo-renderOptionItem .custom-option-render-focused {
  background-color: var(--semi-color-fill-0);
}
.components-select-demo-renderOptionItem .custom-option-render-disabled {
  color: var(--semi-color-disabled-text);
  cursor: not-allowed;
}
.components-select-demo-renderOptionItem .custom-option-render:first-of-type {
  margin-top: 4px;
}
.components-select-demo-renderOptionItem .custom-option-render:last-of-type {
  margin-bottom: 4px;
}
.components-typography-demo {
  word-break: break-word;
  word-break: break-all;
}
.components-cascader-demo .semi-cascader-option-lists {
  max-width: 510px;
  overflow-x: auto;
}
.component-list-demo-booklist .list-item:hover {
  background-color: var(--semi-color-fill-0);
}
.component-list-demo-booklist .list-item:active {
  background-color: var(--semi-color-fill-1);
}
body > .component-list-demo-drag-item {
  font-size: 14px;
}
.component-list-demo-booklist-active-item {
  background-color: var(--semi-color-fill-0);
}
.components-typography-demo {
  word-break: break-word;
}
html {
  font-size: 14px;
}
.semi-table-demo11_DragOverlay tr, .semi-table-demo11_DragOverlay td {
  background-color: #fff !important;
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
`,
};

const isTsx = Object.keys(props.files)[0].indexOf('.tsx') > -1;
let files = {
  ...props.files,
};
if (isTsx) {
  files = {
    [Object.keys(props.files)[0].replace('.tsx', 'App.vue')]: `<script setup>
import Demo from '${Object.keys(props.files)[0].replace('src/', './')}'
<\/script>

<template>
  <Demo />
</template>`,
    ...props.files,
  };
}

store
  .setFiles(
    {
      'tsconfig.json': store.getFiles()['tsconfig.json'],
      'import-map.json': store.getFiles()['import-map.json'],
      ...files,
    },
    Object.keys(files)[0]
  )
  .then(() => {
    // store.setFiles(store.getFiles())
    if (isTsx) {
      store.setActive(Object.keys(files)[1]);
    }
  });

// production mode is enabled
productionMode.value = true;
</script>

<template>
  <Repl
    :theme="'dark'"
    :layout="layout"
    :layoutReverse="true"
    :preview-options="previewOptions"
    style="width: 100%; height: 100%"
    :store="store"
    :editor="CodeMirror"
    :showCompileOutput="true"
  />
</template>
