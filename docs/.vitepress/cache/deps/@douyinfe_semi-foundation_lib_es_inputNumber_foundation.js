import {
  numbers
} from "./chunk-4WJIOTZO.js";
import {
  require_toNumber
} from "./chunk-XKTW6BSF.js";
import {
  keyCode_default
} from "./chunk-C3N6TMV6.js";
import "./chunk-GQ5WYOGJ.js";
import {
  require_isString
} from "./chunk-NQE5YR5Y.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import {
  require_get
} from "./chunk-HGGG6L4M.js";
import {
  require_toString
} from "./chunk-ZZORV55O.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/inputNumber/foundation.js
var import_isString = __toESM(require_isString());
var import_get = __toESM(require_get());
var import_toString = __toESM(require_toString());
var import_toNumber = __toESM(require_toNumber());

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/number.js
function plus(num1, num2) {
  const num1Digits = (num1.toString().split(".")[1] || "").length;
  const num2Digits = (num2.toString().split(".")[1] || "").length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
function minus(num1, num2) {
  return plus(num1, -num2);
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/inputNumber/foundation.js
var InputNumberFoundation = class extends foundation_default {
  init() {
    this._setInitValue();
  }
  destroy() {
    this._unregisterInterval();
    this._unregisterTimer();
    this._adapter.unregisterGlobalEvent("mouseup");
  }
  isControlled() {
    return this._isControlledComponent("value");
  }
  _doInput() {
    let v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let event = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    let updateCb = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    let notifyVal = v;
    let number = v;
    let isValidNumber = true;
    const isControlled = this.isControlled();
    if (typeof v !== "number") {
      number = this.doParse(v, false);
      isValidNumber = !isNaN(number);
    }
    if (isValidNumber) {
      notifyVal = number;
      if (!isControlled) {
        this._adapter.setNumber(number);
      }
    }
    if (!isControlled) {
      this._adapter.setValue(v, updateCb);
    }
    if (this.getProp("keepFocus")) {
      this._adapter.setFocusing(true, () => {
        this._adapter.setClickUpOrDown(true);
      });
    }
    this.notifyChange(notifyVal, event);
  }
  _registerInterval(cb) {
    const pressInterval = this.getProp("pressInterval") || numbers.DEFAULT_PRESS_INTERVAL;
    this._intervalHasRegistered = true;
    this._interval = setInterval(() => {
      if (typeof cb === "function" && this._intervalHasRegistered) {
        cb();
      }
    }, pressInterval);
  }
  _unregisterInterval() {
    if (this._interval) {
      this._intervalHasRegistered = false;
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _registerTimer(cb) {
    const pressTimeout = this.getProp("pressTimeout") || numbers.DEFAULT_PRESS_TIMEOUT;
    this._timerHasRegistered = true;
    this._timer = setTimeout(() => {
      if (this._timerHasRegistered && typeof cb === "function") {
        cb();
      }
    }, pressTimeout);
  }
  _unregisterTimer() {
    if (this._timer) {
      this._timerHasRegistered = false;
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  handleInputFocus(e) {
    const value = this.getState("value");
    if (value !== "") {
    }
    this._adapter.recordCursorPosition();
    this._adapter.setFocusing(true, null);
    this._adapter.setClickUpOrDown(false);
    this._adapter.notifyFocus(e);
  }
  /**
   * Input box content update processing
   * @param {String} value
   * @param {*} event
   */
  handleInputChange(value, event) {
    const parsedNum = this.doParse(value, true, true, true);
    const toNum = this.doParse(value, false, false, false);
    const valueAfterParser = this.afterParser(value);
    this._adapter.recordCursorPosition();
    let notifyVal;
    let num = toNum;
    let formattedNum = value;
    if (value === "") {
      if (!this.isControlled()) {
        num = null;
      }
    } else if (this.isValidNumber(toNum) && this.isValidNumber(parsedNum)) {
      notifyVal = toNum;
      formattedNum = this.doFormat(toNum, false);
    } else {
      if (typeof toNum === "number" && !isNaN(toNum)) {
        formattedNum = this.doFormat(toNum, false);
        const dotIndex = valueAfterParser.lastIndexOf(".");
        const lengthAfterDot = valueAfterParser.length - 1 - dotIndex;
        const precLength = this._getPrecLen(toNum);
        if (!precLength) {
          const dotBeginStr = dotIndex > -1 ? valueAfterParser.slice(dotIndex) : "";
          formattedNum += dotBeginStr;
        } else if (precLength < lengthAfterDot) {
          for (let i = 0; i < lengthAfterDot - precLength; i++) {
            formattedNum += "0";
          }
        }
        num = toNum;
      } else {
        formattedNum = this.doFormat(valueAfterParser, false);
      }
      notifyVal = valueAfterParser;
    }
    if (!this.isControlled() && (num === null || typeof num === "number" && !isNaN(num))) {
      this._adapter.setNumber(num);
    }
    this._adapter.setValue(this.isControlled() ? formattedNum : this.doFormat(valueAfterParser, false), () => {
      this._adapter.restoreCursor();
    });
    this.notifyChange(notifyVal, event);
  }
  handleInputKeyDown(event) {
    const code = event.keyCode;
    if (code === keyCode_default.UP || code === keyCode_default.DOWN) {
      this._adapter.setClickUpOrDown(true);
      this._adapter.recordCursorPosition();
      const formattedVal = code === keyCode_default.UP ? this.add(null, event) : this.minus(null, event);
      this._doInput(formattedVal, event, () => {
        this._adapter.restoreCursor();
      });
      event.preventDefault();
    }
    this._adapter.notifyKeyDown(event);
  }
  handleInputBlur(e) {
    const currentValue = (0, import_toString.default)(this.getState("value"));
    let currentNumber = this.getState("number");
    if (currentNumber != null || currentValue != null && currentValue !== "") {
      const parsedNum = this.doParse(currentValue, false, true, true);
      let numHasChanged = false;
      let strHasChanged = false;
      let willSetNum, willSetVal;
      if (this.isValidNumber(parsedNum) && currentNumber !== parsedNum) {
        willSetNum = parsedNum;
        if (!this.isControlled()) {
          currentNumber = willSetNum;
        }
        numHasChanged = true;
      }
      const currentFormattedNum = this.doFormat(currentNumber, true);
      if (currentFormattedNum !== currentValue) {
        willSetVal = currentFormattedNum;
        strHasChanged = true;
      }
      if (strHasChanged || numHasChanged) {
        const notifyVal = willSetVal != null ? willSetVal : willSetNum;
        if (willSetVal != null) {
          this._adapter.setValue(willSetVal);
        }
        if (willSetNum != null) {
          if (!this._isControlledComponent("value")) {
            this._adapter.setNumber(willSetNum);
          }
        }
        this.notifyChange(notifyVal, e);
      }
    }
    this._adapter.setFocusing(false);
    this._adapter.notifyBlur(e);
  }
  handleInputMouseEnter(event) {
    this._adapter.setHovering(true);
  }
  handleInputMouseLeave(event) {
    this._adapter.setHovering(false);
  }
  handleInputMouseMove(event) {
    this._adapter.setHovering(true);
  }
  handleMouseUp(e) {
    this._unregisterInterval();
    this._unregisterTimer();
    this._adapter.unregisterGlobalEvent("mouseup");
  }
  handleUpClick(event) {
    const {
      readonly
    } = this.getProps();
    if (!this._isMouseButtonLeft(event) || readonly) {
      return;
    }
    this._adapter.setClickUpOrDown(true);
    if (event) {
      this._persistEvent(event);
      event.stopPropagation();
      this._preventDefault(event);
    }
    this.upClick(event);
    this._registerTimer(() => {
      this._registerInterval(() => {
        this.upClick(event);
      });
    });
  }
  handleDownClick(event) {
    const {
      readonly
    } = this.getProps();
    if (!this._isMouseButtonLeft(event) || readonly) {
      return;
    }
    this._adapter.setClickUpOrDown(true);
    if (event) {
      this._persistEvent(event);
      event.stopPropagation();
      this._preventDefault(event);
    }
    this.downClick(event);
    this._registerTimer(() => {
      this._registerInterval(() => {
        this.downClick(event);
      });
    });
  }
  /**
   * Whether it is a left mouse button click
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
   */
  _isMouseButtonLeft(event) {
    return (0, import_get.default)(event, "button") === numbers.MOUSE_BUTTON_LEFT;
  }
  _preventDefault(event) {
    const keepFocus = this._adapter.getProp("keepFocus");
    const innerButtons = this._adapter.getProp("innerButtons");
    if (keepFocus || innerButtons) {
      event.preventDefault();
    }
  }
  handleMouseLeave(event) {
    this._adapter.registerGlobalEvent("mouseup", () => {
      this.handleMouseUp(event);
    });
  }
  upClick(event) {
    const value = this.add(null, event);
    this._doInput(value, event);
    this._adapter.notifyUpClick(value, event);
  }
  downClick(event) {
    const value = this.minus(null, event);
    this._doInput(value, event);
    this._adapter.notifyDownClick(value, event);
  }
  _setInitValue() {
    const {
      defaultValue,
      value
    } = this.getProps();
    const propsValue = this._isControlledComponent("value") ? value : defaultValue;
    const tmpNumber = this.doParse((0, import_toString.default)(propsValue), false, true, true);
    let number = null;
    if (typeof tmpNumber === "number" && !isNaN(tmpNumber)) {
      number = tmpNumber;
    }
    const formattedValue = typeof number === "number" ? this.doFormat(number, true) : "";
    this._adapter.setNumber(number);
    this._adapter.setValue(formattedValue);
    if ((0, import_isString.default)(formattedValue) && formattedValue !== String(propsValue !== null && propsValue !== void 0 ? propsValue : "")) {
      this.notifyChange(formattedValue, null);
    }
  }
  add(step, event) {
    const pressShift = event && event.shiftKey;
    const propStep = pressShift ? this.getProp("shiftStep") : this.getProp("step");
    step = step == null ? propStep : Number(step);
    const stepAbs = Math.abs((0, import_toNumber.default)(step));
    const curVal = this.getState("number");
    let curNum = this.toNumber(curVal) || 0;
    const min = this.getProp("min");
    const max = this.getProp("max");
    const minPrecLen = this._getPrecLen(min);
    const maxPrecLen = this._getPrecLen(max);
    const curPrecLen = this._getPrecLen(curNum);
    const stepPrecLen = this._getPrecLen(step);
    const scale = Math.pow(10, Math.max(minPrecLen, maxPrecLen, curPrecLen, stepPrecLen));
    if (step < 0) {
      if (Math.abs(minus(min, curNum)) >= stepAbs) {
        curNum = (curNum * scale + step * scale) / scale;
      }
    } else if (step > 0) {
      if (Math.abs(minus(max, curNum)) >= stepAbs) {
        curNum = (curNum * scale + step * scale) / scale;
      }
    }
    if (typeof min === "number" && min > curNum) {
      curNum = min;
    }
    if (typeof max === "number" && max < curNum) {
      curNum = max;
    }
    return this.doFormat(curNum, true);
  }
  minus(step, event) {
    const pressShift = event && event.shiftKey;
    const propStep = pressShift ? this.getProp("shiftStep") : this.getProp("step");
    step = step == null ? propStep : Number(step);
    return this.add(-step, event);
  }
  /**
   * get decimal length
   * @param {number} num
   * @returns {number}
   */
  _getPrecLen(num) {
    if (typeof num !== "string") {
      num = String(Math.abs(Number(num || "")));
    }
    const idx = num.indexOf(".") + 1;
    return idx ? num.length - idx : 0;
  }
  _adjustPrec(num) {
    const precision = this.getProp("precision");
    if (typeof precision === "number" && num !== "" && num !== null && !Number.isNaN(Number(num))) {
      num = Number(num).toFixed(precision);
    }
    return (0, import_toString.default)(num);
  }
  /**
   * format number to string
   * @param {string|number} value
   * @param {boolean} needAdjustPrec
   * @returns {string}
   */
  doFormat() {
    let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    let needAdjustPrec = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    let str;
    const formatter = this.getProp("formatter");
    if (needAdjustPrec) {
      str = this._adjustPrec(value);
    } else {
      str = (0, import_toString.default)(value);
    }
    if (typeof formatter === "function") {
      str = formatter(str);
    }
    return str;
  }
  /**
   *
   * @param {number} current
   * @returns {number}
   */
  fetchMinOrMax(current) {
    const {
      min,
      max
    } = this.getProps();
    if (current < min) {
      return min;
    } else if (current > max) {
      return max;
    }
    return current;
  }
  /**
   * parse to number
   * @param {string|number} value
   * @param {boolean} needCheckPrec
   * @param {boolean} needAdjustPrec
   * @param {boolean} needAdjustMaxMin
   * @returns {number}
   */
  doParse(value) {
    let needCheckPrec = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    let needAdjustPrec = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    let needAdjustMaxMin = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if (typeof value === "number") {
      if (needAdjustMaxMin) {
        value = this.fetchMinOrMax(value);
      }
      if (needAdjustPrec) {
        value = this._adjustPrec(value);
      }
      return (0, import_toNumber.default)(value);
    }
    const parser = this.getProp("parser");
    if (typeof parser === "function") {
      value = parser(value);
    }
    if (needCheckPrec && typeof value === "string") {
      const zeroIsValid = value.indexOf(".") === -1 || value.indexOf(".") > -1 && (value === "0" || value.lastIndexOf("0") < value.length - 1);
      const dotIsValid = value.lastIndexOf(".") < value.length - 1 && value.split("").filter((v) => v === ".").length < 2;
      if (!zeroIsValid || !dotIsValid) {
        return NaN;
      }
    }
    if (needAdjustPrec) {
      value = this._adjustPrec(value);
    }
    if (typeof value === "string" && value.length) {
      return needAdjustMaxMin ? this.fetchMinOrMax((0, import_toNumber.default)(value)) : (0, import_toNumber.default)(value);
    }
    return NaN;
  }
  /**
   * Parsing the input value
   * @param {string} value
   * @returns {string}
   */
  afterParser(value) {
    const parser = this.getProp("parser");
    if (typeof value === "string" && typeof parser === "function") {
      return (0, import_toString.default)(parser(value));
    }
    return (0, import_toString.default)(value);
  }
  toNumber(value) {
    let needAdjustPrec = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string") {
      const parser = this.getProp("parser");
      if (typeof parser === "function") {
        value = parser(value);
      }
      if (needAdjustPrec) {
        value = this._adjustPrec(value);
      }
    }
    return (0, import_toNumber.default)(value);
  }
  /**
   * Returning true requires both:
   * 1.type is number and not equal to NaN
   * 2.min < = value < = max
   * 3.length after decimal point requires < = precision | | No precision
   * @param {*} um
   * @param {*} needCheckPrec
   * @returns
   */
  isValidNumber(num) {
    let needCheckPrec = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (typeof num === "number" && !isNaN(num)) {
      const {
        min,
        max,
        precision
      } = this.getProps();
      const numPrec = this._getPrecLen(num);
      const precIsValid = needCheckPrec ? typeof precision === "number" && numPrec <= precision || typeof precision !== "number" : true;
      if (num >= min && num <= max && precIsValid) {
        return true;
      }
    }
    return false;
  }
  isValidString(str) {
    if (typeof str === "string" && str.length) {
      const parsedNum = this.doParse(str);
      return this.isValidNumber(parsedNum);
    }
    return false;
  }
  notifyChange(value, e) {
    if (value == null || value === "") {
      this._adapter.notifyChange("", e);
    } else {
      const parsedNum = this.toNumber(value, true);
      if (typeof parsedNum === "number" && !isNaN(parsedNum)) {
        this._adapter.notifyChange(parsedNum, e);
        this.notifyNumberChange(parsedNum, e);
      } else {
        this._adapter.notifyChange(this.afterParser(value), e);
      }
    }
  }
  notifyNumberChange(value, e) {
    const {
      number
    } = this.getStates();
    if (this.isValidNumber(value) && value !== number) {
      this._adapter.notifyNumberChange(value, e);
    }
  }
  updateStates(states, callback) {
    this._adapter.updateStates(states, callback);
  }
};
var foundation_default2 = InputNumberFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_inputNumber_foundation.js.map
