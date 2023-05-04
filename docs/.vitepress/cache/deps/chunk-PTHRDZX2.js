import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFindIndex.js
var require_baseFindIndex = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFindIndex.js"(exports, module) {
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    module.exports = baseFindIndex;
  }
});

export {
  require_baseFindIndex
};
//# sourceMappingURL=chunk-PTHRDZX2.js.map
