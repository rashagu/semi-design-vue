import {
  require_baseEach,
  require_filter
} from "./chunk-75ZXYBDA.js";
import {
  require_split
} from "./chunk-ONBLQY7I.js";
import {
  require_baseIteratee
} from "./chunk-WUTYLADQ.js";
import "./chunk-4QI5OKLV.js";
import "./chunk-73AG7XXA.js";
import "./chunk-T3H7OANQ.js";
import "./chunk-UL7BHDH4.js";
import "./chunk-HC6MTSUY.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import "./chunk-OVLDI57Z.js";
import "./chunk-HOISZPJG.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-T6W56XAT.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import {
  require_isArrayLike
} from "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import {
  require_classnames
} from "./chunk-6AREB66O.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import {
  require_arrayMap
} from "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import "./chunk-X27LVEKC.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMap.js
var require_baseMap = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMap.js"(exports, module) {
    var baseEach = require_baseEach();
    var isArrayLike = require_isArrayLike();
    function baseMap(collection, iteratee) {
      var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection2) {
        result[++index] = iteratee(value, key, collection2);
      });
      return result;
    }
    module.exports = baseMap;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/map.js
var require_map = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/map.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseIteratee = require_baseIteratee();
    var baseMap = require_baseMap();
    var isArray = require_isArray();
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, baseIteratee(iteratee, 3));
    }
    module.exports = map;
  }
});

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/classnames.js
var import_map = __toESM(require_map());
var import_filter = __toESM(require_filter());
var import_split = __toESM(require_split());
var import_classnames = __toESM(require_classnames());
function addClass(rawCls) {
  const clss = (0, import_split.default)(rawCls, /\s+/);
  for (var _len = arguments.length, srcClss = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcClss[_key - 1] = arguments[_key];
  }
  const validClss = (0, import_filter.default)(srcClss, (cls) => !clss.includes(cls));
  return (0, import_classnames.default)(rawCls, ...validClss);
}
function removeClass(rawCls) {
  const clss = (0, import_split.default)(rawCls, /\s+/);
  for (var _len2 = arguments.length, srcClss = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    srcClss[_key2 - 1] = arguments[_key2];
  }
  (0, import_map.default)(srcClss, (cls) => {
    const index = clss.indexOf(cls);
    if (index > -1) {
      clss.splice(index, 1);
    }
  });
  return (0, import_classnames.default)(...clss);
}
export {
  addClass,
  removeClass
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_utils_classnames.js.map
