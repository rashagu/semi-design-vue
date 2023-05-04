import {
  es_default
} from "./chunk-4XINBWPD.js";
import {
  cssClasses
} from "./chunk-6JUZ4RAE.js";
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
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/anchor/foundation.js
var import_get = __toESM(require_get());
var import_isArray = __toESM(require_isArray());
var prefixCls = cssClasses.PREFIX;
var AnchorFoundation = class extends foundation_default {
  constructor(adapter) {
    var _this;
    super(Object.assign(Object.assign({}, AnchorFoundation.defaultAdapter), adapter));
    _this = this;
    this.init = () => {
    };
    this.destroy = () => {
    };
    this.addLink = (link) => {
      this._adapter.addLink(link);
    };
    this.removeLink = (link) => {
      this._adapter.removeLink(link);
    };
    this.setActiveLink = function(link, prevLink) {
      let shouldNotify = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      const activeLink = _this._adapter.getState("activeLink");
      const onChange = _this._adapter.getProp("onChange");
      if (activeLink !== link) {
        _this._adapter.setActiveLink(link, _this._setActiveSlide);
        if (onChange && shouldNotify) {
          _this._adapter.notifyChange(link, prevLink);
        }
      }
    };
    this.setScrollHeight = () => {
      const anchorWrapper = `.${prefixCls}-link-wrapper`;
      const anchorNode = this._adapter.getAnchorNode(anchorWrapper);
      if (anchorNode) {
        const scrollHeight = `${anchorNode.scrollHeight}px`;
        this._adapter.setScrollHeight(scrollHeight);
      }
    };
    this.updateScrollHeight = (prevState, state) => {
      const prevLinks = prevState.links.join("");
      const links = state.links.join("");
      if (prevLinks !== links) {
        this.setScrollHeight();
      }
    };
    this.setChildMap = () => {
      const children = this._adapter.getProp("children");
      const childMap = {};
      if ((0, import_isArray.default)(children)) {
        for (const link of children) {
          this._getLinkToMap(link, [], childMap);
        }
      } else {
        this._getLinkToMap(children, [], childMap);
      }
      this._adapter.setChildMap(childMap);
    };
    this.updateChildMap = (prevState, state) => {
      const prevLinks = prevState.links.join("");
      const links = state.links.join("");
      if (prevLinks !== links) {
        this.setChildMap();
      }
    };
    this.getLinksTop = () => this._adapter.getLinksBoundingTop();
    this.handleScroll = () => {
      const {
        clickLink,
        links,
        activeLink: prevActiveLink
      } = this.getStates();
      if (clickLink) {
        return;
      }
      const elTop = this.getLinksTop();
      let lastNegative = -Infinity;
      let lastNegativeIndex = -1;
      for (let i = 0; i < elTop.length; i++) {
        if (elTop[i] < 0 && elTop[i] > lastNegative) {
          lastNegative = elTop[i];
          lastNegativeIndex = i;
        }
      }
      const activeLink = links[lastNegativeIndex];
      this.setActiveLink(activeLink, prevActiveLink);
    };
    this.handleClick = function(e, link) {
      let shouldNotify = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      const destNode = _this._adapter.getContentNode(link);
      const prevLink = _this._adapter.getState("activeLink");
      _this.setActiveLink(link, prevLink, shouldNotify);
      if (destNode) {
        try {
          _this._adapter.setClickLinkWithCallBack(true, link, _this._scrollIntoView);
        } catch (error) {
        }
      }
      shouldNotify && _this._adapter.notifyClick(e, link);
    };
    this.handleClickLink = () => {
      this._adapter.setClickLink(false);
    };
    this._getLinkToMap = (link, parents, linkMap) => {
      const node = link && link.props;
      if (!node || !node.href) {
        return;
      }
      if (!(node.href in linkMap)) {
        linkMap[node.href] = /* @__PURE__ */ new Set();
      }
      for (const parent of parents) {
        linkMap[parent].add(node.href);
      }
      if (node.children && node.children.length) {
        parents.push(node.href);
        for (const child of node.children) {
          this._getLinkToMap(child, parents, linkMap);
        }
        parents.pop();
      }
    };
    this._scrollIntoView = (link) => {
      const {
        scrollMotion,
        targetOffset
      } = this.getProps();
      const behavior = scrollMotion ? "smooth" : "auto";
      const canSmoothScroll = this._adapter.canSmoothScroll();
      if (link) {
        const destNode = this._adapter.getContentNode(link);
        const scrollOpts = {
          /**
           * Behavior defines scrolling behavior
           *  - Optional'auto '|' smooth '| Function
           *  - Function Custom scrolling behavior
           *    - Enter parameters as actions, each action contains an element that should be scrolled
           *    - Actions include scrolling containers to the outermost scrollable container (document.body), the scrollable capacity needs to meet
           *      1. The parent of the scroll container (directly or indirectly)
           *      2. There is a scroll axis (clientHeight < scrollHeight | | clientWidth < scrollWidth)
           *      3.overflowX or overflowY has a value and is not visible or clip
           *       For details, please see https://github.com/stipsan/compute-scroll-into-view
           *
           * behavior定义滚动行为
           *  - 可选 'auto' | 'smooth' | Function
           *  - Function 自定义滚动行为
           *    - 入参为 actions，每个action包含一个应该滚动的元素
           *    - actions包括滚动容器到最外层的可滚动容器（document.body），可滚动容需满足
           *      1. 滚动容器的父级（直接或间接）
           *      2. 有滚动轴（clientHeight < scrollHeight || clientWidth < scrollWidth）
           *      3. overflowX 或 overflowY 有值且不为 visible 或 clip
           *      详情请看https://github.com/stipsan/compute-scroll-into-view
           */
          behavior: (actions) => {
            const innermostAction = (0, import_get.default)(actions, "0");
            const el = (0, import_get.default)(innermostAction, "el");
            const top = (0, import_get.default)(innermostAction, "top");
            if (el) {
              const offsetTop = top - targetOffset;
              if (el.scroll && canSmoothScroll) {
                el.scroll({
                  top: offsetTop,
                  behavior
                });
              } else {
                el.scrollTop = offsetTop;
              }
            }
          },
          block: "start"
        };
        if (destNode) {
          es_default(destNode, scrollOpts);
        }
      }
    };
    this._setActiveSlide = () => {
      const activeClass = `.${cssClasses.PREFIX}-link-title-active`;
      const linkNode = this._adapter.getAnchorNode(activeClass);
      if (linkNode) {
        const height = linkNode.offsetTop;
        this._adapter.setSlideBarTop(height);
      }
    };
  }
};
export {
  AnchorFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_anchor_foundation.js.map
