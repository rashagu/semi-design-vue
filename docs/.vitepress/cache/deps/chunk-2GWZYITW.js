import {
  require_isPlainObject
} from "./chunk-64TC44YQ.js";
import {
  require_baseUnset
} from "./chunk-AOQAQYP4.js";
import {
  require_baseClone,
  require_getAllKeysIn
} from "./chunk-EFUJT5LA.js";
import {
  require_copyObject
} from "./chunk-RBUD5BHK.js";
import {
  require_flatRest
} from "./chunk-XXFWUEYP.js";
import {
  require_castPath
} from "./chunk-ZZORV55O.js";
import {
  require_arrayMap
} from "./chunk-JVA7ONT2.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_customOmitClone.js
var require_customOmitClone = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_customOmitClone.js"(exports, module) {
    var isPlainObject = require_isPlainObject();
    function customOmitClone(value) {
      return isPlainObject(value) ? void 0 : value;
    }
    module.exports = customOmitClone;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/omit.js
var require_omit = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/omit.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseClone = require_baseClone();
    var baseUnset = require_baseUnset();
    var castPath = require_castPath();
    var copyObject = require_copyObject();
    var customOmitClone = require_customOmitClone();
    var flatRest = require_flatRest();
    var getAllKeysIn = require_getAllKeysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });
    module.exports = omit;
  }
});

export {
  require_omit
};
//# sourceMappingURL=chunk-2GWZYITW.js.map
