import {
  require_baseSlice
} from "./chunk-4QI5OKLV.js";
import {
  require_baseGet,
  require_castPath,
  require_toKey
} from "./chunk-ZZORV55O.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/last.js
var require_last = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/last.js"(exports, module) {
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : void 0;
    }
    module.exports = last;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_parent.js
var require_parent = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_parent.js"(exports, module) {
    var baseGet = require_baseGet();
    var baseSlice = require_baseSlice();
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }
    module.exports = parent;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnset.js
var require_baseUnset = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnset.js"(exports, module) {
    var castPath = require_castPath();
    var last = require_last();
    var parent = require_parent();
    var toKey = require_toKey();
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }
    module.exports = baseUnset;
  }
});

export {
  require_baseUnset
};
//# sourceMappingURL=chunk-AOQAQYP4.js.map
