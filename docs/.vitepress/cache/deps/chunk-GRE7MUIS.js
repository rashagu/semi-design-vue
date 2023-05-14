import {
  require_values
} from "./chunk-OL7AAX6S.js";
import {
  require_toInteger
} from "./chunk-KOVH33RT.js";
import {
  require_baseIndexOf
} from "./chunk-SKUJYBVG.js";
import {
  require_isArrayLike
} from "./chunk-BVRSW63P.js";
import {
  require_isString
} from "./chunk-NQE5YR5Y.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/includes.js
var require_includes = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/includes.js"(exports, module) {
    var baseIndexOf = require_baseIndexOf();
    var isArrayLike = require_isArrayLike();
    var isString = require_isString();
    var toInteger = require_toInteger();
    var values = require_values();
    var nativeMax = Math.max;
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
    }
    module.exports = includes;
  }
});

export {
  require_includes
};
//# sourceMappingURL=chunk-GRE7MUIS.js.map
