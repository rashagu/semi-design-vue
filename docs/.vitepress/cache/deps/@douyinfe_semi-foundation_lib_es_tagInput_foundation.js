import {
  arrayMove
} from "./chunk-E433P6Y7.js";
import {
  isEnterPress_default
} from "./chunk-UEGGLRH4.js";
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
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import {
  require_isFunction
} from "./chunk-X27LVEKC.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/tagInput/foundation.js
var import_isUndefined = __toESM(require_isUndefined());
var import_isFunction = __toESM(require_isFunction());
var import_isNumber2 = __toESM(require_isNumber());
var import_isString2 = __toESM(require_isString());

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/tagInput/utils/getSplitedArray.js
var import_isNumber = __toESM(require_isNumber());
var import_isArray = __toESM(require_isArray());
var import_isString = __toESM(require_isString());
var getSplitedArray = (originString, separators) => {
  let splitedValue = [];
  if ((0, import_isString.default)(separators) || (0, import_isNumber.default)(separators)) {
    splitedValue = originString.split(separators);
  } else if ((0, import_isArray.default)(separators)) {
    const tempChar = separators[0];
    splitedValue = originString;
    for (let i = 1; i < separators.length; i++) {
      splitedValue = splitedValue.split(separators[i]).join(tempChar);
    }
    splitedValue = splitedValue.split(tempChar);
  } else {
    splitedValue.push(originString);
  }
  return splitedValue;
};
var getSplitedArray_default = getSplitedArray;

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/tagInput/foundation.js
var TagInputFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleInputChange = (e) => {
      const {
        value
      } = e.target;
      const {
        entering
      } = this.getStates();
      if (entering) {
        this._onInputChange(value, e);
      } else {
        this._checkInputChangeValid(value) && this._onInputChange(value, e);
      }
    };
    this.handleInputCompositionStart = (e) => {
      this._adapter.setEntering(true);
    };
    this.handleInputCompositionEnd = (e) => {
      this._adapter.setEntering(false);
      const {
        value
      } = e.target;
      const {
        maxLength,
        onInputExceed,
        separator
      } = this.getProps();
      let allowChange = true;
      const {
        inputValue
      } = this.getStates();
      if ((0, import_isNumber2.default)(maxLength)) {
        const inputArr = getSplitedArray_default(inputValue, separator);
        let index = 0;
        for (; index < inputArr.length; index++) {
          if (inputArr[index].length > maxLength) {
            allowChange = false;
            (0, import_isFunction.default)(onInputExceed) && onInputExceed(value);
            break;
          }
        }
        if (!allowChange) {
          const newInputArr = inputArr.slice(0, index);
          if (index < inputArr.length) {
            newInputArr.push(inputArr[index].slice(0, maxLength));
          }
          this._adapter.setInputValue(newInputArr.join(separator));
        }
      }
    };
    this._checkInputChangeValid = (value) => {
      const {
        maxLength,
        onInputExceed,
        separator
      } = this._adapter.getProps();
      const {
        inputValue
      } = this._adapter.getStates();
      let allowChange = true;
      if ((0, import_isNumber2.default)(maxLength)) {
        const valueArr = getSplitedArray_default(value, separator);
        const inputArr = getSplitedArray_default(inputValue, separator);
        const maxLen = Math.max(valueArr.length, inputArr.length);
        for (let i = 0; i < maxLen; i++) {
          if (!(0, import_isUndefined.default)(valueArr[i]) && ((0, import_isUndefined.default)(inputArr[i]) || valueArr[i].length > inputArr[i].length)) {
            if (valueArr[i].length > maxLength) {
              allowChange = false;
              (0, import_isFunction.default)(onInputExceed) && onInputExceed(value);
              break;
            }
          }
        }
      }
      return allowChange;
    };
    this.handleKeyDown = (e) => {
      const {
        inputValue,
        tagsArray
      } = this._adapter.getStates();
      const code = e.keyCode;
      if (code === keyCode_default.ENTER) {
        e.preventDefault();
        if (inputValue !== "") {
          this._handleAddTags(e);
        }
      }
      const {
        length
      } = tagsArray;
      if (code === keyCode_default.BACKSPACE && inputValue === "" && length > 0) {
        const newTagList = tagsArray.slice(0, length - 1);
        const removedTag = tagsArray[length - 1];
        this._onRemove(newTagList, removedTag, length - 1);
      }
      this._adapter.notifyKeyDown(e);
    };
  }
  _handleAddTags(e) {
    const {
      separator,
      max,
      onExceed,
      allowDuplicates
    } = this._adapter.getProps();
    const {
      inputValue,
      tagsArray
    } = this._adapter.getStates();
    let addTags = getSplitedArray_default(inputValue, separator);
    addTags = addTags.filter((item, idx) => {
      if (!allowDuplicates) {
        if (tagsArray.includes(item) || addTags.indexOf(item) !== idx) {
          return false;
        }
      }
      return (0, import_isString2.default)(item) && item.trim() !== "";
    });
    let newTagList = tagsArray.concat(addTags);
    if ((0, import_isNumber2.default)(max) && newTagList.length > max) {
      (0, import_isFunction.default)(onExceed) && onExceed(newTagList);
      newTagList = newTagList.slice(0, max);
      addTags = addTags.slice(0, max - tagsArray.length);
    }
    if (addTags.length > 0) {
      this._onAdd(newTagList, addTags);
    }
    this._onInputChange("", e);
  }
  handleInputBlur(e) {
    const {
      addOnBlur
    } = this._adapter.getProps();
    if (addOnBlur === true) {
      this._handleAddTags(e);
    }
    this._adapter.setFocusing(false);
    this._adapter.notifyBlur(e);
  }
  handleInputFocus(e) {
    this._adapter.setFocusing(true);
    this._adapter.notifyFocus(e);
  }
  /**
   * A11y: simulate clear button click
   */
  /* istanbul ignore next */
  handleClearEnterPress(e) {
    if (isEnterPress_default(e)) {
      this.handleClearBtn(e);
    }
  }
  handleClearBtn(e) {
    const {
      inputValue,
      tagsArray
    } = this._adapter.getStates();
    if (tagsArray.length > 0) {
      this._adapter.setTagsArray([]);
      this._adapter.notifyTagChange([]);
    }
    if (inputValue.length > 0) {
      this._onInputChange("", e);
    }
    e.stopPropagation();
  }
  handleTagClose(index) {
    const {
      tagsArray
    } = this._adapter.getStates();
    const newTagList = [...tagsArray];
    newTagList.splice(index, 1);
    const removedTag = tagsArray[index];
    this._onRemove(newTagList, removedTag, index);
  }
  handleInputMouseEnter() {
    this._adapter.setHovering(true);
  }
  handleInputMouseLeave() {
    this._adapter.setHovering(false);
  }
  handleClick(e) {
    const {
      disabled
    } = this.getProps();
    if (disabled) {
      return;
    }
    const clickOutsideHandler = this._adapter.getClickOutsideHandler();
    if (!clickOutsideHandler) {
      this._adapter.setActive(true);
      this._adapter.registerClickOutsideHandler((e2) => this.clickOutsideCallBack());
    }
  }
  clickOutsideCallBack() {
    this._adapter.unregisterClickOutsideHandler();
    this._adapter.setActive(false);
  }
  handleClickPrefixOrSuffix(e) {
    const {
      disabled
    } = this._adapter.getProps();
    const {
      isFocus
    } = this._adapter.getStates();
    if (!disabled && !isFocus) {
      this._adapter.toggleFocusing(true);
    }
  }
  handlePreventMouseDown(e) {
    if (e && (0, import_isFunction.default)(e.preventDefault)) {
      e.preventDefault();
    }
  }
  /**
   * handler of delete tag
   */
  _onRemove(newTagList, removedTags, index) {
    if (!this._isControlledComponent()) {
      this._adapter.setTagsArray(newTagList);
    }
    this._adapter.notifyTagChange(newTagList);
    this._adapter.notifyTagRemove(removedTags, index);
  }
  /**
   * handler of add tag
   */
  _onAdd(newTagList, addTags) {
    if (!this._isControlledComponent()) {
      this._adapter.setTagsArray(newTagList);
    }
    this._adapter.notifyTagChange(newTagList);
    this._adapter.notifyTagAdd(addTags);
  }
  /**
   * handler of input change
   */
  _onInputChange(value, e) {
    this._adapter.setInputValue(value);
    this._adapter.notifyInputChange(value, e);
  }
  handleSortEnd(callbackProps) {
    const {
      oldIndex,
      newIndex
    } = callbackProps;
    const {
      tagsArray
    } = this.getStates();
    const newTagsArray = arrayMove(tagsArray, oldIndex, newIndex);
    if (!this._isControlledComponent()) {
      this._adapter.setTagsArray(newTagsArray);
    }
    this._adapter.notifyTagChange(newTagsArray);
  }
};
var foundation_default2 = TagInputFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_tagInput_foundation.js.map
