import {
  isValid,
  parse,
  parseISO
} from "./chunk-EJKQFAKC.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/parser.js
function compatibleParse(value, formatToken, baseDate, locale) {
  let result = null;
  if (value) {
    if (formatToken) {
      baseDate = baseDate || /* @__PURE__ */ new Date();
      result = parse(value, formatToken, baseDate, {
        locale
      });
    }
    if (!isValid(result)) {
      result = parseISO(value);
    }
    if (!isValid(result)) {
      result = new Date(Date.parse(value));
    }
    const yearInvalid = isValid(result) && String(result.getFullYear()).length > 4;
    if (!isValid(result) || yearInvalid) {
      result = null;
    }
  }
  return result;
}
function isValueParseValid(options) {
  const {
    value,
    locale,
    formatToken
  } = options;
  const baseDate = options.baseDate || /* @__PURE__ */ new Date();
  const result = parse(value, formatToken, baseDate, {
    locale
  });
  return isValid(result);
}

export {
  compatibleParse,
  isValueParseValid
};
//# sourceMappingURL=chunk-ERKZBZO7.js.map
