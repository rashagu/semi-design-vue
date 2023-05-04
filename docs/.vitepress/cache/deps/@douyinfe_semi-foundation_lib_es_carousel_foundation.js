import {
  numbers
} from "./chunk-I623434A.js";
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
import {
  require_isObject
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/carousel/foundation.js
var import_get = __toESM(require_get());
var import_isObject = __toESM(require_isObject());
var CarouselFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this._interval = null;
    this._forcePlay = false;
  }
  setForcePlay(forcePlay) {
    this._forcePlay = forcePlay;
  }
  play(interval) {
    if (this._interval) {
      clearInterval(this._interval);
    }
    this._interval = setInterval(() => {
      this.next();
    }, interval);
  }
  stop() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }
  goTo(activeIndex) {
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    const targetIndex = this.getValidIndex(activeIndex);
    this._adapter.setIsReverse(stateActiveIndex > targetIndex);
    if (this.getIsControlledComponent()) {
      this._notifyChange(targetIndex);
    } else {
      this._notifyChange(targetIndex);
      this.handleNewActiveIndex(targetIndex);
    }
  }
  next() {
    this.stop();
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    const targetIndex = this.getValidIndex(stateActiveIndex + 1);
    this._adapter.setIsReverse(false);
    if (this.getIsControlledComponent()) {
      this._notifyChange(targetIndex);
    } else {
      this._notifyChange(targetIndex);
      this.handleNewActiveIndex(targetIndex);
    }
    this.handleAutoPlay();
  }
  prev() {
    this.stop();
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    const targetIndex = this.getValidIndex(stateActiveIndex - 1);
    this._adapter.setIsReverse(true);
    if (this.getIsControlledComponent()) {
      this._notifyChange(targetIndex);
    } else {
      this._notifyChange(targetIndex);
      this.handleNewActiveIndex(targetIndex);
    }
    this.handleAutoPlay();
  }
  destroy() {
    this._unregisterInterval();
  }
  _unregisterInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _notifyChange(activeIndex) {
    const {
      activeIndex: stateActiveIndex,
      isInit
    } = this.getStates();
    if (isInit) {
      this._adapter.setIsInit(false);
    }
    if (stateActiveIndex !== activeIndex) {
      this._adapter.setPreActiveIndex(stateActiveIndex);
      this._adapter.notifyChange(activeIndex, stateActiveIndex);
    }
  }
  getValidIndex(index) {
    const {
      children
    } = this.getStates();
    return (index + children.length) % children.length;
  }
  getSwitchingTime() {
    const {
      autoPlay,
      speed
    } = this.getProps();
    const autoPlayType = typeof autoPlay;
    if (autoPlayType === "boolean") {
      return numbers.DEFAULT_INTERVAL + speed;
    }
    if ((0, import_isObject.default)(autoPlay)) {
      return (0, import_get.default)(autoPlay, "interval", numbers.DEFAULT_INTERVAL) + speed;
    }
    return speed;
  }
  getIsControlledComponent() {
    return this._isInProps("activeIndex");
  }
  handleAutoPlay() {
    const {
      autoPlay
    } = this.getProps();
    const autoPlayType = typeof autoPlay;
    if (autoPlayType === "boolean" && autoPlay || (0, import_isObject.default)(autoPlay) || this._forcePlay) {
      this.play(this.getSwitchingTime());
    }
  }
  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      this.prev();
    }
    if (event.key === "ArrowRight") {
      this.next();
    }
  }
  onIndicatorChange(activeIndex) {
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    this._adapter.setIsReverse(stateActiveIndex > activeIndex);
    this._notifyChange(activeIndex);
    if (!this.getIsControlledComponent()) {
      this.handleNewActiveIndex(activeIndex);
    }
  }
  handleNewActiveIndex(activeIndex) {
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    if (stateActiveIndex !== activeIndex) {
      this._adapter.setNewActiveIndex(activeIndex);
    }
  }
  getDefaultActiveIndex() {
    let activeIndex;
    const props = this.getProps();
    if ("activeIndex" in props) {
      activeIndex = props.activeIndex;
    } else if ("defaultActiveIndex" in props) {
      activeIndex = props.defaultActiveIndex;
    }
    return activeIndex;
  }
};
var foundation_default2 = CarouselFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_carousel_foundation.js.map
