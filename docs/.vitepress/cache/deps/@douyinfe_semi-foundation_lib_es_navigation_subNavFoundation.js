import {
  isEnterPress_default
} from "./chunk-UEGGLRH4.js";
import "./chunk-C3N6TMV6.js";
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
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/navigation/subNavFoundation.js
var addKeys = function addKeys2() {
  let originKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const keySet = new Set(originKeys);
  for (var _len = arguments.length, willAddKeys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    willAddKeys[_key - 1] = arguments[_key];
  }
  willAddKeys.forEach((key) => key && keySet.add(key));
  return Array.from(keySet);
};
var removeKeys = function removeKeys2() {
  let originKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const keySet = new Set(originKeys);
  for (var _len2 = arguments.length, willRemoveKeys = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    willRemoveKeys[_key2 - 1] = arguments[_key2];
  }
  willRemoveKeys.forEach((key) => key && keySet.delete(key));
  return Array.from(keySet);
};
var SubNavFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    this._timer = null;
  }
  destroy() {
  }
  // eslint-disable-line
  clearDelayTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  isValidKey(itemKey) {
    return itemKey != null && (typeof itemKey === "number" || typeof itemKey === "string");
  }
  handleDropdownVisibleChange(visible) {
    const itemKey = this.getProp("itemKey");
    const openKeysIsControlled = this._adapter.getOpenKeysIsControlled();
    const canUpdateOpenKeys = this._adapter.getCanUpdateOpenKeys();
    const rawOpenKeys = this._adapter.getOpenKeys();
    const openKeys = visible ? addKeys(rawOpenKeys, itemKey) : removeKeys(rawOpenKeys, itemKey);
    this.clearDelayTimer();
    if (!openKeysIsControlled) {
      if (canUpdateOpenKeys) {
        this._adapter.updateOpen(visible);
      }
    }
    this._adapter.notifyGlobalOpenChange({
      itemKey,
      openKeys,
      isOpen: visible
    });
  }
  /**
   *
   * @param {Event} e
   * @param {HTMLElement} titleRef
   */
  handleClick(e, titleRef) {
    const {
      itemKey,
      disabled
    } = this.getProps();
    if (disabled) {
      return;
    }
    const clickedDomIsTitle = titleRef && titleRef.contains(e.target);
    let isOpen = Boolean(this._adapter.getIsOpen());
    if (!clickedDomIsTitle) {
      isOpen = false;
    } else {
      isOpen = !isOpen;
    }
    const openKeys = isOpen ? addKeys(this._adapter.getOpenKeys(), itemKey) : removeKeys(this._adapter.getOpenKeys(), itemKey);
    const cbVal = {
      itemKey,
      openKeys,
      isOpen,
      domEvent: e
    };
    const openKeysIsControlled = this._adapter.getOpenKeysIsControlled();
    const canUpdateOpenKeys = this._adapter.getCanUpdateOpenKeys();
    if (!openKeysIsControlled && canUpdateOpenKeys) {
      this._adapter.updateOpen(isOpen);
    }
    this._adapter.notifyGlobalOpenChange(cbVal);
    this._adapter.notifyGlobalOnClick(cbVal);
  }
  /**
   * A11y: simulate sub nav click
   * @param e
   * @param titleRef
   */
  handleKeyPress(e, titleRef) {
    if (isEnterPress_default(e)) {
      this.handleClick(e, titleRef);
    }
  }
};
export {
  SubNavFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_navigation_subNavFoundation.js.map
