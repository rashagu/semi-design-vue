import {
  require_omit
} from "./chunk-7P6IIOLF.js";
import "./chunk-ZYO65OIS.js";
import "./chunk-AOQAQYP4.js";
import "./chunk-4QI5OKLV.js";
import "./chunk-XNEVMICD.js";
import "./chunk-GQLLYC3E.js";
import "./chunk-RFWJA27S.js";
import "./chunk-D6QY5MM6.js";
import "./chunk-UTEL65GX.js";
import "./chunk-VS2OXD4D.js";
import {
  isEnterPress_default
} from "./chunk-UEGGLRH4.js";
import {
  require_isEqual
} from "./chunk-34JO2KAW.js";
import "./chunk-HPYJEDL6.js";
import "./chunk-IGKIE6XV.js";
import "./chunk-CUWPCCUM.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import {
  isNullOrUndefined
} from "./chunk-6OL7JQEH.js";
import {
  handlePrevent
} from "./chunk-M6FOBOF7.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import {
  ENTER_KEY,
  keyCode_default
} from "./chunk-C3N6TMV6.js";
import "./chunk-XXFWUEYP.js";
import "./chunk-RZZPN2AN.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import {
  require_isNumber
} from "./chunk-UV6QJF5D.js";
import {
  require_isString
} from "./chunk-NQE5YR5Y.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
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
import "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/select/foundation.js
var import_omit = __toESM(require_omit());
var import_isEqual = __toESM(require_isEqual());
var import_isString = __toESM(require_isString());
var import_isNumber = __toESM(require_isNumber());
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var SelectFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this._keydownHandler = null;
  }
  init() {
    this._setDropdownWidth();
    const isDefaultOpen = this.getProp("defaultOpen");
    const isOpen = this.getProp("open");
    const originalOptions = this._collectOptions();
    this._setDefaultSelection(originalOptions);
    if (isDefaultOpen || isOpen) {
      this.open(void 0, originalOptions);
    }
    const autoFocus = this.getProp("autoFocus");
    if (autoFocus) {
      this.focus();
    }
  }
  focus() {
    const isFilterable = this._isFilterable();
    const isMultiple = this._isMultiple();
    this._adapter.updateFocusState(true);
    this._adapter.setIsFocusInContainer(false);
    if (isFilterable && isMultiple) {
      this.focusInput();
    } else if (isFilterable && !isMultiple) {
      this.toggle2SearchInput(true);
    } else {
      this._focusTrigger();
    }
  }
  _focusTrigger() {
    this._adapter.focusTrigger();
  }
  destroy() {
    this._adapter.unregisterClickOutsideHandler();
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
  _collectOptions() {
    const originalOptions = this._adapter.getOptionsFromChildren();
    this._adapter.updateOptions(originalOptions);
    this._adapter.rePositionDropdown();
    return originalOptions;
  }
  _setDefaultSelection(originalOptions) {
    let {
      value
    } = this.getProps();
    const {
      defaultValue
    } = this.getProps();
    if (this._isControlledComponent()) {
    } else {
      value = defaultValue;
    }
    this._update(value, originalOptions);
  }
  // call when props.optionList change
  handleOptionListChange() {
    const newOptionList = this._collectOptions();
    const {
      selections
    } = this.getStates();
    this.updateOptionsActiveStatus(selections, newOptionList);
    const {
      defaultActiveFirstOption
    } = this.getProps();
    if (defaultActiveFirstOption) {
      this._adapter.updateFocusIndex(0);
    }
  }
  // In uncontrolled mode, when props.optionList change,
  // but already had defaultValue or choose some option
  handleOptionListChangeHadDefaultValue() {
    const selections = this.getState("selections");
    let value;
    const {
      onChangeWithObject
    } = this.getProps();
    const isMultiple = this._isMultiple();
    switch (true) {
      case (isMultiple && Boolean(selections.size)):
        try {
          value = [...selections].map((item) => (
            // At this point item1 is directly the object
            onChangeWithObject ? item[1] : item[1].value
          ));
        } catch (error) {
          value = [];
        }
        break;
      case (isMultiple && !selections.size):
        value = [];
        break;
      case (!isMultiple && Boolean(selections.size)):
        try {
          value = onChangeWithObject ? [...selections][0][1] : [...selections][0][1].value;
        } catch (error) {
        }
        break;
      case (!isMultiple && !selections.size):
        break;
      default:
        break;
    }
    const originalOptions = this._adapter.getOptionsFromChildren();
    this._update(value, originalOptions);
  }
  // call when props.value change
  handleValueChange(value) {
    const {
      allowCreate,
      autoClearSearchValue,
      remote
    } = this.getProps();
    const {
      inputValue
    } = this.getStates();
    let originalOptions;
    if (allowCreate && this._isControlledComponent()) {
      originalOptions = this.getState("options");
      originalOptions.forEach((item) => item._show = true);
    } else {
      originalOptions = this._adapter.getOptionsFromChildren();
    }
    this._adapter.rePositionDropdown();
    if (this._isFilterable() && !autoClearSearchValue && inputValue && !remote) {
      originalOptions = this._filterOption(originalOptions, inputValue);
    }
    this._update(value, originalOptions);
  }
  // Update the selected item in the selection box
  _update(propValue, originalOptions) {
    let selections;
    if (!this._isMultiple()) {
      selections = this._updateSingle(propValue, originalOptions);
    } else {
      selections = this._updateMultiple(propValue, originalOptions);
      this.updateOverflowItemCount(selections.size);
    }
    this._adapter.updateSelection(selections);
    this.updateOptionsActiveStatus(selections, originalOptions);
  }
  // Optionally selected updates (when components are mounted, or after value changes)
  _updateSingle(propValue, originalOptions) {
    const selections = /* @__PURE__ */ new Map();
    const {
      onChangeWithObject
    } = this.getProps();
    const selectedValue = onChangeWithObject && typeof propValue !== "undefined" ? propValue.value : propValue;
    const selectedOptions = originalOptions.filter((option) => option.value === selectedValue);
    const noMatchOptionInList = !selectedOptions.length && typeof selectedValue !== "undefined";
    if (selectedOptions.length) {
      const selectedOption = selectedOptions[0];
      const optionExist = Object.assign({}, selectedOption);
      selections.set(optionExist.label, optionExist);
    } else if (noMatchOptionInList) {
      let optionNotExist = {
        value: propValue,
        label: propValue,
        _notExist: true,
        _scrollIndex: -1
      };
      if (onChangeWithObject) {
        optionNotExist = Object.assign(Object.assign({}, propValue), {
          _notExist: true,
          _scrollIndex: -1
        });
      }
      selections.set(optionNotExist.label, optionNotExist);
    }
    return selections;
  }
  // Multi-selected option update (when the component is mounted, or after the value changes)
  _updateMultiple(propValue, originalOptions) {
    const nowSelections = this.getState("selections");
    let selectedOptionList = [];
    const propValueIsArray = Array.isArray(propValue);
    this.checkMultipleProps();
    if (nowSelections.size) {
      selectedOptionList = [...nowSelections].map((item) => item[1]);
    }
    const selections = /* @__PURE__ */ new Map();
    let selectedValues = propValue;
    const {
      onChangeWithObject
    } = this.getProps();
    if (onChangeWithObject && propValueIsArray) {
      selectedValues = propValue.map((item) => item.value);
    }
    if (propValueIsArray && selectedValues.length) {
      selectedValues.forEach((selectedValue, i) => {
        const index = originalOptions.findIndex((option) => option.value === selectedValue);
        if (index !== -1) {
          selections.set(originalOptions[index].label, originalOptions[index]);
        } else {
          const indexInSelectedList = selectedOptionList.findIndex((option) => option.value === selectedValue);
          if (indexInSelectedList !== -1) {
            const option = selectedOptionList[indexInSelectedList];
            selections.set(option.label, option);
          } else {
            let optionNotExist = {
              value: selectedValue,
              label: selectedValue,
              _notExist: true
            };
            onChangeWithObject ? optionNotExist = Object.assign(Object.assign({}, propValue[i]), {
              _notExist: true
            }) : null;
            selections.set(optionNotExist.label, Object.assign(Object.assign({}, optionNotExist), {
              _scrollIndex: -1
            }));
          }
        }
      });
    }
    return selections;
  }
  _isMultiple() {
    return this.getProp("multiple");
  }
  _isDisabled() {
    return this.getProp("disabled");
  }
  _isFilterable() {
    return Boolean(this.getProp("filter"));
  }
  handleClick(e) {
    const {
      clickToHide
    } = this.getProps();
    const {
      isOpen
    } = this.getStates();
    const isDisabled = this._isDisabled();
    if (isDisabled) {
      return;
    } else if (!isOpen) {
      this.open();
      this._notifyFocus(e);
    } else if (isOpen && clickToHide) {
      this.close(e);
    } else if (isOpen && !clickToHide) {
      this.focusInput();
    }
  }
  open(acInput, originalOptions) {
    const isFilterable = this._isFilterable();
    const options = originalOptions || this.getState("options");
    if (isFilterable) {
      const sugInput = "";
      const newOptions = this._filterOption(options, sugInput).filter((item) => !item._inputCreateOnly);
      this._adapter.updateOptions(newOptions);
      this.toggle2SearchInput(true);
    }
    this._adapter.openMenu();
    this._setDropdownWidth();
    this._adapter.notifyDropdownVisibleChange(true);
    this.bindKeyBoardEvent();
    this._adapter.registerClickOutsideHandler((e) => {
      this.close(e);
      this._notifyBlur(e);
      this._adapter.updateFocusState(false);
    });
  }
  toggle2SearchInput(isShow) {
    if (isShow) {
      this._adapter.toggleInputShow(isShow, () => this.focusInput());
    } else {
      this._adapter.toggleInputShow(isShow, () => void 0);
    }
  }
  close(e, closeCb) {
    this._adapter.closeMenu();
    this._adapter.notifyDropdownVisibleChange(false);
    this._adapter.setIsFocusInContainer(false);
    this._adapter.unregisterClickOutsideHandler();
    const isFilterable = this._isFilterable();
    if (isFilterable) {
      this.toggle2SearchInput(false);
    }
    this._adapter.once("popoverClose", () => {
      if (isFilterable) {
        this.clearInput(e);
      }
      if (closeCb) {
        closeCb();
      }
    });
  }
  onSelect(option, optionIndex, event) {
    const isDisabled = this._isDisabled();
    if (isDisabled) {
      return;
    }
    if (option._inputCreateOnly) {
      this._adapter.notifyCreate(option);
    }
    const isMultiple = this._isMultiple();
    if (!isMultiple) {
      this._handleSingleSelect(option, event);
      this._focusTrigger();
    } else {
      this._handleMultipleSelect(option, event);
    }
    this._adapter.updateFocusIndex(optionIndex);
  }
  _handleSingleSelect(_a, event) {
    var {
      value,
      label
    } = _a, rest = __rest(_a, ["value", "label"]);
    const selections = (/* @__PURE__ */ new Map()).set(label, Object.assign({
      value,
      label
    }, rest));
    this._notifySelect(value, Object.assign({
      value,
      label
    }, rest));
    if (this._isControlledComponent()) {
      this.close(event, () => {
        this._notifyChange(selections);
      });
    } else {
      this._adapter.updateSelection(selections);
      this._notifyChange(selections);
      this.close(event, () => {
        this.updateOptionsActiveStatus(selections);
      });
    }
  }
  _handleMultipleSelect(_a, event) {
    var {
      value,
      label
    } = _a, rest = __rest(_a, ["value", "label"]);
    const maxLimit = this._adapter.getMaxLimit();
    const selections = this._adapter.getSelections();
    const {
      autoClearSearchValue
    } = this.getProps();
    if (selections.has(label)) {
      this._notifyDeselect(value, Object.assign({
        value,
        label
      }, rest));
      selections.delete(label);
    } else if (maxLimit && selections.size === maxLimit) {
      this._adapter.notifyMaxLimit(Object.assign({
        value,
        label
      }, (0, import_omit.default)(rest, "_scrollIndex")));
      return;
    } else {
      this._notifySelect(value, Object.assign({
        value,
        label
      }, rest));
      selections.set(label, Object.assign({
        value,
        label
      }, rest));
    }
    if (this._isControlledComponent()) {
      this._notifyChange(selections);
      if (this._isFilterable()) {
        if (autoClearSearchValue) {
          this.clearInput(event);
        }
        this.focusInput();
      }
    } else {
      this._adapter.updateSelection(selections);
      this.updateOverflowItemCount(selections.size);
      this._adapter.rePositionDropdown();
      let {
        options
      } = this.getStates();
      if (this._isFilterable()) {
        if (autoClearSearchValue) {
          this.clearInput(event);
          const sugInput = "";
          options = this._filterOption(options, sugInput);
        }
        this.focusInput();
      }
      this.updateOptionsActiveStatus(selections, options);
      this._notifyChange(selections);
    }
  }
  clearSelected() {
    const selections = /* @__PURE__ */ new Map();
    if (this._isControlledComponent()) {
      this._notifyChange(selections);
      this._adapter.notifyClear();
    } else {
      this._adapter.updateSelection(selections);
      this.updateOptionsActiveStatus(selections);
      this._notifyChange(selections);
      this._adapter.notifyClear();
    }
    const {
      isOpen
    } = this.getStates();
    if (isOpen) {
      this._adapter.rePositionDropdown();
    }
  }
  // Update the selected item in the drop-down box
  updateOptionsActiveStatus(selections) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getState("options");
    const {
      allowCreate
    } = this.getProps();
    const newOptions = options.map((option) => {
      if (selections.has(option.label)) {
        option._selected = true;
        if (allowCreate) {
          delete option._inputCreateOnly;
        }
      } else {
        if (option._inputCreateOnly) {
          option._show = false;
        }
        option._selected = false;
      }
      return option;
    });
    this._adapter.updateOptions(newOptions);
  }
  removeTag(item) {
    const selections = this._adapter.getSelections();
    selections.delete(item.label);
    if (this._isControlledComponent()) {
      this._notifyDeselect(item.value, item);
      this._notifyChange(selections);
    } else {
      this._notifyDeselect(item.value, item);
      this._adapter.updateSelection(selections);
      this.updateOverflowItemCount(selections.size);
      this.updateOptionsActiveStatus(selections);
      this._adapter.rePositionDropdown();
      this._notifyChange(selections);
    }
  }
  // The reason why event input is optional is that clearInput may be manually called by the user through ref
  clearInput(event) {
    const {
      inputValue
    } = this.getStates();
    if (inputValue !== "") {
      this._adapter.updateInputValue("");
      this._adapter.notifySearch("", event);
      const {
        options
      } = this.getStates();
      const {
        remote
      } = this.getProps();
      let optionsAfterFilter = options;
      if (!remote) {
        optionsAfterFilter = this._filterOption(options, "");
      }
      this._adapter.updateOptions(optionsAfterFilter);
    }
  }
  focusInput() {
    this._adapter.focusInput();
    this._adapter.updateFocusState(true);
    this._adapter.setIsFocusInContainer(false);
  }
  handleInputChange(sugInput, event) {
    this._adapter.updateInputValue(sugInput);
    const {
      options,
      isOpen
    } = this.getStates();
    const {
      allowCreate,
      remote
    } = this.getProps();
    let optionsAfterFilter = options;
    if (!remote) {
      optionsAfterFilter = this._filterOption(options, sugInput);
    }
    optionsAfterFilter = this._createOptionByInput(allowCreate, optionsAfterFilter, sugInput);
    this._adapter.updateOptions(optionsAfterFilter);
    this._adapter.notifySearch(sugInput, event);
    if (this._isMultiple()) {
      this._adapter.rePositionDropdown();
    }
  }
  _filterOption(originalOptions, sugInput) {
    const filter = this.getProp("filter");
    if (!filter) {
      return originalOptions;
    } else if (typeof filter === "boolean" && filter) {
      const input = sugInput.toLowerCase();
      return originalOptions.map((option) => {
        const label = option.label.toString().toLowerCase();
        const groupLabel = option._parentGroup && option._parentGroup.label;
        const matchOption = label.includes(input);
        const matchGroup = (0, import_isString.default)(groupLabel) && groupLabel.toLowerCase().includes(input);
        if (matchOption || matchGroup) {
          option._show = true;
        } else {
          option._show = false;
        }
        return option;
      });
    } else if (typeof filter === "function") {
      return originalOptions.map((option) => {
        filter(sugInput, option) ? option._show = true : option._show = false;
        return option;
      });
    }
    return void 0;
  }
  _createOptionByInput(allowCreate, optionsAfterFilter, sugInput) {
    if (allowCreate) {
      if (sugInput) {
        const newOptionByInput = {
          _show: true,
          _selected: false,
          value: sugInput,
          label: sugInput,
          // True indicates that the option was dynamically created during user filtering
          _inputCreateOnly: true
        };
        let createOptionIndex = -1;
        let matchOptionIndex = -1;
        optionsAfterFilter.forEach((option, index) => {
          if (!option._show && !option._inputCreateOnly) {
            return;
          }
          if (option.label === sugInput) {
            matchOptionIndex = index;
          }
          if (option._inputCreateOnly) {
            createOptionIndex = index;
            option.value = sugInput;
            option.label = sugInput;
            option._show = true;
          }
        });
        if (createOptionIndex === -1 && matchOptionIndex === -1) {
          optionsAfterFilter.push(newOptionByInput);
        }
        if (matchOptionIndex !== -1) {
          optionsAfterFilter = optionsAfterFilter.filter((item) => !item._inputCreateOnly);
        }
      } else {
        optionsAfterFilter = optionsAfterFilter.filter((item) => !item._inputCreateOnly);
      }
    }
    return optionsAfterFilter;
  }
  bindKeyBoardEvent() {
    this._keydownHandler = (event) => {
      this._handleKeyDown(event);
    };
    this._adapter.registerKeyDown(this._keydownHandler);
  }
  unBindKeyBoardEvent() {
    if (this._keydownHandler) {
      this._adapter.unregisterKeyDown();
    }
  }
  _handleKeyDown(event) {
    const key = event.keyCode;
    const {
      loading,
      filter,
      multiple,
      disabled
    } = this.getProps();
    const {
      isOpen
    } = this.getStates();
    if (loading || disabled) {
      return;
    }
    switch (key) {
      case keyCode_default.UP:
        event.preventDefault();
        this._handleArrowKeyDown(-1);
        break;
      case keyCode_default.DOWN:
        event.preventDefault();
        this._handleArrowKeyDown(1);
        break;
      case keyCode_default.BACKSPACE:
        this._handleBackspaceKeyDown();
        break;
      case keyCode_default.ENTER:
        handlePrevent(event);
        this._handleEnterKeyDown(event);
        break;
      case keyCode_default.ESC:
        isOpen && this.close(event);
        filter && !multiple && this._focusTrigger();
        break;
      case keyCode_default.TAB:
        this._handleTabKeyDown(event);
        break;
      default:
        break;
    }
  }
  handleContainerKeyDown(event) {
    const key = event.keyCode;
    const {
      isOpen
    } = this.getStates();
    switch (key) {
      case keyCode_default.TAB:
        isOpen && this._handleTabKeyDown(event);
        break;
      default:
        break;
    }
  }
  _getEnableFocusIndex(offset) {
    const {
      focusIndex,
      options
    } = this.getStates();
    const visibleOptions = options.filter((item) => item._show);
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
    this._adapter.updateScrollTop(index);
  }
  _handleArrowKeyDown(offset) {
    const {
      isOpen
    } = this.getStates();
    isOpen ? this._getEnableFocusIndex(offset) : this.open();
  }
  _handleTabKeyDown(event) {
    const {
      isOpen
    } = this.getStates();
    this._adapter.updateFocusState(false);
    if (isOpen) {
      const container = this._adapter.getContainer();
      const focusableElements = this._adapter.getFocusableElements(container);
      const focusableNum = focusableElements.length;
      if (focusableNum > 0) {
        if (event.shiftKey) {
          this._handlePanelOpenShiftTabKeyDown(focusableElements, event);
        } else {
          this._handlePanelOpenTabKeyDown(focusableElements, event);
        }
      } else {
        this.close(event);
        this._notifyBlur(event);
      }
    } else {
      this._notifyBlur(event);
    }
  }
  _handlePanelOpenTabKeyDown(focusableElements, event) {
    const activeElement = this._adapter.getActiveElement();
    const isFocusInContainer = this._adapter.getIsFocusInContainer();
    if (!isFocusInContainer) {
      focusableElements[0].focus();
      this._adapter.setIsFocusInContainer(true);
      handlePrevent(event);
    } else if (activeElement === focusableElements[focusableElements.length - 1]) {
      this._focusTrigger();
      this.close(event);
      handlePrevent(event);
    }
  }
  _handlePanelOpenShiftTabKeyDown(focusableElements, event) {
    const activeElement = this._adapter.getActiveElement();
    const isFocusInContainer = this._adapter.getIsFocusInContainer();
    if (!isFocusInContainer) {
      this.close(event);
      this._notifyBlur(event);
    } else if (activeElement === focusableElements[0]) {
      this._focusTrigger();
      this._adapter.setIsFocusInContainer(false);
      handlePrevent(event);
    }
  }
  _handleEnterKeyDown(event) {
    const {
      isOpen,
      options,
      focusIndex
    } = this.getStates();
    if (!isOpen) {
      this.open();
    } else {
      if (focusIndex !== -1) {
        const visibleOptions = options.filter((item) => item._show);
        const {
          length
        } = visibleOptions;
        if (length <= focusIndex) {
          return;
        }
        if (visibleOptions && length) {
          const selectedOption = visibleOptions[focusIndex];
          if (selectedOption.disabled) {
            return;
          }
          this.onSelect(selectedOption, focusIndex, event);
        }
      } else {
        this.close(event);
      }
    }
  }
  _handleBackspaceKeyDown() {
    if (this._isMultiple()) {
      const selections = this._adapter.getSelections();
      const {
        inputValue
      } = this.getStates();
      const length = selections.size;
      if (length && !inputValue) {
        const keys = [...selections.keys()];
        let index = length - 1;
        let targetLabel = keys[index];
        let targetItem = selections.get(targetLabel);
        let isAllDisabled = false;
        if (targetItem.disabled && index === 0) {
          return;
        }
        while (targetItem.disabled && index !== 0) {
          index = index - 1;
          targetLabel = keys[index];
          targetItem = selections.get(targetLabel);
          if (index == 0 && targetItem.disabled) {
            isAllDisabled = true;
          }
        }
        if (!isAllDisabled) {
          this.removeTag(targetItem);
        }
      }
    }
  }
  _notifyChange(selections) {
    const {
      onChangeWithObject
    } = this.getProps();
    const stateSelections = this.getState("selections");
    let notifyVal;
    const selectionsProps = [...selections.values()];
    const isMultiple = this._isMultiple();
    const hasChange = this._diffSelections(selections, stateSelections, isMultiple);
    if (!hasChange) {
      return;
    }
    switch (true) {
      case onChangeWithObject:
        this._notifyChangeWithObject(selections);
        break;
      case (!onChangeWithObject && !isMultiple):
        notifyVal = selectionsProps.length ? selectionsProps[0].value : void 0;
        this._adapter.notifyChange(notifyVal);
        break;
      case (!onChangeWithObject && isMultiple):
        notifyVal = selectionsProps.length ? selectionsProps.map((props) => props.value) : [];
        this._adapter.notifyChange(notifyVal);
        break;
      default:
        break;
    }
  }
  _removeInternalKey(option) {
    let newOption = Object.assign({}, option);
    delete newOption._parentGroup;
    delete newOption._show;
    delete newOption._selected;
    delete newOption._scrollIndex;
    if ("_keyInOptionList" in newOption) {
      newOption.key = newOption._keyInOptionList;
      delete newOption._keyInOptionList;
    }
    return newOption;
  }
  _notifySelect(value, option) {
    const newOption = this._removeInternalKey(option);
    this._adapter.notifySelect(value, newOption);
  }
  _notifyDeselect(value, option) {
    const newOption = this._removeInternalKey(option);
    this._adapter.notifyDeselect(value, newOption);
  }
  _diffSelections(selections, oldSelections, isMultiple) {
    let diff = true;
    if (!isMultiple) {
      const selectionProps = [...selections.values()];
      const oldSelectionProps = [...oldSelections.values()];
      const optionLabel = selectionProps[0] ? selectionProps[0].label : selectionProps[0];
      const oldOptionLabel = oldSelectionProps[0] ? oldSelectionProps[0].label : oldSelectionProps[0];
      diff = !(0, import_isEqual.default)(optionLabel, oldOptionLabel);
    } else {
    }
    return diff;
  }
  // When onChangeWithObject is true, the onChange input parameter is not only value, but also label and other parameters
  _notifyChangeWithObject(selections) {
    const stateSelections = this.getState("selections");
    const values = [];
    for (const item of selections.entries()) {
      let val = Object.assign({
        label: item[0]
      }, item[1]);
      val = this._removeInternalKey(val);
      values.push(val);
    }
    if (!this._isMultiple()) {
      this._adapter.notifyChange(values[0]);
    } else {
      this._adapter.notifyChange(values);
    }
  }
  // Scenes that may trigger blur：
  // 1、clickOutSide
  // 2、 tab to next element/ shift tab to previous element
  // 3、[remove when add a11y] click option / press enter, and then select complete（when multiple is false 
  // 4、[remove when add a11y] press esc when dropdown list open 
  _notifyBlur(e) {
    this._adapter.notifyBlur(e);
  }
  // Scenes that may trigger focus:
  // 1、click selection
  _notifyFocus(e) {
    this._adapter.notifyFocus(e);
  }
  handleMouseEnter(e) {
    this._adapter.updateHovering(true);
    this._adapter.notifyMouseEnter(e);
  }
  handleMouseLeave(e) {
    this._adapter.updateHovering(false);
    this._adapter.notifyMouseLeave(e);
  }
  handleClearClick(e) {
    const {
      filter
    } = this.getProps();
    if (filter) {
      this.clearInput(e);
    }
    this.clearSelected();
    e.stopPropagation();
  }
  handleKeyPress(e) {
    if (e && e.key === ENTER_KEY) {
      this.handleClick(e);
    }
  }
  /* istanbul ignore next */
  handleClearBtnEnterPress(e) {
    if (isEnterPress_default(e)) {
      this.handleClearClick(e);
    }
  }
  handleOptionMouseEnter(optionIndex) {
    this._adapter.updateFocusIndex(optionIndex);
  }
  handleListScroll(e) {
    this._adapter.notifyListScroll(e);
  }
  handleTriggerFocus(e) {
    this.bindKeyBoardEvent();
    this._adapter.setIsFocusInContainer(false);
  }
  handleTriggerBlur(e) {
    this._adapter.updateFocusState(false);
    const {
      filter,
      autoFocus
    } = this.getProps();
    const {
      isOpen,
      isFocus
    } = this.getStates();
    if (isFocus && !isOpen) {
      this._notifyBlur(e);
    }
  }
  handleInputBlur(e) {
    const {
      filter,
      autoFocus
    } = this.getProps();
    const isMultiple = this._isMultiple();
    if (autoFocus && filter && !isMultiple) {
      this.toggle2SearchInput(false);
    }
  }
  selectAll() {
    const {
      options
    } = this.getStates();
    const {
      onChangeWithObject
    } = this.getProps();
    let selectedValues = [];
    const isMultiple = this._isMultiple();
    if (!isMultiple) {
      console.warn(`[Semi Select]: It seems that you have called the selectAll method in the single-selection Select.
                Please note that this is not a legal way to use it`);
      return;
    }
    if (onChangeWithObject) {
      selectedValues = options;
    } else {
      selectedValues = options.map((option) => option.value);
    }
    this.handleValueChange(selectedValues);
    this._adapter.notifyChange(selectedValues);
  }
  /**
   * Check whether the props
   *  -defaultValue/value in multiple selection mode is array
   * @param {Object} props
   */
  checkMultipleProps(props) {
    if (this._isMultiple()) {
      const currentProps = props ? props : this.getProps();
      const {
        defaultValue,
        value
      } = currentProps;
      const selectedValues = value || defaultValue;
      if (!isNullOrUndefined(selectedValues) && !Array.isArray(selectedValues)) {
        warning(true, "[Semi Select] defaultValue/value should be array type in multiple mode");
      }
    }
  }
  updateScrollTop() {
    this._adapter.updateScrollTop();
  }
  updateOverflowItemCount(selectionLength, overFlowCount) {
    const {
      maxTagCount,
      ellipsisTrigger
    } = this.getProps();
    if (!ellipsisTrigger) {
      return;
    }
    if (overFlowCount) {
      this._adapter.updateOverflowItemCount(overFlowCount);
    } else if (typeof maxTagCount === "number") {
      if (selectionLength - maxTagCount > 0) {
        this._adapter.updateOverflowItemCount(selectionLength - maxTagCount);
      } else {
        this._adapter.updateOverflowItemCount(0);
      }
    }
  }
  updateIsFullTags() {
    const {
      isFullTags
    } = this.getStates();
    if (!isFullTags) {
      this._adapter.setState({
        isFullTags: true
      });
    }
  }
  handlePopoverClose() {
    this._adapter.emit("popoverClose");
  }
  // need to remove focus style of option when user hover slot
  handleSlotMouseEnter() {
    this._adapter.updateFocusIndex(-1);
  }
};
export {
  SelectFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_select_foundation.js.map
