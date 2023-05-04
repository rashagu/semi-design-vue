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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/radio/radioGroupFoundation.js
var RadioGroupFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    const displayValue = this._getDisplayValue();
    this._setValue(displayValue);
  }
  _getDisplayValue() {
    const {
      value,
      defaultValue
    } = this.getProps();
    let displayValue;
    if ("value" in this.getProps()) {
      displayValue = value;
    } else if ("defaultValue" in this.getProps()) {
      displayValue = defaultValue;
    }
    return displayValue;
  }
  handleChange(evt) {
    const mode = this.getProp("mode");
    const lastValue = this.getState("value");
    const {
      checked,
      value
    } = evt.target;
    const isControlledComponent = this._adapter.isInProps("value");
    const cbValue = Object.assign(Object.assign({}, evt), {
      target: Object.assign(Object.assign({}, evt.target), {
        value
      })
    });
    if (mode === "advanced" && !checked) {
      cbValue.target.value = void 0;
    }
    if (!isControlledComponent) {
      if (mode === "advanced" && !checked) {
        this._setValue(void 0);
      } else {
        this._setValue(value);
      }
    }
    if (mode === "advanced" || lastValue !== value) {
      this._adapter.notifyChange(cbValue);
    }
  }
  // call when prop.value change
  handlePropValueChange(propValue) {
    this._setValue(propValue);
  }
  _setValue(value) {
    this._adapter.setValue(value);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
};
export {
  RadioGroupFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_radio_radioGroupFoundation.js.map
