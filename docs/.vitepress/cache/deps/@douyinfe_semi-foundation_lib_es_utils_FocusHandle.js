import {
  require_baseDifference
} from "./chunk-CQUURMQK.js";
import {
  require_baseRest,
  require_isArrayLikeObject
} from "./chunk-6SHS63ZR.js";
import "./chunk-SKUJYBVG.js";
import "./chunk-PTHRDZX2.js";
import "./chunk-IBVGRLMF.js";
import "./chunk-RZZPN2AN.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-OCJIPV4I.js";
import {
  isElement
} from "./chunk-AVGX6KRS.js";
import "./chunk-BVRSW63P.js";
import "./chunk-XGO3WBYR.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import "./chunk-X27LVEKC.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/without.js
var require_without = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/without.js"(exports, module) {
    var baseDifference = require_baseDifference();
    var baseRest = require_baseRest();
    var isArrayLikeObject = require_isArrayLikeObject();
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array) ? baseDifference(array, values) : [];
    });
    module.exports = without;
  }
});

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/FocusHandle.js
var import_without = __toESM(require_without());
var FocusTrapHandle = class {
  constructor(container, options) {
    var _a;
    this.addFocusRedirectListener = (listener) => {
      this.focusRedirectListenerList.push(listener);
      return () => this.removeFocusRedirectListener(listener);
    };
    this.removeFocusRedirectListener = (listener) => {
      this.focusRedirectListenerList = (0, import_without.default)(this.focusRedirectListenerList, listener);
    };
    this.destroy = () => {
      var _a2;
      (_a2 = this.container) === null || _a2 === void 0 ? void 0 : _a2.removeEventListener("keydown", this.onKeyPress);
    };
    this.shouldFocusRedirect = (element) => {
      if (!this.enable) {
        return false;
      }
      for (const listener of this.focusRedirectListenerList) {
        const should = listener(element);
        if (!should) {
          return false;
        }
      }
      return true;
    };
    this.focusElement = (element, event) => {
      const {
        preventScroll
      } = this.options;
      element === null || element === void 0 ? void 0 : element.focus({
        preventScroll
      });
      event.preventDefault();
    };
    this.onKeyPress = (event) => {
      if (event && event.key === "Tab") {
        const focusableElements = FocusTrapHandle.getFocusableElements(this.container);
        const focusableNum = focusableElements.length;
        if (focusableNum) {
          if (event.shiftKey) {
            this.handleContainerShiftTabKeyDown(focusableElements, event);
          } else {
            this.handleContainerTabKeyDown(focusableElements, event);
          }
        }
      }
    };
    this.handleContainerTabKeyDown = (focusableElements, event) => {
      const activeElement = FocusTrapHandle.getActiveElement();
      const isLastCurrentFocus = focusableElements[focusableElements.length - 1] === activeElement;
      const redirectForcingElement = focusableElements[0];
      if (isLastCurrentFocus && this.shouldFocusRedirect(redirectForcingElement)) {
        this.focusElement(redirectForcingElement, event);
      }
    };
    this.handleContainerShiftTabKeyDown = (focusableElements, event) => {
      const activeElement = FocusTrapHandle.getActiveElement();
      const isFirstCurrentFocus = focusableElements[0] === activeElement;
      const redirectForcingElement = focusableElements[focusableElements.length - 1];
      if (isFirstCurrentFocus && this.shouldFocusRedirect(redirectForcingElement)) {
        this.focusElement(redirectForcingElement, event);
      }
    };
    Object.freeze(options);
    this.container = container;
    this.options = options;
    this.enable = (_a = options === null || options === void 0 ? void 0 : options.enable) !== null && _a !== void 0 ? _a : true;
    this.focusRedirectListenerList = (() => {
      if (options === null || options === void 0 ? void 0 : options.onFocusRedirectListener) {
        return Array.isArray(options.onFocusRedirectListener) ? [...options.onFocusRedirectListener] : [options.onFocusRedirectListener];
      } else {
        return [];
      }
    })();
    this.container.addEventListener("keydown", this.onKeyPress);
  }
  get enable() {
    return this._enable;
  }
  set enable(value) {
    this._enable = value;
  }
  // ---- static func ----
  static getFocusableElements(node) {
    if (!isElement(node)) {
      return [];
    }
    const focusableSelectorsList = ["input:not([disabled]):not([tabindex='-1'])", "textarea:not([disabled]):not([tabindex='-1'])", "button:not([disabled]):not([tabindex='-1'])", "a[href]:not([tabindex='-1'])", "select:not([disabled]):not([tabindex='-1'])", "area[href]:not([tabindex='-1'])", "iframe:not([tabindex='-1'])", "object:not([tabindex='-1'])", "*[tabindex]:not([tabindex='-1'])", "*[contenteditable]:not([tabindex='-1'])"];
    const focusableSelectorsStr = focusableSelectorsList.join(",");
    return Array.from(node.querySelectorAll(focusableSelectorsStr));
  }
  static getActiveElement() {
    return document ? document.activeElement : null;
  }
};
var FocusHandle_default = FocusTrapHandle;
export {
  FocusHandle_default as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_utils_FocusHandle.js.map
