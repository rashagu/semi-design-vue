import {
  numbers
} from "./chunk-L3K56BPU.js";
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
import "./chunk-WCAXN4E7.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/pagination/foundation.js
var PaginationFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    const {
      currentPage,
      total,
      pageSize
    } = this.getStates();
    this._updateDisabled({
      currentPage,
      total,
      pageSize
    });
    this._updatePageList({
      currentPage,
      total,
      pageSize
    });
    this._registerEventHandler();
  }
  destroy() {
    this._unregisterEventHandler();
  }
  _registerEventHandler() {
    this._adapter.registerKeyDownHandler(this.handleKeyDown);
  }
  _unregisterEventHandler() {
    this._adapter.unregisterKeyDownHandler(this.handleKeyDown);
  }
  _updateDisabled(pageInfo) {
    const {
      currentPage,
      total,
      pageSize
    } = pageInfo;
    const totalPageNum = this._getTotalPageNumber(total, pageSize);
    let prevIsDisabled = false;
    let nextIsDisabled = false;
    if (currentPage === 1) {
      prevIsDisabled = true;
      nextIsDisabled = totalPageNum < 2;
    } else if (currentPage === totalPageNum) {
      prevIsDisabled = false;
      nextIsDisabled = true;
    }
    this._adapter.setDisabled(prevIsDisabled, nextIsDisabled);
  }
  goPage(targetPageIndex) {
    if (targetPageIndex === "...") {
      return;
    }
    const {
      pageSize,
      currentPage
    } = this.getStates();
    const isControlComponent = this._isInProps("currentPage");
    if (targetPageIndex === currentPage) {
      return;
    }
    if (!isControlComponent) {
      this.updatePage(targetPageIndex);
      this._adapter.notifyPageChange(targetPageIndex);
      this._adapter.notifyChange(targetPageIndex, pageSize);
    } else {
      this._adapter.notifyPageChange(targetPageIndex);
      this._adapter.notifyChange(targetPageIndex, pageSize);
    }
  }
  updatePage() {
    let targetPageIndex = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
    let total = arguments.length > 1 ? arguments[1] : void 0;
    let pageSize = arguments.length > 2 ? arguments[2] : void 0;
    if (total === null || typeof total === "undefined") {
      total = this.getState("total");
    }
    if (pageSize === null || typeof pageSize === "undefined") {
      pageSize = this.getState("pageSize");
    }
    this._updateDisabled({
      currentPage: targetPageIndex,
      total,
      pageSize
    });
    this._updatePageList({
      currentPage: targetPageIndex,
      total,
      pageSize
    });
    this._adapter.updateTotal(total);
    this._adapter.setCurrentPage(targetPageIndex);
    this._adapter.updatePageSize(pageSize);
  }
  goPrev() {
    const {
      currentPage
    } = this.getStates();
    if (currentPage > 1) {
      this.goPage(currentPage - 1);
    }
  }
  goNext() {
    const {
      currentPage,
      total,
      pageSize
    } = this.getStates();
    const totalPageNum = this._getTotalPageNumber(total, pageSize);
    if (currentPage <= totalPageNum - 1) {
      this.goPage(currentPage + 1);
    }
  }
  _updatePageList(pageListInfo) {
    const {
      currentPage,
      total,
      pageSize
    } = pageListInfo;
    let pageList = [];
    let restLeftPageList = [];
    let restRightPageList = [];
    const totalPageNum = this._getTotalPageNumber(total, pageSize);
    const {
      PAGE_SHOW_MAX,
      REST_PAGE_MAX_SIZE
    } = numbers;
    if (totalPageNum <= PAGE_SHOW_MAX) {
      pageList = Array.from({
        length: totalPageNum
      }, (v, i) => i + 1);
      restLeftPageList = [];
      restRightPageList = [];
    } else {
      switch (true) {
        case currentPage < 4:
          pageList = [1, 2, 3, 4, "...", totalPageNum - 1, totalPageNum];
          restRightPageList = Array.from({
            length: Math.min(totalPageNum - 6, REST_PAGE_MAX_SIZE)
          }, (v, i) => i + 5);
          restLeftPageList = [];
          break;
        case currentPage === 4:
          pageList = [1, 2, 3, 4, 5, "...", totalPageNum];
          restRightPageList = Array.from({
            length: Math.min(totalPageNum - 6, REST_PAGE_MAX_SIZE)
          }, (v, i) => i + 6);
          restLeftPageList = [];
          break;
        case (4 < currentPage && currentPage < totalPageNum - 3):
          const middle = Array.from({
            length: 3
          }, (v, i) => currentPage + (i - 1));
          pageList = [1].concat("...", middle, "...", totalPageNum);
          restRightPageList = Array.from({
            length: Math.min(totalPageNum - currentPage - 2, REST_PAGE_MAX_SIZE)
          }, (v, i) => currentPage + i + 2);
          restLeftPageList = Array.from({
            length: Math.min(currentPage - 3, REST_PAGE_MAX_SIZE)
          }, (v, i) => i + 2);
          break;
        case (currentPage - 3 <= currentPage && currentPage <= totalPageNum):
          const right = Array.from({
            length: 5
          }, (v, i) => totalPageNum - (4 - i));
          pageList = [1, "..."].concat(right);
          restRightPageList = [];
          restLeftPageList = Array.from({
            length: Math.min(right[0] - 2, REST_PAGE_MAX_SIZE)
          }, (v, i) => i + 2);
          break;
        default:
          break;
      }
    }
    this._adapter.setPageList({
      pageList,
      restLeftPageList,
      restRightPageList
    });
  }
  changePageSize(newPageSize) {
    const {
      pageSize
    } = this.getStates();
    this._adapter.updatePageSize(newPageSize);
    this._adapter.notifyPageSizeChange(newPageSize);
    const {
      total,
      currentPage
    } = this.getStates();
    const currentPageFirstItemIndex = (currentPage - 1) * pageSize + 1;
    const newCurrentPage = Math.ceil(currentPageFirstItemIndex / newPageSize);
    this.updatePage(newCurrentPage, total, newPageSize);
    if (currentPage !== newCurrentPage) {
      this._adapter.notifyPageChange(newCurrentPage);
    }
    this._adapter.notifyChange(newCurrentPage, newPageSize);
  }
  // TODO handle tab/enter events
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleKeyDown() {
  }
  // If pageSize is not in the Opts array, insert it
  pageSizeInOpts() {
    const {
      pageSizeOpts
    } = this.getProps();
    const {
      pageSize
    } = this.getStates();
    const newPageSizeOpts = [...pageSizeOpts];
    if (newPageSizeOpts.indexOf(pageSize) === -1) {
      const firstLargerIndex = newPageSizeOpts.findIndex((el) => el > pageSize);
      newPageSizeOpts.splice(firstLargerIndex, 0, pageSize);
    }
    return newPageSizeOpts;
  }
  handleQuickJumpNumberChange(targetPage) {
    this._adapter.updateQuickJumpPage(targetPage);
  }
  _handleQuickJump(quickJumpPage) {
    let page = Number(quickJumpPage);
    const {
      pageSize,
      total
    } = this.getStates();
    const totalPageNum = this._getTotalPageNumber(total, pageSize);
    if (Number.isNaN(page)) {
      return;
    }
    if (page > totalPageNum) {
      page = totalPageNum;
    }
    if (page <= 0) {
      page = 1;
    }
    this._adapter.updateQuickJumpPage("");
    this.goPage(page);
  }
  handleQuickJumpBlur() {
    const {
      quickJumpPage
    } = this.getStates();
    if (typeof quickJumpPage === "string" && quickJumpPage || typeof quickJumpPage === "number") {
      this._handleQuickJump(quickJumpPage);
    }
  }
  handleQuickJumpEnterPress(targetPage) {
    this._handleQuickJump(targetPage);
  }
  _getTotalPageNumber(total, pageSize) {
    const totalPageNum = Math.ceil(total / pageSize);
    return totalPageNum;
  }
};
var foundation_default2 = PaginationFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_pagination_foundation.js.map
