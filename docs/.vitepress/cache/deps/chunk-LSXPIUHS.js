import {
  require_baseSlice
} from "./chunk-4QI5OKLV.js";
import {
  require_isIterateeCall
} from "./chunk-EGPIATU2.js";
import {
  require_nodeUtil
} from "./chunk-TSZXP53R.js";
import {
  require_baseUnary
} from "./chunk-BVRSW63P.js";
import {
  require_baseToString,
  require_toString
} from "./chunk-ZZORV55O.js";
import {
  require_isObjectLike
} from "./chunk-7BHJLEWS.js";
import {
  require_baseGetTag
} from "./chunk-XKOYYM3K.js";
import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castSlice.js
var require_castSlice = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castSlice.js"(exports, module) {
    var baseSlice = require_baseSlice();
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === void 0 ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }
    module.exports = castSlice;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasUnicode.js
var require_hasUnicode = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasUnicode.js"(exports, module) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsZWJ = "\\u200d";
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    module.exports = hasUnicode;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsRegExp.js
var require_baseIsRegExp = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsRegExp.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var regexpTag = "[object RegExp]";
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }
    module.exports = baseIsRegExp;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isRegExp.js
var require_isRegExp = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isRegExp.js"(exports, module) {
    var baseIsRegExp = require_baseIsRegExp();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
    module.exports = isRegExp;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_asciiToArray.js
var require_asciiToArray = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_asciiToArray.js"(exports, module) {
    function asciiToArray(string) {
      return string.split("");
    }
    module.exports = asciiToArray;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_unicodeToArray.js
var require_unicodeToArray = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_unicodeToArray.js"(exports, module) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsCombo = "[" + rsComboRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsZWJ = "\\u200d";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    module.exports = unicodeToArray;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToArray.js
var require_stringToArray = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToArray.js"(exports, module) {
    var asciiToArray = require_asciiToArray();
    var hasUnicode = require_hasUnicode();
    var unicodeToArray = require_unicodeToArray();
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    module.exports = stringToArray;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/split.js
var require_split = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/split.js"(exports, module) {
    var baseToString = require_baseToString();
    var castSlice = require_castSlice();
    var hasUnicode = require_hasUnicode();
    var isIterateeCall = require_isIterateeCall();
    var isRegExp = require_isRegExp();
    var stringToArray = require_stringToArray();
    var toString = require_toString();
    var MAX_ARRAY_LENGTH = 4294967295;
    function split(string, separator, limit) {
      if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
        separator = limit = void 0;
      }
      limit = limit === void 0 ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }
    module.exports = split;
  }
});

export {
  require_split
};
//# sourceMappingURL=chunk-LSXPIUHS.js.map
