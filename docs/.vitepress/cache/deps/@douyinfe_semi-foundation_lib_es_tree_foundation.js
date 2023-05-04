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
  calcCheckedKeys,
  calcCheckedKeysForChecked,
  calcCheckedKeysForUnchecked,
  calcDropActualPosition,
  calcDropRelativePosition,
  filter,
  findAncestorKeys,
  findDescendantKeys,
  flattenTreeData,
  getDragNodesKeys,
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
import {
  require_pick
} from "./chunk-NNIGO4FV.js";
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
import "./chunk-RSVADYER.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import {
  require_isUndefined
} from "./chunk-V52XL574.js";
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
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/tree/foundation.js
var import_get = __toESM(require_get());
var import_cloneDeep = __toESM(require_cloneDeep());
var import_pick = __toESM(require_pick());
var import_difference = __toESM(require_difference());
var import_isUndefined = __toESM(require_isUndefined());
var TreeFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.clearDragState = () => {
      this._adapter.updateState({
        dragOverNodeKey: "",
        dragging: false
      });
    };
  }
  _isMultiple() {
    return this.getProp("multiple");
  }
  _isAnimated() {
    return this.getProp("motion");
  }
  _isDisabled() {
    let treeNode = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.getProp("disabled") || treeNode.disabled;
  }
  _isExpandControlled() {
    return !(0, import_isUndefined.default)(this.getProp("expandedKeys"));
  }
  _isLoadControlled() {
    return !(0, import_isUndefined.default)(this.getProp("loadedKeys"));
  }
  _isFilterable() {
    return Boolean(this.getProp("filterTreeNode"));
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
      loadedKeys = /* @__PURE__ */ new Set([]),
      loadingKeys = /* @__PURE__ */ new Set([]),
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
      expanded: isSearching ? filteredExpandedKeys.has(key) : expandedKeys.has(key),
      selected: selectedKeys.includes(key),
      checked: realChecked,
      halfChecked: realHalfChecked,
      pos: String(entity ? entity.pos : ""),
      level: entity.level,
      filtered: filteredKeys.has(key),
      loading: loadingKeys.has(key) && !loadedKeys.has(key),
      loaded: loadedKeys.has(key),
      keyword: inputValue,
      treeNodeFilterProp
    };
    if (this.getProp("disableStrictly") && disabledKeys.has(key)) {
      treeNodeProps.disabled = true;
    }
    return treeNodeProps;
  }
  notifyJsonChange(key, e) {
    const data = this.getProp("treeDataSimpleJson");
    const selectedPath = normalizedArr(key).map((i) => i.replace("-", "."));
    const value = (0, import_pick.default)(data, selectedPath);
    this._adapter.notifyChange(value);
  }
  notifyMultipleChange(key, e) {
    const {
      keyEntities
    } = this.getStates();
    const {
      leafOnly,
      checkRelation
    } = this.getProps();
    let value;
    let keyList = [];
    if (checkRelation === "related") {
      keyList = normalizeKeyList(key, keyEntities, leafOnly);
    } else if (checkRelation === "unRelated") {
      keyList = key;
    }
    if (this.getProp("onChangeWithObject")) {
      value = keyList.map((itemKey) => keyEntities[itemKey].data);
    } else {
      value = getValueOrKey(keyList.map((itemKey) => keyEntities[itemKey].data));
    }
    this._adapter.notifyChange(value);
  }
  notifyChange(key, e) {
    const isMultiple = this._isMultiple();
    const {
      keyEntities
    } = this.getStates();
    if (this.getProp("treeDataSimpleJson")) {
      this.notifyJsonChange(key, e);
    } else if (isMultiple) {
      this.notifyMultipleChange(key, e);
    } else {
      let value;
      if (this.getProp("onChangeWithObject")) {
        value = (0, import_get.default)(keyEntities, key).data;
      } else {
        const {
          data
        } = (0, import_get.default)(keyEntities, key);
        value = getValueOrKey(data);
      }
      this._adapter.notifyChange(value);
    }
  }
  handleInputChange(sugInput) {
    this._adapter.updateInputValue(sugInput);
    const {
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
    let filteredOptsKeys = [];
    let expandedOptsKeys = [];
    let flattenNodes = [];
    let filteredShownKeys = /* @__PURE__ */ new Set([]);
    if (!sugInput) {
      expandedOptsKeys = findAncestorKeys(selectedKeys, keyEntities);
      expandedOptsKeys.forEach((item) => expandedKeys.add(item));
      flattenNodes = flattenTreeData(treeData, expandedKeys);
    } else {
      filteredOptsKeys = Object.values(keyEntities).filter((item) => filter(sugInput, item.data, filterTreeNode, treeNodeFilterProp)).map((item) => item.key);
      expandedOptsKeys = findAncestorKeys(filteredOptsKeys, keyEntities, false);
      const shownChildKeys = findDescendantKeys(filteredOptsKeys, keyEntities, true);
      filteredShownKeys = /* @__PURE__ */ new Set([...shownChildKeys, ...expandedOptsKeys]);
      flattenNodes = flattenTreeData(treeData, new Set(expandedOptsKeys), showFilteredOnly && filteredShownKeys);
    }
    this._adapter.notifySearch(sugInput);
    this._adapter.updateState({
      expandedKeys,
      flattenNodes,
      motionKeys: /* @__PURE__ */ new Set([]),
      filteredKeys: new Set(filteredOptsKeys),
      filteredExpandedKeys: new Set(expandedOptsKeys),
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
  handleNodeRightClick(e, treeNode) {
    this._adapter.notifyRightClick(e, treeNode.data);
  }
  handleNodeDoubleClick(e, treeNode) {
    this._adapter.notifyDoubleClick(e, treeNode.data);
  }
  handleSingleSelect(e, treeNode) {
    let {
      selectedKeys
    } = this.getCopyFromState("selectedKeys");
    const {
      selected,
      eventKey,
      data
    } = treeNode;
    const targetSelected = !selected;
    this._adapter.notifySelect(eventKey, true, data);
    if (!targetSelected) {
      return;
    }
    if (!selectedKeys.includes(eventKey)) {
      selectedKeys = [eventKey];
      this.notifyChange(eventKey, e);
      if (!this._isControlledComponent()) {
        this._adapter.updateState({
          selectedKeys
        });
      }
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
    return targetStatus ? calcCheckedKeysForChecked(eventKey, keyEntities, checkedKeys, halfCheckedKeys) : calcCheckedKeysForUnchecked(eventKey, keyEntities, checkedKeys, halfCheckedKeys);
  }
  /*
  * Compute the checked state of the node
  */
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
  /*
  * In strict disable mode, calculate the nodes of checked and halfCheckedKeys and return their corresponding keys
  */
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
  /*
  * Handle the selection event in the case of multiple selection
  */
  handleMultipleSelect(e, treeNode) {
    const {
      disableStrictly,
      checkRelation
    } = this.getProps();
    const {
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
      this.notifyChange([...checkedKeys], e);
      if (!this._isControlledComponent()) {
        this._adapter.updateState({
          checkedKeys,
          halfCheckedKeys
        });
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
      this.notifyChange([...newRealCheckedKeys], e);
      if (!this._isControlledComponent()) {
        this._adapter.updateState({
          realCheckedKeys: newRealCheckedKeys
        });
      }
    }
  }
  setExpandedStatus(treeNode) {
    const {
      inputValue,
      treeData,
      filteredShownKeys,
      keyEntities
    } = this.getStates();
    const isSearching = Boolean(inputValue);
    const showFilteredOnly = this._showFilteredOnly();
    const expandedStateKey = isSearching ? "filteredExpandedKeys" : "expandedKeys";
    const expandedKeys = this.getCopyFromState(expandedStateKey)[expandedStateKey];
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
    if (!this._isExpandControlled()) {
      const flattenNodes = flattenTreeData(treeData, expandedKeys, isSearching && showFilteredOnly && filteredShownKeys);
      const motionKeys = this._isAnimated() ? getMotionKeys(eventKey, expandedKeys, keyEntities) : [];
      const newState = {
        [expandedStateKey]: expandedKeys,
        flattenNodes,
        motionKeys: new Set(motionKeys),
        motionType
      };
      this._adapter.updateState(newState);
    }
    return {
      expandedKeys,
      expanded: !expanded,
      data
    };
  }
  handleNodeExpand(e, treeNode) {
    const {
      loadData
    } = this.getProps();
    if (!loadData && (!treeNode.children || !treeNode.children.length)) {
      return;
    }
    const {
      expandedKeys,
      data,
      expanded
    } = this.setExpandedStatus(treeNode);
    this._adapter.notifyExpand(expandedKeys, {
      expanded,
      node: data
    });
  }
  // eslint-disable-next-line max-len
  handleNodeLoad(loadedKeys, loadingKeys, data, resolve) {
    const {
      loadData,
      onLoad
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
      onLoad && onLoad(newLoadedKeys, data);
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
  // Drag and drop related processing logic
  getDragEventNodeData(node) {
    return Object.assign(Object.assign({}, node.data), (0, import_pick.default)(node, ["expanded", "pos", "children"]));
  }
  triggerDragEvent(name, event, node) {
    let extra = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const callEvent = this.getProp(name);
    callEvent && callEvent(Object.assign({
      event,
      node: this.getDragEventNodeData(node)
    }, extra));
  }
  handleNodeDragStart(e, treeNode) {
    const {
      keyEntities
    } = this.getStates();
    const {
      hideDraggingNode,
      renderDraggingNode
    } = this.getProps();
    const {
      eventKey,
      nodeInstance,
      data
    } = treeNode;
    if (hideDraggingNode || renderDraggingNode) {
      let dragImg;
      if (typeof renderDraggingNode === "function") {
        dragImg = renderDraggingNode(nodeInstance, data);
      } else if (hideDraggingNode) {
        dragImg = nodeInstance.cloneNode(true);
        dragImg.style.opacity = 0;
      }
      document.body.appendChild(dragImg);
      e.dataTransfer.setDragImage(dragImg, 0, 0);
    }
    this._adapter.setDragNode(treeNode);
    this._adapter.updateState({
      dragging: true,
      dragNodesKeys: new Set(getDragNodesKeys(eventKey, keyEntities))
    });
    this.triggerDragEvent("onDragStart", e, treeNode);
  }
  handleNodeDragEnter(e, treeNode, dragNode) {
    const {
      dragging,
      dragNodesKeys
    } = this.getStates();
    const {
      autoExpandWhenDragEnter
    } = this.getProps();
    const {
      pos,
      eventKey,
      expanded
    } = treeNode;
    if (!dragNode || dragNodesKeys.has(eventKey)) {
      return;
    }
    const dropPosition = calcDropRelativePosition(e, treeNode);
    if (dragNode.eventKey === eventKey && dropPosition === 0) {
      this._adapter.updateState({
        dragOverNodeKey: "",
        dropPosition: null
      });
      return;
    }
    setTimeout(() => {
      this._adapter.updateState({
        dragOverNodeKey: eventKey,
        dropPosition
      });
      if (!autoExpandWhenDragEnter || expanded) {
        this.triggerDragEvent("onDragEnter", e, treeNode);
        return;
      }
      if (!this.delayedDragEnterLogic) {
        this.delayedDragEnterLogic = {};
      }
      Object.keys(this.delayedDragEnterLogic).forEach((key) => {
        clearTimeout(this.delayedDragEnterLogic[key]);
      });
      this.delayedDragEnterLogic[pos] = window.setTimeout(() => {
        if (!dragging) {
          return;
        }
        const {
          expandedKeys: newExpandedKeys
        } = this.setExpandedStatus(treeNode);
        this.triggerDragEvent("onDragEnter", e, treeNode, {
          expandedKeys: [...newExpandedKeys]
        });
      }, 400);
    }, 0);
  }
  handleNodeDragOver(e, treeNode, dragNode) {
    const {
      dropPosition,
      dragNodesKeys,
      dragOverNodeKey
    } = this.getStates();
    const {
      eventKey
    } = treeNode;
    if (dragNodesKeys.has(eventKey)) {
      return;
    }
    if (dragNode && eventKey === dragOverNodeKey) {
      const newPos = calcDropRelativePosition(e, treeNode);
      if (dropPosition === newPos) {
        return;
      }
      this._adapter.updateState({
        dropPosition: newPos
      });
    }
    this.triggerDragEvent("onDragOver", e, treeNode);
  }
  handleNodeDragLeave(e, treeNode) {
    this._adapter.updateState({
      dragOverNodeKey: ""
    });
    this.triggerDragEvent("onDragLeave", e, treeNode);
  }
  handleNodeDragEnd(e, treeNode) {
    this.clearDragState();
    this.triggerDragEvent("onDragEnd", e, treeNode);
    this._adapter.setDragNode(null);
  }
  handleNodeDrop(e, treeNode, dragNode) {
    const {
      dropPosition,
      dragNodesKeys
    } = this.getStates();
    const {
      eventKey,
      pos
    } = treeNode;
    this.clearDragState();
    if (dragNodesKeys.has(eventKey)) {
      return;
    }
    const dropRes = {
      dragNode: dragNode ? this.getDragEventNodeData(dragNode) : null,
      dragNodesKeys: [...dragNodesKeys],
      dropPosition: calcDropActualPosition(pos, dropPosition),
      dropToGap: dropPosition !== 0
    };
    this.triggerDragEvent("onDrop", e, treeNode, dropRes);
    this._adapter.setDragNode(null);
  }
};
export {
  TreeFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_tree_foundation.js.map
