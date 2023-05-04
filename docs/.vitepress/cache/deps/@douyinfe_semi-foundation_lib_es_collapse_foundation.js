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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/collapse/foundation.js
var CollapseFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  initActiveKey() {
    const {
      defaultActiveKey,
      activeKey,
      accordion
    } = this.getProps();
    let activeKeyList = activeKey ? activeKey : defaultActiveKey;
    if (accordion) {
      activeKeyList = Array.isArray(activeKeyList) ? activeKeyList[0] : activeKeyList;
    }
    if (activeKeyList && activeKeyList.length) {
      activeKeyList = Array.isArray(activeKeyList) ? activeKeyList : [activeKeyList];
      return activeKeyList;
    }
    return [];
  }
  handleChange(newKey, e) {
    const {
      activeKey,
      accordion
    } = this.getProps();
    const {
      activeSet
    } = this.getStates();
    let newSet = new Set(activeSet);
    if (newSet.has(newKey)) {
      newSet.delete(newKey);
    } else {
      if (accordion) {
        newSet = /* @__PURE__ */ new Set([newKey]);
      } else {
        newSet.add(newKey);
      }
    }
    this._adapter.handleChange([...newSet.values()], e);
    if (typeof activeKey === "undefined") {
      this._adapter.addActiveKey(newSet);
    }
  }
};
export {
  CollapseFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_collapse_foundation.js.map
