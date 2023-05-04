import {
  getDefaultPickerDate
} from "./chunk-ADN5A3S6.js";
import {
  getInsetInputFormatToken,
  getInsetInputValueFromInsetInputStr
} from "./chunk-HCPRCZFM.js";
import "./chunk-FJWCGZ7W.js";
import {
  getDefaultFormatTokenByType
} from "./chunk-IJHWV7C2.js";
import {
  isValidDate
} from "./chunk-I6V7W2ZV.js";
import {
  compatibleParse
} from "./chunk-ERKZBZO7.js";
import {
  format
} from "./chunk-EJKQFAKC.js";
import {
  require_cloneDeep
} from "./chunk-DP3OYFSF.js";
import "./chunk-EFUJT5LA.js";
import "./chunk-RBUD5BHK.js";
import "./chunk-RFWJA27S.js";
import "./chunk-UTEL65GX.js";
import "./chunk-D6QY5MM6.js";
import "./chunk-VS2OXD4D.js";
import {
  strings
} from "./chunk-KN6CCDTX.js";
import "./chunk-UL7BHDH4.js";
import "./chunk-HC6MTSUY.js";
import {
  require_set
} from "./chunk-2POGEFFC.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-NAVCQYYY.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import "./chunk-B2OBPHGV.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import {
  require_get
} from "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import {
  require_isObject
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-V4DHZKW4.js";
import "./chunk-WCAXN4E7.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/inputFoundation.js
var import_get = __toESM(require_get());
var import_set = __toESM(require_set());
var import_isObject = __toESM(require_isObject());
var import_cloneDeep = __toESM(require_cloneDeep());

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/_utils/formatter.js
function formatDateValues(values, formatToken) {
  let {
    groupInnerSeparator = strings.DEFAULT_SEPARATOR_RANGE,
    groupSize = 1,
    groupSeparator = strings.DEFAULT_SEPARATOR_MULTIPLE
  } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  let locale = arguments.length > 3 ? arguments[3] : void 0;
  let text = "";
  (groupSize <= 0 || typeof groupSize !== "number") && (groupSize = 1);
  if (Array.isArray(values) && values.length) {
    const groups = [];
    const {
      length
    } = values;
    for (let i = 0; i < length; i++) {
      if (i % groupSize === 0) {
        groups.push([]);
      }
      const curArrIdx = Math.floor(i / groupSize);
      groups[curArrIdx].push(values[i]);
    }
    text = groups.map((arr) => arr.map((v) => {
      if (v) {
        return format(v, formatToken, {
          locale
        });
      } else {
        return "";
      }
    }).join(groupInnerSeparator)).join(groupSeparator);
  }
  return text;
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/inputFoundation.js
var KEY_CODE_ENTER = "Enter";
var KEY_CODE_TAB = "Tab";
var InputFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
  handleClick(e) {
    this._adapter.notifyClick(e);
  }
  handleChange(value, e) {
    this._adapter.notifyChange(value, e);
  }
  handleInputComplete(e) {
    if (e.key === KEY_CODE_ENTER) {
      this._adapter.notifyEnter(e.target.value);
    }
  }
  handleInputClear(e) {
    this._adapter.notifyClear(e);
  }
  handleRangeInputClear(e) {
    this.stopPropagation(e);
    this._adapter.notifyRangeInputClear(e);
  }
  handleRangeInputEnterPress(e, rangeInputValue) {
    if (e.key === KEY_CODE_ENTER) {
      this._adapter.notifyEnter(rangeInputValue);
    }
  }
  handleRangeInputEndKeyPress(e) {
    if (e.key === KEY_CODE_TAB) {
      this._adapter.notifyTabPress(e);
    }
  }
  handleRangeInputFocus(e, rangeType) {
    this._adapter.notifyRangeInputFocus(e, rangeType);
  }
  formatShowText(value, customFormat) {
    const {
      type,
      dateFnsLocale,
      format: format2,
      rangeSeparator
    } = this._adapter.getProps();
    const formatToken = customFormat || format2 || getDefaultFormatTokenByType(type);
    let text = "";
    switch (type) {
      case "date":
        text = formatDateValues(value, formatToken, void 0, dateFnsLocale);
        break;
      case "dateRange":
        text = formatDateValues(value, formatToken, {
          groupSize: 2,
          groupInnerSeparator: rangeSeparator
        }, dateFnsLocale);
        break;
      case "dateTime":
        text = formatDateValues(value, formatToken, void 0, dateFnsLocale);
        break;
      case "dateTimeRange":
        text = formatDateValues(value, formatToken, {
          groupSize: 2,
          groupInnerSeparator: rangeSeparator
        }, dateFnsLocale);
        break;
      case "month":
        text = formatDateValues(value, formatToken, void 0, dateFnsLocale);
        break;
      case "monthRange":
        text = formatDateValues(value, formatToken, {
          groupSize: 2,
          groupInnerSeparator: rangeSeparator
        }, dateFnsLocale);
        break;
      default:
        break;
    }
    return text;
  }
  handleInsetInputChange(options) {
    const {
      value,
      valuePath,
      insetInputValue
    } = options;
    const {
      format: format2,
      type
    } = this._adapter.getProps();
    const insetFormatToken = getInsetInputFormatToken({
      type,
      format: format2
    });
    let newInsetInputValue = (0, import_set.default)((0, import_cloneDeep.default)(insetInputValue), valuePath, value);
    newInsetInputValue = this._autoFillTimeToInsetInputValue({
      insetInputValue: newInsetInputValue,
      valuePath,
      format: insetFormatToken
    });
    const newInputValue = this.concatInsetInputValue({
      insetInputValue: newInsetInputValue
    });
    this._adapter.notifyInsetInputChange({
      insetInputValue: newInsetInputValue,
      format: insetFormatToken,
      insetInputStr: newInputValue
    });
  }
  _autoFillTimeToInsetInputValue(options) {
    const {
      valuePath,
      insetInputValue,
      format: format2
    } = options;
    const {
      type,
      defaultPickerValue,
      dateFnsLocale
    } = this._adapter.getProps();
    const insetInputValueWithTime = (0, import_cloneDeep.default)(insetInputValue);
    const {
      nowDate,
      nextDate
    } = getDefaultPickerDate({
      defaultPickerValue,
      format: format2,
      dateFnsLocale
    });
    if (type.includes("Time")) {
      let timeStr = "";
      const dateFormatToken = (0, import_get.default)(format2.split(" "), "0", strings.FORMAT_FULL_DATE);
      const timeFormatToken = (0, import_get.default)(format2.split(" "), "1", strings.FORMAT_TIME_PICKER);
      switch (valuePath) {
        case "monthLeft.dateInput":
          const dateLeftStr = insetInputValueWithTime.monthLeft.dateInput;
          if (!insetInputValueWithTime.monthLeft.timeInput && dateLeftStr.length === dateFormatToken.length) {
            const dateLeftParsed = compatibleParse(insetInputValueWithTime.monthLeft.dateInput, dateFormatToken);
            if (isValidDate(dateLeftParsed)) {
              timeStr = format(nowDate, timeFormatToken);
              insetInputValueWithTime.monthLeft.timeInput = timeStr;
            }
          }
          break;
        case "monthRight.dateInput":
          const dateRightStr = insetInputValueWithTime.monthRight.dateInput;
          if (!insetInputValueWithTime.monthRight.timeInput && dateRightStr.length === dateFormatToken.length) {
            const dateRightParsed = compatibleParse(dateRightStr, dateFormatToken);
            if (isValidDate(dateRightParsed)) {
              timeStr = format(nextDate, timeFormatToken);
              insetInputValueWithTime.monthRight.timeInput = timeStr;
            }
          }
          break;
        default:
          break;
      }
    }
    return insetInputValueWithTime;
  }
  /**
   * 只有传入的 format 符合 formatReg 时，才会使用用户传入的 format
   * 否则会使用默认的 format 作为 placeholder
   *
   * The format passed in by the user will be used only if the incoming format conforms to formatReg
   * Otherwise the default format will be used as placeholder
   */
  getInsetInputPlaceholder() {
    const {
      type,
      format: format2,
      rangeSeparator
    } = this._adapter.getProps();
    const insetInputFormat = getInsetInputFormatToken({
      type,
      format: format2
    });
    let datePlaceholder, timePlaceholder;
    switch (type) {
      case "date":
      case "month":
      case "dateRange":
        datePlaceholder = insetInputFormat;
        break;
      case "dateTime":
      case "dateTimeRange":
        [datePlaceholder, timePlaceholder] = insetInputFormat.split(" ");
      case "monthRange":
        datePlaceholder = insetInputFormat + rangeSeparator + insetInputFormat;
        break;
    }
    return {
      datePlaceholder,
      timePlaceholder
    };
  }
  /**
   * 从当前日期值或 inputValue 中解析出 insetInputValue
   *
   * Parse out insetInputValue from current date value or inputValue
   */
  getInsetInputValue(_ref) {
    let {
      value,
      insetInputValue
    } = _ref;
    const {
      type,
      rangeSeparator,
      format: format2
    } = this._adapter.getProps();
    let inputValueStr = "";
    if ((0, import_isObject.default)(insetInputValue)) {
      inputValueStr = this.concatInsetInputValue({
        insetInputValue
      });
    } else {
      const insetInputFormat = getInsetInputFormatToken({
        format: format2,
        type
      });
      inputValueStr = this.formatShowText(value, insetInputFormat);
    }
    const newInsetInputValue = getInsetInputValueFromInsetInputStr({
      inputValue: inputValueStr,
      type,
      rangeSeparator
    });
    return newInsetInputValue;
  }
  concatInsetDateAndTime(_ref2) {
    let {
      date,
      time
    } = _ref2;
    return `${date} ${time}`;
  }
  concatInsetDateRange(_ref3) {
    let {
      rangeStart,
      rangeEnd
    } = _ref3;
    const {
      rangeSeparator
    } = this._adapter.getProps();
    return `${rangeStart}${rangeSeparator}${rangeEnd}`;
  }
  concatInsetInputValue(_ref4) {
    let {
      insetInputValue
    } = _ref4;
    const {
      type
    } = this._adapter.getProps();
    let inputValue = "";
    switch (type) {
      case "date":
      case "month":
      case "monthRange":
        inputValue = insetInputValue.monthLeft.dateInput;
        break;
      case "dateRange":
        inputValue = this.concatInsetDateRange({
          rangeStart: insetInputValue.monthLeft.dateInput,
          rangeEnd: insetInputValue.monthRight.dateInput
        });
        break;
      case "dateTime":
        inputValue = this.concatInsetDateAndTime({
          date: insetInputValue.monthLeft.dateInput,
          time: insetInputValue.monthLeft.timeInput
        });
        break;
      case "dateTimeRange":
        const rangeStart = this.concatInsetDateAndTime({
          date: insetInputValue.monthLeft.dateInput,
          time: insetInputValue.monthLeft.timeInput
        });
        const rangeEnd = this.concatInsetDateAndTime({
          date: insetInputValue.monthRight.dateInput,
          time: insetInputValue.monthRight.timeInput
        });
        inputValue = this.concatInsetDateRange({
          rangeStart,
          rangeEnd
        });
        break;
    }
    return inputValue;
  }
};
export {
  InputFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_datePicker_inputFoundation.js.map
