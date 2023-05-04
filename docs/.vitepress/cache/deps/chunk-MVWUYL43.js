import {
  require_baseUnset
} from "./chunk-AOQAQYP4.js";
import {
  require_values
} from "./chunk-BWSKQBI3.js";
import {
  require_copyArray
} from "./chunk-D6QY5MM6.js";
import {
  require_set
} from "./chunk-2POGEFFC.js";
import {
  require_hasPath
} from "./chunk-HOISZPJG.js";
import {
  require_isNumber
} from "./chunk-UV6QJF5D.js";
import {
  require_get
} from "./chunk-HGGG6L4M.js";
import {
  require_isSymbol,
  require_stringToPath,
  require_toKey,
  require_toString
} from "./chunk-ZZORV55O.js";
import {
  require_arrayMap
} from "./chunk-JVA7ONT2.js";
import {
  require_isObject
} from "./chunk-X27LVEKC.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/unset.js
var require_unset = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/unset.js"(exports, module) {
    var baseUnset = require_baseUnset();
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }
    module.exports = unset;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toPath.js
var require_toPath = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toPath.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var copyArray = require_copyArray();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var stringToPath = require_stringToPath();
    var toKey = require_toKey();
    var toString = require_toString();
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }
    module.exports = toPath;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHas.js
var require_baseHas = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHas.js"(exports, module) {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }
    module.exports = baseHas;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/has.js
var require_has = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/has.js"(exports, module) {
    var baseHas = require_baseHas();
    var hasPath = require_hasPath();
    function has2(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }
    module.exports = has2;
  }
});

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/object.js
var import_isObject = __toESM(require_isObject());
var import_isNumber = __toESM(require_isNumber());
var import_values = __toESM(require_values());
var import_unset = __toESM(require_unset());
var import_toPath = __toESM(require_toPath());
var import_has = __toESM(require_has());
var import_set = __toESM(require_set());
var import_get = __toESM(require_get());
var pathToArrayElem = (path) => {
  const pathArray = (0, import_toPath.default)(path);
  const justNumber = (0, import_isNumber.default)(path) && pathArray.length === 1;
  return justNumber ? false : Number.isInteger(+pathArray[pathArray.length - 1]);
};
function isEmptyObject(target) {
  if (!(0, import_isObject.default)(target)) {
    return false;
  } else {
    const valuesOfTarget = (0, import_values.default)(target);
    if (!valuesOfTarget.length) {
      return true;
    } else {
      return valuesOfTarget.every((item) => typeof item === "undefined");
    }
  }
}
function cleanup(obj, path) {
  let pull = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  if (path.length === 0) {
    return;
  }
  const target = (0, import_get.default)(obj, path);
  if (Array.isArray(target) && target.every((e) => e == null)) {
    (0, import_unset.default)(obj, path);
  } else if (isEmptyObject(target)) {
    (0, import_unset.default)(obj, path);
  }
  cleanup(obj, path.slice(0, path.length - 1), pull);
}
function empty(object) {
  return (0, import_values.default)(object).length === 0;
}
function get(object, path) {
  return (0, import_get.default)(object, path);
}
function remove(object, path) {
  (0, import_unset.default)(object, path);
  let pathArray = (0, import_toPath.default)(path);
  pathArray = pathArray.slice(0, pathArray.length - 1);
  cleanup(object, pathArray, false);
}
function set(object, path, value, allowEmpty) {
  if (allowEmpty) {
    return (0, import_set.default)(object, path, value);
  }
  if (value !== void 0) {
    return (0, import_set.default)(object, path, value);
  } else {
    if (pathToArrayElem(path) && get(object, path) !== void 0) {
      (0, import_set.default)(object, path, void 0);
      let pathArray = (0, import_toPath.default)(path);
      pathArray = pathArray.slice(0, pathArray.length - 1);
      cleanup(object, pathArray, false);
    } else if (!pathToArrayElem(path) && get(object, path) !== void 0) {
      remove(object, path);
    }
  }
}
function has(object, path) {
  return (0, import_has.default)(object, path);
}
function forwardStatics(obj, srcObj) {
  if (obj && (typeof obj === "function" || typeof obj === "object") && srcObj && (typeof srcObj === "function" || typeof srcObj === "object")) {
    Object.entries(srcObj).forEach((_ref) => {
      let [key, value] = _ref;
      obj[key] = value;
    });
  }
  return obj;
}

export {
  require_toPath,
  empty,
  get,
  remove,
  set,
  has,
  forwardStatics
};
//# sourceMappingURL=chunk-MVWUYL43.js.map
