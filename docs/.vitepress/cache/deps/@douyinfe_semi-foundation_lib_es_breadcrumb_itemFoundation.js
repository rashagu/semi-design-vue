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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/breadcrumb/itemFoundation.js
var BreadcrumbItemFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  handleClick(item, e) {
    this._adapter.notifyClick(item, e);
    this._adapter.notifyParent(item, e);
  }
};
export {
  BreadcrumbItemFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_breadcrumb_itemFoundation.js.map
