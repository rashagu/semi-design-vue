import {
  isEnterPress_default
} from "./chunk-UEGGLRH4.js";
import "./chunk-C3N6TMV6.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/breadcrumb/foundation.js
var BreadcrumbFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  handleClick(info, event) {
    this._adapter.notifyClick(info, event);
  }
  handleExpand(clickEvent) {
    this._adapter.expandCollapsed(clickEvent);
  }
  /**
   * A11y: simulate clear button click
   */
  handleExpandEnterPress(keyboardEvent) {
    if (isEnterPress_default(keyboardEvent)) {
      this.handleExpand(keyboardEvent);
    }
  }
  genRoutes(routes) {
    return routes.map((route) => {
      if (typeof route !== "object") {
        return {
          name: route,
          _origin: {
            name: route
          }
        };
      }
      let config = {};
      config._origin = route;
      return Object.assign(Object.assign({}, config), route);
    });
  }
};
export {
  BreadcrumbFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_breadcrumb_foundation.js.map
