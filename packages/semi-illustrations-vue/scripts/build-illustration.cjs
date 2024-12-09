/**
 * Convert svg elements into React components
 */

const { resolve } = require('path');
const build = require('../../../script/build-svg');

// Semi Illustrations
const entryDir = resolve(__dirname, '../src/svgs');
const outDir = resolve(__dirname, '../src/components/illustrations');

const svgoPlugins = [
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
];
const customTemplate = ({ template }, opts, { imports, interfaces, componentName, props, jsx, exports }) => {
    const plugins = ['jsx'];
    if (opts.typescript) {
        plugins.push('typescript');
    }
    const typeScriptTpl = template.smart({ plugins });
    return typeScriptTpl.ast`
import {defineComponent, h} from 'vue'
const SvgComponent = defineComponent((props, {slots}) => {
    return ()=>(${jsx});
})

const IconComponent = defineComponent({
    name:'semi_icon-activity',
    setup(){
        return ()=><SvgComponent />;
}})
IconComponent.props = {}
export default IconComponent
export {SvgComponent}
`;
};

build(entryDir, outDir, 'Illustration', '', svgoPlugins, { typescript: true, template: customTemplate },'illustrations');
