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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/radio/radioFoundation.js
var RadioFoundation = class extends foundation_default {
  constructor() {
    super(...arguments);
    this.handleFocusVisible = (event) => {
      const {
        target
      } = event;
      try {
        if (target.matches(":focus-visible")) {
          this._adapter.setFocusVisible(true);
        }
      } catch (error) {
        warning(true, "Warning: [Semi Radio] The current browser does not support the focus-visible");
      }
    };
    this.handleBlur = () => {
      this._adapter.setFocusVisible(false);
    };
  }
  init() {
    const {
      children,
      extra,
      extraId,
      addonId
    } = this._adapter.getProps();
    if (children && !addonId) {
      this._adapter.setAddonId();
    }
    if (extra && !extraId) {
      this._adapter.setExtraId();
    }
  }
  setHover(hover) {
    this._adapter.setHover(hover);
  }
  setChecked(checked) {
    this._adapter.setChecked(checked);
  }
};
export {
  RadioFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_radio_radioFoundation.js.map
