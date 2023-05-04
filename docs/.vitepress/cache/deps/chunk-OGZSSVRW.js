import {
  require_defineProperty
} from "./chunk-W3G4FQR2.js";
import {
  require_eq
} from "./chunk-TY6AJI44.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

export {
  require_baseAssignValue,
  require_assignValue
};
//# sourceMappingURL=chunk-OGZSSVRW.js.map
