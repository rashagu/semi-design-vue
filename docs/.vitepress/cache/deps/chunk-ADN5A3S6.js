import {
  isTimestamp,
  isValidDate
} from "./chunk-I6V7W2ZV.js";
import {
  compatibleParse
} from "./chunk-ERKZBZO7.js";
import {
  addMonths
} from "./chunk-EJKQFAKC.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/getDefaultPickerDate.js
function getDefaultPickerDate(options) {
  const {
    defaultPickerValue,
    format,
    dateFnsLocale
  } = options;
  let nowDate = Array.isArray(defaultPickerValue) ? defaultPickerValue[0] : defaultPickerValue;
  let nextDate = Array.isArray(defaultPickerValue) ? defaultPickerValue[1] : void 0;
  switch (true) {
    case isValidDate(nowDate):
      break;
    case isTimestamp(nowDate):
      nowDate = new Date(nowDate);
      break;
    case typeof nowDate === "string":
      nowDate = compatibleParse(nowDate, format, void 0, dateFnsLocale);
      break;
    default:
      nowDate = /* @__PURE__ */ new Date();
      break;
  }
  switch (true) {
    case isValidDate(nextDate):
      break;
    case isTimestamp(nextDate):
      nextDate = new Date(nextDate);
      break;
    case typeof nextDate === "string":
      nextDate = compatibleParse(nextDate, format, void 0, dateFnsLocale);
      break;
    default:
      nextDate = addMonths(nowDate, 1);
      break;
  }
  return {
    nowDate,
    nextDate
  };
}

export {
  getDefaultPickerDate
};
//# sourceMappingURL=chunk-ADN5A3S6.js.map
