import {
  require_baseSlice
} from "./chunk-4QI5OKLV.js";
import {
  require_toInteger
} from "./chunk-KOVH33RT.js";
import {
  require_isIterateeCall
} from "./chunk-73AG7XXA.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/slice.js
var require_slice = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/slice.js"(exports, module) {
    var baseSlice = require_baseSlice();
    var isIterateeCall = require_isIterateeCall();
    var toInteger = require_toInteger();
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      } else {
        start = start == null ? 0 : toInteger(start);
        end = end === void 0 ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }
    module.exports = slice;
  }
});

export {
  require_slice
};
//# sourceMappingURL=chunk-6LLW4IZK.js.map
