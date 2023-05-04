import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/getDataAttr.js
function getDataAttr(props) {
  return Object.keys(props).reduce((prev, key) => {
    if (key.substr(0, 5) === "aria-" || key.substr(0, 5) === "data-" || key === "role") {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}
export {
  getDataAttr as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_utils_getDataAttr.js.map
