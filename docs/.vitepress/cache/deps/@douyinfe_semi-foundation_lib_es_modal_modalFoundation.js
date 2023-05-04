import {
  isPromise
} from "./chunk-OUTPQAWN.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/modal/modalFoundation.js
var ModalFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.toggleDisplayNone = (displayNone, callback) => {
      this._adapter.toggleDisplayNone(displayNone, callback);
    };
  }
  destroy() {
    this.afterHide();
  }
  handleCancel(e) {
    var _a;
    const result = this._adapter.notifyCancel(e);
    if (isPromise(result)) {
      this._adapter.setState({
        onCancelReturnPromiseStatus: "pending"
      });
      (_a = result === null || result === void 0 ? void 0 : result.then(() => {
        this._adapter.setState({
          onCancelReturnPromiseStatus: "fulfilled"
        });
      })) === null || _a === void 0 ? void 0 : _a.catch((e2) => {
        this._adapter.setState({
          onCancelReturnPromiseStatus: "rejected"
        });
        throw e2;
      });
    }
  }
  handleOk(e) {
    var _a;
    const result = this._adapter.notifyOk(e);
    if (isPromise(result)) {
      this._adapter.setState({
        onOKReturnPromiseStatus: "pending"
      });
      (_a = result === null || result === void 0 ? void 0 : result.then(() => {
        this._adapter.setState({
          onOKReturnPromiseStatus: "fulfilled"
        });
      })) === null || _a === void 0 ? void 0 : _a.catch((e2) => {
        this._adapter.setState({
          onOKReturnPromiseStatus: "rejected"
        });
        throw e2;
      });
    }
  }
  beforeShow() {
    this._adapter.disabledBodyScroll();
  }
  afterHide() {
    this._adapter.enabledBodyScroll();
    this._adapter.notifyClose();
  }
};
export {
  ModalFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_modal_modalFoundation.js.map
