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

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsSet.js
var require_baseIsSet = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsSet.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var setTag = "[object Set]";
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }
    module.exports = baseIsSet;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSet.js
var require_isSet = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSet.js"(exports, module) {
    var baseIsSet = require_baseIsSet();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsSet = nodeUtil && nodeUtil.isSet;
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
    module.exports = isSet;
  }
});

export {
  require_isSet
};
//# sourceMappingURL=chunk-UTEL65GX.js.map
