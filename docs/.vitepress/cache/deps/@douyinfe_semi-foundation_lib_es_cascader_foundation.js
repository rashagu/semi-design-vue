import {
  require_createAssigner
} from "./chunk-KW6OZFD4.js";
import {
  require_includes
} from "./chunk-QBROOUTW.js";
import "./chunk-BWSKQBI3.js";
import "./chunk-KOVH33RT.js";
import "./chunk-73AG7XXA.js";
import {
  require_cloneDeep
} from "./chunk-DP3OYFSF.js";
import "./chunk-EFUJT5LA.js";
import {
  require_copyObject
} from "./chunk-RBUD5BHK.js";
import "./chunk-RFWJA27S.js";
import "./chunk-UTEL65GX.js";
import "./chunk-D6QY5MM6.js";
import "./chunk-VS2OXD4D.js";
import {
  isEnterPress_default
} from "./chunk-UEGGLRH4.js";
import "./chunk-XKTW6BSF.js";
import {
  calcCheckedKeys,
  calcCheckedKeysForChecked,
  calcCheckedKeysForUnchecked,
  filter,
  findAncestorKeys,
  findDescendantKeys,
  normalizeKeyList,
  require_difference
} from "./chunk-DJPQH74S.js";
import "./chunk-CQUURMQK.js";
import "./chunk-6SHS63ZR.js";
import "./chunk-SKUJYBVG.js";
import "./chunk-PTHRDZX2.js";
import {
  calcMergeType,
  convertDataToEntities,
  findKeysForValues,
  isValid,
  normalizedArr
} from "./chunk-4FFWUF5H.js";
import {
  require_isEqual
} from "./chunk-YUKK2YVM.js";
import "./chunk-T3H7OANQ.js";
import "./chunk-UL7BHDH4.js";
import {
  require_keys
} from "./chunk-HC6MTSUY.js";
import "./chunk-R5O5CDBP.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import {
  strings
} from "./chunk-CUMG5UHN.js";
import "./chunk-NNIGO4FV.js";
import "./chunk-OVLDI57Z.js";
import "./chunk-HOISZPJG.js";
import "./chunk-XXFWUEYP.js";
import "./chunk-RZZPN2AN.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-NAVCQYYY.js";
import {
  require_assignValue
} from "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import {
  require_isEmpty
} from "./chunk-RSVADYER.js";
import "./chunk-KPUGFIAL.js";
import {
  require_isPrototype
} from "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import {
  require_isArrayLike
} from "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import {
  require_isUndefined
} from "./chunk-V52XL574.js";
import "./chunk-C3N6TMV6.js";
import {
  require_isNumber
} from "./chunk-UV6QJF5D.js";
import "./chunk-NQE5YR5Y.js";
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
  require_isFunction
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/assign.js
var require_assign = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/assign.js"(exports, module) {
    var assignValue = require_assignValue();
    var copyObject = require_copyObject();
    var createAssigner = require_createAssigner();
    var isArrayLike = require_isArrayLike();
    var isPrototype = require_isPrototype();
    var keys = require_keys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });
    module.exports = assign;
  }
});

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/cascader/foundation.js
var import_isFunction = __toESM(require_isFunction());
var import_includes = __toESM(require_includes());
var import_isNumber = __toESM(require_isNumber());
var import_isEmpty = __toESM(require_isEmpty());
var import_cloneDeep = __toESM(require_cloneDeep());
var import_assign = __toESM(require_assign());
var import_isUndefined = __toESM(require_isUndefined());
var import_difference = __toESM(require_difference());
var import_get = __toESM(require_get());
var import_isEqual = __toESM(require_isEqual());
var CascaderFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.updateSearching = (isSearching) => {
      this._adapter.updateStates({
        isSearching: false
      });
    };
  }
  init() {
    const isOpen = this.getProp("open") || this.getProp("defaultOpen");
    this.collectOptions(true);
    if (isOpen && !this._isDisabled()) {
      this.open();
    }
  }
  destroy() {
    this._adapter.unregisterClickOutsideHandler();
  }
  _isDisabled() {
    return this.getProp("disabled");
  }
  _isFilterable() {
    return Boolean(this.getProp("filterTreeNode"));
  }
  _notifyChange(item) {
    const {
      onChangeWithObject,
      multiple
    } = this.getProps();
    const valueProp = onChangeWithObject ? [] : "value";
    if (multiple) {
      const valuePath = [];
      item.forEach((checkedKey) => {
        const valuePathItem = this.getItemPropPath(checkedKey, valueProp);
        valuePath.push(valuePathItem);
      });
      this._adapter.notifyChange(valuePath);
    } else {
      const valuePath = (0, import_isUndefined.default)(item) || !("key" in item) ? [] : this.getItemPropPath(item.key, valueProp);
      this._adapter.notifyChange(valuePath);
    }
  }
  _isLeaf(item) {
    if (this.getProp("loadData")) {
      return Boolean(item.isLeaf);
    }
    return !item.children || !item.children.length;
  }
  _clearInput() {
    this._adapter.updateInputValue("");
  }
  // Scenes that may trigger blur:
  //  1、clickOutSide
  _notifyBlur(e) {
    this._adapter.notifyBlur(e);
  }
  // Scenes that may trigger focus:
  //  1、click selection
  _notifyFocus(e) {
    this._adapter.notifyFocus(e);
  }
  _isOptionDisabled(key, keyEntities) {
    const isDisabled = findAncestorKeys([key], keyEntities, true).some((item) => keyEntities[item].data.disabled);
    return isDisabled;
  }
  getCopyFromState(items) {
    const res = {};
    normalizedArr(items).forEach((key) => {
      res[key] = (0, import_cloneDeep.default)(this.getState(key));
    });
    return res;
  }
  // prop: is array, return all data
  getItemPropPath(selectedKey, prop, keyEntities) {
    const searchMap = keyEntities || this.getState("keyEntities");
    const selectedItem = searchMap[selectedKey];
    let path = [];
    if (!selectedItem) {
    } else if (selectedItem._notExist) {
      path = selectedItem.path;
    } else {
      const keyPath = selectedItem.path;
      path = Array.isArray(prop) ? keyPath.map((key) => searchMap[key].data) : keyPath.map((key) => searchMap[key].data[prop]);
    }
    return path;
  }
  _getCacheValue(keyEntities) {
    const {
      selectedKeys
    } = this.getStates();
    const selectedKey = Array.from(selectedKeys)[0];
    let cacheValue;
    if ((0, import_isEmpty.default)(keyEntities[selectedKey])) {
      if ((0, import_includes.default)(selectedKey, "not-exist-")) {
        const targetValue = selectedKey.match(/not-exist-(\S*)/)[1];
        if ((0, import_isEmpty.default)(keyEntities[targetValue])) {
          cacheValue = targetValue;
        } else {
          cacheValue = keyEntities[targetValue].valuePath;
        }
      } else {
        cacheValue = selectedKey;
      }
    } else {
      cacheValue = keyEntities[selectedKey].valuePath;
    }
    return cacheValue;
  }
  collectOptions() {
    let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    const {
      treeData,
      value,
      defaultValue
    } = this.getProps();
    const keyEntities = convertDataToEntities(treeData);
    this._adapter.rePositionDropdown();
    let cacheValue;
    if (init) {
      cacheValue = defaultValue;
    } else if (!(0, import_isEmpty.default)(keyEntities)) {
      cacheValue = this._getCacheValue(keyEntities);
    }
    const selectedValue = !this._isControlledComponent() ? cacheValue : value;
    if (isValid(selectedValue)) {
      this.updateSelectedKey(selectedValue, keyEntities);
    } else {
      this._adapter.updateStates({
        keyEntities
      });
    }
  }
  // call when props.value change
  handleValueChange(value) {
    const {
      keyEntities
    } = this.getStates();
    const {
      multiple
    } = this.getProps();
    !multiple && this.updateSelectedKey(value, keyEntities);
  }
  /**
   * When single selection, the clear objects of
   * selectedKeys, activeKeys, filteredKeys, input, etc.
   */
  _getClearSelectedKey(filterable) {
    const updateStates = {};
    const {
      searchPlaceholder,
      placeholder,
      multiple
    } = this.getProps();
    updateStates.selectedKeys = /* @__PURE__ */ new Set([]);
    updateStates.activeKeys = /* @__PURE__ */ new Set([]);
    updateStates.filteredKeys = /* @__PURE__ */ new Set([]);
    if (filterable && !multiple) {
      updateStates.inputPlaceHolder = searchPlaceholder || placeholder || "";
      updateStates.inputValue = "";
    }
    return updateStates;
  }
  updateSelectedKey(value, keyEntities) {
    const {
      changeOnSelect,
      onChangeWithObject,
      multiple
    } = this.getProps();
    const {
      activeKeys,
      loadingKeys,
      loading,
      keyEntities: keyEntityState,
      selectedKeys: selectedKeysState
    } = this.getStates();
    const filterable = this._isFilterable();
    const loadingActive = [...activeKeys].filter((i) => loadingKeys.has(i));
    const valuePath = onChangeWithObject ? normalizedArr(value).map((i) => i.value) : normalizedArr(value);
    const selectedKeys = findKeysForValues(valuePath, keyEntities);
    let updateStates = {};
    if (selectedKeys.length) {
      const selectedKey = selectedKeys[0];
      const selectedItem = keyEntities[selectedKey];
      if (changeOnSelect || this._isLeaf(selectedItem.data)) {
        updateStates.selectedKeys = /* @__PURE__ */ new Set([selectedKey]);
        if (!loadingActive.length) {
          updateStates.activeKeys = new Set(selectedItem.path);
        }
        if (filterable && !multiple) {
          const displayText = this.renderDisplayText(selectedKey, keyEntities);
          updateStates.inputPlaceHolder = displayText;
        }
      } else if ((0, import_isEqual.default)(selectedKeys, Array.from(selectedKeysState))) {
        updateStates = this._getClearSelectedKey(filterable);
      }
    } else if (value && value.length) {
      const val = valuePath[valuePath.length - 1];
      const key = `not-exist-${val}`;
      const optionNotExist = {
        data: {
          label: val,
          value: val
        },
        key,
        path: valuePath,
        _notExist: true
      };
      updateStates.selectedKeys = /* @__PURE__ */ new Set([key]);
      if (filterable && !multiple) {
        const displayText = this._defaultRenderText(valuePath);
        updateStates.inputPlaceHolder = displayText;
      }
      keyEntities[key] = optionNotExist;
    } else if (loading) {
      updateStates.keyEntities = (0, import_assign.default)(keyEntityState, keyEntities);
      this._adapter.updateStates(updateStates);
      return;
    } else {
      updateStates = this._getClearSelectedKey(filterable);
    }
    updateStates.keyEntities = keyEntities;
    this._adapter.updateStates(updateStates);
  }
  open() {
    const filterable = this._isFilterable();
    const {
      multiple
    } = this.getProps();
    this._adapter.openMenu();
    if (filterable) {
      this._clearInput();
      !multiple && this.toggle2SearchInput(true);
    }
    if (this._isControlledComponent()) {
      this.reCalcActiveKeys();
    }
    this._adapter.notifyDropdownVisibleChange(true);
    this._adapter.registerClickOutsideHandler((e) => this.close(e));
  }
  reCalcActiveKeys() {
    const {
      selectedKeys,
      activeKeys,
      keyEntities
    } = this.getStates();
    const selectedKey = [...selectedKeys][0];
    const selectedItem = keyEntities[selectedKey];
    if (!selectedItem) {
      return;
    }
    const newActiveKeys = new Set(selectedItem.path);
    if (!(0, import_isEqual.default)(newActiveKeys, activeKeys)) {
      this._adapter.updateStates({
        activeKeys: newActiveKeys
      });
    }
  }
  close(e, key) {
    const {
      multiple
    } = this.getProps();
    this._adapter.closeMenu();
    this._adapter.notifyDropdownVisibleChange(false);
    this._adapter.unregisterClickOutsideHandler();
    if (this._isFilterable()) {
      const {
        selectedKeys,
        isSearching
      } = this.getStates();
      let inputValue = "";
      if (key && !multiple) {
        inputValue = this.renderDisplayText(key);
      } else if (selectedKeys.size && !multiple) {
        inputValue = this.renderDisplayText([...selectedKeys][0]);
      }
      this._adapter.updateStates({
        inputValue
      });
      !multiple && this.toggle2SearchInput(false);
      !multiple && this._adapter.updateFocusState(false);
    }
    this._notifyBlur(e);
  }
  focus() {
    const {
      filterTreeNode
    } = this.getProps();
    if (filterTreeNode) {
      this._adapter.focusInput();
    }
    this._adapter.updateFocusState(true);
  }
  blur() {
    const {
      filterTreeNode
    } = this.getProps();
    if (filterTreeNode) {
      this._adapter.blurInput();
    }
    this._adapter.updateFocusState(false);
  }
  toggle2SearchInput(isShow) {
    if (isShow) {
      this._adapter.toggleInputShow(isShow, () => this.focus());
    } else {
      this._adapter.toggleInputShow(isShow, () => void 0);
    }
  }
  handleItemClick(e, item) {
    const isDisabled = this._isDisabled();
    if (isDisabled) {
      return;
    }
    this.handleSingleSelect(e, item);
    this._adapter.rePositionDropdown();
  }
  handleItemHover(e, item) {
    const isDisabled = this._isDisabled();
    if (isDisabled) {
      return;
    }
    this.handleShowNextByHover(item);
  }
  handleShowNextByHover(item) {
    const {
      keyEntities
    } = this.getStates();
    const {
      data,
      key
    } = item;
    const isLeaf = this._isLeaf(data);
    const activeKeys = keyEntities[key].path;
    this._adapter.updateStates({
      activeKeys: new Set(activeKeys)
    });
    if (!isLeaf) {
      this.notifyIfLoadData(item);
    }
  }
  onItemCheckboxClick(item) {
    const isDisabled = this._isDisabled();
    if (isDisabled) {
      return;
    }
    this._handleMultipleSelect(item);
    this._adapter.rePositionDropdown();
  }
  handleClick(e) {
    const isDisabled = this._isDisabled();
    const isFilterable = this._isFilterable();
    const {
      isOpen
    } = this.getStates();
    if (isDisabled) {
      return;
    } else if (!isOpen) {
      this.open();
      this._notifyFocus(e);
    } else if (isOpen && !isFilterable) {
      this.close(e);
    }
  }
  /**
   * A11y: simulate selection click
   */
  /* istanbul ignore next */
  handleSelectionEnterPress(keyboardEvent) {
    if (isEnterPress_default(keyboardEvent)) {
      this.handleClick(keyboardEvent);
    }
  }
  toggleHoverState(bool) {
    this._adapter.toggleHovering(bool);
  }
  _defaultRenderText(path, displayRender) {
    const separator = this.getProp("separator");
    if (displayRender && typeof displayRender === "function") {
      return displayRender(path);
    } else {
      return path.join(separator);
    }
  }
  renderDisplayText(targetKey, keyEntities) {
    const renderFunc = this.getProp("displayRender");
    const displayProp = this.getProp("displayProp");
    const displayPath = this.getItemPropPath(targetKey, displayProp, keyEntities);
    return this._defaultRenderText(displayPath, renderFunc);
  }
  handleNodeLoad(item) {
    const {
      data,
      key
    } = item;
    const {
      loadedKeys: prevLoadedKeys,
      loadingKeys: prevLoadingKeys
    } = this.getCopyFromState(["loadedKeys", "loadingKeys"]);
    const newLoadedKeys = prevLoadedKeys.add(key);
    const newLoadingKeys = /* @__PURE__ */ new Set([...prevLoadingKeys]);
    newLoadingKeys.delete(key);
    this._adapter.notifyOnLoad(newLoadedKeys, data);
    this._adapter.updateStates({
      loadingKeys: newLoadingKeys
    });
  }
  notifyIfLoadData(item) {
    const {
      data,
      key
    } = item;
    this._adapter.updateStates({
      loading: false
    });
    if (!data.isLeaf && !data.children && this.getProp("loadData")) {
      const {
        loadedKeys,
        loadingKeys
      } = this.getCopyFromState(["loadedKeys", "loadingKeys"]);
      if (loadedKeys.has(key) || loadingKeys.has(key)) {
        return;
      }
      this._adapter.updateStates({
        loading: true
      });
      const {
        keyEntities
      } = this.getStates();
      const optionPath = this.getItemPropPath(key, [], keyEntities);
      this._adapter.updateStates({
        loadingKeys: loadingKeys.add(key)
      });
      this._adapter.notifyLoadData(optionPath, this.handleNodeLoad.bind(this, item));
    }
  }
  handleSingleSelect(e, item) {
    const {
      changeOnSelect: allowChange,
      filterLeafOnly,
      multiple,
      enableLeafClick
    } = this.getProps();
    const {
      keyEntities,
      selectedKeys,
      isSearching
    } = this.getStates();
    const filterable = this._isFilterable();
    const {
      data,
      key
    } = item;
    const isLeaf = this._isLeaf(data);
    const activeKeys = keyEntities[key].path;
    const selectedKey = [key];
    const hasChanged = key !== [...selectedKeys][0];
    if (!isLeaf && !allowChange && !isSearching) {
      this._adapter.updateStates({
        activeKeys: new Set(activeKeys)
      });
      this.notifyIfLoadData(item);
      return;
    }
    if (multiple) {
      this._adapter.updateStates({
        activeKeys: new Set(activeKeys)
      });
      if (isLeaf && enableLeafClick) {
        this.onItemCheckboxClick(item);
      }
    } else {
      this._adapter.notifySelect(data.value);
      if (hasChanged) {
        this._notifyChange(item);
        this.notifyIfLoadData(item);
        if (this._isControlledComponent()) {
          this._adapter.updateStates({
            activeKeys: new Set(activeKeys)
          });
          if (isLeaf) {
            this.close(e);
          }
          return;
        }
        this._adapter.updateStates({
          activeKeys: new Set(activeKeys),
          selectedKeys: new Set(selectedKey)
        });
        const displayText = this.renderDisplayText(key);
        if (filterable) {
          this._adapter.updateInputPlaceHolder(displayText);
        }
        if (isLeaf) {
          this.close(e, key);
        } else if (!filterLeafOnly && isSearching) {
          this.close(e, key);
        }
      } else {
        this.close(e);
      }
    }
  }
  _handleMultipleSelect(item) {
    const {
      key
    } = item;
    const {
      checkedKeys,
      keyEntities,
      resolvedCheckedKeys
    } = this.getStates();
    const {
      autoMergeValue,
      max,
      disableStrictly,
      leafOnly
    } = this.getProps();
    const prevCheckedStatus = checkedKeys.has(key);
    const curCheckedStatus = disableStrictly ? this.calcCheckedStatus(!prevCheckedStatus, key) : !prevCheckedStatus;
    const {
      checkedKeys: curCheckedKeys,
      halfCheckedKeys: curHalfCheckedKeys
    } = disableStrictly ? this.calcNonDisabledCheckedKeys(key, curCheckedStatus) : this.calcCheckedKeys(key, curCheckedStatus);
    const mergeType = calcMergeType(autoMergeValue, leafOnly);
    const isLeafOnlyMerge = mergeType === strings.LEAF_ONLY_MERGE_TYPE;
    const isNoneMerge = mergeType === strings.NONE_MERGE_TYPE;
    const curResolvedCheckedKeys = new Set(normalizeKeyList(curCheckedKeys, keyEntities, isLeafOnlyMerge));
    const curRealCheckedKeys = isNoneMerge ? curCheckedKeys : curResolvedCheckedKeys;
    if ((0, import_isNumber.default)(max)) {
      if (!isNoneMerge) {
        if (resolvedCheckedKeys.size < curResolvedCheckedKeys.size && curResolvedCheckedKeys.size > max) {
          const checkedEntities = [];
          curResolvedCheckedKeys.forEach((itemKey) => {
            checkedEntities.push(keyEntities[itemKey]);
          });
          this._adapter.notifyOnExceed(checkedEntities);
          return;
        }
      } else {
        if (checkedKeys.size < curCheckedKeys.size && curCheckedKeys.size > max) {
          const checkedEntities = [];
          curCheckedKeys.forEach((itemKey) => {
            checkedEntities.push(keyEntities[itemKey]);
          });
          this._adapter.notifyOnExceed(checkedEntities);
          return;
        }
      }
    }
    if (!this._isControlledComponent()) {
      this._adapter.updateStates({
        checkedKeys: curCheckedKeys,
        halfCheckedKeys: curHalfCheckedKeys,
        resolvedCheckedKeys: curResolvedCheckedKeys
      });
    }
    this._notifyChange(curRealCheckedKeys);
    if (curCheckedStatus) {
      this._notifySelect(curRealCheckedKeys);
    }
    this._adapter.updateStates({
      inputValue: ""
    });
  }
  calcNonDisabledCheckedKeys(eventKey, targetStatus) {
    const {
      keyEntities,
      disabledKeys
    } = this.getStates();
    const {
      checkedKeys
    } = this.getCopyFromState(["checkedKeys"]);
    const descendantKeys = normalizeKeyList(findDescendantKeys([eventKey], keyEntities, false), keyEntities, true);
    const hasDisabled = descendantKeys.some((key) => disabledKeys.has(key));
    if (!hasDisabled) {
      return this.calcCheckedKeys(eventKey, targetStatus);
    }
    const nonDisabled = descendantKeys.filter((key) => !disabledKeys.has(key));
    const newCheckedKeys = targetStatus ? [...nonDisabled, ...checkedKeys] : (0, import_difference.default)(normalizeKeyList([...checkedKeys], keyEntities, true), nonDisabled);
    return calcCheckedKeys(newCheckedKeys, keyEntities);
  }
  calcCheckedStatus(targetStatus, eventKey) {
    if (!targetStatus) {
      return targetStatus;
    }
    const {
      checkedKeys,
      keyEntities,
      disabledKeys
    } = this.getStates();
    const descendantKeys = normalizeKeyList(findDescendantKeys([eventKey], keyEntities, false), keyEntities, true);
    const hasDisabled = descendantKeys.some((key) => disabledKeys.has(key));
    if (!hasDisabled) {
      return targetStatus;
    }
    const nonDisabledKeys = descendantKeys.filter((key) => !disabledKeys.has(key));
    const allChecked = nonDisabledKeys.every((key) => checkedKeys.has(key));
    return !allChecked;
  }
  _notifySelect(keys) {
    const {
      keyEntities
    } = this.getStates();
    const values = [];
    keys.forEach((key) => {
      if (!(0, import_isEmpty.default)(keyEntities) && !(0, import_isEmpty.default)(keyEntities[key])) {
        const valueItem = keyEntities[key].data.value;
        values.push(valueItem);
      }
    });
    const formatValue = values.length === 1 ? values[0] : values;
    this._adapter.notifySelect(formatValue);
  }
  /**
   * calculate all key of nodes that are checked or half checked
   * @param {string} key key of node
   * @param {boolean} curCheckedStatus checked status of node
   */
  calcCheckedKeys(key, curCheckedStatus) {
    const {
      keyEntities
    } = this.getStates();
    const {
      checkedKeys,
      halfCheckedKeys
    } = this.getCopyFromState(["checkedKeys", "halfCheckedKeys"]);
    return curCheckedStatus ? calcCheckedKeysForChecked(key, keyEntities, checkedKeys, halfCheckedKeys) : calcCheckedKeysForUnchecked(key, keyEntities, checkedKeys, halfCheckedKeys);
  }
  handleInputChange(sugInput) {
    this._adapter.updateInputValue(sugInput);
    const {
      keyEntities
    } = this.getStates();
    const {
      treeNodeFilterProp,
      filterTreeNode,
      filterLeafOnly
    } = this.getProps();
    let filteredKeys = [];
    if (sugInput) {
      filteredKeys = Object.values(keyEntities).filter((item) => {
        const {
          key,
          _notExist,
          data
        } = item;
        if (_notExist) {
          return false;
        }
        const filteredPath = this.getItemPropPath(key, treeNodeFilterProp).join();
        return filter(sugInput, data, filterTreeNode, false, filteredPath);
      }).filter((item) => filterTreeNode && !filterLeafOnly || this._isLeaf(item)).map((item) => item.key);
    }
    this._adapter.updateStates({
      isSearching: Boolean(sugInput),
      filteredKeys: new Set(filteredKeys)
    });
    this._adapter.notifyOnSearch(sugInput);
  }
  handleClear() {
    const {
      isSearching
    } = this.getStates();
    const {
      searchPlaceholder,
      placeholder,
      multiple
    } = this.getProps();
    const isFilterable = this._isFilterable();
    const isControlled = this._isControlledComponent();
    const newState = {};
    if (multiple) {
      this._adapter.updateInputValue("");
      this._adapter.notifyOnSearch("");
      newState.checkedKeys = /* @__PURE__ */ new Set([]);
      newState.halfCheckedKeys = /* @__PURE__ */ new Set([]);
      newState.selectedKeys = /* @__PURE__ */ new Set([]);
      newState.activeKeys = /* @__PURE__ */ new Set([]);
      newState.resolvedCheckedKeys = /* @__PURE__ */ new Set([]);
      this._adapter.notifyChange([]);
    } else {
      if (isFilterable && isSearching) {
        newState.isSearching = false;
        this._adapter.updateInputValue("");
        this._adapter.notifyOnSearch("");
      } else {
        if (isFilterable) {
          newState.inputValue = "";
          newState.inputPlaceHolder = searchPlaceholder || placeholder || "";
          this._adapter.updateInputValue("");
          this._adapter.notifyOnSearch("");
        }
        if (!isControlled) {
          newState.selectedKeys = /* @__PURE__ */ new Set([]);
        }
        newState.activeKeys = /* @__PURE__ */ new Set([]);
        newState.filteredKeys = /* @__PURE__ */ new Set([]);
        this._adapter.notifyChange([]);
      }
    }
    this._adapter.updateStates(newState);
    this._adapter.notifyClear();
    this._adapter.rePositionDropdown();
  }
  /**
   * A11y: simulate clear button click
   */
  /* istanbul ignore next */
  handleClearEnterPress(keyboardEvent) {
    if (isEnterPress_default(keyboardEvent)) {
      this.handleClear();
    }
  }
  getRenderData() {
    const {
      keyEntities,
      isSearching
    } = this.getStates();
    const isFilterable = this._isFilterable();
    if (isSearching && isFilterable) {
      return this.getFilteredData();
    }
    return Object.values(keyEntities).filter((item) => item.parentKey === null && !item._notExist).sort((a, b) => parseInt(a.ind, 10) - parseInt(b.ind, 10));
  }
  getFilteredData() {
    const {
      treeNodeFilterProp,
      filterSorter
    } = this.getProps();
    const {
      filteredKeys,
      keyEntities,
      inputValue
    } = this.getStates();
    const filteredList = [];
    const filteredKeyArr = [...filteredKeys];
    filteredKeyArr.forEach((key) => {
      const item = keyEntities[key];
      if (!item) {
        return;
      }
      const pathData = this.getItemPropPath(key, []);
      const itemSearchPath = pathData.map((item2) => item2[treeNodeFilterProp]);
      const isDisabled = this._isOptionDisabled(key, keyEntities);
      filteredList.push({
        data: item.data,
        pathData,
        key,
        disabled: isDisabled,
        searchText: itemSearchPath
      });
    });
    if ((0, import_isFunction.default)(filterSorter)) {
      filteredList.sort((a, b) => {
        return filterSorter(a.pathData, b.pathData, inputValue);
      });
    }
    return filteredList;
  }
  handleListScroll(e, ind) {
    const {
      activeKeys,
      keyEntities
    } = this.getStates();
    const lastActiveKey = [...activeKeys][activeKeys.size - 1];
    const data = lastActiveKey ? (0, import_get.default)(keyEntities, [lastActiveKey, "data"], null) : null;
    this._adapter.notifyListScroll(e, {
      panelIndex: ind,
      activeNode: data
    });
  }
  handleTagRemove(e, tagValuePath) {
    const {
      keyEntities
    } = this.getStates();
    const {
      disabled
    } = this.getProps();
    if (disabled) {
      return;
    }
    const removedItem = Object.values(keyEntities).filter((item) => (0, import_isEqual.default)(item.valuePath, tagValuePath))[0];
    !(0, import_isEmpty.default)(removedItem) && !removedItem.data.disabled && this._handleMultipleSelect(removedItem);
  }
};
export {
  CascaderFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_cascader_foundation.js.map
