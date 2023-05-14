import {
  strings
} from "./chunk-R6JD7T2E.js";
import {
  require_omit
} from "./chunk-7P6IIOLF.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/transfer/transferUtils.js
var import_omit = __toESM(require_omit());
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function _generateGroupedData(dataSource) {
  const newData = [];
  for (const group of dataSource) {
    group.children.forEach((item) => {
      const {
        children
      } = group, rest = __rest(group, ["children"]);
      newData.push(Object.assign(Object.assign({}, item), {
        _parent: rest
      }));
    });
  }
  return newData;
}
function _generateTreeData(dataSource) {
  const newData = [];
  const stack = [...dataSource].reverse();
  while (stack.length) {
    const current = stack.pop();
    current.path = current.path || [(0, import_omit.default)(current, ["children"])];
    if (current.children && Array.isArray(current.children)) {
      const nodes = current.children;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const child = Object.assign({}, nodes[i]);
        child.path = [].concat(current.path).concat((0, import_omit.default)(child, ["children"]));
        stack.push(child);
      }
    } else {
      current.isLeaf = true;
    }
    newData.push((0, import_omit.default)(current, ["children"]));
  }
  return newData;
}
function _generateDataByType(dataSource, type) {
  const newData = dataSource.slice() || [];
  if (type === strings.TYPE_GROUP_LIST) {
    return _generateGroupedData(newData);
  }
  if (type === strings.TYPE_TREE_TO_LIST) {
    return _generateTreeData(newData);
  }
  return newData;
}
function _generateSelectedItems(value, data) {
  const selectedItems = /* @__PURE__ */ new Map();
  value.forEach((val) => {
    const index = data.findIndex((option) => option.value === val);
    if (index !== -1) {
      const option = data[index];
      selectedItems.set(option.key, option);
    }
  });
  return selectedItems;
}

export {
  _generateGroupedData,
  _generateTreeData,
  _generateDataByType,
  _generateSelectedItems
};
//# sourceMappingURL=chunk-FQKTV5T4.js.map
