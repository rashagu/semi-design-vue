import {
  require_isObjectLike
} from "./chunk-7BHJLEWS.js";
import {
  require_baseGetTag
} from "./chunk-XKOYYM3K.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

export {
  require_isArguments
};
//# sourceMappingURL=chunk-54BFKMM2.js.map
