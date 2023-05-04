import {
  require_isIterateeCall
} from "./chunk-73AG7XXA.js";
import {
  require_baseRest
} from "./chunk-6SHS63ZR.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createAssigner.js
var require_createAssigner = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createAssigner.js"(exports, module) {
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    module.exports = createAssigner;
  }
});

export {
  require_createAssigner
};
//# sourceMappingURL=chunk-KW6OZFD4.js.map
