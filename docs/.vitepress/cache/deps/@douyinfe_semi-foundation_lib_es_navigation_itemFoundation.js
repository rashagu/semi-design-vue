import {
  isEnterPress_default
} from "./chunk-UEGGLRH4.js";
import "./chunk-C3N6TMV6.js";
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
import "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/navigation/itemFoundation.js
var import_get = __toESM(require_get());
var ItemFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    this._timer = null;
    this._mounted = true;
  }
  destroy() {
    this._mounted = false;
  }
  isValidKey(itemKey) {
    return itemKey != null && (typeof itemKey === "string" || typeof itemKey === "number");
  }
  handleClick(e) {
    const {
      isSubNav,
      itemKey,
      text,
      disabled
    } = this.getProps();
    if (disabled) {
      return;
    }
    if (!isSubNav && this.isValidKey(itemKey) && !this._adapter.getSelectedKeysIsControlled() && !this._adapter.getSelected()) {
      this._adapter.updateSelected(true);
    }
    const selectedKeys = [itemKey];
    if (!isSubNav) {
      if (!this._adapter.getSelected()) {
        const selectedItems = [this._adapter.cloneDeep(this.getProps())];
        this._adapter.notifyGlobalOnSelect({
          itemKey,
          selectedKeys,
          selectedItems,
          domEvent: e
        });
      }
      this._adapter.notifyGlobalOnClick({
        itemKey,
        text,
        domEvent: e
      });
    }
    this._adapter.notifyClick({
      itemKey,
      text,
      domEvent: e
    });
  }
  /**
   * A11y: simulate item click
   */
  handleKeyPress(e) {
    if (isEnterPress_default(e)) {
      const {
        link,
        linkOptions
      } = this.getProps();
      const target = (0, import_get.default)(linkOptions, "target", "_self");
      this.handleClick(e);
      if (typeof link === "string") {
        target === "_blank" ? window.open(link) : window.location.href = link;
      }
    }
  }
};
export {
  ItemFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_navigation_itemFoundation.js.map
