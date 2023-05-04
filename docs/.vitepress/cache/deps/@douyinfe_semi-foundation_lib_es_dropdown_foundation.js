import {
  handlePrevent,
  setFocusToFirstItem,
  setFocusToLastItem
} from "./chunk-M6FOBOF7.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/dropdown/foundation.js
var DropdownFoundation = class extends foundation_default {
  handleVisibleChange(visible) {
    this._adapter.setPopVisible(visible);
    this._adapter.notifyVisibleChange(visible);
    const {
      trigger
    } = this.getProps();
    if (visible && trigger === "click") {
      const popupId = this._adapter.getPopupId();
      this.setFocusToFirstMenuItem(popupId);
    }
  }
  getMenuItemNodes(id) {
    const menuWrapper = document.getElementById(id);
    return menuWrapper ? Array.from(menuWrapper.getElementsByTagName("li")).filter((item) => item.ariaDisabled === "false") : null;
  }
  setFocusToFirstMenuItem(id) {
    const menuItemNodes = this.getMenuItemNodes(id);
    menuItemNodes && setFocusToFirstItem(menuItemNodes);
  }
  setFocusToLastMenuItem(id) {
    const menuItemNodes = this.getMenuItemNodes(id);
    menuItemNodes && setFocusToLastItem(menuItemNodes);
  }
  handleKeyDown(event) {
    var _a, _b;
    const id = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.attributes["data-popupid"]) === null || _b === void 0 ? void 0 : _b.value;
    switch (event.key) {
      case " ":
      case "Enter":
        event.target.click();
        break;
      case "ArrowDown":
        this.setFocusToFirstMenuItem(id);
        handlePrevent(event);
        break;
      case "ArrowUp":
        this.setFocusToLastMenuItem(id);
        handlePrevent(event);
        break;
      default:
        break;
    }
  }
};
export {
  DropdownFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_dropdown_foundation.js.map
