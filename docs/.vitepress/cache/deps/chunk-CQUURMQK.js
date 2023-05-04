import {
  require_baseIndexOf
} from "./chunk-SKUJYBVG.js";
import {
  require_SetCache,
  require_cacheHas
} from "./chunk-IBVGRLMF.js";
import {
  require_baseUnary
} from "./chunk-BVRSW63P.js";
import {
  require_arrayMap
} from "./chunk-JVA7ONT2.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludes.js
var require_arrayIncludes = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludes.js"(exports, module) {
    var baseIndexOf = require_baseIndexOf();
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    module.exports = arrayIncludes;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludesWith.js
var require_arrayIncludesWith = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludesWith.js"(exports, module) {
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    module.exports = arrayIncludesWith;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseDifference.js
var require_baseDifference = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseDifference.js"(exports, module) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var arrayMap = require_arrayMap();
    var baseUnary = require_baseUnary();
    var cacheHas = require_cacheHas();
    var LARGE_ARRAY_SIZE = 200;
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      } else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
        while (++index < length) {
          var value = array[index], computed = iteratee == null ? value : iteratee(value);
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
              if (values[valuesIndex] === computed) {
                continue outer;
              }
            }
            result.push(value);
          } else if (!includes(values, computed, comparator)) {
            result.push(value);
          }
        }
      return result;
    }
    module.exports = baseDifference;
  }
});

export {
  require_arrayIncludes,
  require_arrayIncludesWith,
  require_baseDifference
};
//# sourceMappingURL=chunk-CQUURMQK.js.map
