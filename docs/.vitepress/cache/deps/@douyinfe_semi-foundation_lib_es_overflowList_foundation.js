import {
  strings
} from "./chunk-J3GY2FHZ.js";
import {
  require_cloneDeep
} from "./chunk-DP3OYFSF.js";
import "./chunk-EFUJT5LA.js";
import "./chunk-RBUD5BHK.js";
import "./chunk-RFWJA27S.js";
import "./chunk-UTEL65GX.js";
import "./chunk-D6QY5MM6.js";
import "./chunk-VS2OXD4D.js";
import "./chunk-UL7BHDH4.js";
import "./chunk-HC6MTSUY.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import {
  require_get
} from "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/overflowList/foundation.js
var import_cloneDeep = __toESM(require_cloneDeep());
var import_get = __toESM(require_get());
var Boundary = strings.BOUNDARY_MAP;
var OverflowDirection = strings.OVERFLOW_DIR;
var OverflowListFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.previousY = void 0;
    this.isScrollMode = () => {
      const {
        renderMode
      } = this.getProps();
      return renderMode === "scroll";
    };
    this.getReversedItems = () => {
      const {
        items
      } = this.getProps();
      return (0, import_cloneDeep.default)(items).reverse();
    };
  }
  getOverflowItem() {
    const {
      items
    } = this.getProps();
    const {
      visibleState,
      overflow
    } = this.getStates();
    if (!this.isScrollMode()) {
      return overflow;
    }
    const visibleStateArr = items.map((_ref) => {
      let {
        key
      } = _ref;
      return Boolean(visibleState.get(key));
    });
    const visibleStart = visibleStateArr.indexOf(true);
    const visibleEnd = visibleStateArr.lastIndexOf(true);
    const overflowList = [];
    overflowList[0] = visibleStart >= 0 ? items.slice(0, visibleStart) : [];
    overflowList[1] = visibleEnd >= 0 ? items.slice(visibleEnd + 1, items.length) : items;
    return overflowList;
  }
  handleIntersect(entries) {
    const visibleState = (0, import_cloneDeep.default)(this.getState("visibleState"));
    const res = {};
    entries.forEach((entry) => {
      const itemKey = (0, import_get.default)(entry, "target.dataset.scrollkey");
      const visible = entry.isIntersecting;
      res[itemKey] = entry;
      visibleState.set(itemKey, visible);
    });
    let someItemVisible = false;
    for (const value of visibleState.values()) {
      if (value) {
        someItemVisible = true;
        break;
      }
    }
    const wholeListVisible = someItemVisible;
    const [entry1] = entries;
    const currentY = entry1.boundingClientRect.y;
    if (!wholeListVisible && this.previousY !== void 0 && currentY !== this.previousY) {
      this.previousY = currentY;
      return;
    }
    this.previousY = currentY;
    this._adapter.updateVisibleState(visibleState);
    this._adapter.notifyIntersect(res);
  }
  handleCollapseOverflow() {
    const {
      minVisibleItems,
      collapseFrom
    } = this.getProps();
    const {
      overflowWidth,
      containerWidth,
      pivot: statePivot,
      overflowStatus
    } = this.getStates();
    const {
      items,
      onOverflow
    } = this.getProps();
    let itemWidths = overflowWidth, _pivot = 0;
    let overflowed = false;
    for (const size of this._adapter.getItemSizeMap().values()) {
      itemWidths += size;
      if (itemWidths > containerWidth) {
        overflowed = true;
        break;
      }
      if (_pivot === items.length - 1) {
        this._adapter.updateStates({
          overflowStatus: "normal",
          pivot: items.length - 1,
          visible: items,
          overflow: []
        });
        break;
      }
      _pivot++;
    }
    if (overflowed) {
      const pivot = Math.max(minVisibleItems, _pivot);
      const isCollapseFromStart = collapseFrom === Boundary.START;
      const visible = isCollapseFromStart ? this.getReversedItems().slice(0, pivot).reverse() : items.slice(0, pivot);
      const overflow = isCollapseFromStart ? this.getReversedItems().slice(pivot).reverse() : items.slice(pivot);
      this._adapter.updateStates({
        overflowStatus: "overflowed",
        pivot,
        visible,
        overflow
      });
      if (statePivot !== pivot) {
        onOverflow(overflow);
      }
      return;
    }
  }
};
var foundation_default2 = OverflowListFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_overflowList_foundation.js.map
