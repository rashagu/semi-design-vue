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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/spin/foundation.js
var SpinFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, SpinFoundation.spinDefaultAdapter), adapter));
  }
  static get spinDefaultAdapter() {
    return {
      getProp: () => void 0,
      setLoading: (val) => void 0
    };
  }
  updateLoadingIfNeedDelay() {
    const {
      spinning: propsSpinning,
      delay: propsDelay
    } = this._adapter.getProps();
    const {
      delay
    } = this._adapter.getStates();
    if (delay) {
      const self = this;
      this._timer = setTimeout(() => {
        self._adapter.setState({
          loading: propsSpinning,
          delay: 0
        });
      }, propsDelay);
    }
  }
  destroy() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
};
var foundation_default2 = SpinFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_spin_foundation.js.map
