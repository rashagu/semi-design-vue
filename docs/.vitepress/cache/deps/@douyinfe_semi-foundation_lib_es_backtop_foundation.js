import {
  Animation
} from "./chunk-MP5KU5H3.js";
import "./chunk-XADEZ2D6.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/backtop/foundation.js
var BackTopFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.scrollTo = (targetNode, from, to) => {
      const {
        duration
      } = this.getProps();
      this.animation = new Animation({
        from: {
          scrollTop: from
        },
        to: {
          scrollTop: to
        }
      }, {
        duration,
        easing: "easeInOutCubic"
      });
      this.animation.on("frame", (_ref) => {
        let {
          scrollTop
        } = _ref;
        this._adapter.targetScrollToTop(targetNode, scrollTop);
      });
      this.animation.start();
    };
    this.handleScroll = () => {
      const {
        target,
        visibilityHeight
      } = this.getProps();
      const targetNode = target();
      const update = () => {
        const scrollTop = this.getScroll(targetNode);
        this._adapter.updateVisible(scrollTop > visibilityHeight);
      };
      requestAnimationFrame(update);
    };
  }
  init() {
    const {
      target
    } = this.getProps();
    const targetNode = target();
    targetNode.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  }
  destroy() {
    const {
      target
    } = this.getProps();
    const targetNode = target();
    targetNode && targetNode.removeEventListener("scroll", this.handleScroll);
    this.animation && this.animation.destroy();
  }
  getScroll(target) {
    if (this._adapter.isWindowUndefined()) {
      return 0;
    }
    const prop = "pageYOffset";
    const method = "scrollTop";
    const isWindow = this._adapter.targetIsWindow(target);
    const scroll = isWindow ? target[prop] : target[method];
    return scroll;
  }
  setScrollTop(to) {
    const {
      target
    } = this.getProps();
    const targetNode = target();
    const from = this.getScroll(targetNode);
    this.scrollTo(targetNode, from, to);
  }
  onClick(e) {
    this.setScrollTop(0);
    this._adapter.notifyClick(e);
  }
};
export {
  BackTopFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_backtop_foundation.js.map
