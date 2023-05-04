import {
  isValidTimeZone
} from "./chunk-4ARGQCSK.js";
import {
  getInsetInputFormatToken,
  getInsetInputValueFromInsetInputStr
} from "./chunk-HCPRCZFM.js";
import "./chunk-FJWCGZ7W.js";
import {
  getDefaultFormatTokenByType
} from "./chunk-IJHWV7C2.js";
import {
  isTimestamp,
  isValidDate
} from "./chunk-I6V7W2ZV.js";
import {
  compatibleParse
} from "./chunk-ERKZBZO7.js";
import {
  utcToZonedTime,
  zonedTimeToUtc
} from "./chunk-4G46XQHO.js";
import {
  format,
  isDate,
  isEqual,
  isSameSecond,
  isValid
} from "./chunk-EJKQFAKC.js";
import {
  strings as strings2
} from "./chunk-KN6CCDTX.js";
import {
  require_isEqual
} from "./chunk-YUKK2YVM.js";
import "./chunk-T3H7OANQ.js";
import "./chunk-UL7BHDH4.js";
import "./chunk-HC6MTSUY.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import {
  strings
} from "./chunk-GQ5WYOGJ.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-T6W56XAT.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import {
  require_isString
} from "./chunk-NQE5YR5Y.js";
import {
  isNullOrUndefined
} from "./chunk-6OL7JQEH.js";
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
  require_isFunction,
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/datePicker/foundation.js
var import_isFunction = __toESM(require_isFunction());
var import_isEqual = __toESM(require_isEqual());
var import_isString = __toESM(require_isString());
var import_isObject = __toESM(require_isObject());
var import_get = __toESM(require_get());
var DatePickerFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.clearRangeInputFocus = () => {
      const {
        type
      } = this._adapter.getProps();
      const {
        rangeInputFocus
      } = this._adapter.getStates();
      if (type === "dateTimeRange" && rangeInputFocus) {
        this._adapter.setRangeInputFocus(false);
      }
    };
    this._isRangeType = () => {
      const type = this._adapter.getProp("type");
      return /range/i.test(type);
    };
    this._isRangeValueComplete = (value) => {
      let result = false;
      if (Array.isArray(value)) {
        result = !value.some((date) => isNullOrUndefined(date));
      }
      return result;
    };
  }
  init() {
    const timeZone = this.getProp("timeZone");
    if (this._isControlledComponent()) {
      this.initFromProps({
        timeZone,
        value: this.getProp("value")
      });
    } else if (this._isInProps("defaultValue")) {
      this.initFromProps({
        timeZone,
        value: this.getProp("defaultValue")
      });
    }
    this.initPanelOpenStatus(this.getProp("defaultOpen"));
  }
  initFromProps(_ref) {
    let {
      value,
      timeZone,
      prevTimeZone
    } = _ref;
    const _value = (Array.isArray(value) ? [...value] : (value || value === 0) && [value]) || [];
    const result = this.parseWithTimezone(_value, timeZone, prevTimeZone);
    this._adapter.updatePrevTimezone(prevTimeZone);
    this.clearInputValue();
    this._adapter.updateValue(result);
    this.resetCachedSelectedValue(result);
    this.initRangeInputFocus(result);
    if (this._adapter.needConfirm()) {
      this._adapter.updateCachedSelectedValue(result);
    }
  }
  /**
   * 如果用户传了一个空的 value，需要把 range input focus 设置为 rangeStart，这样用户可以清除完之后继续从开始选择
   *
   * If the user passes an empty value, you need to set the range input focus to rangeStart, so that the user can continue to select from the beginning after clearing
   */
  initRangeInputFocus(result) {
    const {
      triggerRender
    } = this.getProps();
    if (this._isRangeType() && (0, import_isFunction.default)(triggerRender) && result.length === 0) {
      this._adapter.setRangeInputFocus("rangeStart");
    }
  }
  /**
   * value 可能是 UTC value 也可能是 zoned value
   *
   * UTC value -> 受控传入的 value
   *
   * zoned value -> statue.value，保存的是当前计算机时区下选择的日期
   *
   * 如果是时区变化，则需要将旧 zoned value 转为新时区下的 zoned value
   *
   * 如果是 value 变化，则不需要传入之前的时区，将 UTC value 转为 zoned value 即可
   *
   */
  parseWithTimezone(value, timeZone, prevTimeZone) {
    const result = [];
    if (Array.isArray(value) && value.length) {
      for (const v of value) {
        let parsedV = (v || v === 0) && this._parseValue(v);
        if (parsedV) {
          if (isValidTimeZone(prevTimeZone)) {
            parsedV = zonedTimeToUtc(parsedV, prevTimeZone);
          }
          result.push(isValidTimeZone(timeZone) ? utcToZonedTime(parsedV, timeZone) : parsedV);
        }
      }
    }
    return result;
  }
  _isMultiple() {
    return Boolean(this.getProp("multiple"));
  }
  /**
   *
   *  Verify and parse the following three format inputs
   *
      1. Date object
      2. ISO 9601-compliant string
      3. ts timestamp
       Unified here to format the incoming value and output it as a Date object
   *
   */
  _parseValue(value) {
    const dateFnsLocale = this._adapter.getProp("dateFnsLocale");
    let dateObj;
    if (!value && value !== 0) {
      return /* @__PURE__ */ new Date();
    }
    if (isValidDate(value)) {
      dateObj = value;
    } else if ((0, import_isString.default)(value)) {
      dateObj = compatibleParse(value, this.getProp("format"), void 0, dateFnsLocale);
    } else if (isTimestamp(value)) {
      dateObj = new Date(value);
    } else {
      throw new TypeError("defaultValue should be valid Date object/timestamp or string");
    }
    return dateObj;
  }
  destroy() {
    this._adapter.togglePanel(false);
    this._adapter.unregisterClickOutSide();
  }
  initPanelOpenStatus(defaultOpen) {
    if ((this.getProp("open") || defaultOpen) && !this.getProp("disabled")) {
      this._adapter.togglePanel(true);
      this._adapter.registerClickOutSide();
    } else {
      this._adapter.togglePanel(false);
      this._adapter.unregisterClickOutSide();
    }
  }
  openPanel() {
    if (!this.getProp("disabled")) {
      if (!this._isControlledComponent("open")) {
        this.open();
      }
      this._adapter.notifyOpenChange(true);
    }
  }
  /**
   * @deprecated
   * do these side effects when type is dateRange or dateTimeRange
   *   1. trigger input blur, if input value is invalid, set input value and state value to previous status
   *   2. set cachedSelectedValue using given dates(in needConfirm mode)
   *      - directly closePanel without click confirm will set cachedSelectedValue to state value
   *      - select one date(which means that the selection value is incomplete) and click confirm also set cachedSelectedValue to state value
   */
  // rangeTypeSideEffectsWhenClosePanel(inputValue: string, willUpdateDates: Date[]) {
  //     if (this._isRangeType()) {
  //         this._adapter.setRangeInputFocus(false);
  //         /**
  //          * inputValue is string when it is not disabled or can't parsed
  //          * when inputValue is null, picker value will back to last selected value
  //          */
  //         this.handleInputBlur(inputValue);
  //         this.resetCachedSelectedValue(willUpdateDates);
  //     }
  // }
  /**
   * @deprecated
   * clear input value when selected date is not confirmed
   */
  // needConfirmSideEffectsWhenClosePanel(willUpdateDates: Date[] | null | undefined) {
  //     if (this._adapter.needConfirm() && !this._isRangeType()) {
  //         /**
  //          * if `null` input element will show `cachedSelectedValue` formatted value（format in DateInput render）
  //          * if `` input element will show `` directly
  //          */
  //         this._adapter.updateInputValue(null);
  //         this.resetCachedSelectedValue(willUpdateDates);
  //     }
  // }
  /**
   * clear inset input value when close panel
   */
  clearInsetInputValue() {
    const {
      insetInput
    } = this._adapter.getProps();
    if (insetInput) {
      this._adapter.updateInsetInputValue(null);
    }
  }
  /**
   * call it when change state value or input value
   */
  resetCachedSelectedValue(willUpdateDates) {
    const {
      value,
      cachedSelectedValue
    } = this._adapter.getStates();
    const newCachedSelectedValue = Array.isArray(willUpdateDates) ? willUpdateDates : value;
    if (!(0, import_isEqual.default)(newCachedSelectedValue, cachedSelectedValue)) {
      this._adapter.updateCachedSelectedValue(newCachedSelectedValue);
    }
  }
  /**
   * timing to call closePanel
   *  1. click confirm button
   *  2. click cancel button
   *  3. select date, time, year, month
   *    - date type and not multiple, close panel after select date
   *    - dateRange type, close panel after select rangeStart and rangeEnd
   *  4. click outside
   * @param {Event} e
   * @param {String} inputValue
   * @param {Date[]} dates
   */
  closePanel(e) {
    let inputValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    let dates = arguments.length > 2 ? arguments[2] : void 0;
    const {
      value
    } = this._adapter.getStates();
    const willUpdateDates = isNullOrUndefined(dates) ? value : dates;
    if (!this._isControlledComponent("open")) {
      this.close();
    } else {
      this.resetInnerSelectedStates(willUpdateDates);
    }
    this._adapter.notifyOpenChange(false);
  }
  open() {
    this._adapter.togglePanel(true);
    this._adapter.registerClickOutSide();
  }
  close() {
    this._adapter.togglePanel(false, () => this.resetInnerSelectedStates());
    this._adapter.unregisterClickOutSide();
  }
  focus(focusType) {
    if (this._isRangeType()) {
      const rangeInputFocus = focusType !== null && focusType !== void 0 ? focusType : "rangeStart";
      this._adapter.setRangeInputFocus(rangeInputFocus);
    } else {
      this._adapter.setInputFocus();
    }
  }
  blur() {
    if (this._isRangeType()) {
      this._adapter.setRangeInputBlur();
    } else {
      this._adapter.setInputBlur();
    }
  }
  /**
   * reset cachedSelectedValue, inputValue when close panel
   */
  resetInnerSelectedStates(willUpdateDates) {
    const {
      value
    } = this._adapter.getStates();
    const needResetCachedSelectedValue = !this.isCachedSelectedValueValid(willUpdateDates) || this._adapter.needConfirm() && !this.clickConfirmButton;
    if (needResetCachedSelectedValue) {
      this.resetCachedSelectedValue(value);
    }
    this.resetFocus();
    this.clearInputValue();
    this.clickConfirmButton = false;
  }
  resetFocus(e) {
    this._adapter.setRangeInputFocus(false);
    this._adapter.notifyBlur(e);
  }
  /**
   * cachedSelectedValue can be `(Date|null)[]` or `null`
   */
  isCachedSelectedValueValid(dates) {
    const cachedSelectedValue = dates || this._adapter.getState("cachedSelectedValue");
    const {
      type
    } = this._adapter.getProps();
    let isValid2 = true;
    switch (true) {
      case type === "dateRange":
      case type === "dateTimeRange":
        if (!this._isRangeValueComplete(cachedSelectedValue)) {
          isValid2 = false;
        }
        break;
      default:
        const value = cachedSelectedValue === null || cachedSelectedValue === void 0 ? void 0 : cachedSelectedValue.filter((item) => item);
        if (!(Array.isArray(value) && value.length)) {
          isValid2 = false;
        }
        break;
    }
    return isValid2;
  }
  /**
   * 将输入框内容置空
   */
  clearInputValue() {
    this._adapter.updateInputValue(null);
    this._adapter.updateInsetInputValue(null);
  }
  /**
   * Callback when the content of the input box changes
   * Update the date panel if the changed value is a legal date, otherwise only update the input box
   * @param {String} input The value of the input box after the change
   * @param {Event} e
   */
  handleInputChange(input, e) {
    const result = this._isMultiple() ? this.parseMultipleInput(input) : this.parseInput(input);
    const {
      value: stateValue
    } = this.getStates();
    this._updateCachedSelectedValueFromInput(input);
    if (result && result.length || input === "") {
      if ((0, import_get.default)(e, strings.CLEARBTN_CLICKED_EVENT_FLAG) && this._isControlledComponent("value")) {
        this._notifyChange(result);
        return;
      }
      this._updateValueAndInput(result, input === "", input);
      const changedDates = this._getChangedDates(result);
      if (!this._someDateDisabled(changedDates, result)) {
        if (!(0, import_isEqual.default)(result, stateValue)) {
          this._notifyChange(result);
        }
      }
    } else {
      this._adapter.updateInputValue(input);
    }
  }
  /**
   * inset input 变化时需要更新以下 state 状态
   *  - insetInputValue（总是）
   *  - inputValue（可以解析为合法日期时）
   *  - value（可以解析为合法日期时）
   */
  handleInsetInputChange(options) {
    const {
      insetInputStr,
      format: format2,
      insetInputValue
    } = options;
    const _isMultiple = this._isMultiple();
    const result = _isMultiple ? this.parseMultipleInput(insetInputStr, format2) : this.parseInput(insetInputStr, format2);
    const {
      value: stateValue
    } = this.getStates();
    this._updateCachedSelectedValueFromInput(insetInputStr);
    if (result && result.length) {
      const changedDates = this._getChangedDates(result);
      if (!this._someDateDisabled(changedDates, result)) {
        if (!(0, import_isEqual.default)(result, stateValue)) {
          if (!this._isControlledComponent() && !this._adapter.needConfirm()) {
            this._adapter.updateValue(result);
          }
          this._notifyChange(result);
        }
        const triggerInput = _isMultiple ? this.formatMultipleDates(result) : this.formatDates(result);
        this._adapter.updateInputValue(triggerInput);
      }
    }
    this._adapter.updateInsetInputValue(insetInputValue);
  }
  /**
   * when input change we reset cached selected value
   */
  _updateCachedSelectedValueFromInput(input) {
    const looseResult = this.getLooseDateFromInput(input);
    const changedLooseResult = this._getChangedDates(looseResult);
    if (!this._someDateDisabled(changedLooseResult, looseResult)) {
      this.resetCachedSelectedValue(looseResult);
    }
  }
  /**
   * Input box blur
   * @param {String} input
   * @param {Event} e
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleInputBlur() {
    let input = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let e = arguments.length > 1 ? arguments[1] : void 0;
  }
  /**
   * called when range type rangeEnd input tab press
   * @param {Event} e
   */
  handleRangeEndTabPress(e) {
    this._adapter.setRangeInputFocus(false);
  }
  /**
   * called when the input box is focused
   * @param {Event} e input focus event
   * @param {String} range 'rangeStart' or 'rangeEnd', use when type is range
   */
  handleInputFocus(e, range) {
    const rangeInputFocus = this._adapter.getState("rangeInputFocus");
    range && this._adapter.setRangeInputFocus(range);
    if (!range || !["rangeStart", "rangeEnd"].includes(rangeInputFocus)) {
      this._adapter.notifyFocus(e, range);
    }
  }
  handleSetRangeFocus(rangeInputFocus) {
    this._adapter.setRangeInputFocus(rangeInputFocus);
  }
  handleInputClear(e) {
    this._adapter.notifyClear(e);
  }
  /**
   * 范围选择清除按钮回调
   * 因为清除按钮没有集成在Input内，因此需要手动清除 value、inputValue、cachedValue
   *
   * callback of range input clear button
   * Since the clear button is not integrated in Input, you need to manually clear value, inputValue, cachedValue
   */
  handleRangeInputClear(e) {
    const value = [];
    const inputValue = "";
    if (!this._isControlledComponent("value")) {
      this._updateValueAndInput(value, true, inputValue);
      this.resetCachedSelectedValue(value);
    }
    this._notifyChange(value);
    this._adapter.notifyClear(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleRangeInputBlur(value, e) {
  }
  // Parses input only after user returns
  handleInputComplete() {
    let input = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let parsedResult = input ? this._isMultiple() ? this.parseMultipleInput(input, ",", true) : this.parseInput(input) : [];
    parsedResult = parsedResult && parsedResult.length ? parsedResult : this.getState("value");
    if (!parsedResult || !parsedResult.length) {
      const nowDate = /* @__PURE__ */ new Date();
      if (this._isRangeType()) {
        parsedResult = [nowDate, nowDate];
      } else {
        parsedResult = [nowDate];
      }
    }
    this._updateValueAndInput(parsedResult);
    const {
      value: stateValue
    } = this.getStates();
    const changedDates = this._getChangedDates(parsedResult);
    if (!this._someDateDisabled(changedDates, parsedResult) && !(0, import_isEqual.default)(parsedResult, stateValue)) {
      this._notifyChange(parsedResult);
    }
  }
  /**
   * Parse the input, return the time object if it is valid,
   *  otherwise return "
   *
   * @param {string} input
   * @returns  {Date [] | '}
   */
  parseInput() {
    let input = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let format2 = arguments.length > 1 ? arguments[1] : void 0;
    let result = [];
    const {
      dateFnsLocale,
      rangeSeparator
    } = this.getProps();
    if (input && input.length) {
      const type = this.getProp("type");
      const formatToken = format2 || this.getProp("format") || getDefaultFormatTokenByType(type);
      let parsedResult, formatedInput;
      const nowDate = /* @__PURE__ */ new Date();
      switch (type) {
        case "date":
        case "dateTime":
        case "month":
          parsedResult = input ? compatibleParse(input, formatToken, nowDate, dateFnsLocale) : "";
          formatedInput = parsedResult && isValid(parsedResult) && this.localeFormat(parsedResult, formatToken);
          if (parsedResult && formatedInput === input) {
            result = [parsedResult];
          }
          break;
        case "dateRange":
        case "dateTimeRange":
        case "monthRange":
          const separator = rangeSeparator;
          const values = input.split(separator);
          parsedResult = values && values.reduce((arr, cur) => {
            const parsedVal = cur && compatibleParse(cur, formatToken, nowDate, dateFnsLocale);
            parsedVal && arr.push(parsedVal);
            return arr;
          }, []);
          formatedInput = parsedResult && parsedResult.map((v) => v && isValid(v) && this.localeFormat(v, formatToken)).join(separator);
          if (parsedResult && formatedInput === input) {
            parsedResult.sort((d1, d2) => d1.getTime() - d2.getTime());
            result = parsedResult;
          }
          break;
        default:
          break;
      }
    }
    return result;
  }
  /**
   * get date which may include null from input
   */
  getLooseDateFromInput(input) {
    const value = this._isMultiple() ? this.parseMultipleInputLoose(input) : this.parseInputLoose(input);
    return value;
  }
  /**
   * parse input into `Array<Date|null>`, loose means return value includes `null`
   *
   * @example
   * ```javascript
   * parseInputLoose('2022-03-15 ~ '); // [Date, null]
   * parseInputLoose(' ~ 2022-03-15 '); // [null, Date]
   * parseInputLoose(''); // []
   * parseInputLoose('2022-03- ~ 2022-0'); // [null, null]
   * ```
   */
  parseInputLoose() {
    let input = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let result = [];
    const {
      dateFnsLocale,
      rangeSeparator,
      type,
      format: format2
    } = this.getProps();
    if (input && input.length) {
      const formatToken = format2 || getDefaultFormatTokenByType(type);
      let parsedResult, formatedInput;
      const nowDate = /* @__PURE__ */ new Date();
      switch (type) {
        case "date":
        case "dateTime":
        case "month":
          const _parsedResult = compatibleParse(input, formatToken, nowDate, dateFnsLocale);
          if (isValidDate(_parsedResult)) {
            formatedInput = this.localeFormat(_parsedResult, formatToken);
            if (formatedInput === input) {
              parsedResult = _parsedResult;
            }
          } else {
            parsedResult = null;
          }
          result = [parsedResult];
          break;
        case "dateRange":
        case "dateTimeRange":
          const separator = rangeSeparator;
          const values = input.split(separator);
          parsedResult = values && values.reduce((arr, cur) => {
            let parsedVal = null;
            const _parsedResult2 = compatibleParse(cur, formatToken, nowDate, dateFnsLocale);
            if (isValidDate(_parsedResult2)) {
              formatedInput = this.localeFormat(_parsedResult2, formatToken);
              if (formatedInput === cur) {
                parsedVal = _parsedResult2;
              }
            }
            arr.push(parsedVal);
            return arr;
          }, []);
          if (Array.isArray(parsedResult) && parsedResult.every((item) => isValid(item))) {
            parsedResult.sort((d1, d2) => d1.getTime() - d2.getTime());
          }
          result = parsedResult;
          break;
        default:
          break;
      }
    }
    return result;
  }
  /**
   * parse multiple into `Array<Date|null>`, loose means return value includes `null`
   *
   * @example
   * ```javascript
   * parseMultipleInputLoose('2021-01-01,2021-10-15'); // [Date, Date];
   * parseMultipleInputLoose('2021-01-01,2021-10-'); // [Date, null];
   * parseMultipleInputLoose(''); // [];
   * ```
   */
  parseMultipleInputLoose() {
    let input = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : strings2.DEFAULT_SEPARATOR_MULTIPLE;
    let needDedupe = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    const max = this.getProp("max");
    const inputArr = input.split(separator);
    const result = [];
    for (const curInput of inputArr) {
      let tmpParsed = curInput && this.parseInputLoose(curInput);
      tmpParsed = Array.isArray(tmpParsed) ? tmpParsed : tmpParsed && [tmpParsed];
      if (tmpParsed && tmpParsed.length) {
        if (needDedupe) {
          !result.filter((r) => Boolean(tmpParsed.find((tp) => isSameSecond(r, tp)))) && result.push(...tmpParsed);
        } else {
          result.push(...tmpParsed);
        }
      } else {
        return [];
      }
      if (max && max > 0 && result.length > max) {
        return [];
      }
    }
    return result;
  }
  /**
   * Parses the input when multiple is true, if valid,
   *  returns a list of time objects, otherwise returns an array
   *
   * @param {string} [input='']
   * @param {string} [separator=',']
   * @param {boolean} [needDedupe=false]
   * @returns {Date[]}
   */
  parseMultipleInput() {
    let input = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : strings2.DEFAULT_SEPARATOR_MULTIPLE;
    let needDedupe = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    const max = this.getProp("max");
    const inputArr = input.split(separator);
    const result = [];
    for (const curInput of inputArr) {
      let tmpParsed = curInput && this.parseInput(curInput);
      tmpParsed = Array.isArray(tmpParsed) ? tmpParsed : tmpParsed && [tmpParsed];
      if (tmpParsed && tmpParsed.length) {
        if (needDedupe) {
          !result.filter((r) => Boolean(tmpParsed.find((tp) => isSameSecond(r, tp)))) && result.push(...tmpParsed);
        } else {
          result.push(...tmpParsed);
        }
      } else {
        return [];
      }
      if (max && max > 0 && result.length > max) {
        return [];
      }
    }
    return result;
  }
  /**
   * dates[] => string
   *
   * @param {Date[]} dates
   * @returns {string}
   */
  formatDates() {
    let dates = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let customFormat = arguments.length > 1 ? arguments[1] : void 0;
    let str = "";
    const rangeSeparator = this.getProp("rangeSeparator");
    if (Array.isArray(dates) && dates.length) {
      const type = this.getProp("type");
      const formatToken = customFormat || this.getProp("format") || getDefaultFormatTokenByType(type);
      switch (type) {
        case "date":
        case "dateTime":
        case "month":
          str = this.localeFormat(dates[0], formatToken);
          break;
        case "dateRange":
        case "dateTimeRange":
        case "monthRange":
          const startIsTruthy = !isNullOrUndefined(dates[0]);
          const endIsTruthy = !isNullOrUndefined(dates[1]);
          if (startIsTruthy && endIsTruthy) {
            str = `${this.localeFormat(dates[0], formatToken)}${rangeSeparator}${this.localeFormat(dates[1], formatToken)}`;
          } else {
            if (startIsTruthy) {
              str = `${this.localeFormat(dates[0], formatToken)}${rangeSeparator}`;
            } else if (endIsTruthy) {
              str = `${rangeSeparator}${this.localeFormat(dates[1], formatToken)}`;
            }
          }
          break;
        default:
          break;
      }
    }
    return str;
  }
  /**
   * dates[] => string
   *
   * @param {Date[]} dates
   * @returns {string}
   */
  formatMultipleDates() {
    let dates = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : strings2.DEFAULT_SEPARATOR_MULTIPLE;
    let customFormat = arguments.length > 2 ? arguments[2] : void 0;
    const strs = [];
    if (Array.isArray(dates) && dates.length) {
      const type = this.getProp("type");
      switch (type) {
        case "date":
        case "dateTime":
        case "month":
          dates.forEach((date) => strs.push(this.formatDates([date], customFormat)));
          break;
        case "dateRange":
        case "dateTimeRange":
        case "monthRange":
          for (let i = 0; i < dates.length; i += 2) {
            strs.push(this.formatDates(dates.slice(i, i + 2), customFormat));
          }
          break;
        default:
          break;
      }
    }
    return strs.join(separator);
  }
  /**
   * Update date value and the value of the input box
   * 1. Select Update
   * 2. Input Update
   * @param {Date|''} value
   * @param {Boolean} forceUpdateValue
   * @param {String} input
   */
  _updateValueAndInput(value, forceUpdateValue, input) {
    let _value;
    if (forceUpdateValue || value) {
      if (!Array.isArray(value)) {
        _value = value ? [value] : [];
      } else {
        _value = value;
      }
      const changedDates = this._getChangedDates(_value);
      if (!this._isControlledComponent() && !this._someDateDisabled(changedDates, _value) && !this._adapter.needConfirm()) {
        this._adapter.updateValue(_value);
      }
    }
    this._adapter.updateInputValue(input);
  }
  /**
   * when changing the selected value through the date panel
   * @param {*} value
   * @param {*} options
   */
  handleSelectedChange(value, options) {
    const {
      type,
      format: format2,
      rangeSeparator,
      insetInput
    } = this._adapter.getProps();
    const {
      value: stateValue
    } = this.getStates();
    const controlled = this._isControlledComponent();
    const fromPreset = (0, import_isObject.default)(options) ? options.fromPreset : options;
    const closePanel = (0, import_get.default)(options, "closePanel", true);
    const needCheckFocusRecord = (0, import_get.default)(options, "needCheckFocusRecord", true);
    const dates = Array.isArray(value) ? [...value] : value ? [value] : [];
    const changedDates = this._getChangedDates(dates);
    let inputValue, insetInputValue;
    if (!this._someDateDisabled(changedDates, dates)) {
      this.resetCachedSelectedValue(dates);
      inputValue = this._isMultiple() ? this.formatMultipleDates(dates) : this.formatDates(dates);
      if (insetInput) {
        const insetInputFormatToken = getInsetInputFormatToken({
          format: format2,
          type
        });
        const insetInputStr = this._isMultiple() ? this.formatMultipleDates(dates, void 0, insetInputFormatToken) : this.formatDates(dates, insetInputFormatToken);
        insetInputValue = getInsetInputValueFromInsetInputStr({
          inputValue: insetInputStr,
          type,
          rangeSeparator
        });
      }
      const isRangeTypeAndInputIncomplete = this._isRangeType() && !this._isRangeValueComplete(dates);
      if (!this._adapter.needConfirm() || fromPreset) {
        if (isRangeTypeAndInputIncomplete) {
          this._adapter.updateInputValue(inputValue);
          this._adapter.updateInsetInputValue(insetInputValue);
          return;
        } else {
          if (!controlled || fromPreset) {
            this._updateValueAndInput(dates, true, inputValue);
            this._adapter.updateInsetInputValue(insetInputValue);
          }
        }
      }
      if (!controlled && this._adapter.needConfirm()) {
        this._adapter.updateInputValue(inputValue);
        this._adapter.updateInsetInputValue(insetInputValue);
        if (isRangeTypeAndInputIncomplete) {
          return;
        }
      }
      if (!(0, import_isEqual.default)(value, stateValue)) {
        this._notifyChange(value);
      }
    }
    const focusRecordChecked = !needCheckFocusRecord || needCheckFocusRecord && this._adapter.couldPanelClosed();
    if (type === "date" && !this._isMultiple() && closePanel || type === "dateRange" && this._isRangeValueComplete(dates) && closePanel && focusRecordChecked) {
      this.closePanel(void 0, inputValue, dates);
    }
  }
  /**
   * when changing the year and month through the panel when the type is year or month or monthRange
   * @param {*} item
   */
  handleYMSelectedChange() {
    let item = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      currentMonth,
      currentYear
    } = item;
    const {
      type
    } = this.getProps();
    if (type === "month") {
      const date = new Date(currentYear["left"], currentMonth["left"] - 1);
      this.handleSelectedChange([date]);
    } else {
      const dateLeft = new Date(currentYear["left"], currentMonth["left"] - 1);
      const dateRight = new Date(currentYear["right"], currentMonth["right"] - 1);
      this.handleSelectedChange([dateLeft, dateRight]);
    }
  }
  handleConfirm() {
    this.clickConfirmButton = true;
    const {
      cachedSelectedValue,
      value
    } = this._adapter.getStates();
    const isRangeValueComplete = this._isRangeValueComplete(cachedSelectedValue);
    const newValue = isRangeValueComplete ? cachedSelectedValue : value;
    if (this._adapter.needConfirm() && !this._isControlledComponent()) {
      this._adapter.updateValue(newValue);
    }
    this.closePanel(void 0, void 0, newValue);
    if (isRangeValueComplete) {
      const {
        notifyValue,
        notifyDate
      } = this.disposeCallbackArgs(cachedSelectedValue);
      this._adapter.notifyConfirm(notifyDate, notifyValue);
    }
  }
  handleCancel() {
    this.closePanel();
    const value = this.getState("value");
    const {
      notifyValue,
      notifyDate
    } = this.disposeCallbackArgs(value);
    this._adapter.notifyCancel(notifyDate, notifyValue);
  }
  handlePresetClick(item, e) {
    const {
      type,
      timeZone
    } = this.getProps();
    const prevTimeZone = this.getState("prevTimezone");
    let value;
    switch (type) {
      case "month":
      case "dateTime":
      case "date":
        value = this.parseWithTimezone([item.start], timeZone, prevTimeZone);
        this.handleSelectedChange(value);
        break;
      case "dateTimeRange":
      case "dateRange":
        value = this.parseWithTimezone([item.start, item.end], timeZone, prevTimeZone);
        this.handleSelectedChange(value, {
          needCheckFocusRecord: false
        });
        break;
      default:
        break;
    }
    this._adapter.notifyPresetsClick(item, e);
  }
  /**
   * 根据 type 处理 onChange 返回的参数
   *
   *  - 返回的日期需要把用户时间转换为设置的时区时间
   *      - 用户时间：用户计算机系统时间
   *      - 时区时间：通过 ConfigProvider 设置的 timeZone
   *  - 例子：用户设置时区为+9，计算机所在时区为+8区，然后用户选择了22:00
   *      - DatePicker 内部保存日期 state 为 +8 的 22:00 => a = new Date("2021-05-25 22:00:00")
   *      - 传出去时，需要把 +8 的 22:00 => +9 的 22:00 => b = zonedTimeToUtc(a, "+09:00");
   *
   * According to the type processing onChange returned parameters
   *
   *   - the returned date needs to convert the user time to the set time zone time
   *       - user time: user computer system time
   *       - time zone time: timeZone set by ConfigProvider
   *   - example: the user sets the time zone to + 9, the computer's time zone is + 8 zone, and then the user selects 22:00
   *       - DatePicker internal save date state is + 8 22:00 = > a = new Date ("2021-05-25 22:00:00")
   *       - when passed out, you need to + 8 22:00 = > + 9 22:00 = > b = zonedTimeToUtc (a, "+ 09:00");
   *
   *  e.g.
   *  let a = new Date ("2021-05-25 22:00:00");
   *       = > Tue May 25 2021 22:00:00 GMT + 0800 (China Standard Time)
   *  let b = zonedTimeToUtc (a, "+ 09:00");
   *       = > Tue May 25 2021 21:00:00 GMT + 0800 (China Standard Time)
   *
   * @param {Date|Date[]} value
   * @return {{ notifyDate: Date|Date[], notifyValue: string|string[]}}
   */
  disposeCallbackArgs(value) {
    let _value = Array.isArray(value) ? value : value && [value] || [];
    const timeZone = this.getProp("timeZone");
    if (isValidTimeZone(timeZone)) {
      _value = _value.map((date) => zonedTimeToUtc(date, timeZone));
    }
    const type = this.getProp("type");
    const formatToken = this.getProp("format") || getDefaultFormatTokenByType(type);
    let notifyValue, notifyDate;
    switch (type) {
      case "date":
      case "dateTime":
      case "month":
        if (!this._isMultiple()) {
          notifyValue = _value[0] && this.localeFormat(_value[0], formatToken);
          [notifyDate] = _value;
        } else {
          notifyValue = _value.map((v) => v && this.localeFormat(v, formatToken));
          notifyDate = [..._value];
        }
        break;
      case "dateRange":
      case "dateTimeRange":
      case "monthRange":
        notifyValue = _value.map((v) => v && this.localeFormat(v, formatToken));
        notifyDate = [..._value];
        break;
      default:
        break;
    }
    return {
      notifyValue,
      notifyDate
    };
  }
  /**
   * Notice: Check whether the date is the same as the state value before calling
   * @param {Date[]} value
   */
  _notifyChange(value) {
    if (this._isRangeType() && !this._isRangeValueComplete(value)) {
      return;
    }
    const {
      onChangeWithDateFirst
    } = this.getProps();
    const {
      notifyValue,
      notifyDate
    } = this.disposeCallbackArgs(value);
    if (onChangeWithDateFirst) {
      this._adapter.notifyChange(notifyDate, notifyValue);
    } else {
      this._adapter.notifyChange(notifyValue, notifyDate);
    }
  }
  /**
   * Get the date changed through the date panel or enter
   * @param {Date[]} dates
   * @returns {Date[]}
   */
  _getChangedDates(dates) {
    const type = this._adapter.getProp("type");
    const stateValue = this._adapter.getState("value");
    const changedDates = [];
    switch (type) {
      case "dateRange":
      case "dateTimeRange":
        const [stateStart, stateEnd] = stateValue;
        const [start, end] = dates;
        if (!isEqual(start, stateStart)) {
          changedDates.push(start);
        }
        if (!isEqual(end, stateEnd)) {
          changedDates.push(end);
        }
        break;
      default:
        const stateValueSet = /* @__PURE__ */ new Set();
        stateValue.forEach((value) => stateValueSet.add(isDate(value) && value.valueOf()));
        for (const date of dates) {
          if (!stateValueSet.has(isDate(date) && date.valueOf())) {
            changedDates.push(date);
          }
        }
    }
    return changedDates;
  }
  /**
   * Whether a date is disabled
   * @param value The date that needs to be judged whether to disable
   * @param selectedValue Selected date, when selecting a range, pass this date to the second parameter of `disabledDate`
   */
  _someDateDisabled(value, selectedValue) {
    const {
      rangeInputFocus
    } = this.getStates();
    const disabledOptions = {
      rangeStart: "",
      rangeEnd: "",
      rangeInputFocus
    };
    if (this._isRangeType() && Array.isArray(selectedValue)) {
      if (isValid(selectedValue[0])) {
        const rangeStart = format(selectedValue[0], "yyyy-MM-dd");
        disabledOptions.rangeStart = rangeStart;
      }
      if (isValid(selectedValue[1])) {
        const rangeEnd = format(selectedValue[1], "yyyy-MM-dd");
        disabledOptions.rangeEnd = rangeEnd;
      }
    }
    let isSomeDateDisabled = false;
    for (const date of value) {
      if (!isNullOrUndefined(date) && this.disabledDisposeDate(date, disabledOptions)) {
        isSomeDateDisabled = true;
        break;
      }
    }
    return isSomeDateDisabled;
  }
  /**
   * Format locale date
   * locale get from LocaleProvider
   * @param {Date} date
   * @param {String} token
   */
  localeFormat(date, token) {
    const dateFnsLocale = this._adapter.getProp("dateFnsLocale");
    return format(date, token, {
      locale: dateFnsLocale
    });
  }
  /**
   * Convert computer date to UTC date
   * Before passing the date to the user, you need to convert the date to UTC time
   * dispose date from computer date to utc date
   * When given timeZone prop, you should convert computer date to utc date before passing to user
   * @param {(date: Date) => Boolean} fn
   * @param {Date|Date[]} date
   * @returns {Boolean}
   */
  disposeDateFn(fn, date) {
    const {
      notifyDate
    } = this.disposeCallbackArgs(date);
    const dateIsArray = Array.isArray(date);
    const notifyDateIsArray = Array.isArray(notifyDate);
    let disposeDate;
    if (dateIsArray === notifyDateIsArray) {
      disposeDate = notifyDate;
    } else {
      disposeDate = dateIsArray ? [notifyDate] : notifyDate[0];
    }
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }
    return fn(disposeDate, ...rest);
  }
  /**
   * Determine whether the date is disabled
   * Whether the date is disabled
   * @param {Date} date
   * @returns {Boolean}
   */
  disabledDisposeDate(date) {
    const {
      disabledDate
    } = this.getProps();
    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }
    return this.disposeDateFn(disabledDate, date, ...rest);
  }
  /**
   * Determine whether the date is disabled
   * Whether the date time is disabled
   * @param {Date|Date[]} date
   * @returns {Object}
   */
  disabledDisposeTime(date) {
    const {
      disabledTime
    } = this.getProps();
    for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      rest[_key3 - 1] = arguments[_key3];
    }
    return this.disposeDateFn(disabledTime, date, ...rest);
  }
  /**
   * Trigger wrapper needs to do two things:
   *  1. Open Panel when clicking trigger;
   *  2. When clicking on a child but the child does not listen to the focus event, manually trigger focus
   *
   * @param {Event} e
   * @returns
   */
  handleTriggerWrapperClick(e) {
    const {
      disabled,
      triggerRender
    } = this._adapter.getProps();
    const {
      rangeInputFocus
    } = this._adapter.getStates();
    if (disabled) {
      return;
    }
    if (this._isRangeType() && !rangeInputFocus) {
      if (this._adapter.isEventTarget(e)) {
        setTimeout(() => {
          this.handleInputFocus(e, "rangeStart");
        }, 0);
      } else if ((0, import_isFunction.default)(triggerRender)) {
        this._adapter.setRangeInputFocus("rangeStart");
      }
      this.openPanel();
    } else {
      this.openPanel();
    }
  }
  handlePanelVisibleChange(visible) {
    if (visible) {
      this._adapter.setInsetInputFocus();
      setTimeout(() => {
        this._adapter.setTriggerDisabled(true);
      }, 0);
    } else {
      this._adapter.setTriggerDisabled(false);
    }
  }
};
export {
  DatePickerFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_datePicker_foundation.js.map
