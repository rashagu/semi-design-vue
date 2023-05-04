import {
  require_getTag
} from "./chunk-KPUGFIAL.js";
import {
  require_baseKeys,
  require_isBuffer,
  require_isPrototype,
  require_isTypedArray
} from "./chunk-LI3LUTH5.js";
import {
  require_isArrayLike
} from "./chunk-BVRSW63P.js";
import {
  require_isArguments
} from "./chunk-54BFKMM2.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEmpty.js"(exports, module) {
    var baseKeys = require_baseKeys();
    var getTag = require_getTag();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLike = require_isArrayLike();
    var isBuffer = require_isBuffer();
    var isPrototype = require_isPrototype();
    var isTypedArray = require_isTypedArray();
    var mapTag = "[object Map]";
    var setTag = "[object Set]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }
    module.exports = isEmpty;
  }
});

export {
  require_isEmpty
};
//# sourceMappingURL=chunk-RSVADYER.js.map
