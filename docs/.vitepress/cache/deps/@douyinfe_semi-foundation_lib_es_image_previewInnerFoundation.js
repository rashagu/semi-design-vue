import {
  keyCode_default
} from "./chunk-C3N6TMV6.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/image/utils.js
var isTargetEmit = (event, targetClasses) => {
  const path = event === null || event === void 0 ? void 0 : event.composedPath();
  const isTarget = path === null || path === void 0 ? void 0 : path.slice(0, path.length - 4).some((node) => {
    if (node.className && typeof node.className === "string") {
      return targetClasses.some((c) => node.className.includes(c));
    }
    return false;
  });
  return isTarget;
};
var downloadImage = (src, filename) => {
  const image = new Image();
  image.src = src;
  image.crossOrigin = "anonymous";
  image.onload = (e) => {
    const eleLink = document.createElement("a");
    eleLink.download = filename;
    eleLink.style.display = "none";
    eleLink.download = filename;
    eleLink.href = src;
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    eleLink.href = canvas.toDataURL("image/jpeg");
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  };
};
var crossMerge = function() {
  let leftArr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  let rightArr = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  let newArr = [];
  const leftLen = leftArr.length;
  const rightLen = rightArr.length;
  const crossLength = leftLen <= rightLen ? leftLen : rightLen;
  new Array(crossLength).fill(0).forEach((item, index) => {
    newArr.push(rightArr[index]);
    newArr.push(leftArr[index]);
  });
  if (leftLen > rightLen) {
    newArr = newArr.concat(leftArr.slice(rightLen, leftLen));
  } else if (leftLen < rightLen) {
    newArr = newArr.concat(rightArr.slice(leftLen, rightLen));
  }
  return newArr;
};
var getPreloadImagArr = (imgSrc, currentIndex, preLoadGap, infinite) => {
  const beginIndex = currentIndex - preLoadGap;
  const endIndex = currentIndex + preLoadGap;
  const srcLength = imgSrc.length;
  let leftArr = [];
  let rightArr = [];
  if (preLoadGap >= Math.floor(srcLength / 2)) {
    if (infinite) {
      leftArr = imgSrc.concat(imgSrc).slice(beginIndex + srcLength < 0 ? 0 : beginIndex + srcLength, currentIndex + srcLength);
      rightArr = imgSrc.concat(imgSrc).slice(currentIndex + 1, endIndex + 1 < 2 * srcLength ? endIndex + 1 : 2 * srcLength);
    } else {
      leftArr = imgSrc.slice(0, currentIndex);
      rightArr = imgSrc.slice(currentIndex + 1, srcLength);
    }
  } else {
    if (infinite) {
      leftArr = imgSrc.concat(imgSrc).slice(beginIndex + srcLength, currentIndex + srcLength);
      rightArr = imgSrc.concat(imgSrc).slice(currentIndex + 1, endIndex + 1);
    } else {
      if (beginIndex >= 0 && endIndex < srcLength) {
        leftArr = imgSrc.slice(beginIndex, currentIndex);
        rightArr = imgSrc.slice(currentIndex + 1, endIndex + 1);
      } else if (beginIndex < 0) {
        leftArr = imgSrc.slice(0, currentIndex);
        rightArr = imgSrc.slice(currentIndex + 1, 2 * preLoadGap + 1);
      } else {
        rightArr = imgSrc.slice(currentIndex + 1, srcLength);
        leftArr = imgSrc.slice(srcLength - 2 * preLoadGap - 1, currentIndex);
      }
    }
  }
  const result = crossMerge(leftArr.reverse(), rightArr);
  const duplicateResult = Array.from(new Set(result));
  return duplicateResult;
};

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/image/previewInnerFoundation.js
var NOT_CLOSE_TARGETS = ["icon", "footer"];
var STOP_CLOSE_TARGET = ["icon", "footer", "header"];
var PreviewInnerFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleViewVisibleChange = () => {
      const nowTime = (/* @__PURE__ */ new Date()).getTime();
      const mouseActiveTime = this._adapter.getMouseActiveTime();
      const stopTiming = this._adapter.getStopTiming();
      const {
        viewerVisibleDelay
      } = this.getProps();
      const {
        viewerVisible
      } = this.getStates();
      if (nowTime - mouseActiveTime > viewerVisibleDelay && !stopTiming) {
        viewerVisible && this.setState({
          viewerVisible: false
        });
      }
    };
    this.handleMouseMoveEvent = (e, event) => {
      const isTarget = isTargetEmit(e, STOP_CLOSE_TARGET);
      if (isTarget && event === "over") {
        this._adapter.setStopTiming(true);
      } else if (isTarget && event === "out") {
        this._adapter.setStopTiming(false);
      }
    };
    this.handleMouseMove = (e) => {
      this._adapter.setMouseActiveTime((/* @__PURE__ */ new Date()).getTime());
      this.setState({
        viewerVisible: true
      });
    };
    this.handleMouseUp = (e) => {
      const {
        maskClosable
      } = this.getProps();
      let couldClose = !isTargetEmit(e, NOT_CLOSE_TARGETS);
      const {
        clientX,
        clientY
      } = e;
      const {
        x,
        y
      } = this._adapter.getStartMouseDown();
      if (Math.abs(clientX - x) > 5 || Math.abs(y - clientY) > 5) {
        couldClose = false;
      }
      if (couldClose && maskClosable) {
        this.handlePreviewClose();
      }
    };
    this.handleMouseDown = (e) => {
      const {
        clientX,
        clientY
      } = e;
      this._adapter.setStartMouseDown(clientX, clientY);
    };
    this.handleKeyDown = (e) => {
      const {
        closeOnEsc
      } = this.getProps();
      if (closeOnEsc && e.keyCode === keyCode_default.ESC) {
        e.stopPropagation();
        this._adapter.notifyVisibleChange(false);
        this._adapter.notifyClose();
        return;
      }
    };
    this.handleSwitchImage = (direction) => {
      const step = direction === "prev" ? -1 : 1;
      const {
        imgSrc,
        currentIndex: currentIndexInState
      } = this.getStates();
      const srcLength = imgSrc.length;
      const newIndex = (currentIndexInState + step + srcLength) % srcLength;
      if ("currentIndex" in this.getProps()) {
        if (this._adapter.getIsInGroup()) {
          const setCurrentIndex = this._adapter.getContext("setCurrentIndex");
          setCurrentIndex(newIndex);
        }
      } else {
        this.setState({
          currentIndex: newIndex
        });
      }
      this._adapter.notifyChange(newIndex, direction);
      this.setState({
        direction,
        rotation: 0
      });
      this._adapter.notifyRotateChange(0);
    };
    this.handleDownload = () => {
      const {
        currentIndex,
        imgSrc
      } = this.getStates();
      const downloadSrc = imgSrc[currentIndex];
      const downloadName = downloadSrc.slice(downloadSrc.lastIndexOf("/") + 1);
      downloadImage(downloadSrc, downloadName);
      this._adapter.notifyDownload(downloadSrc, currentIndex);
    };
    this.handlePreviewClose = () => {
      this._adapter.notifyVisibleChange(false);
      this._adapter.notifyClose();
    };
    this.handleAdjustRatio = (type) => {
      this.setState({
        ratio: type
      });
      this._adapter.notifyRatioChange(type);
    };
    this.handleRotateImage = (direction) => {
      const {
        rotation
      } = this.getStates();
      const newRotation = rotation + (direction === "left" ? 90 : -90);
      this.setState({
        rotation: newRotation
      });
      this._adapter.notifyRotateChange(newRotation);
    };
    this.handleZoomImage = (newZoom) => {
      const {
        zoom
      } = this.getStates();
      this._adapter.notifyZoom(newZoom, newZoom > zoom);
      this.setState({
        zoom: newZoom
      });
    };
    this.preloadGapImage = () => {
      const {
        preLoad,
        preLoadGap,
        infinite,
        currentIndex
      } = this.getProps();
      const {
        imgSrc
      } = this.getStates();
      if (!preLoad || typeof preLoadGap !== "number" || preLoadGap < 1) {
        return;
      }
      const preloadImages = getPreloadImagArr(imgSrc, currentIndex, preLoadGap, infinite);
      const Img = new Image();
      let index = 0;
      function callback(e) {
        index++;
        if (index < preloadImages.length) {
          Img.src = preloadImages[index];
        }
      }
      Img.onload = (e) => {
        this.setLoadSuccessStatus(Img.src);
        callback(e);
      };
      Img.onerror = callback;
      Img.src = preloadImages[0];
    };
    this.preloadSingleImage = () => {
      const {
        preLoad,
        preLoadGap,
        infinite
      } = this.getProps();
      const {
        imgSrc,
        currentIndex,
        direction,
        imgLoadStatus
      } = this.getStates();
      if (!preLoad || typeof preLoadGap !== "number" || preLoadGap < 1) {
        return;
      }
      let preloadIndex = currentIndex + (direction === "prev" ? -1 : 1) * preLoadGap;
      if (preloadIndex < 0 || preloadIndex >= imgSrc.length) {
        if (infinite) {
          preloadIndex = (preloadIndex + imgSrc.length) % imgSrc.length;
        } else {
          return;
        }
      }
      if (!imgLoadStatus[preloadIndex]) {
        const Img = new Image();
        Img.onload = (e) => {
          this.setLoadSuccessStatus(imgSrc[preloadIndex]);
        };
        Img.src = imgSrc[preloadIndex];
      }
    };
    this.setLoadSuccessStatus = (src) => {
      const {
        imgLoadStatus
      } = this.getStates();
      const status = Object.assign({}, imgLoadStatus);
      status[src] = true;
      this.setState({
        imgLoadStatus: status
      });
    };
    this.onImageLoad = (src) => {
      const {
        preloadAfterVisibleChange
      } = this.getStates();
      this.setLoadSuccessStatus(src);
      if (preloadAfterVisibleChange) {
        this.preloadGapImage();
        this.setState({
          preloadAfterVisibleChange: false
        });
      } else {
        this.preloadSingleImage();
      }
    };
  }
  beforeShow() {
    this._adapter.registerKeyDownListener();
    this._adapter.disabledBodyScroll();
  }
  afterHide() {
    this._adapter.unregisterKeyDownListener();
    this._adapter.enabledBodyScroll();
  }
};
export {
  PreviewInnerFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_image_previewInnerFoundation.js.map
