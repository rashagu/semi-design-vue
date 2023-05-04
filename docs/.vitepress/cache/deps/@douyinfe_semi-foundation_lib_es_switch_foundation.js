import {
  warning
} from "./chunk-K7DSZPDE.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/switch/foundation.js
var SwitchFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleFocusVisible = (event) => {
      const {
        target
      } = event;
      try {
        if (target.matches(":focus-visible")) {
          this._adapter.setFocusVisible(true);
        }
      } catch (error) {
        warning(true, "Warning: [Semi Switch] The current browser does not support the focus-visible");
      }
    };
    this.handleBlur = () => {
      this._adapter.setFocusVisible(false);
    };
  }
  init() {
    const {
      disabled
    } = this.getProps();
    this.setDisabled(disabled);
  }
  setChecked(checked) {
    this._adapter.setNativeControlChecked(checked);
  }
  setDisabled(disabled) {
    this._adapter.setNativeControlDisabled(disabled);
  }
  handleChange(checked, e) {
    const propChecked = this.getProps().checked;
    const isControlledComponent = typeof propChecked !== "undefined";
    if (isControlledComponent) {
      this._adapter.notifyChange(checked, e);
    } else {
      this._adapter.setNativeControlChecked(checked);
      this._adapter.notifyChange(checked, e);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
};
export {
  SwitchFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_switch_foundation.js.map
