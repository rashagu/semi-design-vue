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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/anchor/linkFoundation.js
var LinkFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
  handleAddLink() {
    const href = this._adapter.getProp("href");
    this._adapter.addLink(href);
  }
  handleUpdateLink(href, prevHref) {
    if (href !== prevHref) {
      this._adapter.removeLink(prevHref);
      this._adapter.addLink(href);
    }
  }
  handleRemoveLink() {
    const href = this._adapter.getProp("href");
    this._adapter.removeLink(href);
  }
};
export {
  LinkFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_anchor_linkFoundation.js.map
