import {
  isNullOrUndefined
} from "./chunk-6OL7JQEH.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/timePicker/inputFoundation.js
var TimePickerFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
  handleFocus(e) {
    this.storeCursor();
    this._adapter.notifyFocus(e);
  }
  handleChange(v) {
    this.storeCursor();
    this._adapter.notifyChange(v);
  }
  handleBlur(e) {
    this.clearCursor();
    this._adapter.notifyBlur(e);
  }
  storeCursor() {
    const inputNode = this.getCache("inputNode");
    if (inputNode) {
      const {
        selectionStart: start
      } = inputNode;
      this.setCache("cursorIndex", start);
    }
  }
  restoreCursor() {
    const inputNode = this.getCache("inputNode");
    const cursorIndex = this.getCache("cursorIndex");
    if (inputNode && !isNullOrUndefined(cursorIndex)) {
      inputNode.selectionStart = cursorIndex;
      inputNode.selectionEnd = cursorIndex;
    }
  }
  clearCursor() {
    this.setCache("cursorIndex", null);
    this.setCache("beforeStr", null);
    this.setCache("afterStr", null);
  }
};
var inputFoundation_default = TimePickerFoundation;
export {
  inputFoundation_default as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_timePicker_inputFoundation.js.map
