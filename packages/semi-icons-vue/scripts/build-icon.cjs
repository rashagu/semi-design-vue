/**
 * Convert svg elements into React components
 */

const { resolve, extname, basename} = require('path');
const build = require('../../../script/build-svg');
const camelCase = require("camelcase");
const fs = require("fs");
const {optimize} = require("svgo");
const {default: svgr} = require("@svgr/core");
const prettier = require("prettier");
const prettierConfig = require("../../../.prettierrc");

// Semi Icon
const entryDir = resolve(__dirname, '../src/icons/svgs');
const outDir = resolve(__dirname, '../src/icons/icons');

const customTemplate = ({ template }, opts, { imports, interfaces, componentName, props, jsx, exports }) => {
    const plugins = ['jsx'];
    if (opts.typescript) {
        plugins.push('typescript');
    }
    const typeScriptTpl = template.smart({ plugins });
    return typeScriptTpl.ast`
import {defineComponent, ref, h, onActivated} from 'vue'
import { ConvertIcon, vuePropsType as iconVuePropsType} from '../components/Icon';
const SvgComponent = defineComponent((props, {slots}) => {
    return ()=>(${jsx});
})

const IconComponent = defineComponent({
    name:'semi_icon-activity',
    props: {
      ...iconVuePropsType
    },
    setup(props, {slots}){
        return ()=><ConvertIcon iconType={'activity'} {...props} >
          {{
            default:()=><SvgComponent/>
          }}
    </ConvertIcon>;
}})
export default IconComponent
export {SvgComponent}
`;
};

const svgoPlugins = [
    {
        name: 'convertColors',
        params: { currentColor: /^(?!url|none)./ },
    },
    {
        name: 'convertPathData',
        params: {
            floatPrecision: 2
        }
    },
    {
        name: 'cleanupListOfValues',
        active: true,
    },
    {
        name: 'removeStyleElement',
        active: true,
    },
    {
        name: 'removeViewBox',
        active: false,
    },
    {
        name: 'removeDimensions',
        active: true,
    },
];

// Semi icon library decolor
build(entryDir, outDir, 'Icon', '', svgoPlugins, { typescript: true, icon: true, template: customTemplate }, 'icons');



