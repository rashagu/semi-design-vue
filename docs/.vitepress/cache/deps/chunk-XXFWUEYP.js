import {
  require_overRest,
  require_setToString
} from "./chunk-RZZPN2AN.js";
import {
  require_arrayPush
} from "./chunk-AFEGDMIW.js";
import {
  require_isArguments
} from "./chunk-54BFKMM2.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import {
  require_Symbol
} from "./chunk-XKOYYM3K.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isFlattenable.js"(exports, module) {
    var Symbol = require_Symbol();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0;
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    module.exports = isFlattenable;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFlatten.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isFlattenable = require_isFlattenable();
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1, length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    module.exports = baseFlatten;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/flatten.js
var require_flatten = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/flatten.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }
    module.exports = flatten;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_flatRest.js
var require_flatRest = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_flatRest.js"(exports, module) {
    var flatten = require_flatten();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function flatRest(func) {
      return setToString(overRest(func, void 0, flatten), func + "");
    }
    module.exports = flatRest;
  }
});

export {
  require_baseFlatten,
  require_flatRest
};
//# sourceMappingURL=chunk-XXFWUEYP.js.map
