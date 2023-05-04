import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import {
  require_noop
} from "./chunk-2EMWRCT4.js";
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
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/tabs/foundation.js
var import_noop = __toESM(require_noop());
var import_get = __toESM(require_get());
var TabsFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.destroy = import_noop.default;
    this.handlePrevent = (event) => {
      event.stopPropagation();
      event.preventDefault();
    };
    this.handleKeyDown = (event, itemKey, closable) => {
      const {
        preventScroll
      } = this.getProps();
      const tabs = [...event.target.parentNode.childNodes].filter((item) => {
        return (0, import_get.default)(item, "attributes.data-tabkey.value", "").includes("semiTab") && (0, import_get.default)(item, "attributes.aria-disabled.value", "") !== "true";
      });
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
          this.determineOrientation(event, tabs);
          break;
        case "Backspace":
        case "Delete":
          this.handleDeleteKeyDown(event, tabs, itemKey, closable);
          break;
        case "Enter":
        case " ":
          this.handleTabClick(itemKey, event);
          this.handlePrevent(event);
          break;
        case "Home":
          tabs[0].focus({
            preventScroll
          });
          this.handlePrevent(event);
          break;
        case "End":
          tabs[tabs.length - 1].focus({
            preventScroll
          });
          this.handlePrevent(event);
          break;
      }
    };
  }
  init() {
    this._adapter.collectPane();
  }
  _notifyChange(activeKey) {
    const {
      activeKey: stateActiveKey
    } = this.getStates();
    if (stateActiveKey !== activeKey) {
      this._adapter.notifyChange(activeKey);
    }
  }
  handleTabClick(activeKey, event) {
    const isControlledComponent = this._isInProps("activeKey");
    if (isControlledComponent) {
      this._notifyChange(activeKey);
    } else {
      this._notifyChange(activeKey);
      this.handleNewActiveKey(activeKey);
    }
    this._adapter.notifyTabClick(activeKey, event);
  }
  handleNewActiveKey(activeKey) {
    const {
      activeKey: stateActiveKey
    } = this.getStates();
    if (stateActiveKey !== activeKey) {
      this._adapter.setNewActiveKey(activeKey);
    }
  }
  getDefaultActiveKey() {
    let activeKey;
    const props = this.getProps();
    if ("activeKey" in props) {
      activeKey = props.activeKey;
    } else if ("defaultActiveKey" in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = this._adapter.getDefaultActiveKeyFromChildren();
    }
    return activeKey;
  }
  handleTabListChange() {
    this._adapter.collectPane();
  }
  handleTabPanesChange() {
    this._adapter.collectPane();
    this._adapter.collectActiveKey();
  }
  handleTabDelete(tabKey) {
    this._adapter.notifyTabDelete(tabKey);
  }
  determineOrientation(event, tabs) {
    const {
      tabPosition
    } = this.getProps();
    const isVertical = tabPosition === "left";
    if (isVertical) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        this.switchTabOnArrowPress(event, tabs);
        this.handlePrevent(event);
      }
    } else {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        this.switchTabOnArrowPress(event, tabs);
        this.handlePrevent(event);
      }
    }
  }
  handleDeleteKeyDown(event, tabs, itemKey, closable) {
    const {
      preventScroll
    } = this.getProps();
    if (closable) {
      this.handleTabDelete(itemKey);
      const index = tabs.indexOf(event.target);
      if (tabs.length !== 1) {
        tabs[index + 1 >= tabs.length ? index - 1 : index + 1].focus({
          preventScroll
        });
      }
    }
  }
  switchTabOnArrowPress(event, tabs) {
    const {
      preventScroll
    } = this.getProps();
    const index = tabs.indexOf(event.target);
    const direction = {
      "ArrowLeft": -1,
      "ArrowUp": -1,
      "ArrowRight": 1,
      "ArrowDown": 1
    };
    if (direction[event.key]) {
      if (index !== void 0) {
        if (tabs[index + direction[event.key]]) {
          tabs[index + direction[event.key]].focus({
            preventScroll
          });
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          tabs[tabs.length - 1].focus({
            preventScroll
          });
        } else if (event.key === "ArrowRight" || event.key == "ArrowDown") {
          tabs[0].focus({
            preventScroll
          });
        }
      }
    }
  }
};
var foundation_default2 = TabsFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_tabs_foundation.js.map
