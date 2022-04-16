
const fs = require('fs');
const {resolve} = require("path");
let svgContent = fs.readFileSync(resolve(__dirname, '../package.json'), 'utf-8');

svgContent = svgContent
    .replaceAll(`"main": "index.ts"`,`"main": "index.js"`)
    .replaceAll(`"module": "index.ts"`,`"module": "index.js"`)
fs.writeFileSync(resolve(__dirname, '../lib/package.json'), svgContent, 'utf-8');
