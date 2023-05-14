import {
  require_isUndefined
} from "./chunk-V52XL574.js";
import {
  keyCode_default
} from "./chunk-C3N6TMV6.js";
import {
  require_isNumber
} from "./chunk-UV6QJF5D.js";
import {
  require_isString
} from "./chunk-NQE5YR5Y.js";
import {
  warning
} from "./chunk-K7DSZPDE.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import {
  require_isObject
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/autoComplete/foundation.js
var import_isObject = __toESM(require_isObject());
var import_isUndefined = __toESM(require_isUndefined());
var import_isNumber = __toESM(require_isNumber());
var import_isString = __toESM(require_isString());
var AutoCompleteFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.isPanelOpen = false;
  }
  init() {
    this._setDropdownWidth();
    const {
      defaultOpen,
      data,
      defaultValue,
      value
    } = this.getProps();
    if (data && data.length) {
      const initOptions = this._generateList(data);
      this._adapter.updateOptionList(initOptions);
    }
    if (defaultOpen) {
      this.openDropdown();
    }
    let initValue;
    if (typeof defaultValue !== "undefined") {
      initValue = defaultValue;
    }
    if (typeof value !== "undefined") {
      initValue = value;
    }
    if (typeof initValue !== "undefined") {
      this.handleValueChange(initValue);
    }
  }
  destroy() {
  }
  _setDropdownWidth() {
    const {
      style,
      dropdownMatchSelectWidth
    } = this.getProps();
    let width;
    if (dropdownMatchSelectWidth) {
      if (style && (0, import_isNumber.default)(style.width)) {
        width = style.width;
      } else if (style && (0, import_isString.default)(style.width) && !style.width.includes("%")) {
        width = style.width;
      } else {
        width = this._adapter.getTriggerWidth();
      }
      this._adapter.setOptionWrapperWidth(width);
    }
  }
  handleInputClick(e) {
    const {
      options
    } = this.getStates();
    const {
      disabled
    } = this.getProps();
    if (!disabled) {
      if (this.isPanelOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    }
  }
  openDropdown() {
    this.isPanelOpen = true;
    this._adapter.toggleListVisible(true);
    this._setDropdownWidth();
    this._adapter.notifyDropdownVisibleChange(true);
    this._modifyFocusIndexOnPanelOpen();
  }
  closeDropdown(e) {
    this.isPanelOpen = false;
    this._adapter.toggleListVisible(false);
    this._adapter.notifyDropdownVisibleChange(false);
  }
  // props.data => optionList
  _generateList(data) {
    const {
      renderItem
    } = this.getProps();
    const options = [];
    if (data && data.length) {
      data.forEach((item, i) => {
        const key = String((/* @__PURE__ */ new Date()).getTime()) + i;
        let option = {};
        if ((0, import_isString.default)(item) || (0, import_isNumber.default)(item)) {
          option = {
            value: item,
            key,
            label: item,
            show: true
          };
        } else if ((0, import_isObject.default)(item) && !(0, import_isUndefined.default)(item.value)) {
          option = Object.assign({
            show: true
          }, item);
        }
        if (renderItem && typeof renderItem === "function") {
          option.label = renderItem(item);
        }
        options.push(option);
      });
    }
    return options;
  }
  handleSearch(inputValue) {
    this._adapter.updateInputValue(inputValue);
    this._adapter.notifySearch(inputValue);
    this._adapter.notifyChange(inputValue);
    this._modifyFocusIndex(inputValue);
    if (!this.isPanelOpen) {
      this.openDropdown();
    }
  }
  handleSelect(option, optionIndex) {
    const {
      renderSelectedItem
    } = this.getProps();
    let newInputValue = "";
    if (renderSelectedItem && typeof renderSelectedItem === "function") {
      newInputValue = renderSelectedItem(option);
      warning(typeof newInputValue !== "string", "Warning: [Semi AutoComplete] renderSelectedItem must return string, please check your function return");
    } else {
      newInputValue = option.value;
    }
    if (this._isControlledComponent()) {
      this.closeDropdown();
      this.notifySelect(option);
    } else {
      this._adapter.updateInputValue(newInputValue);
      this.updateSelection(option);
      this.notifySelect(option);
      this.closeDropdown();
    }
    this._adapter.notifyChange(newInputValue);
    this._adapter.updateFocusIndex(optionIndex);
  }
  updateSelection(option) {
    const selection = /* @__PURE__ */ new Map();
    if (option) {
      selection.set(option.label, option);
    }
    this._adapter.updateSelection(selection);
  }
  notifySelect(option) {
    if (this._backwardLabelInValue()) {
      this._adapter.notifySelect(option);
    } else {
      this._adapter.notifySelect(option.value);
    }
  }
  _backwardLabelInValue() {
    const props = this.getProps();
    let {
      onSelectWithObject
    } = props;
    return onSelectWithObject;
  }
  handleDataChange(newData) {
    const options = this._generateList(newData);
    this._adapter.updateOptionList(options);
    this._adapter.rePositionDropdown();
  }
  handleValueChange(propValue) {
    let {
      data,
      defaultActiveFirstOption
    } = this.getProps();
    let selectedValue = "";
    if (this._backwardLabelInValue() && Object.prototype.toString.call(propValue) === "[object Object]") {
      selectedValue = propValue.value;
    } else {
      selectedValue = propValue;
    }
    let renderSelectedItem = this._getRenderSelectedItem();
    const options = this._generateList(data);
    let selectedOption = options.filter((option) => renderSelectedItem(option) === selectedValue);
    const canMatchInData = selectedOption.length;
    const selectedOptionIndex = options.findIndex((option) => renderSelectedItem(option) === selectedValue);
    let inputValue = "";
    if (canMatchInData) {
      selectedOption = selectedOption[0];
      inputValue = renderSelectedItem(selectedOption);
    } else {
      const cbItem = this._backwardLabelInValue() ? propValue : {
        label: selectedValue,
        value: selectedValue
      };
      inputValue = renderSelectedItem(cbItem);
    }
    this._adapter.updateInputValue(inputValue);
    this.updateSelection(canMatchInData ? selectedOption : null);
    if (selectedOptionIndex === -1 && defaultActiveFirstOption) {
      this._adapter.updateFocusIndex(0);
    } else {
      this._adapter.updateFocusIndex(selectedOptionIndex);
    }
  }
  _modifyFocusIndex(searchValue) {
    let {
      focusIndex
    } = this.getStates();
    let {
      data,
      defaultActiveFirstOption
    } = this.getProps();
    let renderSelectedItem = this._getRenderSelectedItem();
    const options = this._generateList(data);
    const selectedOptionIndex = options.findIndex((option) => renderSelectedItem(option) === searchValue);
    if (selectedOptionIndex === -1 && defaultActiveFirstOption) {
      if (focusIndex !== 0) {
        this._adapter.updateFocusIndex(0);
      }
    } else {
      if (selectedOptionIndex !== focusIndex) {
        this._adapter.updateFocusIndex(selectedOptionIndex);
      }
    }
  }
  _modifyFocusIndexOnPanelOpen() {
    let {
      inputValue
    } = this.getStates();
    this._modifyFocusIndex(inputValue);
  }
  _getRenderSelectedItem() {
    let {
      renderSelectedItem
    } = this.getProps();
    if (typeof renderSelectedItem === "undefined") {
      renderSelectedItem = (option) => option.value;
    } else if (renderSelectedItem && typeof renderSelectedItem === "function") {
    }
    return renderSelectedItem;
  }
  handleClear() {
    this._adapter.notifyClear();
  }
  bindKeyBoardEvent() {
    this._keydownHandler = (event) => {
      this._handleKeyDown(event);
    };
    this._adapter.registerKeyDown(this._keydownHandler);
  }
  // unBindKeyBoardEvent() {
  //     if (this._keydownHandler) {
  //         this._adapter.unregisterKeyDown(this._keydownHandler);
  //     }
  // }
  _handleKeyDown(event) {
    const key = event.keyCode;
    const {
      visible
    } = this.getStates();
    switch (key) {
      case keyCode_default.UP:
        event.preventDefault();
        this._handleArrowKeyDown(-1);
        break;
      case keyCode_default.DOWN:
        event.preventDefault();
        this._handleArrowKeyDown(1);
        break;
      case keyCode_default.ENTER:
        event.preventDefault();
        this._handleEnterKeyDown();
        break;
      case keyCode_default.ESC:
        this.closeDropdown();
        break;
      default:
        break;
    }
    this._adapter.notifyKeyDown(event);
  }
  _getEnableFocusIndex(offset) {
    const {
      focusIndex,
      options
    } = this.getStates();
    const visibleOptions = options.filter((item) => item.show);
    const optionsLength = visibleOptions.length;
    let index = focusIndex + offset;
    if (index < 0) {
      index = optionsLength - 1;
    }
    if (index >= optionsLength) {
      index = 0;
    }
    if (offset > 0) {
      let nearestActiveOption = -1;
      for (let i = 0; i < visibleOptions.length; i++) {
        const optionIsActive = !visibleOptions[i].disabled;
        if (optionIsActive) {
          nearestActiveOption = i;
        }
        if (nearestActiveOption >= index) {
          break;
        }
      }
      index = nearestActiveOption;
    } else {
      let nearestActiveOption = visibleOptions.length;
      for (let i = optionsLength - 1; i >= 0; i--) {
        const optionIsActive = !visibleOptions[i].disabled;
        if (optionIsActive) {
          nearestActiveOption = i;
        }
        if (nearestActiveOption <= index) {
          break;
        }
      }
      index = nearestActiveOption;
    }
    this._adapter.updateFocusIndex(index);
  }
  _handleArrowKeyDown(offset) {
    const {
      visible
    } = this.getStates();
    if (!visible) {
      this.openDropdown();
    } else {
      this._getEnableFocusIndex(offset);
    }
  }
  _handleEnterKeyDown() {
    const {
      visible,
      options,
      focusIndex
    } = this.getStates();
    if (!visible) {
      this.openDropdown();
    } else {
      if (focusIndex !== void 0 && focusIndex !== -1 && options.length !== 0) {
        const visibleOptions = options.filter((item) => item.show);
        const selectedOption = visibleOptions[focusIndex];
        this.handleSelect(selectedOption, focusIndex);
      } else {
        this.closeDropdown();
      }
    }
  }
  handleOptionMouseEnter(optionIndex) {
    this._adapter.updateFocusIndex(optionIndex);
  }
  handleFocus(e) {
    this.bindKeyBoardEvent();
    this._adapter.notifyFocus(e);
  }
  handleBlur(e) {
    this._persistEvent(e);
    setTimeout(() => {
      this._adapter.notifyBlur(e);
      this.closeDropdown();
    }, 100);
  }
};
var foundation_default2 = AutoCompleteFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_autoComplete_foundation.js.map
