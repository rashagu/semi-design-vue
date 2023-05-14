import {
  require_split
} from "./chunk-LSXPIUHS.js";
import {
  utcToZonedTime,
  zonedTimeToUtc
} from "./chunk-4G46XQHO.js";
import {
  strings
} from "./chunk-RB57XKKA.js";
import {
  zh_CN_default
} from "./chunk-X6RIMUOU.js";
import {
  format,
  getHours,
  isValid,
  parse
} from "./chunk-5JMQX6LS.js";
import "./chunk-4QI5OKLV.js";
import "./chunk-EGPIATU2.js";
import {
  require_toNumber
} from "./chunk-XKTW6BSF.js";
import {
  require_isUndefined
} from "./chunk-V52XL574.js";
import {
  isNullOrUndefined
} from "./chunk-6OL7JQEH.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-GQ5WYOGJ.js";
import "./chunk-XGO3WBYR.js";
import "./chunk-T6W56XAT.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/timePicker/foundation.js
var import_isUndefined = __toESM(require_isUndefined());
var import_split = __toESM(require_split());

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/timePicker/utils/index.js
var import_toNumber = __toESM(require_toNumber());
var parseToDate = function(input) {
  let formatToken = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : strings.DEFAULT_FORMAT;
  let dateFnsLocale = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : zh_CN_default;
  if (input instanceof Date) {
    return input;
  } else if (typeof input === "number" || !isNaN(Number(input))) {
    return new Date((0, import_toNumber.default)(input));
  } else if (typeof input === "string") {
    let curDate = /* @__PURE__ */ new Date();
    curDate = parse(input, formatToken, curDate, {
      locale: dateFnsLocale
    });
    return curDate;
  }
  return /* @__PURE__ */ new Date();
};
var formatToString = function(dateOrTimestamp) {
  let formatToken = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : strings.DEFAULT_FORMAT;
  let dateFnsLocale = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : zh_CN_default;
  return format(dateOrTimestamp, formatToken, {
    locale: dateFnsLocale
  });
};
var hourIsDisabled = (disabledHours, hour) => {
  if (typeof disabledHours === "function") {
    const disabledOptions = disabledHours();
    if (Array.isArray(disabledOptions) && !isNullOrUndefined(hour) && disabledOptions.some((v) => (0, import_toNumber.default)(v) === (0, import_toNumber.default)(hour))) {
      return true;
    }
  }
  return false;
};
var minuteIsDisabled = (disabledMinutes, hour, minute) => {
  if (typeof disabledMinutes === "function") {
    const disabledOptions = disabledMinutes(hour);
    if (Array.isArray(disabledOptions) && !isNullOrUndefined(hour) && !isNullOrUndefined(minute) && disabledOptions.some((v) => (0, import_toNumber.default)(v) === (0, import_toNumber.default)(minute))) {
      return true;
    }
  }
  return false;
};
var secondIsDisabled = (disabledSeconds, hour, minute, second) => {
  if (typeof disabledSeconds === "function") {
    const disabledOptions = disabledSeconds(hour, minute);
    if (Array.isArray(disabledOptions) && !isNullOrUndefined(hour) && !isNullOrUndefined(minute) && !isNullOrUndefined(second) && disabledOptions.some((v) => (0, import_toNumber.default)(v) === (0, import_toNumber.default)(second))) {
      return true;
    }
  }
  return false;
};
var transformToArray = (value) => {
  if (!Array.isArray(value)) {
    return [];
  } else {
    return [...value];
  }
};
var isTimeFormatLike = (time, formatToken) => {
  let isLike = true;
  const dateFnsSupportFormatCh = "BDEGHKLMOPQRSTXYabcehimopqstuwxyz";
  const formatSupportChReg = new RegExp(`[${dateFnsSupportFormatCh}]`, "g");
  const formatNotSupportChReg = new RegExp(`[^${dateFnsSupportFormatCh}]`, "g");
  const hmsReg = /[H|m|s]{1,2}/;
  const formatSplitted = formatToken.split(formatNotSupportChReg);
  const timeSeparator = formatToken.replace(formatSupportChReg, "");
  const timeReg = new RegExp(`[${timeSeparator}]`, "g");
  const timeSplitted = time.split(timeReg);
  if (formatSplitted.length !== timeSplitted.length) {
    isLike = false;
  } else {
    for (let i = 0, len = timeSplitted.length; i < len; i++) {
      const formatStr = formatSplitted[i];
      const timeStr = timeSplitted[i];
      if (hmsReg.test(formatStr) && timeStr.length < formatStr.length) {
        isLike = false;
        break;
      }
    }
  }
  return isLike;
};

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/timePicker/foundation.js
var TimePickerFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    this.initDataFromDefaultValue();
    const open = this._isControlledComponent("open") ? this.getProp("open") : this.getProp("defaultOpen");
    if (open && !this._isControlledComponent("open")) {
      this._adapter.registerClickOutSide();
    }
  }
  getPosition() {
    const position = this.getProp("position");
    const type = this.getProp("type") || strings.DEFAULT_TYPE;
    const direction = this.getContext("direction");
    const rtlDirection = direction === "rtl" ? "bottomRight" : "";
    return position || rtlDirection || strings.DEFAULT_POSITION[type];
  }
  isDisabledHMS(_ref) {
    let {
      hours,
      minutes,
      seconds
    } = _ref;
    const {
      disabledHours,
      disabledMinutes,
      disabledSeconds
    } = this.getProps();
    const hDis = !isNullOrUndefined(hours) && hourIsDisabled(disabledHours, hours);
    const mDis = !isNullOrUndefined(hours) && !isNullOrUndefined(minutes) && minuteIsDisabled(disabledMinutes, hours, minutes);
    const sDis = !isNullOrUndefined(hours) && !isNullOrUndefined(minutes) && !isNullOrUndefined(seconds) && secondIsDisabled(disabledSeconds, hours, minutes, seconds);
    return hDis || mDis || sDis;
  }
  isValidTimeZone(timeZone) {
    const _timeZone = timeZone === void 0 ? this.getProp("timeZone") : timeZone;
    return ["string", "number"].includes(typeof _timeZone) && _timeZone !== "";
  }
  getDefaultFormatIfNeed() {
    if (this._isInProps("format")) {
      return this.getProp("format");
    } else if (this.getProp("use12Hours")) {
      return strings.DEFAULT_FORMAT_A;
    } else {
      return strings.DEFAULT_FORMAT;
    }
  }
  /**
   * User input value => save timestamp
   */
  initDataFromDefaultValue() {
    const defaultValue = this.getProp("defaultValue");
    let value = this.getProp("value");
    const timeZone = this.getProp("timeZone");
    const formatToken = this.getValidFormat();
    const {
      rangeSeparator,
      dateFnsLocale
    } = this.getProps();
    value = value || defaultValue;
    if (!Array.isArray(value)) {
      value = value ? [value] : [];
    }
    const parsedValues = [];
    let invalid = false;
    value.forEach((v) => {
      const pv = parseToDate(v, formatToken, dateFnsLocale);
      if (!isNaN(pv.getTime())) {
        parsedValues.push(this.isValidTimeZone() ? utcToZonedTime(pv, timeZone) : pv);
      }
    });
    const isAM = [true, false];
    parsedValues.map((item, idx) => {
      isAM[idx] = getHours(item) < 12;
    });
    if (parsedValues.length === value.length) {
      value = parsedValues;
    } else {
      value = [];
      if (value.length) {
        invalid = true;
      }
    }
    let inputValue = "";
    if (!invalid) {
      inputValue = value.map((v) => formatToString(v, formatToken, dateFnsLocale)).join(rangeSeparator);
    }
    this.setState({
      isAM,
      value,
      inputValue,
      invalid
    });
  }
  getValidFormat(validFormat) {
    let _format = validFormat;
    if (isNullOrUndefined(_format)) {
      _format = this.getDefaultFormatIfNeed();
    }
    if (typeof _format !== "string") {
      _format = strings.DEFAULT_FORMAT;
    }
    return _format;
  }
  handlePanelChange(result) {
    let index = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const formatToken = this.getValidFormat();
    const dateFnsLocale = this.getProp("dateFnsLocale");
    const oldValue = this.getState("value");
    let isAM = this.getState("isAM");
    const value = transformToArray(oldValue);
    isAM = transformToArray(isAM);
    if (result) {
      const panelIsAM = Boolean(result.isAM);
      const date = parseToDate(result.timeStampValue, formatToken, dateFnsLocale);
      value[index] = date;
      isAM[index] = panelIsAM;
      const inputValue = this.formatValue(value);
      if (this.getState("isAM")[index] !== result.isAM) {
        this.setState({
          isAM
        });
      }
      if (!this._isControlledComponent("value")) {
        const invalid = this.validateDates(value);
        this.setState({
          isAM,
          value,
          inputValue,
          invalid
        });
      }
      if (this._hasChanged(value, oldValue)) {
        this._notifyChange(value, inputValue);
      }
    }
  }
  refreshProps() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      value,
      timeZone,
      __prevTimeZone
    } = props;
    let dates = this.parseValue(value);
    const invalid = this.validateDates(dates);
    if (!invalid) {
      if (this.isValidTimeZone(timeZone)) {
        dates = dates.map((date) => utcToZonedTime(this.isValidTimeZone(__prevTimeZone) ? zonedTimeToUtc(date, __prevTimeZone) : date, timeZone));
      }
      const inputValue = this.formatValue(dates);
      this.setState({
        value: dates,
        invalid,
        inputValue
      });
    }
  }
  handleFocus(e) {
    if (!this.getState("open")) {
      this.handlePanelOpen();
    }
    this._adapter.notifyFocus(e);
  }
  setPanel(open) {
    this._adapter.togglePanel(open);
  }
  destroy() {
    this._adapter.unregisterClickOutSide();
  }
  handlePanelOpen() {
    if (!this._isControlledComponent("open")) {
      this._adapter.registerClickOutSide();
      this.setPanel(true);
    }
    this._adapter.notifyOpenChange(true);
  }
  handlePanelClose(clickedOutside, e) {
    if (!this._isControlledComponent("open")) {
      this._adapter.unregisterClickOutSide();
      this.setPanel(false);
    }
    this._adapter.notifyOpenChange(false);
    this._adapter.notifyBlur(e);
  }
  /* istanbul ignore next */
  handleVisibleChange(visible) {
    if (!this._isControlledComponent("open")) {
      this._adapter.togglePanel(visible);
    }
    this._adapter.notifyOpenChange(visible);
  }
  handleInputChange(input) {
    this._adapter.setInputValue(input);
    const rangeSeparator = this.getProp("rangeSeparator");
    const inputValues = (0, import_split.default)(input, rangeSeparator);
    const formatToken = this.getValidFormat();
    if (input !== "" && inputValues.some((time) => !isTimeFormatLike(time, formatToken))) {
      return;
    }
    const dates = this.parseInput(input);
    const invalid = this.validateDates(dates);
    const states = {
      invalid
    };
    const oldValue = this.getState("value");
    let value = transformToArray(oldValue);
    if (!invalid) {
      states.value = dates;
      value = [...dates];
    }
    if (!this._isControlledComponent("value")) {
      this.setState(states);
    }
    if (this._hasChanged(value, oldValue)) {
      this._notifyChange(value, input);
    }
  }
  /* istanbul ignore next */
  doValidate(args) {
    if (typeof args === "string") {
      return this.validateStr(args);
    } else if (Array.isArray(args)) {
      return this.validateDates(args);
    }
    return void 0;
  }
  validateStr() {
    let inputValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    const dates = this.parseInput(inputValue);
    return this.validateDates(dates);
  }
  validateDates() {
    let dates = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let invalid = dates.some((d) => isNaN(Number(d)));
    if (!invalid) {
      invalid = dates.some((d) => this.isDisabledHMS({
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds()
      }));
    }
    return invalid;
  }
  handleInputBlur(e) {
    const invalid = this.getState("invalid");
    const inputValue = this.getState("inputValue");
    const value = this.getState("value");
    if (inputValue) {
      if (invalid) {
        this.setState({
          inputValue: this.formatValue(value),
          invalid: false
        });
      } else {
        this.setState({
          inputValue: this.formatValue(value)
        });
      }
    } else {
      this.setState({
        inputValue: "",
        value: [],
        invalid: false
      });
    }
  }
  formatValue(dates) {
    const validFormat = this.getValidFormat();
    const rangeSeparator = this.getProp("rangeSeparator");
    const dateFnsLocale = this.getProp("dateFnsLocale");
    let _dates = dates;
    if (_dates && !Array.isArray(_dates)) {
      _dates = _dates[_dates];
    }
    if (_dates && Array.isArray(_dates)) {
      const result = _dates.map((date) => {
        let str;
        if ((0, import_isUndefined.default)(date)) {
          str = "";
        } else {
          str = formatToString(date, validFormat, dateFnsLocale);
        }
        return str;
      });
      return result.join(rangeSeparator);
    }
    return void 0;
  }
  parseInput(str) {
    const validFormat = this.getValidFormat();
    const rangeSeparator = this.getProp("rangeSeparator");
    const dateFnsLocale = this.getProp("dateFnsLocale");
    if (str && typeof str === "string") {
      return (0, import_split.default)(str, rangeSeparator).map((v) => parseToDate(v, validFormat, dateFnsLocale));
    }
    return [];
  }
  parseValue() {
    let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const formatToken = this.getValidFormat();
    const dateFnsLocale = this.getProp("dateFnsLocale");
    let _value = value;
    if (!Array.isArray(_value)) {
      _value = _value ? [_value] : [];
    }
    if (Array.isArray(_value)) {
      return _value.map((v) => parseToDate(v, formatToken, dateFnsLocale));
    }
    return [];
  }
  _notifyChange(value, inputValue) {
    let str = inputValue;
    let _value = value;
    const timeZone = this.getProp("timeZone");
    if (this._adapter.isRangePicker()) {
      const rangeSeparator = this.getProp("rangeSeparator");
      str = (0, import_split.default)(inputValue, rangeSeparator);
    } else {
      _value = Array.isArray(_value) ? _value[0] : _value;
    }
    if (this.isValidTimeZone() && _value) {
      const formatToken = this.getValidFormat();
      if (Array.isArray(_value)) {
        _value = _value.map((v) => zonedTimeToUtc(v, timeZone));
        str = _value.map((v) => format(v, formatToken));
      } else {
        _value = zonedTimeToUtc(_value, timeZone);
        str = format(_value, formatToken);
      }
    }
    const onChangeWithDateFirst = this.getProp("onChangeWithDateFirst");
    if (onChangeWithDateFirst) {
      this._adapter.notifyChange(_value, str);
    } else {
      this._adapter.notifyChange(str, _value);
    }
  }
  _hasChanged() {
    let dates = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let oldDates = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    const formatToken = this.getValidFormat();
    const dateFnsLocale = this.getProp("dateFnsLocale");
    return dates.length !== oldDates.length || dates.some((date, index) => {
      const oldDate = oldDates[index];
      if (isValid(date) && isValid(oldDate) && formatToString(date, formatToken, dateFnsLocale) === formatToString(oldDate, formatToken, dateFnsLocale)) {
        return false;
      }
      return true;
    });
  }
};
var foundation_default2 = TimePickerFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_timePicker_foundation.js.map
