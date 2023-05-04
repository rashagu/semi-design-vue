import {
  require_slice
} from "./chunk-6LLW4IZK.js";
import {
  require_find,
  require_findIndex
} from "./chunk-54E6H744.js";
import "./chunk-WUTYLADQ.js";
import "./chunk-4QI5OKLV.js";
import "./chunk-KOVH33RT.js";
import "./chunk-73AG7XXA.js";
import "./chunk-XKTW6BSF.js";
import "./chunk-PTHRDZX2.js";
import "./chunk-T3H7OANQ.js";
import "./chunk-UL7BHDH4.js";
import "./chunk-HC6MTSUY.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import "./chunk-OVLDI57Z.js";
import "./chunk-HOISZPJG.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-T6W56XAT.js";
import {
  append,
  prepend
} from "./chunk-OCJIPV4I.js";
import {
  isElement
} from "./chunk-AVGX6KRS.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
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
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/scrollList/itemFoundation.js
var import_findIndex = __toESM(require_findIndex());
var import_find = __toESM(require_find());
var import_slice = __toESM(require_slice());
var ItemFoundation = class extends foundation_default {
  constructor() {
    super(...arguments);
    this._cachedSelectedNode = null;
  }
  selectIndex(index, listWrapper) {
    const {
      type,
      list
    } = this.getProps();
    if (index > -1 && Array.isArray(list) && list.length && isElement(listWrapper)) {
      const indexInData = index % list.length;
      const item = list[indexInData];
      const node = listWrapper.children[index];
      this._adapter.setSelectedNode(node);
      this._adapter.notifySelectItem(Object.assign(Object.assign({}, item), {
        value: item.value,
        type,
        index: indexInData
      }));
    }
  }
  selectNode(node, listWrapper) {
    const {
      type,
      list: data
    } = this.getProps();
    if (isElement(node) && isElement(listWrapper)) {
      const indexInList = (0, import_findIndex.default)(listWrapper.children, (ele) => ele === node);
      const indexInData = indexInList % data.length;
      const cachedIndexInList = (0, import_findIndex.default)(listWrapper.children, (ele) => ele === this._cachedSelectedNode);
      const cachedIndexData = cachedIndexInList % data.length;
      const item = data[indexInData];
      this._adapter.setSelectedNode(node);
      this._adapter.scrollToCenter(node);
      if (this._cachedSelectedNode !== node) {
        this._cachedSelectedNode = node;
        if (cachedIndexData !== indexInData) {
          this._adapter.notifySelectItem(Object.assign(Object.assign({}, item), {
            value: item.value,
            type,
            index: indexInData
          }));
        }
      }
    }
  }
  /**
   *
   * @param {HTMLElement} listWrapper
   * @param {HTMLElement} scrollWrapper
   * @param {number} ratio
   * @returns {boolean}
   */
  shouldAppend(listWrapper, scrollWrapper) {
    let ratio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 2;
    const tag = "li";
    if (isElement(listWrapper) && isElement(scrollWrapper)) {
      const itemNodes = listWrapper.querySelectorAll(tag);
      const lastNode = itemNodes[itemNodes.length - 1];
      const {
        list
      } = this.getProps();
      if (lastNode) {
        const scrollRect = scrollWrapper.getBoundingClientRect();
        const lastRect = lastNode.getBoundingClientRect();
        const listHeight = lastRect.height * list.length;
        let baseTop = lastRect.top;
        let count = 0;
        while (baseTop <= scrollRect.top + scrollRect.height * ratio) {
          count += 1;
          baseTop += listHeight;
        }
        return count;
      }
    }
    return false;
  }
  /**
   *
   * @param {HTMLElement} listWrapper
   * @param {HTMLElement} scrollWrapper
   * @param {number} ratio
   *
   * @returns {boolean}
   */
  shouldPrepend(listWrapper, scrollWrapper) {
    let ratio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 2;
    const tag = "li";
    if (isElement(listWrapper) && isElement(scrollWrapper)) {
      const itemNodes = listWrapper.querySelectorAll(tag);
      const firstNode = itemNodes[0];
      const {
        list
      } = this.getProps();
      if (firstNode) {
        const scrollRect = scrollWrapper.getBoundingClientRect();
        const firstRect = firstNode.getBoundingClientRect();
        const listHeight = firstRect.height * list.length;
        let baseTop = firstRect.top;
        let count = 0;
        while (baseTop + firstRect.height >= scrollRect.top - scrollRect.height * ratio) {
          count += 1;
          baseTop -= listHeight;
        }
        return count;
      }
    }
    return 0;
  }
  /**
   *
   * @param {HTMLElement} listWrapper
   * @param {HTMLElement} wrapper
   * @param {Function} [callback]
   */
  initWheelList(listWrapper, wrapper, callback) {
    const {
      list
    } = this.getProps();
    if (isElement(wrapper) && isElement(listWrapper) && list && list.length) {
      const allNodes = listWrapper.children;
      const baseNodes = (0, import_slice.default)(allNodes, 0, list.length);
      const prependCount = this.shouldPrepend(listWrapper, wrapper);
      const appendCount = this.shouldAppend(listWrapper, wrapper);
      this._adapter.setState({
        prependCount,
        appendCount
      }, callback);
    }
  }
  /**
   *
   * @param {HTMLElement} listWrapper
   * @param {HTMLElement} wrapper
   * @param {HTMLElement} [nearestNode]
   */
  adjustInfiniteList(listWrapper, wrapper, nearestNode) {
    const {
      list
    } = this.getProps();
    const nodeTag = "li";
    if (isElement(wrapper) && isElement(listWrapper) && list && list.length) {
      const allNodes = listWrapper.querySelectorAll(nodeTag);
      const total = allNodes.length;
      const ratio = 1;
      const prependCount = this.shouldPrepend(listWrapper, wrapper, ratio);
      const appendCount = this.shouldAppend(listWrapper, wrapper, ratio);
      if (prependCount) {
        for (let i = 0; i < prependCount; i++) {
          const nodes = (0, import_slice.default)(allNodes, total - list.length * (i + 1), total - list.length * i);
          prepend(listWrapper, ...nodes);
        }
      }
      if (appendCount) {
        for (let i = 0; i < appendCount; i++) {
          const nodes = (0, import_slice.default)(allNodes, i * list.length, (i + 1) * list.length);
          append(listWrapper, ...nodes);
        }
      }
    }
  }
  /**
   *
   * @param {HTMLElement} listWrapper
   * @param {HTMLElement} selector
   *
   */
  getNearestNodeInfo(listWrapper, selector) {
    if (isElement(listWrapper) && isElement(selector)) {
      const selectorRect = selector.getBoundingClientRect();
      const selectorTop = selectorRect.top;
      const itemNodes = listWrapper.querySelectorAll("li");
      let nearestNode = null;
      let nearestIndex = -1;
      let nearestDistance = Infinity;
      Array.from(itemNodes).map((node, index) => {
        const rect = node.getBoundingClientRect();
        const rectTop = rect.top;
        const absDistance = Math.abs(rectTop - selectorTop);
        if (absDistance < nearestDistance && !this._adapter.isDisabledIndex(index)) {
          nearestDistance = absDistance;
          nearestNode = node;
          nearestIndex = index;
        }
      });
      return {
        nearestNode,
        nearestIndex
      };
    }
    return void 0;
  }
  /**
   *
   * @param {HTMLElement} listWrapper
   *
   * @param {HTMLElement|null}
   */
  getTargetNode(e, listWrapper) {
    if (e && isElement(listWrapper)) {
      const targetTagName = "li";
      const currentTarget = e.target;
      const itemNodes = listWrapper.querySelectorAll(targetTagName);
      const list = this.getProp("list");
      const length = Array.isArray(list) ? list.length : 0;
      let targetIndex = -1;
      let indexInList = -1;
      let infoInList = null;
      const targetNode = (0, import_find.default)(itemNodes, (node, index) => {
        if (node === currentTarget || node.contains(currentTarget)) {
          targetIndex = index;
          if (length > 0) {
            indexInList = index % length;
          }
          return true;
        }
        return void 0;
      });
      if (indexInList > -1) {
        infoInList = list[indexInList];
      }
      return {
        targetNode,
        targetIndex,
        indexInList,
        infoInList
      };
    }
    return null;
  }
};
export {
  ItemFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_scrollList_itemFoundation.js.map
