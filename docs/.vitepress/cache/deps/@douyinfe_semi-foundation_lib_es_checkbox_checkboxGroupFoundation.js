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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/checkbox/checkboxGroupFoundation.js
var CheckboxGroupFoundation = class extends foundation_default {
  static get checkboxGroupDefaultAdapter() {
    return {};
  }
  constructor(adapter) {
    super(Object.assign(Object.assign({}, CheckboxGroupFoundation.checkboxGroupDefaultAdapter), adapter));
  }
  init() {
    const {
      defaultValue,
      value
    } = this.getProps();
    if (typeof defaultValue !== "undefined" && !Array.isArray(defaultValue)) {
      warning(true, "Warning: [Semi CheckboxGroup] defaultValue should be an Array");
    }
    if (typeof value !== "undefined" && !Array.isArray(value)) {
      warning(true, "Warning: [Semi CheckboxGroup] value should be an Array");
    }
  }
  notifyChange(value) {
    this._adapter.notifyChange(value);
  }
  handleChange(evt) {
    const prevValue = this.getState("value");
    let newValue = [];
    if (!Array.isArray(prevValue)) {
      newValue = [prevValue];
    }
    if (evt.target.checked) {
      newValue = [...prevValue, evt.target.value];
    } else {
      newValue = prevValue.filter((itm, idx) => itm !== evt.target.value);
    }
    const isControlledMode = "value" in this.getProps();
    if (isControlledMode) {
      this.notifyChange(newValue);
    } else {
      this._adapter.updateGroupValue(newValue);
      this.notifyChange(newValue);
    }
  }
  getFormatName() {
    const propName = this.getProp("name");
    const defaultName = "default";
    return propName || defaultName;
  }
  handlePropValueChange(newPropValue) {
    if (Array.isArray(newPropValue)) {
      this._adapter.updateGroupValue(newPropValue);
    } else {
      if (typeof newPropValue === "undefined") {
        this._adapter.updateGroupValue([]);
      }
      warning(true, "Warning: [Semi CheckboxGroup] value should be an Array");
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
};
var checkboxGroupFoundation_default = CheckboxGroupFoundation;
export {
  checkboxGroupFoundation_default as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_checkbox_checkboxGroupFoundation.js.map
