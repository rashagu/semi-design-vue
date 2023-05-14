import {
  require_baseKeys,
  require_isBuffer,
  require_isTypedArray
} from "./chunk-LI3LUTH5.js";
import {
  require_isArrayLike
} from "./chunk-BVRSW63P.js";
import {
  require_isArguments
} from "./chunk-54BFKMM2.js";
import {
  require_isIndex
} from "./chunk-T6W56XAT.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

export {
  require_arrayLikeKeys,
  require_keys
};
//# sourceMappingURL=chunk-CUWPCCUM.js.map
