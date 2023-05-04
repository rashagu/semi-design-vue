import {
  strings
} from "./chunk-F3G26BR4.js";
import {
  require_cloneDeep
} from "./chunk-DP3OYFSF.js";
import "./chunk-EFUJT5LA.js";
import "./chunk-RBUD5BHK.js";
import "./chunk-RFWJA27S.js";
import "./chunk-UTEL65GX.js";
import "./chunk-D6QY5MM6.js";
import "./chunk-VS2OXD4D.js";
import {
  isEnterPress_default
} from "./chunk-UEGGLRH4.js";
import {
  calcCheckedKeys,
  calcCheckedKeysForChecked,
  calcCheckedKeysForUnchecked,
  filter,
  findAncestorKeys,
  findDescendantKeys,
  flattenTreeData,
  getMotionKeys,
  getValueOrKey,
  normalizeKeyList,
  normalizedArr,
  require_difference
} from "./chunk-DJPQH74S.js";
import "./chunk-CQUURMQK.js";
import "./chunk-6SHS63ZR.js";
import "./chunk-SKUJYBVG.js";
import "./chunk-PTHRDZX2.js";
import "./chunk-UL7BHDH4.js";
import "./chunk-HC6MTSUY.js";
import "./chunk-R5O5CDBP.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import "./chunk-NNIGO4FV.js";
import "./chunk-OVLDI57Z.js";
import "./chunk-HOISZPJG.js";
import "./chunk-XXFWUEYP.js";
import "./chunk-RZZPN2AN.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-NAVCQYYY.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
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
  require_isUndefined
} from "./chunk-V52XL574.js";
import "./chunk-C3N6TMV6.js";
import {
  require_isNumber
} from "./chunk-UV6QJF5D.js";
import {
  require_isString
} from "./chunk-NQE5YR5Y.js";
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
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/treeSelect/foundation.js
var import_difference = __toESM(require_difference());
var import_isEmpty = __toESM(require_isEmpty());
var import_cloneDeep = __toESM(require_cloneDeep());
var import_isString = __toESM(require_isString());
var import_isUndefined = __toESM(require_isUndefined());
var import_get = __toESM(require_get());
var import_isFunction = __toESM(require_isFunction());
var import_isNumber = __toESM(require_isNumber());
var TreeSelectFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this._registerClickOutsideHandler = (e) => {
      this._adapter.registerClickOutsideHandler((e2) => {
        this.handlerTriggerBlur(e2);
        this.close(e2);
      });
    };
  }
  init() {
    const {
      searchAutoFocus,
      searchPosition,
      filterTreeNode
    } = this.getProps();
    const triggerSearch = searchPosition === strings.SEARCH_POSITION_TRIGGER && filterTreeNode;
    const triggerSearchAutoFocus = searchAutoFocus && triggerSearch;
    this._setDropdownWidth();
    const isOpen = (this.getProp("defaultOpen") || triggerSearchAutoFocus) && !this._isDisabled();
    if (isOpen) {
      this.open();
    }
    if (triggerSearchAutoFocus) {
      this.handleTriggerFocus(null);
    }
  }
  destroy() {
    this._adapter.unregisterClickOutsideHandler();
  }
  _setDropdownWidth() {
    const {
      style,
      dropdownMatchSelectWidth
    } = this.getProps();
    let width;
    if (dropdownMatchSelectWidth) {
      if (style && (0, import_isNumber.default)(style.width)) {
        width = style.width;
      } else if (style && (0, import_isString.default)(style.width) && !style.width.includes("%")) {
        width = style.width;
      } else {
        width = this._adapter.getTriggerWidth();
      }
      this._adapter.setOptionWrapperWidth(width);
    }
  }
  _isMultiple() {
    return this.getProp("multiple");
  }
  _isAnimated() {
    return this.getProp("motionExpand");
  }
  _isDisabled() {
    let treeNode = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.getProp("disabled") || treeNode.disabled;
  }
  _isExpandControlled() {
    return this.getProp("expandedKeys");
  }
  _isSelectToClose() {
    return !this.getProp("expandAction");
  }
  _isLoadControlled() {
    return this.getProp("loadedKeys");
  }
  _showFilteredOnly() {
    const {
      inputValue
    } = this.getStates();
    const {
      showFilteredOnly
    } = this.getProps();
    return Boolean(inputValue) && showFilteredOnly;
  }
  findDataForValue(findValue) {
    const {
      value,
      defaultValue
    } = this.getProps();
    let valueArr = [];
    if (value) {
      valueArr = Array.isArray(value) ? value : [value];
    } else if (defaultValue) {
      valueArr = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return valueArr.find((item) => {
      return item.value === findValue || item.key === findValue;
    });
  }
  constructDataForValue(value) {
    const {
      treeNodeLabelProp
    } = this.getProps();
    return {
      key: value,
      [treeNodeLabelProp]: value
    };
  }
  getDataForKeyNotInKeyEntities(value) {
    const {
      onChangeWithObject
    } = this.getProps();
    if (onChangeWithObject) {
      return this.findDataForValue(value);
    } else {
      return this.constructDataForValue(value);
    }
  }
  getCopyFromState(items) {
    const res = {};
    normalizedArr(items).forEach((key) => {
      res[key] = (0, import_cloneDeep.default)(this.getState(key));
    });
    return res;
  }
  getTreeNodeProps(key) {
    const {
      expandedKeys = /* @__PURE__ */ new Set([]),
      selectedKeys = [],
      checkedKeys = /* @__PURE__ */ new Set([]),
      halfCheckedKeys = /* @__PURE__ */ new Set([]),
      realCheckedKeys = /* @__PURE__ */ new Set([]),
      keyEntities = {},
      filteredKeys = /* @__PURE__ */ new Set([]),
      inputValue = "",
      loadedKeys,
      loadingKeys,
      filteredExpandedKeys = /* @__PURE__ */ new Set([]),
      disabledKeys = /* @__PURE__ */ new Set([])
    } = this.getStates();
    const {
      treeNodeFilterProp,
      checkRelation
    } = this.getProps();
    const entity = keyEntities[key];
    const notExist = !entity;
    if (notExist) {
      return null;
    }
    let realChecked = false;
    let realHalfChecked = false;
    if (checkRelation === "related") {
      realChecked = checkedKeys.has(key);
      realHalfChecked = halfCheckedKeys.has(key);
    } else if (checkRelation === "unRelated") {
      realChecked = realCheckedKeys.has(key);
      realHalfChecked = false;
    }
    const isSearching = Boolean(inputValue);
    const treeNodeProps = {
      eventKey: key,
      expanded: isSearching && !this._isExpandControlled() ? filteredExpandedKeys.has(key) : expandedKeys.has(key),
      selected: selectedKeys.includes(key),
      checked: realChecked,
      halfChecked: realHalfChecked,
      pos: String(entity ? entity.pos : ""),
      level: entity.level,
      filtered: filteredKeys.has(key),
      keyword: inputValue,
      treeNodeFilterProp,
      loading: loadingKeys.has(key) && !loadedKeys.has(key),
      loaded: loadedKeys.has(key)
    };
    if (this.getProp("disableStrictly") && disabledKeys.has(key)) {
      treeNodeProps.disabled = true;
    }
    return treeNodeProps;
  }
  handleNodeLoad(loadedKeys, loadingKeys, data, resolve) {
    const {
      loadData
    } = this.getProps();
    const {
      key
    } = data;
    if (!loadData || loadedKeys.has(key) || loadingKeys.has(key)) {
      return {};
    }
    loadData(data).then(() => {
      const {
        loadedKeys: prevLoadedKeys,
        loadingKeys: prevLoadingKeys
      } = this.getCopyFromState(["loadedKeys", "loadingKeys"]);
      const newLoadedKeys = prevLoadedKeys.add(key);
      const newLoadingKeys = /* @__PURE__ */ new Set([...prevLoadingKeys]);
      newLoadingKeys.delete(key);
      this._adapter.notifyLoad(newLoadedKeys, data);
      if (!this._isLoadControlled()) {
        this._adapter.updateState({
          loadedKeys: newLoadedKeys
        });
      }
      this._adapter.setState({
        loadingKeys: newLoadingKeys
      });
      resolve();
    });
    return {
      loadingKeys: loadingKeys.add(key)
    };
  }
  /* istanbul ignore next */
  focusInput(bool) {
    this._adapter.updateInputFocus(bool);
  }
  _notifyMultipleChange(key, e) {
    const {
      keyEntities
    } = this.getStates();
    const {
      leafOnly,
      checkRelation
    } = this.getProps();
    let keyList = [];
    if (checkRelation === "related") {
      keyList = normalizeKeyList(key, keyEntities, leafOnly, true);
    } else if (checkRelation === "unRelated") {
      keyList = key;
    }
    const nodes = keyList.map((key2) => keyEntities[key2] && keyEntities[key2].data.key === key2 ? keyEntities[key2].data : this.getDataForKeyNotInKeyEntities(key2));
    if (this.getProp("onChangeWithObject")) {
      this._adapter.notifyChangeWithObject(nodes, e);
    } else {
      const value = getValueOrKey(nodes);
      this._adapter.notifyChange(value, nodes, e);
    }
  }
  _notifyChange(key, e) {
    const {
      keyEntities
    } = this.getStates();
    if (this._isMultiple() && Array.isArray(key)) {
      this._notifyMultipleChange(key, e);
    } else {
      const nodes = (0, import_isUndefined.default)(key) ? key : keyEntities[key].data;
      const value = (0, import_isUndefined.default)(key) ? key : getValueOrKey(nodes);
      if (this.getProp("onChangeWithObject")) {
        this._adapter.notifyChangeWithObject(nodes, e);
      } else {
        this._adapter.notifyChange(value, nodes, e);
      }
    }
  }
  // Scenes that may trigger focus:
  //  1、click selection
  _notifyFocus(e) {
    this._adapter.notifyFocus(e);
  }
  handleTriggerFocus(e) {
    this._adapter.updateIsFocus(true);
    this._notifyFocus(e);
    this._registerClickOutsideHandler(e);
  }
  // Scenes that may trigger blur
  //  1、clickOutSide
  //  2、click option / press enter, and then select complete（when multiple is false
  //  3、press esc when dropdown list open
  _notifyBlur(e) {
    this._adapter.notifyBlur(e);
  }
  handlerTriggerBlur(e) {
    this._adapter.updateIsFocus(false);
    this._notifyBlur(e);
    this._adapter.unregisterClickOutsideHandler();
  }
  toggleHoverState(bool) {
    this._adapter.toggleHovering(bool);
  }
  open() {
    this._adapter.openMenu();
    this._setDropdownWidth();
  }
  close(e) {
    this._adapter.closeMenu();
    if (this.getProp("motionExpand")) {
      this._adapter.updateState({
        motionKeys: /* @__PURE__ */ new Set([])
      });
    }
  }
  handleClick(e) {
    const isDisabled = this._isDisabled();
    const {
      isOpen,
      inputValue,
      isFocus
    } = this.getStates();
    const {
      searchPosition,
      clickTriggerToHide
    } = this.getProps();
    if (isDisabled) {
      return;
    } else {
      if (!isFocus) {
        this.handleTriggerFocus(e);
      }
      if (isOpen) {
        if (searchPosition === "trigger" && inputValue) {
          return;
        }
        clickTriggerToHide && this.close(e);
      } else {
        this.open();
      }
    }
  }
  /**
   * A11y: simulate selection click
   */
  /* istanbul ignore next */
  handleSelectionEnterPress(e) {
    if (isEnterPress_default(e)) {
      this.handleClick(e);
    }
  }
  handleClear(e) {
    const {
      searchPosition,
      filterTreeNode
    } = this.getProps();
    const {
      inputValue,
      selectedKeys
    } = this.getStates();
    const isMultiple = this._isMultiple();
    const isControlled = this._isControlledComponent();
    const value = isMultiple ? [] : void 0;
    this._notifyChange(value, e);
    if (!isControlled) {
      this._adapter.rePositionDropdown();
      this._adapter.updateState({
        selectedKeys: [],
        checkedKeys: /* @__PURE__ */ new Set(),
        halfCheckedKeys: /* @__PURE__ */ new Set(),
        realCheckedKeys: /* @__PURE__ */ new Set([])
      });
    }
    if (filterTreeNode && searchPosition === strings.SEARCH_POSITION_TRIGGER) {
      if (inputValue !== "") {
        if ((0, import_isEmpty.default)(selectedKeys)) {
          this.handleInputChange("");
        } else {
          this.clearInput();
        }
      }
    }
  }
  /**
   * A11y: simulate clear button click
   */
  /* istanbul ignore next */
  handleClearEnterPress(e) {
    if (isEnterPress_default(e)) {
      this.handleClear(e);
    }
  }
  removeTag(eventKey) {
    const {
      disableStrictly,
      checkRelation
    } = this.getProps();
    const {
      keyEntities,
      disabledKeys,
      realCheckedKeys
    } = this.getStates();
    const item = keyEntities[eventKey] && keyEntities[eventKey].data.key === eventKey ? keyEntities[eventKey].data : this.getDataForKeyNotInKeyEntities(eventKey);
    if (item.disabled || disableStrictly && disabledKeys.has(eventKey)) {
      return;
    }
    if (checkRelation === "unRelated") {
      const newRealCheckedKeys = new Set(realCheckedKeys);
      newRealCheckedKeys.delete(eventKey);
      this._notifyChange([...newRealCheckedKeys], null);
      if (!this._isControlledComponent()) {
        this._adapter.updateState({
          realCheckedKeys: newRealCheckedKeys
        });
        this._adapter.rePositionDropdown();
      }
    } else if (checkRelation === "related") {
      const {
        checkedKeys,
        halfCheckedKeys
      } = this.calcCheckedKeys(eventKey, false);
      this._notifyChange([...checkedKeys], null);
      if (!this._isControlledComponent()) {
        this._adapter.updateState({
          checkedKeys,
          halfCheckedKeys
        });
        this._adapter.rePositionDropdown();
      }
    }
    this._adapter.notifySelect(eventKey, false, item);
    this._adapter.rePositionDropdown();
  }
  clearInput() {
    const {
      flattenNodes,
      expandedKeys,
      selectedKeys,
      keyEntities,
      treeData
    } = this.getStates();
    const newExpandedKeys = new Set(expandedKeys);
    const isExpandControlled = this._isExpandControlled();
    const expandedOptsKeys = findAncestorKeys(selectedKeys, keyEntities);
    expandedOptsKeys.forEach((item) => newExpandedKeys.add(item));
    const newFlattenNodes = flattenTreeData(treeData, newExpandedKeys);
    this._adapter.updateState({
      expandedKeys: isExpandControlled ? expandedKeys : newExpandedKeys,
      flattenNodes: isExpandControlled ? flattenNodes : newFlattenNodes,
      inputValue: "",
      motionKeys: /* @__PURE__ */ new Set([]),
      filteredKeys: /* @__PURE__ */ new Set([]),
      filteredExpandedKeys: new Set(expandedOptsKeys),
      filteredShownKeys: /* @__PURE__ */ new Set([])
    });
  }
  handleInputChange(sugInput) {
    this._adapter.updateInputValue(sugInput);
    const {
      flattenNodes,
      expandedKeys,
      selectedKeys,
      keyEntities,
      treeData
    } = this.getStates();
    const {
      showFilteredOnly,
      filterTreeNode,
      treeNodeFilterProp
    } = this.getProps();
    const newExpandedKeys = new Set(expandedKeys);
    let filteredOptsKeys = [];
    let expandedOptsKeys = [];
    let newFlattenNodes = [];
    let filteredShownKeys = /* @__PURE__ */ new Set([]);
    if (!sugInput) {
      expandedOptsKeys = findAncestorKeys(selectedKeys, keyEntities);
      expandedOptsKeys.forEach((item) => newExpandedKeys.add(item));
      newFlattenNodes = flattenTreeData(treeData, newExpandedKeys);
    } else {
      filteredOptsKeys = Object.values(keyEntities).filter((item) => {
        const {
          data
        } = item;
        return filter(sugInput, data, filterTreeNode, treeNodeFilterProp);
      }).map((item) => item.key);
      expandedOptsKeys = findAncestorKeys(filteredOptsKeys, keyEntities, false);
      const shownChildKeys = findDescendantKeys(filteredOptsKeys, keyEntities, true);
      filteredShownKeys = /* @__PURE__ */ new Set([...shownChildKeys, ...expandedOptsKeys]);
      newFlattenNodes = flattenTreeData(treeData, new Set(expandedOptsKeys), showFilteredOnly && filteredShownKeys);
    }
    const newFilteredExpandedKeys = new Set(expandedOptsKeys);
    this._adapter.notifySearch(sugInput, Array.from(newFilteredExpandedKeys));
    this._adapter.updateState({
      expandedKeys: this._isExpandControlled() ? expandedKeys : newExpandedKeys,
      flattenNodes: this._isExpandControlled() ? flattenNodes : newFlattenNodes,
      motionKeys: /* @__PURE__ */ new Set([]),
      filteredKeys: new Set(filteredOptsKeys),
      filteredExpandedKeys: newFilteredExpandedKeys,
      filteredShownKeys
    });
  }
  handleNodeSelect(e, treeNode) {
    const isDisabled = this._isDisabled(treeNode);
    if (isDisabled) {
      return;
    }
    if (!this._isMultiple()) {
      this.handleSingleSelect(e, treeNode);
    } else {
      this.handleMultipleSelect(e, treeNode);
    }
  }
  handleSingleSelect(e, treeNode) {
    let {
      selectedKeys
    } = this.getCopyFromState("selectedKeys");
    const {
      clickToHide
    } = this.getProps();
    const {
      selected,
      eventKey,
      data
    } = treeNode;
    this._adapter.notifySelect(eventKey, true, data);
    if (!selectedKeys.includes(eventKey) && !selected) {
      selectedKeys = [eventKey];
      this._notifyChange(eventKey, e);
      if (!this._isControlledComponent()) {
        this._adapter.updateState({
          selectedKeys
        });
      }
    }
    if (clickToHide && (this._isSelectToClose() || !data.children)) {
      this.close(e);
      this.handlerTriggerBlur(e);
    }
  }
  calcCheckedKeys(eventKey, targetStatus) {
    const {
      keyEntities
    } = this.getStates();
    const {
      checkedKeys,
      halfCheckedKeys
    } = this.getCopyFromState(["checkedKeys", "halfCheckedKeys"]);
    if (targetStatus) {
      return calcCheckedKeysForChecked(eventKey, keyEntities, checkedKeys, halfCheckedKeys);
    } else {
      return calcCheckedKeysForUnchecked(eventKey, keyEntities, checkedKeys, halfCheckedKeys);
    }
  }
  handleMultipleSelect(e, treeNode) {
    const {
      searchPosition,
      disableStrictly,
      checkRelation
    } = this.getProps();
    const {
      inputValue,
      realCheckedKeys
    } = this.getStates();
    const {
      checked,
      eventKey,
      data
    } = treeNode;
    if (checkRelation === "related") {
      const targetStatus = disableStrictly ? this.calcCheckedStatus(!checked, eventKey) : !checked;
      const {
        checkedKeys,
        halfCheckedKeys
      } = disableStrictly ? this.calcNonDisabledCheckedKeys(eventKey, targetStatus) : this.calcCheckedKeys(eventKey, targetStatus);
      this._adapter.notifySelect(eventKey, targetStatus, data);
      this._notifyChange([...checkedKeys], e);
      if (!this._isControlledComponent()) {
        this._adapter.updateState({
          checkedKeys,
          halfCheckedKeys
        });
        this._adapter.rePositionDropdown();
      }
    } else if (checkRelation === "unRelated") {
      const newRealCheckedKeys = new Set(realCheckedKeys);
      let targetStatus;
      if (realCheckedKeys.has(eventKey)) {
        newRealCheckedKeys.delete(eventKey);
        targetStatus = false;
      } else {
        newRealCheckedKeys.add(eventKey);
        targetStatus = true;
      }
      this._adapter.notifySelect(eventKey, targetStatus, data);
      this._notifyChange([...newRealCheckedKeys], e);
      if (!this._isControlledComponent()) {
        this._adapter.updateState({
          realCheckedKeys: newRealCheckedKeys
        });
        this._adapter.rePositionDropdown();
      }
    }
    if (searchPosition === strings.SEARCH_POSITION_TRIGGER && inputValue !== "") {
      this._adapter.updateState({
        inputValue: ""
      });
    }
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
  handleNodeExpandInSearch(e, treeNode) {
    const {
      treeData,
      filteredShownKeys,
      keyEntities
    } = this.getStates();
    const showFilteredOnly = this._showFilteredOnly();
    const {
      filteredExpandedKeys
    } = this.getCopyFromState("filteredExpandedKeys");
    let motionType = "show";
    const {
      eventKey,
      expanded,
      data
    } = treeNode;
    if (!expanded) {
      filteredExpandedKeys.add(eventKey);
    } else if (filteredExpandedKeys.has(eventKey)) {
      filteredExpandedKeys.delete(eventKey);
      motionType = "hide";
    }
    this._adapter.cacheFlattenNodes(motionType === "hide" && this._isAnimated());
    if (!this._isExpandControlled()) {
      const flattenNodes = flattenTreeData(treeData, filteredExpandedKeys, showFilteredOnly && filteredShownKeys);
      const motionKeys = this._isAnimated() ? getMotionKeys(eventKey, filteredExpandedKeys, keyEntities) : [];
      const newState = {
        filteredExpandedKeys,
        flattenNodes,
        motionKeys: new Set(motionKeys),
        motionType
      };
      this._adapter.updateState(newState);
    }
    this._adapter.notifyExpand(filteredExpandedKeys, {
      expanded: !expanded,
      node: data
    });
  }
  handleNodeExpand(e, treeNode) {
    const {
      loadData
    } = this.getProps();
    const {
      inputValue,
      keyEntities
    } = this.getStates();
    const isSearching = Boolean(inputValue);
    if (!loadData && (!treeNode.children || !treeNode.children.length)) {
      return;
    }
    const isExpandControlled = this._isExpandControlled();
    if (isSearching && !isExpandControlled) {
      this.handleNodeExpandInSearch(e, treeNode);
      return;
    }
    const {
      treeData
    } = this.getStates();
    const {
      expandedKeys
    } = this.getCopyFromState("expandedKeys");
    let motionType = "show";
    const {
      eventKey,
      expanded,
      data
    } = treeNode;
    if (!expanded) {
      expandedKeys.add(eventKey);
    } else if (expandedKeys.has(eventKey)) {
      expandedKeys.delete(eventKey);
      motionType = "hide";
    }
    this._adapter.cacheFlattenNodes(motionType === "hide" && this._isAnimated());
    if (!isExpandControlled) {
      const flattenNodes = flattenTreeData(treeData, expandedKeys);
      const motionKeys = this._isAnimated() ? getMotionKeys(eventKey, expandedKeys, keyEntities) : [];
      const newState = {
        expandedKeys,
        flattenNodes,
        motionKeys: new Set(motionKeys),
        motionType
      };
      this._adapter.updateState(newState);
    }
    this._adapter.notifyExpand(expandedKeys, {
      expanded: !expanded,
      node: data
    });
  }
  /**
   * The selected items that need to be displayed in the search box when obtaining a single selection
   */
  getRenderTextInSingle() {
    const {
      renderSelectedItem: propRenderSelectedItem,
      treeNodeLabelProp
    } = this.getProps();
    const {
      selectedKeys,
      keyEntities
    } = this.getStates();
    const renderSelectedItem = (0, import_isFunction.default)(propRenderSelectedItem) ? propRenderSelectedItem : (item2) => (0, import_get.default)(item2, treeNodeLabelProp, null);
    let item;
    if (selectedKeys.length) {
      const key = selectedKeys[0];
      item = keyEntities[key] && keyEntities[key].data.key === key ? keyEntities[key].data : this.getDataForKeyNotInKeyEntities(key);
    }
    const renderText = item && treeNodeLabelProp in item ? renderSelectedItem(item) : null;
    return renderText;
  }
  /**
   * When the search box is on the trigger, the blur event handling method
   */
  handleInputTriggerBlur() {
    this._adapter.updateState({
      inputTriggerFocus: false
    });
  }
  /**
   * When the search box is on the trigger, the focus event processing method
   */
  handleInputTriggerFocus() {
    this.clearInput();
    this._adapter.updateState({
      inputTriggerFocus: true
    });
  }
  setLoadKeys(data, resolve) {
    this._adapter.updateLoadKeys(data, resolve);
  }
};
export {
  TreeSelectFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_treeSelect_foundation.js.map
