import {
  keyCode_default
} from "./chunk-C3N6TMV6.js";
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
import "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/sideSheet/sideSheetFoundation.js
var import_noop = __toESM(require_noop());
var SideSheetFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, SideSheetFoundation.defaultAdapter), adapter));
    this.toggleDisplayNone = (displayNone) => {
      this._adapter.toggleDisplayNone(displayNone);
    };
  }
  get defaultAdapter() {
    return {
      handleCancel: import_noop.default,
      beforeShow: import_noop.default,
      afterHide: import_noop.default
    };
  }
  destroy() {
    this.afterHide();
  }
  handleCancel(e) {
    this._adapter.notifyCancel(e);
  }
  beforeShow() {
    const allowDisable = this.getProp("disableScroll");
    allowDisable && this._adapter.disabledBodyScroll();
    this._adapter.setOnKeyDownListener();
  }
  afterHide() {
    const allowDisable = this.getProp("disableScroll");
    allowDisable && this._adapter.enabledBodyScroll();
    this._adapter.removeKeyDownListener();
  }
  handleKeyDown(e) {
    const {
      closeOnEsc
    } = this.getProps();
    if (closeOnEsc && e.keyCode === keyCode_default.ESC) {
      e.stopPropagation();
      this.handleCancel(e);
      return;
    }
  }
  onVisibleChange(visible) {
    this._adapter.notifyVisibleChange(visible);
  }
};
export {
  SideSheetFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_sideSheet_sideSheetFoundation.js.map
