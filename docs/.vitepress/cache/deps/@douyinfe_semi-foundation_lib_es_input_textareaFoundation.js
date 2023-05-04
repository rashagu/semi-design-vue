import {
  require_pick
} from "./chunk-NNIGO4FV.js";
import "./chunk-OVLDI57Z.js";
import "./chunk-HOISZPJG.js";
import "./chunk-XXFWUEYP.js";
import "./chunk-RZZPN2AN.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-NAVCQYYY.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
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
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/input/textareaFoundation.js
var import_isString = __toESM(require_isString());
var import_isNumber = __toESM(require_isNumber());
var import_isFunction = __toESM(require_isFunction());
var import_noop = __toESM(require_noop());

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/input/util/calculateNodeHeight.js
var hiddenTextarea = null;
var HIDDEN_TEXTAREA_STYLE = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
var forceHiddenStyles = (node) => {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach((key) => {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
  });
};
var getContentHeight = (node, sizingData) => {
  const height = node.scrollHeight;
  if (sizingData.sizingStyle.boxSizing === "border-box") {
    return height + sizingData.borderSize;
  }
  return height - sizingData.paddingSize;
};
function calculateNodeHeight(sizingData, value) {
  let minRows = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  let maxRows = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Infinity;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tab-index", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    forceHiddenStyles(hiddenTextarea);
  }
  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }
  const {
    paddingSize,
    borderSize,
    sizingStyle
  } = sizingData;
  const {
    boxSizing
  } = sizingStyle;
  Object.keys(sizingStyle).forEach((key) => {
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  forceHiddenStyles(hiddenTextarea);
  hiddenTextarea.value = value;
  let height = getContentHeight(hiddenTextarea, sizingData);
  hiddenTextarea.value = "x";
  const rowHeight = getContentHeight(hiddenTextarea, sizingData) - paddingSize - borderSize;
  let minHeight = rowHeight * minRows;
  if (boxSizing === "border-box") {
    minHeight = minHeight + paddingSize + borderSize;
  }
  height = Math.max(minHeight, height);
  let maxHeight = rowHeight * maxRows;
  if (boxSizing === "border-box") {
    maxHeight = maxHeight + paddingSize + borderSize;
  }
  height = Math.min(maxHeight, height);
  return height;
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/input/util/getSizingData.js
var import_pick = __toESM(require_pick());
var SIZING_STYLE = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  // non-standard
  "tabSize",
  "textIndent",
  // non-standard
  "textRendering",
  "textTransform",
  "width"
];
var getSizingData = (node) => {
  const style = window.getComputedStyle(node);
  if (style === null) {
    return null;
  }
  const sizingStyle = (0, import_pick.default)(style, SIZING_STYLE);
  const {
    boxSizing
  } = sizingStyle;
  if (boxSizing === "") {
    return null;
  }
  const paddingSize = parseFloat(sizingStyle.paddingBottom) + parseFloat(sizingStyle.paddingTop);
  const borderSize = parseFloat(sizingStyle.borderBottomWidth) + parseFloat(sizingStyle.borderTopWidth);
  return {
    sizingStyle,
    paddingSize,
    borderSize
  };
};
var getSizingData_default = getSizingData;

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/input/textareaFoundation.js
var TextAreaFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, TextAreaFoundation.textAreaDefaultAdapter), adapter));
    this.resizeTextarea = (cb) => {
      const {
        height
      } = this.getStates();
      const {
        rows
      } = this.getProps();
      const node = this._adapter.getRef();
      const nodeSizingData = getSizingData_default(node);
      if (!nodeSizingData) {
        cb && cb();
        return;
      }
      const newHeight = calculateNodeHeight(
        nodeSizingData,
        node.value || node.placeholder || "x",
        rows
        // maxRows,
      );
      if (height !== newHeight) {
        this._adapter.notifyHeightUpdate(newHeight);
        node.style.height = `${newHeight}px`;
        return;
      }
      cb && cb();
    };
  }
  static get textAreaDefaultAdapter() {
    return {
      notifyChange: import_noop.default,
      setValue: import_noop.default,
      toggleFocusing: import_noop.default,
      toggleHovering: import_noop.default,
      notifyFocus: import_noop.default,
      notifyBlur: import_noop.default,
      notifyKeyDown: import_noop.default,
      notifyEnterPress: import_noop.default
    };
  }
  init() {
    this.setInitValue();
  }
  // eslint-disable-next-line
  destroy() {
  }
  setInitValue() {
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
  handleValueChange(v) {
    this._adapter.setValue(v);
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
        console.warn("[Semi TextArea] The input character is truncated because the input length exceeds the maximum length limit");
        const truncatedValue = this.handleTruncateValue(value, maxLength);
        return truncatedValue;
      } else {
        return value;
      }
    }
    return void 0;
  }
  /**
   * Truncate textarea values based on maximum length
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
  handleFocus(e) {
    const {
      value
    } = this.getStates();
    this._adapter.toggleFocusing(true);
    this._adapter.notifyFocus(value, e);
  }
  handleBlur(e) {
    const {
      value
    } = this.getStates();
    this._adapter.toggleFocusing(false);
    this._adapter.notifyBlur(value, e);
  }
  handleKeyDown(e) {
    this._adapter.notifyKeyDown(e);
    if (e.keyCode === 13) {
      this._adapter.notifyPressEnter(e);
    }
  }
  // e: MouseEvent
  handleMouseEnter(e) {
    this._adapter.toggleHovering(true);
  }
  // e: MouseEvent
  handleMouseLeave(e) {
    this._adapter.toggleHovering(false);
  }
  isAllowClear() {
    const {
      value,
      isFocus,
      isHover
    } = this._adapter.getStates();
    const {
      showClear,
      disabled,
      readonly
    } = this._adapter.getProps();
    const allowClear = value && showClear && !disabled && (isFocus || isHover) && !readonly;
    return allowClear;
  }
  handleClear(e) {
    const {
      isFocus
    } = this.getStates();
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
    if (isFocus) {
      this._adapter.notifyBlur("", e);
    }
    this._adapter.notifyChange("", e);
    this._adapter.notifyClear(e);
    this.stopPropagation(e);
  }
};
export {
  TextAreaFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_input_textareaFoundation.js.map
