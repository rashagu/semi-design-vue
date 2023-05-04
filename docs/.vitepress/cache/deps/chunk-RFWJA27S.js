import {
  require_getTag
} from "./chunk-KPUGFIAL.js";
import {
  require_nodeUtil
} from "./chunk-TSZXP53R.js";
import {
  require_baseUnary
} from "./chunk-BVRSW63P.js";
import {
  require_isObjectLike
} from "./chunk-7BHJLEWS.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMap.js
var require_baseIsMap = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMap.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var mapTag = "[object Map]";
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }
    module.exports = baseIsMap;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isMap.js
var require_isMap = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isMap.js"(exports, module) {
    var baseIsMap = require_baseIsMap();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsMap = nodeUtil && nodeUtil.isMap;
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
    module.exports = isMap;
  }
});

export {
  require_isMap
};
//# sourceMappingURL=chunk-RFWJA27S.js.map
