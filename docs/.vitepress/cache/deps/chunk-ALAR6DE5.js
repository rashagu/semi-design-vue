import {
  require_get
} from "./chunk-HGGG6L4M.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/log.js
var import_get = __toESM(require_get());
var log = function(text) {
  if ((0, import_get.default)(process, "env.NODE_ENV") === "development") {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    console.log(text, ...rest);
  }
};
var log_default = log;

export {
  log_default
};
//# sourceMappingURL=chunk-ALAR6DE5.js.map
