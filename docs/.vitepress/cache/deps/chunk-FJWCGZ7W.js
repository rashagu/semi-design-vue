import {
  isNumber,
  isValidDate
} from "./chunk-I6V7W2ZV.js";
import {
  format,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isWithinInterval,
  parseISO
} from "./chunk-EJKQFAKC.js";
import {
  strings
} from "./chunk-KN6CCDTX.js";
import {
  require_isFunction
} from "./chunk-X27LVEKC.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/isString.js
function isString_default(str) {
  return typeof str === "string";
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/isAfter.js
function isAfter2(date, dateToCompare) {
  const dayOne = isString_default(date) ? parseISO(date) : date;
  const dayTwo = isString_default(dateToCompare) ? parseISO(dateToCompare) : dateToCompare;
  return isAfter(dayOne, dayTwo);
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/isBefore.js
function isBefore2(date, dateToCompare) {
  const dayOne = isString_default(date) ? parseISO(date) : date;
  const dayTwo = isString_default(dateToCompare) ? parseISO(dateToCompare) : dateToCompare;
  return isBefore(dayOne, dayTwo);
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/isBetween.js
function isBetween(day, _ref) {
  let {
    start,
    end
  } = _ref;
  const d = isString_default(day) ? parseISO(day) : day;
  const s = isString_default(start) ? parseISO(start) : start;
  const e = isString_default(end) ? parseISO(end) : end;
  return isBefore(s, e) && isWithinInterval(d, {
    start: s,
    end: e
  }) && !isEqual(d, s) && !isEqual(d, e);
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/isWithinInterval.js
function isWithinInterval2(day, _ref) {
  let {
    start,
    end
  } = _ref;
  const d = isString_default(day) ? parseISO(day) : day;
  const s = isString_default(start) ? parseISO(start) : start;
  const e = isString_default(end) ? parseISO(end) : end;
  return isWithinInterval(d, {
    start: s,
    end: e
  });
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/isSameDay.js
function isSameDay2(date, dateToCompare) {
  const dayOne = isString_default(date) ? parseISO(date) : date;
  const dayTwo = isString_default(dateToCompare) ? parseISO(dateToCompare) : dateToCompare;
  return isSameDay(dayOne, dayTwo);
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/isUnixTimestamp.js
function isUnixTimestamp(ts) {
  return isNumber(ts) && ts.toString().length === 10 && isValidDate(new Date(ts * 1e3));
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getYears.js
var getYears = () => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const startYear = year - 100;
  return Array.from({
    length: 200
  }, (v, i) => startYear + i);
};
var getYears_default = getYears;

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getMonthsInYear.js
var getMonthsInYear = (year) => Array.from({
  length: 12
}, (v, i) => `${year}-${i + 1}`);
var getMonthsInYear_default = getMonthsInYear;

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getFullDateOffset.js
var import_isFunction = __toESM(require_isFunction());
var getFullDateOffset = (fn, date) => {
  if (!date) {
    return "";
  }
  const getDate = new Date(date);
  const offsetDate = (0, import_isFunction.default)(fn) ? fn(getDate) : getDate;
  return format(new Date(offsetDate), strings.FORMAT_FULL_DATE);
};
var getFullDateOffset_default = getFullDateOffset;

export {
  isAfter2 as isAfter,
  isBefore2 as isBefore,
  isBetween,
  isWithinInterval2 as isWithinInterval,
  isSameDay2 as isSameDay,
  isUnixTimestamp,
  getYears_default,
  getMonthsInYear_default,
  getFullDateOffset_default
};
//# sourceMappingURL=chunk-FJWCGZ7W.js.map
