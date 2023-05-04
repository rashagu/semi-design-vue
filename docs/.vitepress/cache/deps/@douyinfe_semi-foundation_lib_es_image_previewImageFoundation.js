import {
  require_toNumber
} from "./chunk-XKTW6BSF.js";
import {
  require_isUndefined
} from "./chunk-V52XL574.js";
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
import {
  require_isObject
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import {
  require_root
} from "./chunk-XKOYYM3K.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/now.js
var require_now = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/now.js"(exports, module) {
    var root = require_root();
    var now = function() {
      return root.Date.now();
    };
    module.exports = now;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/debounce.js
var require_debounce = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/debounce.js"(exports, module) {
    var isObject = require_isObject();
    var now = require_now();
    var toNumber = require_toNumber();
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    module.exports = debounce;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/throttle.js
var require_throttle = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/throttle.js"(exports, module) {
    var debounce = require_debounce();
    var isObject = require_isObject();
    var FUNC_ERROR_TEXT = "Expected a function";
    function throttle(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    module.exports = throttle;
  }
});

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/image/previewImageFoundation.js
var import_isUndefined = __toESM(require_isUndefined());
var import_throttle = __toESM(require_throttle());
var DefaultDOMRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: () => ({})
};
var PreviewImageFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this._isImageVertical = () => this.getProp("rotation") % 180 !== 0;
    this._getImageBounds = () => {
      const imageDOM = this._adapter.getImage();
      if (imageDOM) {
        return imageDOM.getBoundingClientRect();
      }
      return DefaultDOMRect;
    };
    this._getContainerBounds = () => {
      const containerDOM = this._adapter.getContainer();
      if (containerDOM) {
        return containerDOM.getBoundingClientRect();
      }
      return DefaultDOMRect;
    };
    this._getOffset = (e) => {
      const {
        left,
        top
      } = this._getImageBounds();
      return {
        x: e.clientX - left,
        y: e.clientY - top
      };
    };
    this.setLoading = (loading) => {
      this._adapter.setLoading(loading);
    };
    this.handleWindowResize = () => {
      const {
        ratio,
        setRatio
      } = this.getProps();
      const {
        originImageWidth,
        originImageHeight
      } = this._adapter.getOriginImageSize();
      if (originImageWidth && originImageHeight) {
        if (ratio !== "adaptation") {
          setRatio("adaptation");
        } else {
          this.handleResizeImage();
        }
      }
    };
    this.handleLoad = (e) => {
      if (e.target) {
        const {
          width: w,
          height: h
        } = e.target;
        this._adapter.setOriginImageSize({
          originImageWidth: w,
          originImageHeight: h
        });
        this.setState({
          loading: false
        });
        this.handleResizeImage();
      }
      const {
        src,
        onLoad
      } = this.getProps();
      onLoad && onLoad(src);
    };
    this.handleError = (e) => {
      const {
        onError,
        src
      } = this.getProps();
      this.setState({
        loading: false
      });
      onError && onError(src);
    };
    this.handleResizeImage = () => {
      const horizontal = !this._isImageVertical();
      const {
        originImageWidth,
        originImageHeight
      } = this._adapter.getOriginImageSize();
      const imgWidth = horizontal ? originImageWidth : originImageHeight;
      const imgHeight = horizontal ? originImageHeight : originImageWidth;
      const {
        onZoom
      } = this.getProps();
      const containerDOM = this._adapter.getContainer();
      if (containerDOM) {
        const {
          width: containerWidth,
          height: containerHeight
        } = this._getContainerBounds();
        const reservedWidth = containerWidth - 80;
        const reservedHeight = containerHeight - 80;
        const _zoom = Number(Math.min(reservedWidth / imgWidth, reservedHeight / imgHeight).toFixed(2));
        onZoom(_zoom);
      }
    };
    this.handleRightClickImage = (e) => {
      const {
        disableDownload
      } = this.getProps();
      if (disableDownload) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      } else {
        return true;
      }
    };
    this.handleWheel = (e) => {
      this.onWheel(e);
      handlePrevent(e);
    };
    this.onWheel = (0, import_throttle.default)((e) => {
      const {
        onZoom,
        zoomStep,
        maxZoom,
        minZoom
      } = this.getProps();
      const {
        currZoom
      } = this.getStates();
      let _zoom;
      if (e.deltaY < 0) {
        if (currZoom + zoomStep <= maxZoom) {
          _zoom = Number((currZoom + zoomStep).toFixed(2));
        }
      } else if (e.deltaY > 0) {
        if (currZoom - zoomStep >= minZoom) {
          _zoom = Number((currZoom - zoomStep).toFixed(2));
        }
      }
      if (!(0, import_isUndefined.default)(_zoom)) {
        onZoom(_zoom);
      }
    }, 50);
    this.calcCanDragDirection = () => {
      const {
        width,
        height
      } = this.getStates();
      const {
        rotation
      } = this.getProps();
      const {
        width: containerWidth,
        height: containerHeight
      } = this._getContainerBounds();
      let canDragHorizontal = width > containerWidth;
      let canDragVertical = height > containerHeight;
      if (this._isImageVertical()) {
        canDragHorizontal = height > containerWidth;
        canDragVertical = width > containerHeight;
      }
      return {
        canDragVertical,
        canDragHorizontal
      };
    };
    this.handleZoomChange = (newZoom, e) => {
      const imageDOM = this._adapter.getImage();
      const {
        originImageWidth,
        originImageHeight
      } = this._adapter.getOriginImageSize();
      const {
        canDragVertical,
        canDragHorizontal
      } = this.calcCanDragDirection();
      const canDrag = canDragVertical || canDragHorizontal;
      const {
        width: containerWidth,
        height: containerHeight
      } = this._getContainerBounds();
      const newWidth = Math.floor(originImageWidth * newZoom);
      const newHeight = Math.floor(originImageHeight * newZoom);
      let _offset;
      const horizontal = !this._isImageVertical();
      let newTop = 0;
      let newLeft = 0;
      if (horizontal) {
        _offset = {
          x: 0.5 * (containerWidth - newWidth),
          y: 0.5 * (containerHeight - newHeight)
        };
        newLeft = _offset.x;
        newTop = _offset.y;
      } else {
        _offset = {
          x: 0.5 * (containerWidth - newHeight),
          y: 0.5 * (containerHeight - newWidth)
        };
        newLeft = _offset.x - (newWidth - newHeight) / 2;
        newTop = _offset.y + (newWidth - newHeight) / 2;
      }
      this.setState({
        width: newWidth,
        height: newHeight,
        offset: _offset,
        left: newLeft,
        top: newTop,
        currZoom: newZoom
      });
      if (imageDOM) {
        this._adapter.setImageCursor(canDrag);
      }
    };
    this.calcExtremeBounds = () => {
      const {
        width,
        height
      } = this.getStates();
      const {
        width: containerWidth,
        height: containerHeight
      } = this._getContainerBounds();
      let extremeLeft = containerWidth - width;
      let extremeTop = containerHeight - height;
      if (this._isImageVertical()) {
        extremeLeft = containerWidth - height;
        extremeTop = containerHeight - width;
      }
      return {
        left: extremeLeft,
        top: extremeTop
      };
    };
    this.handleMoveImage = (e) => {
      const {
        offset,
        width,
        height
      } = this.getStates();
      const startMouseMove = this._adapter.getMouseMove();
      const startMouseOffset = this._adapter.getMouseOffset();
      const {
        canDragVertical,
        canDragHorizontal
      } = this.calcCanDragDirection();
      if (startMouseMove && (canDragVertical || canDragHorizontal)) {
        const {
          clientX,
          clientY
        } = e;
        const {
          left: containerLeft,
          top: containerTop
        } = this._getContainerBounds();
        const {
          left: extremeLeft,
          top: extremeTop
        } = this.calcExtremeBounds();
        let newX = canDragHorizontal ? clientX - containerLeft - startMouseOffset.x : offset.x;
        let newY = canDragVertical ? clientY - containerTop - startMouseOffset.y : offset.y;
        if (canDragHorizontal) {
          newX = newX > 0 ? 0 : newX < extremeLeft ? extremeLeft : newX;
        }
        if (canDragVertical) {
          newY = newY > 0 ? 0 : newY < extremeTop ? extremeTop : newY;
        }
        const _offset = {
          x: newX,
          y: newY
        };
        this.setState({
          offset: _offset,
          left: this._isImageVertical() ? _offset.x - (width - height) / 2 : _offset.x,
          top: this._isImageVertical() ? _offset.y + (width - height) / 2 : _offset.y
        });
      }
    };
    this.handleImageMouseDown = (e) => {
      this._adapter.setStartMouseOffset(this._getOffset(e));
      this._adapter.setStartMouseMove(true);
    };
    this.handleImageMouseUp = () => {
      this._adapter.setStartMouseMove(false);
    };
  }
};
export {
  PreviewImageFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_image_previewImageFoundation.js.map
