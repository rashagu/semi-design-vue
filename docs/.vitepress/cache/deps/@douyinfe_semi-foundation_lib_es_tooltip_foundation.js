import {
  require_isEmpty
} from "./chunk-RSVADYER.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import {
  handlePrevent
} from "./chunk-M6FOBOF7.js";
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
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/tooltip/foundation.js
var import_isEmpty = __toESM(require_isEmpty());
var import_get = __toESM(require_get());
var REGS = {
  TOP: /top/i,
  RIGHT: /right/i,
  BOTTOM: /bottom/i,
  LEFT: /left/i
};
var defaultRect = {
  left: 0,
  top: 0,
  height: 0,
  width: 0,
  scrollLeft: 0,
  scrollTop: 0
};
var Tooltip = class extends foundation_default {
  constructor(adapter) {
    var _this;
    super(Object.assign({}, adapter));
    _this = this;
    this.removePortal = () => {
      this._adapter.removePortal();
    };
    this.setDisplayNone = (displayNone, cb) => {
      this._adapter.setDisplayNone(displayNone, cb);
    };
    this.onResize = () => {
      this.calcPosition();
    };
    this.delayShow = () => {
      const mouseEnterDelay = this.getProp("mouseEnterDelay");
      this.clearDelayTimer();
      if (mouseEnterDelay > 0) {
        this._timer = setTimeout(() => {
          this.show();
          this.clearDelayTimer();
        }, mouseEnterDelay);
      } else {
        this.show();
      }
    };
    this.show = () => {
      const content = this.getProp("content");
      const trigger = this.getProp("trigger");
      const clickTriggerToHide = this.getProp("clickTriggerToHide");
      const {
        visible,
        displayNone
      } = this.getStates();
      if (displayNone) {
        this.setDisplayNone(false);
      }
      if (visible) {
        return;
      }
      this.clearDelayTimer();
      this._adapter.on("portalInserted", () => {
        this.calcPosition();
      });
      this._adapter.on("positionUpdated", () => {
        this._togglePortalVisible(true);
      });
      this._adapter.insertPortal(content, {
        left: -9999,
        top: -9999
      });
      if (trigger === "custom") {
        this._adapter.registerClickOutsideHandler(() => {
        });
      }
      if (trigger === "click" || clickTriggerToHide) {
        this._adapter.registerClickOutsideHandler(this.hide);
      }
      this._bindScrollEvent();
      this._bindResizeEvent();
    };
    this.calcPosition = function(triggerRect, wrapperRect, containerRect) {
      let shouldUpdatePos = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      triggerRect = ((0, import_isEmpty.default)(triggerRect) ? _this._adapter.getTriggerBounding() : triggerRect) || Object.assign({}, defaultRect);
      containerRect = ((0, import_isEmpty.default)(containerRect) ? _this._adapter.getPopupContainerRect() : containerRect) || Object.assign({}, defaultRect);
      wrapperRect = ((0, import_isEmpty.default)(wrapperRect) ? _this._adapter.getWrapperBounding() : wrapperRect) || Object.assign({}, defaultRect);
      let style = _this.calcPosStyle({
        triggerRect,
        wrapperRect,
        containerRect
      });
      let position = _this.getProp("position");
      if (_this.getProp("autoAdjustOverflow")) {
        const {
          position: adjustedPos,
          isHeightOverFlow,
          isWidthOverFlow
        } = _this.adjustPosIfNeed(position, style, triggerRect, wrapperRect, containerRect);
        if (position !== adjustedPos || isHeightOverFlow || isWidthOverFlow) {
          position = adjustedPos;
          style = _this.calcPosStyle({
            triggerRect,
            wrapperRect,
            containerRect,
            position,
            spacing: null,
            isOverFlow: [isHeightOverFlow, isWidthOverFlow]
          });
        }
      }
      if (shouldUpdatePos && _this._mounted) {
        _this._adapter.setPosition(Object.assign(Object.assign({}, style), {
          position
        }));
      }
      return style;
    };
    this.delayHide = () => {
      const mouseLeaveDelay = this.getProp("mouseLeaveDelay");
      this.clearDelayTimer();
      if (mouseLeaveDelay > 0) {
        this._timer = setTimeout(() => {
          this.hide();
          this.clearDelayTimer();
        }, mouseLeaveDelay);
      } else {
        this.hide();
      }
    };
    this.hide = () => {
      this.clearDelayTimer();
      this._togglePortalVisible(false);
      this._adapter.off("portalInserted");
      this._adapter.off("positionUpdated");
    };
    this.handleContainerKeydown = (event) => {
      const {
        guardFocus,
        closeOnEsc
      } = this.getProps();
      switch (event && event.key) {
        case "Escape":
          closeOnEsc && this._handleEscKeyDown(event);
          break;
        case "Tab":
          if (guardFocus) {
            const container = this._adapter.getContainer();
            const focusableElements = this._adapter.getFocusableElements(container);
            const focusableNum = focusableElements.length;
            if (focusableNum) {
              if (event.shiftKey) {
                this._handleContainerShiftTabKeyDown(focusableElements, event);
              } else {
                this._handleContainerTabKeyDown(focusableElements, event);
              }
            }
          }
          break;
        default:
          break;
      }
    };
    this._timer = null;
  }
  init() {
    const {
      wrapperId
    } = this.getProps();
    this._mounted = true;
    this._bindEvent();
    this._shouldShow();
    this._initContainerPosition();
    if (!wrapperId) {
      this._adapter.setId();
    }
  }
  destroy() {
    this._mounted = false;
    this.unBindEvent();
  }
  _bindEvent() {
    const trigger = this.getProp("trigger");
    const {
      triggerEventSet,
      portalEventSet
    } = this._generateEvent(trigger);
    this._bindTriggerEvent(triggerEventSet);
    this._bindPortalEvent(portalEventSet);
    this._bindResizeEvent();
  }
  unBindEvent() {
    this._adapter.unregisterClickOutsideHandler();
    this.unBindResizeEvent();
    this.unBindScrollEvent();
  }
  _bindTriggerEvent(triggerEventSet) {
    this._adapter.registerTriggerEvent(triggerEventSet);
  }
  _bindPortalEvent(portalEventSet) {
    this._adapter.registerPortalEvent(portalEventSet);
  }
  _bindResizeEvent() {
    this._adapter.registerResizeHandler(this.onResize);
  }
  unBindResizeEvent() {
    this._adapter.unregisterResizeHandler(this.onResize);
  }
  _adjustPos() {
    let position = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let isVertical = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let adjustType = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "reverse";
    let concatPos = arguments.length > 3 ? arguments[3] : void 0;
    switch (adjustType) {
      case "reverse":
        return this._reversePos(position, isVertical);
      case "expand":
        return this._expandPos(position, concatPos);
      case "reduce":
        return this._reducePos(position);
      default:
        return this._reversePos(position, isVertical);
    }
  }
  _reversePos() {
    let position = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let isVertical = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (isVertical) {
      if (REGS.TOP.test(position)) {
        return position.replace("top", "bottom").replace("Top", "Bottom");
      } else if (REGS.BOTTOM.test(position)) {
        return position.replace("bottom", "top").replace("Bottom", "Top");
      }
    } else if (REGS.LEFT.test(position)) {
      return position.replace("left", "right").replace("Left", "Right");
    } else if (REGS.RIGHT.test(position)) {
      return position.replace("right", "left").replace("Right", "Left");
    }
    return position;
  }
  _expandPos() {
    let position = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let concatPos = arguments.length > 1 ? arguments[1] : void 0;
    return position.concat(concatPos);
  }
  _reducePos() {
    let position = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    const found = ["Top", "Bottom", "Left", "Right"].find((pos) => position.endsWith(pos));
    return found ? position.replace(found, "") : position;
  }
  clearDelayTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  _generateEvent(types) {
    const eventNames = this._adapter.getEventName();
    const triggerEventSet = {
      // bind esc keydown on trigger for a11y
      [eventNames.keydown]: (event) => {
        this._handleTriggerKeydown(event);
      }
    };
    let portalEventSet = {};
    switch (types) {
      case "focus":
        triggerEventSet[eventNames.focus] = () => {
          this.delayShow();
        };
        triggerEventSet[eventNames.blur] = () => {
          this.delayHide();
        };
        portalEventSet = triggerEventSet;
        break;
      case "click":
        triggerEventSet[eventNames.click] = () => {
          this.show();
        };
        portalEventSet = {};
        break;
      case "hover":
        triggerEventSet[eventNames.mouseEnter] = () => {
          this.setCache("isClickToHide", false);
          this.delayShow();
        };
        triggerEventSet[eventNames.mouseLeave] = () => {
          this.delayHide();
        };
        triggerEventSet[eventNames.focus] = () => {
          const {
            disableFocusListener
          } = this.getProps();
          !disableFocusListener && this.delayShow();
        };
        triggerEventSet[eventNames.blur] = () => {
          const {
            disableFocusListener
          } = this.getProps();
          !disableFocusListener && this.delayHide();
        };
        portalEventSet = Object.assign({}, triggerEventSet);
        if (this.getProp("clickToHide")) {
          portalEventSet[eventNames.click] = () => {
            this.setCache("isClickToHide", true);
            this.hide();
          };
          portalEventSet[eventNames.mouseEnter] = () => {
            if (this.getCache("isClickToHide")) {
              return;
            }
            this.delayShow();
          };
        }
        break;
      case "custom":
        break;
      default:
        break;
    }
    return {
      triggerEventSet,
      portalEventSet
    };
  }
  _shouldShow() {
    const visible = this.getProp("visible");
    if (visible) {
      this.show();
    } else {
    }
  }
  _togglePortalVisible(isVisible) {
    const nowVisible = this.getState("visible");
    if (nowVisible !== isVisible) {
      this._adapter.togglePortalVisible(isVisible, () => {
        if (isVisible) {
          this._adapter.setInitialFocus();
        }
        this._adapter.notifyVisibleChange(isVisible);
      });
    }
  }
  _roundPixel(pixel) {
    if (typeof pixel === "number") {
      return Math.round(pixel);
    }
    return pixel;
  }
  calcTransformOrigin(position, triggerRect, translateX, translateY) {
    if (position && triggerRect && translateX != null && translateY != null) {
      if (this.getProp("transformFromCenter")) {
        if (["topLeft", "bottomLeft"].includes(position)) {
          return `${this._roundPixel(triggerRect.width / 2)}px ${-translateY * 100}%`;
        }
        if (["topRight", "bottomRight"].includes(position)) {
          return `calc(100% - ${this._roundPixel(triggerRect.width / 2)}px) ${-translateY * 100}%`;
        }
        if (["leftTop", "rightTop"].includes(position)) {
          return `${-translateX * 100}% ${this._roundPixel(triggerRect.height / 2)}px`;
        }
        if (["leftBottom", "rightBottom"].includes(position)) {
          return `${-translateX * 100}% calc(100% - ${this._roundPixel(triggerRect.height / 2)}px)`;
        }
      }
      return `${-translateX * 100}% ${-translateY * 100}%`;
    }
    return null;
  }
  calcPosStyle(props) {
    const {
      spacing,
      isOverFlow
    } = props;
    const {
      innerWidth
    } = window;
    const triggerRect = ((0, import_isEmpty.default)(props.triggerRect) ? props.triggerRect : this._adapter.getTriggerBounding()) || Object.assign({}, defaultRect);
    const containerRect = ((0, import_isEmpty.default)(props.containerRect) ? props.containerRect : this._adapter.getPopupContainerRect()) || Object.assign({}, defaultRect);
    const wrapperRect = ((0, import_isEmpty.default)(props.wrapperRect) ? props.wrapperRect : this._adapter.getWrapperBounding()) || Object.assign({}, defaultRect);
    const position = props.position != null ? props.position : this.getProp("position");
    const SPACING = spacing != null ? spacing : this.getProp("spacing");
    const {
      arrowPointAtCenter,
      showArrow,
      arrowBounding
    } = this.getProps();
    const pointAtCenter = showArrow && arrowPointAtCenter;
    const horizontalArrowWidth = (0, import_get.default)(arrowBounding, "width", 24);
    const verticalArrowHeight = (0, import_get.default)(arrowBounding, "width", 24);
    const arrowOffsetY = (0, import_get.default)(arrowBounding, "offsetY", 0);
    const positionOffsetX = 6;
    const positionOffsetY = 6;
    let left;
    let top;
    let translateX = 0;
    let translateY = 0;
    const middleX = triggerRect.left + triggerRect.width / 2;
    const middleY = triggerRect.top + triggerRect.height / 2;
    const offsetXWithArrow = positionOffsetX + horizontalArrowWidth / 2;
    const offsetYWithArrow = positionOffsetY + verticalArrowHeight / 2;
    const heightDifference = wrapperRect.height - containerRect.height;
    const widthDifference = wrapperRect.width - containerRect.width;
    const offsetHeight = heightDifference > 0 ? heightDifference : 0;
    const offsetWidth = widthDifference > 0 ? widthDifference : 0;
    const isHeightOverFlow = isOverFlow && isOverFlow[0];
    const isWidthOverFlow = isOverFlow && isOverFlow[1];
    const isTriggerNearLeft = middleX - containerRect.left < containerRect.right - middleX;
    const isTriggerNearTop = middleY - containerRect.top < containerRect.bottom - middleY;
    const isWrapperWidthOverflow = wrapperRect.width > innerWidth;
    switch (position) {
      case "top":
        left = isWidthOverFlow ? isTriggerNearLeft ? containerRect.left + wrapperRect.width / 2 : containerRect.right - wrapperRect.width / 2 + offsetWidth : middleX;
        top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING;
        translateX = -0.5;
        translateY = -1;
        break;
      case "topLeft":
        left = isWidthOverFlow ? isWrapperWidthOverflow ? containerRect.left : containerRect.right - wrapperRect.width : pointAtCenter ? middleX - offsetXWithArrow : triggerRect.left;
        top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING;
        translateY = -1;
        break;
      case "topRight":
        left = isWidthOverFlow ? containerRect.right + offsetWidth : pointAtCenter ? middleX + offsetXWithArrow : triggerRect.right;
        top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING;
        translateY = -1;
        translateX = -1;
        break;
      case "left":
        left = isWidthOverFlow ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow : triggerRect.left - SPACING;
        top = isHeightOverFlow ? isTriggerNearTop ? containerRect.top + wrapperRect.height / 2 : containerRect.bottom - wrapperRect.height / 2 + offsetHeight : middleY;
        translateX = -1;
        translateY = -0.5;
        break;
      case "leftTop":
        left = isWidthOverFlow ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow : triggerRect.left - SPACING;
        top = isHeightOverFlow ? containerRect.top : pointAtCenter ? middleY - offsetYWithArrow : triggerRect.top;
        translateX = -1;
        break;
      case "leftBottom":
        left = isWidthOverFlow ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow : triggerRect.left - SPACING;
        top = isHeightOverFlow ? containerRect.bottom + offsetHeight : pointAtCenter ? middleY + offsetYWithArrow : triggerRect.bottom;
        translateX = -1;
        translateY = -1;
        break;
      case "bottom":
        left = isWidthOverFlow ? isTriggerNearLeft ? containerRect.left + wrapperRect.width / 2 : containerRect.right - wrapperRect.width / 2 + offsetWidth : middleX;
        top = isHeightOverFlow ? containerRect.top + offsetYWithArrow - SPACING : triggerRect.top + triggerRect.height + SPACING;
        translateX = -0.5;
        break;
      case "bottomLeft":
        left = isWidthOverFlow ? isWrapperWidthOverflow ? containerRect.left : containerRect.right - wrapperRect.width : pointAtCenter ? middleX - offsetXWithArrow : triggerRect.left;
        top = isHeightOverFlow ? containerRect.top + offsetYWithArrow - SPACING : triggerRect.top + triggerRect.height + SPACING;
        break;
      case "bottomRight":
        left = isWidthOverFlow ? containerRect.right + offsetWidth : pointAtCenter ? middleX + offsetXWithArrow : triggerRect.right;
        top = isHeightOverFlow ? containerRect.top + offsetYWithArrow - SPACING : triggerRect.top + triggerRect.height + SPACING;
        translateX = -1;
        break;
      case "right":
        left = isWidthOverFlow ? containerRect.left - SPACING + offsetXWithArrow : triggerRect.right + SPACING;
        top = isHeightOverFlow ? isTriggerNearTop ? containerRect.top + wrapperRect.height / 2 : containerRect.bottom - wrapperRect.height / 2 + offsetHeight : middleY;
        translateY = -0.5;
        break;
      case "rightTop":
        left = isWidthOverFlow ? containerRect.left - SPACING + offsetXWithArrow : triggerRect.right + SPACING;
        top = isHeightOverFlow ? containerRect.top : pointAtCenter ? middleY - offsetYWithArrow : triggerRect.top;
        break;
      case "rightBottom":
        left = isWidthOverFlow ? containerRect.left - SPACING + offsetXWithArrow : triggerRect.right + SPACING;
        top = isHeightOverFlow ? containerRect.bottom + offsetHeight : pointAtCenter ? middleY + offsetYWithArrow : triggerRect.bottom;
        translateY = -1;
        break;
      case "leftTopOver":
        left = triggerRect.left - SPACING;
        top = triggerRect.top - SPACING;
        break;
      case "rightTopOver":
        left = triggerRect.right + SPACING;
        top = triggerRect.top - SPACING;
        translateX = -1;
        break;
      case "leftBottomOver":
        left = triggerRect.left - SPACING;
        top = triggerRect.bottom + SPACING;
        translateY = -1;
        break;
      case "rightBottomOver":
        left = triggerRect.right + SPACING;
        top = triggerRect.bottom + SPACING;
        translateX = -1;
        translateY = -1;
        break;
      default:
        break;
    }
    const transformOrigin = this.calcTransformOrigin(position, triggerRect, translateX, translateY);
    const _containerIsBody = this._adapter.containerIsBody();
    left = left - containerRect.left;
    top = top - containerRect.top;
    if (_containerIsBody && !this._adapter.containerIsRelativeOrAbsolute()) {
      const documentEleRect = this._adapter.getDocumentElementBounding();
      left += containerRect.left - documentEleRect.left;
      top += containerRect.top - documentEleRect.top;
    }
    left = _containerIsBody ? left : left + containerRect.scrollLeft;
    top = _containerIsBody ? top : top + containerRect.scrollTop;
    const triggerHeight = triggerRect.height;
    if (this.getProp("showArrow") && !arrowPointAtCenter && triggerHeight <= (verticalArrowHeight / 2 + arrowOffsetY) * 2) {
      const offsetY = triggerHeight / 2 - (arrowOffsetY + verticalArrowHeight / 2);
      if ((position.includes("Top") || position.includes("Bottom")) && !position.includes("Over")) {
        top = position.includes("Top") ? top + offsetY : top - offsetY;
      }
    }
    const style = {
      left: this._roundPixel(left),
      top: this._roundPixel(top)
    };
    let transform = "";
    if (translateX != null) {
      transform += `translateX(${translateX * 100}%) `;
      Object.defineProperty(style, "translateX", {
        enumerable: false,
        value: translateX
      });
    }
    if (translateY != null) {
      transform += `translateY(${translateY * 100}%) `;
      Object.defineProperty(style, "translateY", {
        enumerable: false,
        value: translateY
      });
    }
    if (transformOrigin != null) {
      style.transformOrigin = transformOrigin;
    }
    if (transform) {
      style.transform = transform;
    }
    return style;
  }
  isLR() {
    let position = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return position.includes("left") || position.includes("right");
  }
  isTB() {
    let position = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return position.includes("top") || position.includes("bottom");
  }
  isReverse(rowSpace, reverseSpace, size) {
    return rowSpace < size && reverseSpace > size;
  }
  isOverFlow(rowSpace, reverseSpace, size) {
    return rowSpace < size && reverseSpace < size;
  }
  isHalfOverFlow(posSpace, negSpace, size) {
    return posSpace < size || negSpace < size;
  }
  isHalfAllEnough(posSpace, negSpace, size) {
    return posSpace >= size || negSpace >= size;
  }
  getReverse(viewOverFlow, containerOverFlow, shouldReverseView, shouldReverseContainer) {
    return viewOverFlow && shouldReverseContainer || shouldReverseView && containerOverFlow || shouldReverseView && shouldReverseContainer;
  }
  // place the dom correctly
  adjustPosIfNeed(position, style, triggerRect, wrapperRect, containerRect) {
    const {
      innerWidth,
      innerHeight
    } = window;
    const {
      spacing,
      margin
    } = this.getProps();
    const marginLeft = typeof margin === "number" ? margin : margin.marginLeft;
    const marginTop = typeof margin === "number" ? margin : margin.marginTop;
    const marginRight = typeof margin === "number" ? margin : margin.marginRight;
    const marginBottom = typeof margin === "number" ? margin : margin.marginBottom;
    let isHeightOverFlow = false;
    let isWidthOverFlow = false;
    if (wrapperRect.width > 0 && wrapperRect.height > 0) {
      const clientLeft = triggerRect.left;
      const clientRight = triggerRect.right;
      const clientTop = triggerRect.top;
      const clientBottom = triggerRect.bottom;
      const restClientLeft = innerWidth - clientLeft;
      const restClientTop = innerHeight - clientTop;
      const restClientRight = innerWidth - clientRight;
      const restClientBottom = innerHeight - clientBottom;
      const widthIsBigger = wrapperRect.width > triggerRect.width;
      const heightIsBigger = wrapperRect.height > triggerRect.height;
      const shouldViewReverseTop = clientTop - marginTop < wrapperRect.height + spacing && restClientBottom - marginBottom > wrapperRect.height + spacing;
      const shouldViewReverseLeft = clientLeft - marginLeft < wrapperRect.width + spacing && restClientRight - marginRight > wrapperRect.width + spacing;
      const shouldViewReverseBottom = restClientBottom - marginBottom < wrapperRect.height + spacing && clientTop - marginTop > wrapperRect.height + spacing;
      const shouldViewReverseRight = restClientRight - marginRight < wrapperRect.width + spacing && clientLeft - marginLeft > wrapperRect.width + spacing;
      const shouldViewReverseTopOver = restClientTop - marginBottom < wrapperRect.height + spacing && clientBottom - marginTop > wrapperRect.height + spacing;
      const shouldViewReverseBottomOver = clientBottom - marginTop < wrapperRect.height + spacing && restClientTop - marginBottom > wrapperRect.height + spacing;
      const shouldViewReverseTopSide = restClientTop < wrapperRect.height && clientBottom > wrapperRect.height;
      const shouldViewReverseBottomSide = clientBottom < wrapperRect.height && restClientTop > wrapperRect.height;
      const shouldViewReverseLeftSide = restClientLeft < wrapperRect.width && clientRight > wrapperRect.width;
      const shouldViewReverseRightSide = clientRight < wrapperRect.width && restClientLeft > wrapperRect.width;
      const shouldReverseTopOver = restClientTop < wrapperRect.height + spacing && clientBottom > wrapperRect.height + spacing;
      const shouldReverseBottomOver = clientBottom < wrapperRect.height + spacing && restClientTop > wrapperRect.height + spacing;
      const shouldReverseLeftOver = restClientLeft < wrapperRect.width && clientRight > wrapperRect.width;
      const shouldReverseRightOver = clientRight < wrapperRect.width && restClientLeft > wrapperRect.width;
      const clientTopInContainer = clientTop - containerRect.top;
      const clientLeftInContainer = clientLeft - containerRect.left;
      const clientBottomInContainer = clientTopInContainer + triggerRect.height;
      const clientRightInContainer = clientLeftInContainer + triggerRect.width;
      const restClientBottomInContainer = containerRect.bottom - clientBottom;
      const restClientRightInContainer = containerRect.right - clientRight;
      const restClientTopInContainer = restClientBottomInContainer + triggerRect.height;
      const restClientLeftInContainer = restClientRightInContainer + triggerRect.width;
      const shouldContainerReverseTop = this.isReverse(clientTopInContainer - marginTop, restClientBottomInContainer - marginBottom, wrapperRect.height + spacing);
      const shouldContainerReverseLeft = this.isReverse(clientLeftInContainer - marginLeft, restClientRightInContainer - marginRight, wrapperRect.width + spacing);
      const shouldContainerReverseBottom = this.isReverse(restClientBottomInContainer - marginBottom, clientTopInContainer - marginTop, wrapperRect.height + spacing);
      const shouldContainerReverseRight = this.isReverse(restClientRightInContainer - marginRight, clientLeftInContainer - marginLeft, wrapperRect.width + spacing);
      const shouldContainerReverseTopOver = this.isReverse(restClientTopInContainer - marginBottom, clientBottomInContainer - marginTop, wrapperRect.height + spacing);
      const shouldContainerReverseBottomOver = this.isReverse(clientBottomInContainer - marginTop, restClientTopInContainer - marginBottom, wrapperRect.height + spacing);
      const shouldContainerReverseTopSide = this.isReverse(restClientTopInContainer, clientBottomInContainer, wrapperRect.height);
      const shouldContainerReverseBottomSide = this.isReverse(clientBottomInContainer, restClientTopInContainer, wrapperRect.height);
      const shouldContainerReverseLeftSide = this.isReverse(restClientLeftInContainer, clientRightInContainer, wrapperRect.width);
      const shouldContainerReverseRightSide = this.isReverse(clientRightInContainer, restClientLeftInContainer, wrapperRect.width);
      const halfHeight = triggerRect.height / 2;
      const halfWidth = triggerRect.width / 2;
      const isViewYOverFlow = this.isOverFlow(clientTop - marginTop, restClientBottom - marginBottom, wrapperRect.height + spacing);
      const isViewXOverFlow = this.isOverFlow(clientLeft - marginLeft, restClientRight - marginRight, wrapperRect.width + spacing);
      const isViewYOverFlowSide = this.isOverFlow(clientBottom - marginTop, restClientTop - marginBottom, wrapperRect.height + spacing);
      const isViewXOverFlowSide = this.isOverFlow(clientRight - marginLeft, restClientLeft - marginRight, wrapperRect.width + spacing);
      const isViewYOverFlowSideHalf = this.isHalfOverFlow(clientBottom - halfHeight, restClientTop - halfHeight, wrapperRect.height / 2);
      const isViewXOverFlowSideHalf = this.isHalfOverFlow(clientRight - halfWidth, restClientLeft - halfWidth, wrapperRect.width / 2);
      const isViewYEnoughSideHalf = this.isHalfAllEnough(clientBottom - halfHeight, restClientTop - halfHeight, wrapperRect.height / 2);
      const isViewXEnoughSideHalf = this.isHalfAllEnough(clientRight - halfWidth, restClientLeft - halfWidth, wrapperRect.width / 2);
      const isContainerYOverFlow = this.isOverFlow(clientTopInContainer - marginTop, restClientBottomInContainer - marginBottom, wrapperRect.height + spacing);
      const isContainerXOverFlow = this.isOverFlow(clientLeftInContainer - marginLeft, restClientRightInContainer - marginRight, wrapperRect.width + spacing);
      const isContainerYOverFlowSide = this.isOverFlow(clientBottomInContainer - marginTop, restClientTopInContainer - marginBottom, wrapperRect.height + spacing);
      const isContainerXOverFlowSide = this.isOverFlow(clientRightInContainer - marginLeft, restClientLeftInContainer - marginRight, wrapperRect.width + spacing);
      const isContainerYOverFlowSideHalf = this.isHalfOverFlow(clientBottomInContainer - halfHeight, restClientTopInContainer - halfHeight, wrapperRect.height / 2);
      const isContainerXOverFlowSideHalf = this.isHalfOverFlow(clientRightInContainer - halfWidth, restClientLeftInContainer - halfWidth, wrapperRect.width / 2);
      const isContainerYEnoughSideHalf = this.isHalfAllEnough(clientBottomInContainer - halfHeight, restClientTopInContainer - halfHeight, wrapperRect.height / 2);
      const isContainerXEnoughSideHalf = this.isHalfAllEnough(clientRightInContainer - halfWidth, restClientLeftInContainer - halfWidth, wrapperRect.width / 2);
      const shouldReverseTop = this.getReverse(isViewYOverFlow, isContainerYOverFlow, shouldViewReverseTop, shouldContainerReverseTop);
      const shouldReverseLeft = this.getReverse(isViewXOverFlow, isContainerXOverFlow, shouldViewReverseLeft, shouldContainerReverseLeft);
      const shouldReverseBottom = this.getReverse(isViewYOverFlow, isContainerYOverFlow, shouldViewReverseBottom, shouldContainerReverseBottom);
      const shouldReverseRight = this.getReverse(isViewXOverFlow, isContainerXOverFlow, shouldViewReverseRight, shouldContainerReverseRight);
      const shouldReverseTopSide = this.getReverse(isViewYOverFlowSide, isContainerYOverFlowSide, shouldViewReverseTopSide, shouldContainerReverseTopSide);
      const shouldReverseBottomSide = this.getReverse(isViewYOverFlowSide, isContainerYOverFlowSide, shouldViewReverseBottomSide, shouldContainerReverseBottomSide);
      const shouldReverseLeftSide = this.getReverse(isViewXOverFlowSide, isContainerXOverFlowSide, shouldViewReverseLeftSide, shouldContainerReverseLeftSide);
      const shouldReverseRightSide = this.getReverse(isViewXOverFlowSide, isContainerXOverFlowSide, shouldViewReverseRightSide, shouldContainerReverseRightSide);
      const isYOverFlowSideHalf = isViewYOverFlowSideHalf && isContainerYOverFlowSideHalf;
      const isXOverFlowSideHalf = isViewXOverFlowSideHalf && isContainerXOverFlowSideHalf;
      switch (position) {
        case "top":
          if (shouldReverseTop) {
            position = this._adjustPos(position, true);
          }
          if (isXOverFlowSideHalf && (shouldReverseLeftSide || shouldReverseRightSide)) {
            position = this._adjustPos(position, true, "expand", shouldReverseLeftSide ? "Right" : "Left");
          }
          break;
        case "topLeft":
          if (shouldReverseTop) {
            position = this._adjustPos(position, true);
          }
          if (shouldReverseLeftSide && widthIsBigger) {
            position = this._adjustPos(position);
          }
          if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
            position = this._adjustPos(position, true, "reduce");
          }
          break;
        case "topRight":
          if (shouldReverseTop) {
            position = this._adjustPos(position, true);
          }
          if (shouldReverseRightSide && widthIsBigger) {
            position = this._adjustPos(position);
          }
          if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
            position = this._adjustPos(position, true, "reduce");
          }
          break;
        case "left":
          if (shouldReverseLeft) {
            position = this._adjustPos(position);
          }
          if (isYOverFlowSideHalf && (shouldReverseTopSide || shouldReverseBottomSide)) {
            position = this._adjustPos(position, false, "expand", shouldReverseTopSide ? "Bottom" : "Top");
          }
          break;
        case "leftTop":
          if (shouldReverseLeft) {
            position = this._adjustPos(position);
          }
          if (shouldReverseTopSide && heightIsBigger) {
            position = this._adjustPos(position, true);
          }
          if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
            position = this._adjustPos(position, false, "reduce");
          }
          break;
        case "leftBottom":
          if (shouldReverseLeft) {
            position = this._adjustPos(position);
          }
          if (shouldReverseBottomSide && heightIsBigger) {
            position = this._adjustPos(position, true);
          }
          if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
            position = this._adjustPos(position, false, "reduce");
          }
          break;
        case "bottom":
          if (shouldReverseBottom) {
            position = this._adjustPos(position, true);
          }
          if (isXOverFlowSideHalf && (shouldReverseLeftSide || shouldReverseRightSide)) {
            position = this._adjustPos(position, true, "expand", shouldReverseLeftSide ? "Right" : "Left");
          }
          break;
        case "bottomLeft":
          if (shouldReverseBottom) {
            position = this._adjustPos(position, true);
          }
          if (shouldReverseLeftSide && widthIsBigger) {
            position = this._adjustPos(position);
          }
          if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
            position = this._adjustPos(position, true, "reduce");
          }
          break;
        case "bottomRight":
          if (shouldReverseBottom) {
            position = this._adjustPos(position, true);
          }
          if (shouldReverseRightSide && widthIsBigger) {
            position = this._adjustPos(position);
          }
          if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
            position = this._adjustPos(position, true, "reduce");
          }
          break;
        case "right":
          if (shouldReverseRight) {
            position = this._adjustPos(position);
          }
          if (isYOverFlowSideHalf && (shouldReverseTopSide || shouldReverseBottomSide)) {
            position = this._adjustPos(position, false, "expand", shouldReverseTopSide ? "Bottom" : "Top");
          }
          break;
        case "rightTop":
          if (shouldReverseRight) {
            position = this._adjustPos(position);
          }
          if (shouldReverseTopSide && heightIsBigger) {
            position = this._adjustPos(position, true);
          }
          if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
            position = this._adjustPos(position, false, "reduce");
          }
          break;
        case "rightBottom":
          if (shouldReverseRight) {
            position = this._adjustPos(position);
          }
          if (shouldReverseBottomSide && heightIsBigger) {
            position = this._adjustPos(position, true);
          }
          if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
            position = this._adjustPos(position, false, "reduce");
          }
          break;
        case "leftTopOver":
          if (shouldReverseTopOver) {
            position = this._adjustPos(position, true);
          }
          if (shouldReverseLeftOver) {
            position = this._adjustPos(position);
          }
          break;
        case "leftBottomOver":
          if (shouldReverseBottomOver) {
            position = this._adjustPos(position, true);
          }
          if (shouldReverseLeftOver) {
            position = this._adjustPos(position);
          }
          break;
        case "rightTopOver":
          if (shouldReverseTopOver) {
            position = this._adjustPos(position, true);
          }
          if (shouldReverseRightOver) {
            position = this._adjustPos(position);
          }
          break;
        case "rightBottomOver":
          if (shouldReverseBottomOver) {
            position = this._adjustPos(position, true);
          }
          if (shouldReverseRightOver) {
            position = this._adjustPos(position);
          }
          break;
        default:
          break;
      }
      if (this.isTB(position)) {
        isHeightOverFlow = isViewYOverFlow && isContainerYOverFlow;
        if (position === "top" || position === "bottom") {
          isWidthOverFlow = isViewXOverFlowSideHalf && isContainerXOverFlowSideHalf || clientRight < 0 || restClientRight < 0;
        } else {
          isWidthOverFlow = isViewXOverFlowSide && isContainerXOverFlowSide || clientRight < 0 || restClientRight < 0;
        }
      }
      if (this.isLR(position)) {
        isWidthOverFlow = isViewXOverFlow && isContainerXOverFlow;
        if (position === "left" || position === "right") {
          isHeightOverFlow = isViewYOverFlowSideHalf && isContainerYOverFlowSideHalf || clientTop < 0 || restClientTop < 0;
        } else {
          isHeightOverFlow = isViewYOverFlowSide && isContainerYOverFlowSide || clientTop < 0 || restClientTop < 0;
        }
      }
    }
    return {
      position,
      isHeightOverFlow,
      isWidthOverFlow
    };
  }
  _bindScrollEvent() {
    this._adapter.registerScrollHandler(() => this.calcPosition());
  }
  unBindScrollEvent() {
    this._adapter.unregisterScrollHandler();
  }
  _initContainerPosition() {
    this._adapter.updateContainerPosition();
  }
  _handleTriggerKeydown(event) {
    const {
      closeOnEsc,
      disableArrowKeyDown
    } = this.getProps();
    const container = this._adapter.getContainer();
    const focusableElements = this._adapter.getFocusableElements(container);
    const focusableNum = focusableElements.length;
    switch (event && event.key) {
      case "Escape":
        handlePrevent(event);
        closeOnEsc && this._handleEscKeyDown(event);
        break;
      case "ArrowUp":
        !disableArrowKeyDown && focusableNum && this._handleTriggerArrowUpKeydown(focusableElements, event);
        break;
      case "ArrowDown":
        !disableArrowKeyDown && focusableNum && this._handleTriggerArrowDownKeydown(focusableElements, event);
        break;
      default:
        break;
    }
  }
  /**
   * focus trigger
   *
   * when trigger is 'focus' or 'hover', onFocus is bind to show popup
   * if we focus trigger, popup will show again
   *
   * 如果 trigger 是 focus 或者 hover，则它绑定了 onFocus，这里我们如果重新 focus 的话，popup 会再次打开
   * 因此 returnFocusOnClose 只支持 click trigger
   */
  focusTrigger() {
    const {
      trigger,
      returnFocusOnClose,
      preventScroll
    } = this.getProps();
    if (returnFocusOnClose && trigger !== "custom") {
      const triggerNode = this._adapter.getTriggerNode();
      if (triggerNode && "focus" in triggerNode) {
        triggerNode.focus({
          preventScroll
        });
      }
    }
  }
  _handleEscKeyDown(event) {
    const {
      trigger
    } = this.getProps();
    if (trigger !== "custom") {
      this.focusTrigger();
      this.hide();
    }
    this._adapter.notifyEscKeydown(event);
  }
  _handleContainerTabKeyDown(focusableElements, event) {
    const {
      preventScroll
    } = this.getProps();
    const activeElement = this._adapter.getActiveElement();
    const isLastCurrentFocus = focusableElements[focusableElements.length - 1] === activeElement;
    if (isLastCurrentFocus) {
      focusableElements[0].focus({
        preventScroll
      });
      event.preventDefault();
    }
  }
  _handleContainerShiftTabKeyDown(focusableElements, event) {
    const {
      preventScroll
    } = this.getProps();
    const activeElement = this._adapter.getActiveElement();
    const isFirstCurrentFocus = focusableElements[0] === activeElement;
    if (isFirstCurrentFocus) {
      focusableElements[focusableElements.length - 1].focus({
        preventScroll
      });
      event.preventDefault();
    }
  }
  _handleTriggerArrowDownKeydown(focusableElements, event) {
    const {
      preventScroll
    } = this.getProps();
    focusableElements[0].focus({
      preventScroll
    });
    event.preventDefault();
  }
  _handleTriggerArrowUpKeydown(focusableElements, event) {
    const {
      preventScroll
    } = this.getProps();
    focusableElements[focusableElements.length - 1].focus({
      preventScroll
    });
    event.preventDefault();
  }
};
export {
  Tooltip as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_tooltip_foundation.js.map
