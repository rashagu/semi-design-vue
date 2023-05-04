import {
  isPromise
} from "./chunk-OUTPQAWN.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/popconfirm/popconfirmFoundation.js
var import_get = __toESM(require_get());
var PopConfirmFoundation = class extends foundation_default {
  init() {
  }
  destroy() {
  }
  handleCancel(e) {
    const maybePromise = this._adapter.notifyCancel(e);
    if (isPromise(maybePromise)) {
      this._adapter.updateCancelLoading(true);
      maybePromise.then((result) => {
        this.handleVisibleChange(false);
        this._adapter.updateCancelLoading(false);
      }, (errors) => {
        this._adapter.updateCancelLoading(false);
      });
    } else {
      this.handleVisibleChange(false);
    }
  }
  handleConfirm(e) {
    const maybePromise = this._adapter.notifyConfirm(e);
    if (isPromise(maybePromise)) {
      this._adapter.updateConfirmLoading(true);
      maybePromise.then((result) => {
        this._adapter.updateConfirmLoading(false);
        this.handleVisibleChange(false);
      }, (errors) => {
        this._adapter.updateConfirmLoading(false);
      });
    } else {
      this.handleVisibleChange(false);
    }
  }
  handleClickOutSide(e) {
    this._adapter.notifyClickOutSide(e);
  }
  handleVisibleChange(visible) {
    if (!this._isControlledComponent("visible")) {
      this._adapter.setVisible(visible);
    }
    if (visible) {
      this.handleFocusOperateButton();
    } else {
      this._adapter.focusPrevFocusElement();
    }
    this._adapter.notifyVisibleChange(visible);
  }
  handleFocusOperateButton() {
    const {
      cancelButtonProps,
      okButtonProps
    } = this._adapter.getProps();
    if ((0, import_get.default)(cancelButtonProps, "autoFocus") && !(0, import_get.default)(cancelButtonProps, "disabled")) {
      this._adapter.focusCancelButton();
    } else if ((0, import_get.default)(okButtonProps, "autoFocus") && !(0, import_get.default)(okButtonProps, "disabled")) {
      this._adapter.focusOkButton();
    }
  }
};
export {
  PopConfirmFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_popconfirm_popconfirmFoundation.js.map
