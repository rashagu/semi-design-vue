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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/toast/toastListFoundation.js
var ToastListFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, ToastListFoundation.defaultAdapter), adapter));
  }
  hasToast(id) {
    const toastList = this._adapter.getState("list");
    return toastList.map((_ref) => {
      let {
        id: id2
      } = _ref;
      return id2;
    }).includes(id);
  }
  addToast(toastOpts) {
    const toastList = this._adapter.getState("list");
    toastList.push(toastOpts);
    this._adapter.updateToast(toastList, [], []);
  }
  updateToast(id, toastOpts) {
    let toastList = this._adapter.getState("list");
    toastList = toastList.map((toast) => toast.id === id ? Object.assign(Object.assign({}, toast), toastOpts) : toast);
    const updatedItems = toastList.filter((toast) => toast.id === id);
    this._adapter.updateToast(toastList, [], updatedItems);
  }
  removeToast(id) {
    let toastList = this._adapter.getState("list");
    const removedItems = [];
    toastList = toastList.filter((toastOpts) => {
      if (toastOpts.id === id) {
        removedItems.push(toastOpts);
        return false;
      }
      return true;
    });
    this._adapter.updateToast(toastList, removedItems, []);
  }
  destroyAll() {
    const toastList = this._adapter.getState("list");
    if (toastList.length > 0) {
      this._adapter.updateToast([], toastList, []);
    }
  }
};
export {
  ToastListFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_toast_toastListFoundation.js.map
