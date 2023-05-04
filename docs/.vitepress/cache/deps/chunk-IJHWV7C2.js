import {
  strings
} from "./chunk-KN6CCDTX.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getDefaultFormatToken.js
var defaultFormatTokens = {
  date: strings.FORMAT_FULL_DATE,
  dateTime: strings.FORMAT_DATE_TIME,
  dateRange: strings.FORMAT_FULL_DATE,
  dateTimeRange: strings.FORMAT_DATE_TIME,
  month: strings.FORMAT_YEAR_MONTH,
  monthRange: strings.FORMAT_YEAR_MONTH
};
var getDefaultFormatToken = (type) => defaultFormatTokens;
function getDefaultFormatTokenByType(type) {
  return type && defaultFormatTokens[type];
}
var getDefaultFormatToken_default = getDefaultFormatToken;

export {
  getDefaultFormatTokenByType,
  getDefaultFormatToken_default
};
//# sourceMappingURL=chunk-IJHWV7C2.js.map
