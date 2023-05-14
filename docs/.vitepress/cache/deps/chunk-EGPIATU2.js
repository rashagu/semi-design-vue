import {
  require_isArrayLike
} from "./chunk-BVRSW63P.js";
import {
  require_isIndex
} from "./chunk-T6W56XAT.js";
import {
  require_eq
} from "./chunk-TY6AJI44.js";
import {
  require_isObject
} from "./chunk-X27LVEKC.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIterateeCall.js"(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});

export {
  require_isIterateeCall
};
//# sourceMappingURL=chunk-EGPIATU2.js.map
