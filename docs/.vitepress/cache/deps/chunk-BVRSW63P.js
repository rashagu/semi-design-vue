import {
  require_isLength
} from "./chunk-XGO3WBYR.js";
import {
  require_isFunction
} from "./chunk-X27LVEKC.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

export {
  require_isArrayLike,
  require_baseUnary
};
//# sourceMappingURL=chunk-BVRSW63P.js.map
