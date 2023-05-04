import {
  require_hasPath
} from "./chunk-HOISZPJG.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js"(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js"(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module.exports = hasIn;
  }
});

export {
  require_hasIn
};
//# sourceMappingURL=chunk-OVLDI57Z.js.map
