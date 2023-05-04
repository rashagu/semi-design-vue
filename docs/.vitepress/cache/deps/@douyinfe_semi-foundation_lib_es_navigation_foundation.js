import {
  numbers,
  strings
} from "./chunk-CTOWQDXA.js";
import {
  isNullOrUndefined
} from "./chunk-6OL7JQEH.js";
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
import "./chunk-WCAXN4E7.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/navigation/foundation.js
var import_get = __toESM(require_get());

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/navigation/NavItem.js
var DEFAULT_TOGGLE_ICON = {
  open: "chevron_up",
  closed: "chevron_down"
};
var NavItem = class {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (options == null || typeof options !== "object") {
      options = {
        text: options,
        itemKey: options,
        maxHeight: numbers.DEFAULT_SUBNAV_MAX_HEIGHT,
        // selected: false,
        // isOpen: false,
        link: null,
        items: null,
        icon: "",
        indent: false
      };
    }
    for (const key of Object.keys(options)) {
      this[key] = options[key];
    }
    if (options.items && Array.isArray(options.items) && options.items.length) {
      this.items = options.items.map((item) => new NavItem(item));
      if ("toggleIcon" in options) {
        this.toggleIcon = NavItem.isValidToggleIcon(options.toggleIcon) ? Object.assign({}, options.toggleIcon) : Object.assign({}, DEFAULT_TOGGLE_ICON);
      } else {
        this.toggleIcon = Object.assign({}, DEFAULT_TOGGLE_ICON);
      }
    } else {
      this.items = null;
    }
  }
  static isValidToggleIcon(toggleIcon) {
    return Boolean(toggleIcon && typeof toggleIcon === "object" && typeof toggleIcon.open === "string" && toggleIcon.open.length && typeof toggleIcon.closed === "string" && toggleIcon.closed.length);
  }
};

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/navigation/foundation.js
var NavigationFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  /* istanbul ignore next */
  static getZeroParentKeys() {
    let itemKeysMap = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const willAddKeys = [];
    for (var _len = arguments.length, itemKeys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      itemKeys[_key - 1] = arguments[_key];
    }
    if (itemKeys.length) {
      for (const itemKey of itemKeys) {
        if (Array.isArray(itemKeysMap[itemKey]) && itemKeysMap[itemKey].length) {
          const levelZeroParentKey = itemKeysMap[itemKey][0];
          if (!isNullOrUndefined(levelZeroParentKey)) {
            willAddKeys.push(levelZeroParentKey);
          }
        }
      }
    }
    return willAddKeys;
  }
  static buildItemKeysMap() {
    let items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let keysMap = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let parentKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    let keyPropName = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "itemKey";
    if (Array.isArray(items) && items.length) {
      for (const item of items) {
        if (Array.isArray(item)) {
          NavigationFoundation.buildItemKeysMap(item, keysMap, [...parentKeys], keyPropName);
        } else {
          let itemKey;
          if (item && typeof item === "object") {
            itemKey = item[keyPropName] || item.props && item.props[keyPropName];
          }
          if (itemKey) {
            keysMap[itemKey] = [...parentKeys];
            if (Array.isArray(item.items) && item.items.length) {
              NavigationFoundation.buildItemKeysMap(item.items, keysMap, [...parentKeys, itemKey], keyPropName);
            } else if (item.props && item.props.children) {
              const children = Array.isArray(item.props.children) ? item.props.children : [item.props.children];
              NavigationFoundation.buildItemKeysMap(children, keysMap, [...parentKeys, itemKey], keyPropName);
            }
          }
        }
      }
    }
    return keysMap;
  }
  /**
   * init is called in constructor and componentDidMount.
   * if you want to update state in constructor, please add it to return object;
   * if you want to update state in componentDidMount, please call adapter in else logic.
   * @param {*} lifecycle
   * @returns
   */
  init(lifecycle) {
    const {
      defaultSelectedKeys,
      selectedKeys
    } = this.getProps();
    let willSelectedKeys = selectedKeys || defaultSelectedKeys || [];
    const {
      itemKeysMap,
      willOpenKeys,
      formattedItems
    } = this.getCalcState();
    const parentSelectKeys = this.selectLevelZeroParentKeys(itemKeysMap, willSelectedKeys);
    willSelectedKeys = willSelectedKeys.concat(parentSelectKeys);
    if (lifecycle === "constructor") {
      return {
        selectedKeys: willSelectedKeys,
        itemKeysMap,
        openKeys: willOpenKeys,
        items: formattedItems
      };
    } else {
      this._adapter.updateSelectedKeys(willSelectedKeys);
      this._adapter.setItemKeysMap(itemKeysMap);
      this._adapter.updateOpenKeys(willOpenKeys);
      this._adapter.updateItems(formattedItems);
      this._adapter.setItemsChanged(true);
    }
    return void 0;
  }
  /**
   * Get the state to be calculated
   */
  getCalcState() {
    const {
      itemKeysMap,
      formattedItems
    } = this.getFormattedItems();
    const willOpenKeys = this.getWillOpenKeys(itemKeysMap);
    return {
      itemKeysMap,
      willOpenKeys,
      formattedItems
    };
  }
  /**
   * Calculate formatted items and itemsKeyMap
   */
  getFormattedItems() {
    const {
      items,
      children
    } = this.getProps();
    const formattedItems = this.formatItems(items);
    const willHandleItems = Array.isArray(items) && items.length ? formattedItems : children;
    const itemKeysMap = NavigationFoundation.buildItemKeysMap(willHandleItems);
    return {
      itemKeysMap,
      formattedItems
    };
  }
  /**
   * Calculate the keys that will need to be opened soon
   * @param {*} itemKeysMap
   */
  getWillOpenKeys(itemKeysMap) {
    const {
      defaultOpenKeys,
      openKeys,
      defaultSelectedKeys,
      selectedKeys,
      mode
    } = this.getProps();
    let willOpenKeys = openKeys || defaultOpenKeys || [];
    if (!(Array.isArray(defaultOpenKeys) || Array.isArray(openKeys)) && mode === strings.MODE_VERTICAL && (Array.isArray(defaultSelectedKeys) || Array.isArray(selectedKeys))) {
      const currentSelectedKeys = Array.isArray(selectedKeys) ? selectedKeys : defaultSelectedKeys;
      willOpenKeys = this.getShouldOpenKeys(itemKeysMap, currentSelectedKeys);
    }
    return [...willOpenKeys];
  }
  getShouldOpenKeys() {
    let itemKeysMap = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let selectedKeys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    const willOpenKeySet = /* @__PURE__ */ new Set();
    if (Array.isArray(selectedKeys) && selectedKeys.length) {
      selectedKeys.forEach((item) => {
        if (item) {
          const parentKeys = (0, import_get.default)(itemKeysMap, item);
          if (Array.isArray(parentKeys)) {
            parentKeys.forEach((k) => willOpenKeySet.add(k));
          }
        }
      });
    }
    return [...willOpenKeySet];
  }
  destroy() {
  }
  // eslint-disable-line
  selectLevelZeroParentKeys(itemKeysMap) {
    const _itemKeysMap = isNullOrUndefined(itemKeysMap) ? this.getState("itemKeysMap") : itemKeysMap;
    const willAddKeys = [];
    for (var _len2 = arguments.length, itemKeys = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      itemKeys[_key2 - 1] = arguments[_key2];
    }
    if (itemKeys.length) {
      for (const itemKey of itemKeys) {
        if (Array.isArray(_itemKeysMap[itemKey]) && _itemKeysMap[itemKey].length) {
          const levelZeroParentKey = _itemKeysMap[itemKey][0];
          if (!isNullOrUndefined(levelZeroParentKey)) {
            willAddKeys.push(levelZeroParentKey);
          }
        }
      }
    }
    if (willAddKeys.length) {
      return willAddKeys;
    }
    return [];
  }
  formatItems() {
    let items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const formattedItems = [];
    for (const item of items) {
      formattedItems.push(new NavItem(item));
    }
    return formattedItems;
  }
  handleSelect(data) {
    this._adapter.notifySelect(data);
  }
  /* istanbul ignore next */
  judgeIfOpen(openKeys, items) {
    let shouldBeOpen = false;
    const _openKeys = Array.isArray(openKeys) ? openKeys : openKeys && [openKeys];
    if (_openKeys && Array.isArray(items) && items.length) {
      for (const item of items) {
        shouldBeOpen = _openKeys.includes(item.itemKey) || this.judgeIfOpen(_openKeys, item.items);
        if (shouldBeOpen) {
          break;
        }
      }
    }
    return shouldBeOpen;
  }
  handleCollapseChange() {
    const isCollapsed = !this.getState("isCollapsed");
    if (!this._isControlledComponent("isCollapsed")) {
      this._adapter.setIsCollapsed(isCollapsed);
    }
    this._adapter.notifyCollapseChange(isCollapsed);
  }
  handleItemsChange(isChanged) {
    this._adapter.setItemsChanged(isChanged);
  }
};
export {
  NavigationFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_navigation_foundation.js.map
