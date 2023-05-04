import {
  require_isObjectLike
} from "./chunk-7BHJLEWS.js";
import {
  require_baseGetTag
} from "./chunk-XKOYYM3K.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isNumber.js
var require_isNumber = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isNumber.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var numberTag = "[object Number]";
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
    }
    module.exports = isNumber;
  }
});

export {
  require_isNumber
};
//# sourceMappingURL=chunk-UV6QJF5D.js.map
