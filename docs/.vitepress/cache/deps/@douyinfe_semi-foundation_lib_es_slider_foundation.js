import {
  warning
} from "./chunk-K7DSZPDE.js";
import {
  handlePrevent
} from "./chunk-M6FOBOF7.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/touchPolyfill.js
var touchEventPolyfill = (touch, touchEvent) => {
  if (!globalThis.Touch || !(touch instanceof Touch)) {
    return touch;
  }
  const keysNeedPolyfill = ["stopPropagation", "preventDefault"];
  keysNeedPolyfill.forEach((key) => {
    let value = touchEvent[key];
    if (value) {
      if (typeof value === "function") {
        value = function() {
          return touchEvent[key](...arguments);
        };
      }
      if (touch[key]) {
        warning(true, `"The key ${key}" exist in Touch.`);
      } else {
        touch[key] = value;
      }
    }
  });
  return touch;
};
var touchPolyfill_default = touchEventPolyfill;

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/slider/foundation.js
var SliderFoundation = class extends foundation_default {
  constructor(adapter) {
    var _this;
    super(Object.assign(Object.assign({}, SliderFoundation.defaultAdapter), adapter));
    _this = this;
    this.getMinAndMaxPercent = (value) => {
      const {
        range,
        min,
        max
      } = this._adapter.getProps();
      const minPercent = range ? (value[0] - min) / (max - min) : (value - min) / (max - min);
      const maxPercent = range ? (value[1] - min) / (max - min) : 1;
      return {
        min: this._checkValidity(minPercent),
        max: this._checkValidity(maxPercent)
      };
    };
    this._checkValidity = function(value) {
      let min = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      let max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      const checked = value > max ? max : value < min ? min : value;
      return checked;
    };
    this.computeHandleVisibleVal = (visible, formatter, range) => {
      const {
        focusPos,
        currentValue
      } = this._adapter.getStates();
      const tipVisible = {
        min: false,
        max: false
      };
      let tipChildren;
      if (formatter) {
        tipChildren = {
          min: range ? formatter(this.outPutValue(currentValue[0])) : formatter(this.outPutValue(currentValue)),
          max: range ? formatter(this.outPutValue(currentValue[1])) : null
        };
      } else {
        tipChildren = {
          min: range ? this.outPutValue(currentValue[0]) : this.outPutValue(currentValue),
          max: range ? this.outPutValue(currentValue[1]) : null
        };
      }
      if (visible) {
        tipVisible.min = true;
        tipVisible.max = true;
      } else if (typeof visible === "undefined" && formatter) {
        if (focusPos === "min") {
          tipVisible.min = true;
        } else if (focusPos === "max") {
          tipVisible.max = true;
        }
      }
      const result = {
        tipVisible,
        tipChildren
      };
      return result;
    };
    this.valueFormatIsCorrect = (value) => {
      if (Array.isArray(value)) {
        return typeof value[0] === "number" && typeof value[0] === "number";
      } else {
        return typeof value === "number";
      }
    };
    this.handleMousePos = (pageX, pageY) => {
      const parentRect = this._adapter.getParentRect();
      const scrollParent = this._adapter.getScrollParentVal();
      const parentX = parentRect ? parentRect.left : 0;
      const parentY = parentRect ? parentRect.top : 0;
      return {
        x: pageX - parentX + scrollParent.scrollLeft,
        y: pageY - parentY + scrollParent.scrollTop
      };
    };
    this.getScrollParent = (element) => {
      const el = element;
      const regex = /(auto|scroll)/;
      const style = (node, prop) => window.getComputedStyle(node, null).getPropertyValue(prop);
      const scroll = (node) => regex.test(style(node, "overflow") + style(node, "overflow-y") + style(node, "overflow-x"));
      const scrollParent = (node) => !node || node === document.body || !(node instanceof Element) ? document.body : scroll(node) ? node : scrollParent(node.parentNode);
      return scrollParent(el);
    };
    this.checkMeetMinMax = (position) => {
      const {
        vertical,
        verticalReverse,
        range
      } = this._adapter.getProps();
      const value = this._adapter.getState("currentValue");
      const currentPos = this.transValueToPos(value);
      const {
        sliderX,
        sliderY,
        sliderWidth,
        sliderHeight
      } = this._adapter.getSliderLengths();
      const {
        chooseMovePos,
        isDrag
      } = this._adapter.getStates();
      const len = vertical ? sliderHeight : sliderWidth;
      let startPos;
      if (vertical && verticalReverse) {
        startPos = sliderY + len;
      } else {
        startPos = vertical ? sliderY : sliderX;
      }
      startPos = chooseMovePos === "max" && isDrag ? currentPos[0] : startPos;
      let endPos;
      if (vertical && verticalReverse) {
        endPos = sliderY;
      } else {
        endPos = vertical ? sliderY + sliderHeight : sliderX + sliderWidth;
      }
      endPos = chooseMovePos === "min" && isDrag && range ? currentPos[1] : endPos;
      if (vertical && verticalReverse) {
        if (position >= startPos) {
          position = startPos;
        } else if (position <= endPos) {
          position = endPos;
        }
      } else {
        if (position <= startPos) {
          position = startPos;
        } else if (position >= endPos) {
          position = endPos;
        }
      }
      return position;
    };
    this.transPosToValue = (mousePos, isMin) => {
      const pos = this.checkMeetMinMax(mousePos);
      const {
        min,
        max,
        currentValue
      } = this._adapter.getStates();
      const {
        range,
        vertical,
        step,
        verticalReverse
      } = this._adapter.getProps();
      const {
        sliderX,
        sliderY,
        sliderWidth,
        sliderHeight
      } = this._adapter.getSliderLengths();
      const startPos = vertical ? sliderY : sliderX;
      const len = vertical ? sliderHeight : sliderWidth;
      let stepValue;
      if (vertical && verticalReverse) {
        isMin = !isMin;
        stepValue = (startPos + len - pos) / len * (max - min) + min;
      } else {
        stepValue = (pos - startPos) / len * (max - min) + min;
      }
      let compareValue;
      if (range) {
        compareValue = isMin ? currentValue[0] : currentValue[1];
      } else {
        compareValue = currentValue;
      }
      if (step !== 1) {
        stepValue = Math.round(stepValue / step) * step;
      }
      if (range && stepValue !== compareValue) {
        if (vertical && verticalReverse) {
          return isMin ? [currentValue[0], stepValue] : [stepValue, currentValue[1]];
        } else {
          return isMin ? [stepValue, currentValue[1]] : [currentValue[0], stepValue];
        }
      } else if (!range && stepValue !== compareValue) {
        return stepValue;
      } else {
        return false;
      }
    };
    this.transValueToPos = (value) => {
      const {
        min,
        max
      } = this._adapter.getStates();
      const {
        vertical,
        range,
        verticalReverse
      } = this._adapter.getProps();
      const {
        sliderX,
        sliderY,
        sliderWidth,
        sliderHeight
      } = this._adapter.getSliderLengths();
      const startPos = vertical ? sliderY : sliderX;
      const len = vertical ? sliderHeight : sliderWidth;
      if (range) {
        if (vertical && verticalReverse) {
          return [startPos + len - (value[0] - min) * len / (max - min), startPos + len - (value[1] - min) * len / (max - min)];
        } else {
          return [(value[0] - min) * len / (max - min) + startPos, (value[1] - min) * len / (max - min) + startPos];
        }
      } else {
        return (value - min) * len / (max - min) + startPos;
      }
    };
    this.isMarkActive = (mark) => {
      const {
        min,
        max,
        range,
        included
      } = this._adapter.getProps();
      const currentValue = this._adapter.getState("currentValue");
      if (typeof (mark / 1) === "number" && mark >= min && mark <= max) {
        if (range) {
          return (mark > currentValue[1] || mark < currentValue[0]) && included ? "unActive" : "active";
        } else {
          return mark <= currentValue && included ? "active" : "unActive";
        }
      } else {
        return false;
      }
    };
    this.outPutValue = (inputValue) => {
      const checkHowManyDecimals = (num) => {
        var _a, _b;
        const reg = /^\d+(\.\d+)?$/;
        if (reg.test(String(num))) {
          return (_b = (_a = num.toString().split(".")[1]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        }
        return 0;
      };
      const step = this._adapter.getProp("step");
      const transWay = (() => {
        const decimals = checkHowManyDecimals(step);
        const multipler = Math.pow(10, decimals);
        return (value) => {
          return Math.round(value * multipler) / multipler;
        };
      })();
      if (Array.isArray(inputValue)) {
        return [transWay(inputValue[0]), transWay(inputValue[1])];
      } else {
        return transWay(inputValue);
      }
    };
    this.handleDisabledChange = (disabled) => {
      this._adapter.updateDisabled(disabled);
    };
    this.checkAndUpdateIsInRenderTreeState = () => this._adapter.checkAndUpdateIsInRenderTreeState();
    this.calculateOutputValue = (position, isMin) => {
      const moveValue = this.transPosToValue(position, isMin);
      if (moveValue === false) {
        return void 0;
      }
      return this.outPutValue(moveValue);
    };
    this.handleValueChange = (prevValue, nextValue) => {
      const {
        min,
        max
      } = this._adapter.getStates();
      let resultState = null;
      const disableState = {};
      if (this.valueFormatIsCorrect(nextValue)) {
        if (Array.isArray(prevValue) && Array.isArray(nextValue)) {
          nextValue = [
            nextValue[0] < min ? min : nextValue[0],
            nextValue[1] > max ? max : nextValue[1]
            // Math.round(nextValue[1])
          ];
          resultState = Object.assign(disableState, {
            currentValue: nextValue
          });
        }
        if (typeof prevValue === "number" && typeof nextValue === "number") {
          if (nextValue > max) {
            nextValue = max;
          } else {
            nextValue = nextValue < min ? min : nextValue;
          }
          resultState = Object.assign(disableState, {
            currentValue: nextValue
          });
        }
      } else {
        resultState = disableState;
      }
      if (resultState) {
        this._adapter.transNewPropsToState(resultState);
      }
    };
    this.onHandleDown = (e, handler) => {
      this._adapter.onHandleDown(e);
      const disabled = this._adapter.getState("disabled");
      const {
        vertical
      } = this._adapter.getProps();
      const {
        dragging
      } = this._adapter.getOverallVars();
      if (disabled) {
        return false;
      }
      this._adapter.setStateVal("isDrag", true);
      this._adapter.setStateVal("chooseMovePos", handler);
      if (handler === "min") {
        this._adapter.setDragging([true, dragging[1]]);
      } else {
        this._adapter.setDragging([dragging[0], true]);
      }
      const mousePos = this.handleMousePos(e.pageX, e.pageY);
      let pos = vertical ? mousePos.y : mousePos.x;
      if (!this._adapter.isEventFromHandle(e)) {
        this._dragOffset = 0;
      } else {
        const handlePosition = this._getHandleCenterPosition(vertical, e.target);
        this._dragOffset = vertical ? pos - handlePosition : pos - handlePosition;
        pos = handlePosition;
      }
      return true;
    };
    this.onHandleMove = (e) => {
      this._adapter.setEventDefault(e);
      const {
        disabled,
        chooseMovePos
      } = this._adapter.getStates();
      const {
        vertical
      } = this._adapter.getProps();
      const {
        dragging
      } = this._adapter.getOverallVars();
      if (disabled) {
        return false;
      }
      this.onHandleEnter(chooseMovePos);
      const mousePos = this.handleMousePos(e.pageX, e.pageY);
      let pagePos = vertical ? mousePos.y : mousePos.x;
      pagePos = pagePos - this._dragOffset;
      if (chooseMovePos === "min" && dragging[0] || chooseMovePos === "max" && dragging[1]) {
        const outPutValue = this.calculateOutputValue(pagePos, chooseMovePos === "min");
        if (outPutValue === void 0) {
          return false;
        }
        this._adapter.notifyChange(outPutValue);
        this._adapter.onHandleMove(pagePos, chooseMovePos === "min", void 0, false, outPutValue);
      }
      return true;
    };
    this.onHandleTouchStart = (e, handler) => {
      const handleMinDom = this._adapter.getMinHandleEl();
      const handleMaxDom = this._adapter.getMaxHandleEl();
      if (e.target === handleMinDom || e.target === handleMaxDom) {
        handlePrevent(e);
        const touch = touchPolyfill_default(e.touches[0], e);
        this.onHandleDown(touch, handler);
      }
    };
    this.onHandleTouchMove = (e) => {
      const handleMinDom = this._adapter.getMinHandleEl();
      const handleMaxDom = this._adapter.getMaxHandleEl();
      if (e.target === handleMinDom || e.target === handleMaxDom) {
        const touch = touchPolyfill_default(e.touches[0], e);
        this.onHandleMove(touch);
      }
    };
    this.onHandleEnter = (pos) => {
      const {
        disabled,
        focusPos
      } = this._adapter.getStates();
      if (!disabled) {
        if (!focusPos && pos !== focusPos) {
          this._adapter.onHandleEnter(pos);
        }
      }
    };
    this.onHandleLeave = () => {
      const disabled = this._adapter.getState("disabled");
      if (!disabled) {
        this._adapter.onHandleLeave();
      }
    };
    this.onHandleUp = (e) => {
      this._adapter.onHandleUpBefore(e);
      const {
        disabled,
        chooseMovePos
      } = this._adapter.getStates();
      const {
        dragging
      } = this._adapter.getOverallVars();
      if (disabled) {
        return false;
      }
      if (chooseMovePos === "min") {
        this._adapter.setDragging([false, dragging[1]]);
      } else {
        this._adapter.setDragging([dragging[0], false]);
      }
      this._adapter.setStateVal("isDrag", false);
      this._adapter.onHandleLeave();
      this._adapter.onHandleUpAfter();
      return true;
    };
    this._handleValueDecreaseWithKeyBoard = (step, handler) => {
      const {
        min,
        currentValue
      } = this.getStates();
      const {
        range
      } = this.getProps();
      if (handler === "min") {
        if (range) {
          let newMinValue = currentValue[0] - step;
          newMinValue = newMinValue < min ? min : newMinValue;
          return [newMinValue, currentValue[1]];
        } else {
          let newMinValue = currentValue - step;
          newMinValue = newMinValue < min ? min : newMinValue;
          return newMinValue;
        }
      } else {
        let newMaxValue = currentValue[1] - step;
        newMaxValue = newMaxValue < currentValue[0] ? currentValue[0] : newMaxValue;
        return [currentValue[0], newMaxValue];
      }
    };
    this._handleValueIncreaseWithKeyBoard = (step, handler) => {
      const {
        max,
        currentValue
      } = this.getStates();
      const {
        range
      } = this.getProps();
      if (handler === "min") {
        if (range) {
          let newMinValue = currentValue[0] + step;
          newMinValue = newMinValue > currentValue[1] ? currentValue[1] : newMinValue;
          return [newMinValue, currentValue[1]];
        } else {
          let newMinValue = currentValue + step;
          newMinValue = newMinValue > max ? max : newMinValue;
          return newMinValue;
        }
      } else {
        let newMaxValue = currentValue[1] + step;
        newMaxValue = newMaxValue > max ? max : newMaxValue;
        return [currentValue[0], newMaxValue];
      }
    };
    this._handleHomeKey = (handler) => {
      const {
        min,
        currentValue
      } = this.getStates();
      const {
        range
      } = this.getProps();
      if (handler === "min") {
        if (range) {
          return [min, currentValue[1]];
        } else {
          return min;
        }
      } else {
        return [currentValue[0], currentValue[0]];
      }
    };
    this._handleEndKey = (handler) => {
      const {
        max,
        currentValue
      } = this.getStates();
      const {
        range
      } = this.getProps();
      if (handler === "min") {
        if (range) {
          return [currentValue[1], currentValue[1]];
        } else {
          return max;
        }
      } else {
        return [currentValue[0], max];
      }
    };
    this.handleKeyDown = (event, handler) => {
      const {
        min,
        max,
        currentValue
      } = this.getStates();
      const {
        step,
        range
      } = this.getProps();
      let outputValue;
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowDown":
          outputValue = this._handleValueDecreaseWithKeyBoard(step, handler);
          break;
        case "ArrowRight":
        case "ArrowUp":
          outputValue = this._handleValueIncreaseWithKeyBoard(step, handler);
          break;
        case "PageUp":
          outputValue = this._handleValueIncreaseWithKeyBoard(10 * step, handler);
          break;
        case "PageDown":
          outputValue = this._handleValueDecreaseWithKeyBoard(10 * step, handler);
          break;
        case "Home":
          outputValue = this._handleHomeKey(handler);
          break;
        case "End":
          outputValue = this._handleEndKey(handler);
          break;
        case "default":
          break;
      }
      if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "PageUp", "PageDown", "Home", "End"].includes(event.key)) {
        let update = true;
        if (Array.isArray(currentValue)) {
          update = !(currentValue[0] === outputValue[0] && currentValue[1] === outputValue[1]);
        } else {
          update = currentValue !== outputValue;
        }
        if (update) {
          this._adapter.updateCurrentValue(outputValue);
          this._adapter.notifyChange(outputValue);
        }
        handlePrevent(event);
      }
    };
    this.onFocus = (e, handler) => {
      handlePrevent(e);
      const {
        target
      } = e;
      try {
        if (target.matches(":focus-visible")) {
          if (handler === "min") {
            this._adapter.setStateVal("firstDotFocusVisible", true);
          } else {
            this._adapter.setStateVal("secondDotFocusVisible", true);
          }
        }
      } catch (error) {
        warning(true, "Warning: [Semi Slider] The current browser does not support the focus-visible");
      }
    };
    this.onBlur = (e, handler) => {
      const {
        firstDotFocusVisible,
        secondDotFocusVisible
      } = this.getStates();
      if (handler === "min") {
        firstDotFocusVisible && this._adapter.setStateVal("firstDotFocusVisible", false);
      } else {
        secondDotFocusVisible && this._adapter.setStateVal("secondDotFocusVisible", false);
      }
    };
    this.handleWrapClick = (e) => {
      const {
        disabled,
        isDrag
      } = this._adapter.getStates();
      if (isDrag || disabled || this._adapter.isEventFromHandle(e)) {
        return;
      }
      const {
        vertical
      } = this.getProps();
      const mousePos = this.handleMousePos(e.pageX, e.pageY);
      const position = vertical ? mousePos.y : mousePos.x;
      const isMin = this.checkWhichHandle(position);
      const outPutValue = this.calculateOutputValue(position, isMin);
      if (outPutValue === void 0) {
        return;
      }
      this._adapter.notifyChange(outPutValue);
      if (this._isControlledComponent()) {
        return;
      }
      this.setHandlePos(position, isMin, true, outPutValue);
    };
    this.setHandlePos = function(position, isMin) {
      let clickTrack = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      let outPutValue = arguments.length > 3 ? arguments[3] : void 0;
      _this._adapter.onHandleMove(position, isMin, () => _this._adapter.onHandleUpAfter(), clickTrack, outPutValue);
    };
    this.checkWhichHandle = (pagePos) => {
      const {
        vertical,
        verticalReverse
      } = this.getProps();
      const {
        currentValue
      } = this._adapter.getStates();
      const currentPos = this.transValueToPos(currentValue);
      let isMin = true;
      if (Array.isArray(currentPos)) {
        if (pagePos > currentPos[1] || Math.abs(pagePos - currentPos[0]) > Math.abs(pagePos - currentPos[1])) {
          isMin = false;
        }
      }
      if (vertical && verticalReverse) {
        isMin = !isMin;
      }
      return isMin;
    };
    this.handleWrapperEnter = () => {
      this._adapter.setStateVal("showBoundary", true);
    };
    this.handleWrapperLeave = () => {
      this._adapter.setStateVal("showBoundary", false);
    };
  }
  init() {
    this._checkCurrentValue();
    this._dragOffset = 0;
  }
  _checkCurrentValue() {
    const {
      currentValue,
      min,
      max
    } = this.getStates();
    let checked;
    if (Array.isArray(currentValue)) {
      checked = [];
      checked[0] = this._checkValidity(currentValue[0], min, max);
      checked[1] = this._checkValidity(currentValue[1], min, max);
    } else {
      checked = this._checkValidity(currentValue, min, max);
    }
    this._adapter.updateCurrentValue(checked);
  }
  /**
   * Untie event
   * @memberof SliderFoundation
   */
  destroy() {
    this._adapter.unSubscribeEventListener();
  }
  _getHandleCenterPosition(vertical, handle) {
    const pos = handle.getBoundingClientRect();
    const {
      x,
      y
    } = this.handleMousePos(pos.left + pos.width * 0.5, pos.top + pos.height * 0.5);
    return vertical ? y : x;
  }
};
export {
  SliderFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_slider_foundation.js.map
