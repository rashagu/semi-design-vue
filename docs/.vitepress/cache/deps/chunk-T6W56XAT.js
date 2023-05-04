import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

export {
  require_isIndex
};
//# sourceMappingURL=chunk-T6W56XAT.js.map
