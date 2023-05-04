import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import {
  require_isObjectLike
} from "./chunk-7BHJLEWS.js";
import {
  require_baseGetTag
} from "./chunk-XKOYYM3K.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isString.js
var require_isString = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isString.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isArray = require_isArray();
    var isObjectLike = require_isObjectLike();
    var stringTag = "[object String]";
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
    }
    module.exports = isString;
  }
});

export {
  require_isString
};
//# sourceMappingURL=chunk-NQE5YR5Y.js.map
