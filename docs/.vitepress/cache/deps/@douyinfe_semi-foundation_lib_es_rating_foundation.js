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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/rating/foundation.js
var RatingFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, RatingFoundation.defaultAdapter), adapter));
    this.handleStarFocusVisible = (event) => {
      const {
        target
      } = event;
      const {
        count
      } = this.getProps();
      try {
        if (target.matches(":focus-visible")) {
          this._adapter.setEmptyStarFocusVisible(true);
        }
      } catch (error) {
        warning(true, "Warning: [Semi Rating] The current browser does not support the focus-visible");
      }
    };
    this.handleStarBlur = (e) => {
      const {
        emptyStarFocusVisible
      } = this.getStates();
      if (emptyStarFocusVisible) {
        this._adapter.setEmptyStarFocusVisible(false);
      }
    };
  }
  init() {
    const {
      autoFocus,
      disabled
    } = this.getProps();
    if (autoFocus && !disabled) {
      this._adapter.focus();
    }
  }
  _getScroll(w, top) {
    let ret = top ? w.pageYOffset : w.pageXOffset;
    const method = top ? "scrollTop" : "scrollLeft";
    if (typeof ret !== "number") {
      const d = w.document;
      ret = d.documentElement[method];
      if (typeof ret !== "number") {
        ret = d.body[method];
      }
    }
    return ret;
  }
  _getClientPosition(elem) {
    let x, y;
    const doc = elem.ownerDocument;
    const {
      body
    } = doc;
    const docElem = doc && doc.documentElement;
    const box = elem.getBoundingClientRect();
    x = box.left;
    y = box.top;
    x -= docElem.clientLeft || body.clientLeft || 0;
    y -= docElem.clientTop || body.clientTop || 0;
    return {
      left: x,
      top: y
    };
  }
  _getOffsetLeft(el) {
    const pos = this._getClientPosition(el);
    const doc = el.ownerDocument;
    const w = doc.defaultView || doc.parentWindow;
    pos.left += this._getScroll(w);
    return pos.left;
  }
  getStarValue(index, pos) {
    const {
      allowHalf
    } = this.getProps();
    const direction = this._adapter.getContext("direction");
    const reverse = direction === "rtl";
    let value = index + 1;
    if (allowHalf) {
      const starEle = this._adapter.getStarDOM(index);
      const leftDis = this._getOffsetLeft(starEle);
      const width = starEle.clientWidth;
      if (reverse && pos - leftDis > width / 2) {
        value -= 0.5;
      } else if (!reverse && pos - leftDis < width / 2) {
        value -= 0.5;
      }
    }
    return value;
  }
  handleHover(event, index) {
    const currValue = this.getStarValue(index, event.pageX);
    const {
      clearedValue,
      hoverValue
    } = this.getStates();
    if (currValue !== hoverValue && currValue !== clearedValue) {
      this._adapter.notifyHoverChange(currValue, null);
    }
  }
  handleMouseLeave() {
    this._adapter.notifyHoverChange(void 0, null);
  }
  handleClick(event, index) {
    const {
      allowClear
    } = this.getProps();
    const {
      value
    } = this.getStates();
    const newValue = this.getStarValue(index, event.pageX);
    const isReset = allowClear ? newValue === value : false;
    this._adapter.updateValue(isReset ? 0 : newValue);
    if (isReset) {
      this._adapter.notifyHoverChange(void 0, newValue);
    } else {
      this._adapter.clearValue(null);
    }
  }
  handleFocus(e) {
    this._adapter.notifyFocus(e);
  }
  handleBlur(e) {
    this._adapter.notifyBlur(e);
  }
  handleKeyDown(event, value) {
    const {
      key
    } = event;
    const {
      count,
      allowHalf
    } = this.getProps();
    const direction = this._adapter.getContext("direction");
    const reverse = direction === "rtl";
    const step = allowHalf ? 0.5 : 1;
    let tempValue;
    let newValue;
    if (key === "ArrowRight" || key === "ArrowUp") {
      tempValue = value + (reverse ? -step : step);
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      tempValue = value + (reverse ? step : -step);
    }
    if (tempValue > count) {
      newValue = 0;
    } else if (tempValue < 0) {
      newValue = count;
    } else {
      newValue = tempValue;
    }
    if (["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown"].includes(key)) {
      this._adapter.notifyKeyDown(event);
      this._adapter.updateValue(newValue);
      this.changeFocusStar(newValue, event);
      event.preventDefault();
      this._adapter.notifyHoverChange(void 0, null);
    }
  }
  changeFocusStar(value, event) {
    const {
      count,
      allowHalf,
      preventScroll
    } = this.getProps();
    const index = Math.ceil(value) - 1;
    const starElement = [...event.currentTarget.childNodes].map((item) => item.childNodes[0].childNodes);
    if (index < 0) {
      starElement[count][0].focus({
        preventScroll
      });
    } else {
      starElement[index][allowHalf ? value * 10 % 10 === 5 ? 0 : 1 : 0].focus({
        preventScroll
      });
    }
  }
};
var RatingItemFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, RatingItemFoundation.defaultAdapter), adapter));
    this.handleFocusVisible = (event, star) => {
      const {
        target
      } = event;
      try {
        if (target.matches(":focus-visible")) {
          if (star === "first") {
            this._adapter.setFirstStarFocus(true);
          } else {
            this._adapter.setSecondStarFocus(true);
          }
        }
      } catch (error) {
        warning(true, "Warning: [Semi Rating] The current browser does not support the focus-visible");
      }
    };
    this.handleBlur = (e, star) => {
      const {
        firstStarFocus,
        secondStarFocus
      } = this.getStates();
      if (star === "first") {
        firstStarFocus && this._adapter.setFirstStarFocus(false);
      } else {
        secondStarFocus && this._adapter.setSecondStarFocus(false);
      }
    };
  }
};
export {
  RatingItemFoundation,
  RatingFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_rating_foundation.js.map
