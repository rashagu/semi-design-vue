import {
  keyCode_default
} from "./chunk-C3N6TMV6.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/modal/modalContentFoundation.js
var ModalContentFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, ModalContentFoundation.defaultAdapter), adapter));
    this.handleKeyDown = (e) => {
      const {
        closeOnEsc
      } = this.getProps();
      if (closeOnEsc && e.keyCode === keyCode_default.ESC) {
        e.stopPropagation();
        this.close(e);
        return;
      }
    };
  }
  destroy() {
    this.handleKeyDownEventListenerUnmount();
    this.modalDialogBlur();
    this.prevFocusElementReFocus();
  }
  handleDialogMouseDown() {
    this._adapter.notifyDialogMouseDown();
  }
  handleMaskMouseUp() {
    this._adapter.notifyDialogMouseUp();
  }
  handleKeyDownEventListenerMount() {
    this._adapter.addKeyDownEventListener();
  }
  handleKeyDownEventListenerUnmount() {
    this._adapter.removeKeyDownEventListener();
  }
  getMouseState() {
    this._adapter.getMouseState();
  }
  handleMaskClick(e) {
    const {
      dialogMouseDown
    } = this.getStates();
    if (e.target === e.currentTarget && !dialogMouseDown) {
      this.close(e);
    }
  }
  close(e) {
    this._adapter.notifyClose(e);
  }
  modalDialogFocus() {
    this._adapter.modalDialogFocus();
  }
  modalDialogBlur() {
    this._adapter.modalDialogBlur();
  }
  prevFocusElementReFocus() {
    this._adapter.prevFocusElementReFocus();
  }
};
export {
  ModalContentFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_modal_modalContentFoundation.js.map
