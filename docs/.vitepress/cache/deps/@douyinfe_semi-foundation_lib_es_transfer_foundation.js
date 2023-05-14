import {
  _generateGroupedData,
  _generateTreeData
} from "./chunk-FQKTV5T4.js";
import {
  strings
} from "./chunk-R6JD7T2E.js";
import {
  require_omit
} from "./chunk-7P6IIOLF.js";
import "./chunk-ZYO65OIS.js";
import "./chunk-AOQAQYP4.js";
import "./chunk-4QI5OKLV.js";
import {
  arrayMove
} from "./chunk-E433P6Y7.js";
import "./chunk-XNEVMICD.js";
import "./chunk-GQLLYC3E.js";
import "./chunk-RFWJA27S.js";
import "./chunk-D6QY5MM6.js";
import "./chunk-UTEL65GX.js";
import "./chunk-VS2OXD4D.js";
import "./chunk-IGKIE6XV.js";
import "./chunk-CUWPCCUM.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-XXFWUEYP.js";
import "./chunk-RZZPN2AN.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
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
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/transfer/foundation.js
var import_omit = __toESM(require_omit());
var TransferFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  _generateGroupedData(dataSource) {
    return _generateGroupedData(dataSource);
  }
  _generateTreeData(dataSource) {
    return _generateTreeData(dataSource);
  }
  _generatePath(item) {
    const {
      path = []
    } = item;
    return path.map((p) => p.label).join(" > ");
  }
  handleInputChange(inputVal, notify) {
    const {
      data
    } = this.getStates();
    const {
      filter,
      type
    } = this.getProps();
    if (type === strings.TYPE_TREE_TO_LIST) {
      const searchResult2 = new Set(data.map((item) => item.key));
      this._adapter.searchTree(inputVal);
      notify && this._adapter.notifySearch(inputVal);
      this._adapter.updateInput(inputVal);
      this._adapter.updateSearchResult(searchResult2);
      return;
    }
    const filterFunc = typeof filter === "function" ? (item) => filter(inputVal, item) : (item) => typeof item.label === "string" && item.label.includes(inputVal);
    const searchData = data.filter(filterFunc);
    const searchResult = new Set(searchData.map((item) => item.key));
    notify && this._adapter.notifySearch(inputVal);
    this._adapter.updateInput(inputVal);
    this._adapter.updateSearchResult(searchResult);
  }
  // Select or cancel all unhidden items
  handleAll(wantAllChecked) {
    const {
      disabled,
      type
    } = this.getProps();
    const {
      selectedItems,
      data,
      searchResult,
      inputValue
    } = this.getStates();
    if (disabled) {
      return;
    }
    const inSearchMode = inputValue !== "";
    let operateData = [];
    operateData = inSearchMode ? data.filter((item) => searchResult.has(item.key)) : data;
    operateData = type === strings.TYPE_TREE_TO_LIST ? data : operateData;
    let newSelectedItems = /* @__PURE__ */ new Map();
    switch (true) {
      case !wantAllChecked:
        newSelectedItems = new Map(selectedItems);
        operateData.forEach((item) => {
          if (!item.disabled) {
            newSelectedItems.delete(item.key);
          }
        });
        break;
      case wantAllChecked:
        newSelectedItems = new Map(selectedItems);
        operateData.forEach((item) => {
          if (item.disabled) {
            if (selectedItems.has(item.key)) {
              newSelectedItems.set(item.key, item);
            }
            return;
          }
          newSelectedItems.set(item.key, item);
        });
        break;
      default:
        break;
    }
    if (!this._isControlledComponent()) {
      this._adapter.updateSelected(newSelectedItems);
    }
    this._notifyChange(newSelectedItems);
  }
  handleClear() {
    const {
      disabled
    } = this.getProps();
    const {
      selectedItems,
      data
    } = this.getStates();
    if (disabled) {
      return;
    }
    const newSelectedItems = new Map(selectedItems);
    data.forEach((item) => {
      if (!item.disabled) {
        newSelectedItems.delete(item.key);
      }
    });
    if (!this._isControlledComponent()) {
      this._adapter.updateSelected(newSelectedItems);
    }
    this._notifyChange(newSelectedItems);
  }
  handleSelectOrRemove(item) {
    const {
      disabled
    } = this.getProps();
    const selectedItems = this._adapter.getSelected();
    if (disabled || item.disabled) {
      return;
    }
    if (selectedItems.has(item.key)) {
      selectedItems.delete(item.key);
      this._adapter.notifyDeselect(item);
    } else {
      selectedItems.set(item.key, item);
      this._adapter.notifySelect(item);
    }
    if (!this._isControlledComponent()) {
      this._adapter.updateSelected(selectedItems);
    }
    this._notifyChange(selectedItems);
  }
  handleSelect(values) {
    const {
      disabled
    } = this.getProps();
    const selectedItems = this._adapter.getSelected();
    const {
      data
    } = this.getStates();
    const dataItems = data.map((d) => [d.value, d]);
    const allItemsMap = new Map(dataItems);
    const nextSelectedItemsMap = /* @__PURE__ */ new Map();
    if (disabled) {
      return;
    }
    values.forEach((value) => {
      const node = allItemsMap.get(value);
      if (selectedItems.has(node.key)) {
        nextSelectedItemsMap.set(node.key, node);
        return;
      }
      if (node.disabled) {
        return;
      }
      nextSelectedItemsMap.set(node.key, node);
      return;
    });
    if (!this._isControlledComponent()) {
      this._adapter.updateSelected(nextSelectedItemsMap);
    }
    this._notifyChange(nextSelectedItemsMap);
  }
  getValuesAndItemsFromMap(selectedItems) {
    const {
      type
    } = this.getProps();
    const items = [];
    const values = [];
    for (const item of selectedItems) {
      const obj = type === strings.TYPE_GROUP_LIST ? (0, import_omit.default)(item[1], "_parent") : item[1];
      items.push(obj);
      values.push(obj.value);
    }
    return {
      items,
      values
    };
  }
  _notifyChange(selectedItems) {
    const {
      items,
      values
    } = this.getValuesAndItemsFromMap(selectedItems);
    this._adapter.notifyChange(values, items);
  }
  handleSortEnd(callbackProps) {
    const {
      oldIndex,
      newIndex
    } = callbackProps;
    const selectedItems = this._adapter.getSelected();
    let selectedArr = [...selectedItems.values()];
    selectedArr = arrayMove(selectedArr, oldIndex, newIndex);
    let newSelectedItems = /* @__PURE__ */ new Map();
    selectedArr.forEach((option) => {
      newSelectedItems = newSelectedItems.set(option.key, option);
    });
    this._adapter.updateSelected(newSelectedItems);
    this._notifyChange(newSelectedItems);
  }
};
export {
  TransferFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_transfer_foundation.js.map
