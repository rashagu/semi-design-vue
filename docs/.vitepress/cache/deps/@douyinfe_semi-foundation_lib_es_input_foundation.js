import {
  require_set
} from "./chunk-2POGEFFC.js";
import {
  strings
} from "./chunk-GQ5WYOGJ.js";
import "./chunk-NAVCQYYY.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import {
  ENTER_KEY
} from "./chunk-C3N6TMV6.js";
import {
  require_isNumber
} from "./chunk-UV6QJF5D.js";
import {
  require_isString
} from "./chunk-NQE5YR5Y.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import {
  require_noop
} from "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import {
  require_isFunction
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/input/foundation.js
var import_isFunction = __toESM(require_isFunction());
var import_isString = __toESM(require_isString());
var import_isNumber = __toESM(require_isNumber());
var import_set = __toESM(require_set());
var import_noop = __toESM(require_noop());
var InputFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, InputFoundation.inputDefaultAdapter), adapter));
  }
  static get inputDefaultAdapter() {
    return {
      notifyChange: import_noop.default,
      setValue: import_noop.default
      // toggleAllowClear: noop,
    };
  }
  init() {
    this._setInitValue();
  }
  destroy() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  // eslint-disable-next-line
  setDisable() {
  }
  _setInitValue() {
    const {
      defaultValue,
      value
    } = this.getProps();
    let v = defaultValue;
    if (this._isControlledComponent()) {
      v = value;
    }
    this._adapter.setValue(v);
  }
  setValue(value) {
    this._adapter.setValue(value);
  }
  handleChange(value, e) {
    const {
      maxLength,
      minLength,
      getValueLength
    } = this._adapter.getProps();
    let nextValue = value;
    if (maxLength && (0, import_isFunction.default)(getValueLength)) {
      nextValue = this.handleVisibleMaxLength(value);
    }
    if (minLength && (0, import_isFunction.default)(getValueLength)) {
      this.handleVisibleMinLength(nextValue);
    }
    if (this._isControlledComponent()) {
      this._adapter.notifyChange(nextValue, e);
    } else {
      this._adapter.setValue(nextValue);
      this._adapter.notifyChange(nextValue, e);
    }
  }
  /**
   * Modify minLength to trigger browser check for minimum length
   * Controlled mode is not checked
   * @param {String} value
   */
  handleVisibleMinLength(value) {
    const {
      minLength,
      getValueLength
    } = this._adapter.getProps();
    const {
      minLength: stateMinLength
    } = this._adapter.getStates();
    if ((0, import_isNumber.default)(minLength) && minLength >= 0 && (0, import_isFunction.default)(getValueLength) && (0, import_isString.default)(value)) {
      const valueLength = getValueLength(value);
      if (valueLength < minLength) {
        const newMinLength = value.length + (minLength - valueLength);
        newMinLength !== stateMinLength && this._adapter.setMinLength(newMinLength);
      } else {
        stateMinLength !== minLength && this._adapter.setMinLength(minLength);
      }
    }
  }
  /**
   * Handle input emoji characters beyond maxLength
   * Controlled mode is not checked
   * @param {String} value
   */
  handleVisibleMaxLength(value) {
    const {
      maxLength,
      getValueLength
    } = this._adapter.getProps();
    if ((0, import_isNumber.default)(maxLength) && maxLength >= 0 && (0, import_isFunction.default)(getValueLength) && (0, import_isString.default)(value)) {
      const valueLength = getValueLength(value);
      if (valueLength > maxLength) {
        console.warn("[Semi Input] The input character is truncated because the input length exceeds the maximum length limit");
        const truncatedValue = this.handleTruncateValue(value, maxLength);
        return truncatedValue;
      } else {
        return value;
      }
    }
  }
  /**
   * Truncate input values based on maximum length
   * @param {String} value
   * @param {Number} maxLength
   * @returns {String}
   */
  handleTruncateValue(value, maxLength) {
    const {
      getValueLength
    } = this._adapter.getProps();
    if ((0, import_isFunction.default)(getValueLength)) {
      let truncatedValue = "";
      for (let i = 1, len = value.length; i <= len; i++) {
        const currentValue = value.slice(0, i);
        if (getValueLength(currentValue) > maxLength) {
          return truncatedValue;
        } else {
          truncatedValue = currentValue;
        }
      }
      return truncatedValue;
    } else {
      return value.slice(0, maxLength);
    }
  }
  handleClear(e) {
    let eventObj = e;
    const value = "";
    if (this._isControlledComponent("value")) {
      this._adapter.setState({
        isFocus: false
      });
    } else {
      this._adapter.setState({
        value: "",
        isFocus: false
      });
    }
    if (!eventObj || typeof eventObj !== "object") {
      eventObj = {};
    }
    (0, import_set.default)(eventObj, strings.CLEARBTN_CLICKED_EVENT_FLAG, true);
    this._adapter.notifyChange(value, eventObj);
    this._adapter.notifyClear(eventObj);
    if (eventObj) {
      this.stopPropagation(eventObj);
    }
  }
  /**
   * trigger when click input wrapper
   * @param {Event} e
   */
  handleClick(e) {
    const {
      disabled
    } = this._adapter.getProps();
    const {
      isFocus
    } = this._adapter.getStates();
    if (disabled || isFocus) {
      return;
    }
    if (this._adapter.isEventTarget(e)) {
      this._adapter.focusInput();
      this._adapter.toggleFocusing(true);
    }
  }
  handleModeChange(mode) {
    if (mode === "password") {
      this._adapter.setEyeClosed(true);
    } else {
      this._adapter.setEyeClosed(false);
    }
  }
  handleClickEye(e) {
    const eyeClosed = this._adapter.getState("eyeClosed");
    this._adapter.focusInput();
    this._adapter.toggleFocusing(true);
    this._adapter.setEyeClosed(!eyeClosed);
  }
  handleInputType(type) {
    const mode = this._adapter.getProp("mode");
    const eyeClosed = this._adapter.getState("eyeClosed");
    if (mode === "password") {
      return eyeClosed ? "password" : "text";
    }
    return type;
  }
  handleMouseDown(e) {
    e.preventDefault();
  }
  handleMouseUp(e) {
    e.preventDefault();
  }
  handleBlur(e) {
    const {
      value
    } = this.getStates();
    this._adapter.toggleFocusing(false);
    this._adapter.notifyBlur(value, e);
  }
  handleFocus(e) {
    const {
      value
    } = this.getStates();
    this._adapter.toggleFocusing(true);
    this._adapter.notifyFocus(value, e);
  }
  handleInput(e) {
    this._adapter.notifyInput(e);
  }
  handleKeyDown(e) {
    this._adapter.notifyKeyDown(e);
  }
  handleKeyUp(e) {
    this._adapter.notifyKeyUp(e);
  }
  handleKeyPress(e) {
    this._adapter.notifyKeyPress(e);
    if (e.key === ENTER_KEY) {
      this._adapter.notifyEnterPress(e);
    }
  }
  isAllowClear() {
    const {
      value,
      isFocus,
      isHovering
    } = this._adapter.getStates();
    const {
      showClear,
      disabled
    } = this._adapter.getProps();
    const allowClear = value && showClear && !disabled && (isFocus || isHovering);
    return allowClear;
  }
  handleClickPrefixOrSuffix(e) {
    const {
      disabled
    } = this._adapter.getProps();
    const {
      isFocus
    } = this._adapter.getStates();
    if (!disabled && !isFocus) {
      this._adapter.focusInput();
      this._adapter.toggleFocusing(true);
    }
  }
  /**
   * Blocking mousedown events prevents input from losing focus
   * @param {Event} e
   */
  handlePreventMouseDown(e) {
    if (e && (0, import_isFunction.default)(e.preventDefault)) {
      e.preventDefault();
    }
  }
  /**
   * A11y: simulate password button click
   */
  handleModeEnterPress(e) {
    if (["Enter", " "].includes(e === null || e === void 0 ? void 0 : e.key)) {
      this.handlePreventMouseDown(e);
      this.handleClickEye(e);
    }
  }
};
var foundation_default2 = InputFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_input_foundation.js.map
