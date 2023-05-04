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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/radio/radioInnerFoundation.js
var RadioInnerFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    const checked = this._adapter.getProp("checked");
    const defaultChecked = this._adapter.getProp("defaultChecked");
    this.setChecked(checked || defaultChecked);
  }
  setChecked(checked) {
    this._adapter.setNativeControlChecked(checked);
  }
  getChecked() {
    return this._adapter.getProp("checked");
  }
  handleChange(e) {
    const isControlledMode = "checked" in this.getProps();
    const {
      checked
    } = e.target;
    const stopPropagation = () => {
      e.stopPropagation();
    };
    const preventDefault = () => {
      e.preventDefault();
    };
    const cbValue = {
      target: Object.assign(Object.assign({}, this.getProps()), {
        checked
      }),
      stopPropagation,
      preventDefault
    };
    if (isControlledMode) {
      this._adapter.notifyChange(cbValue);
    } else {
      this.setChecked(checked);
      this._adapter.notifyChange(cbValue);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
};
export {
  RadioInnerFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_radio_radioInnerFoundation.js.map
