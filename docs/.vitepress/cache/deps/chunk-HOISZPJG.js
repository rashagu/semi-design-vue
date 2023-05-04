import {
  require_isIndex
} from "./chunk-T6W56XAT.js";
import {
  require_isArguments
} from "./chunk-54BFKMM2.js";
import {
  require_isLength
} from "./chunk-XGO3WBYR.js";
import {
  require_castPath,
  require_toKey
} from "./chunk-ZZORV55O.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js"(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index = -1, length = path.length, result = false;
      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

export {
  require_hasPath
};
//# sourceMappingURL=chunk-HOISZPJG.js.map
