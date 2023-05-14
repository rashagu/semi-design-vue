import {
  require_isArrayLike
} from "./chunk-BVRSW63P.js";
import {
  require_overRest,
  require_setToString
} from "./chunk-RZZPN2AN.js";
import {
  require_identity
} from "./chunk-3ISLXTGF.js";
import {
  require_isObjectLike
} from "./chunk-7BHJLEWS.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseRest.js
var require_baseRest = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseRest.js"(exports, module) {
    var identity = require_identity();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + "");
    }
    module.exports = baseRest;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLikeObject.js
var require_isArrayLikeObject = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLikeObject.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    var isObjectLike = require_isObjectLike();
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    module.exports = isArrayLikeObject;
  }
});

export {
  require_baseRest,
  require_isArrayLikeObject
};
//# sourceMappingURL=chunk-YD5NMOCL.js.map
