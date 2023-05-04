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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/banner/foundation.js
var BannerFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, BannerFoundation.defaultAdapter), adapter));
  }
  removeBanner(e) {
    this._adapter.notifyClose(e);
    this._adapter.setVisible();
  }
};
export {
  BannerFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_banner_foundation.js.map
