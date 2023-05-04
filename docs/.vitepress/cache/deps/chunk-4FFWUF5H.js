import {
  require_isEqual
} from "./chunk-YUKK2YVM.js";
import {
  require_isNull
} from "./chunk-R5O5CDBP.js";
import {
  strings
} from "./chunk-CUMG5UHN.js";
import {
  require_isUndefined
} from "./chunk-V52XL574.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/cascader/util.js
var import_isEqual = __toESM(require_isEqual());
var import_isUndefined = __toESM(require_isUndefined());
var import_isNull = __toESM(require_isNull());
function getPosition(level, index) {
  return `${level}-${index}`;
}
function isValid(val) {
  return !(0, import_isNull.default)(val) && !(0, import_isUndefined.default)(val);
}
function normalizedArr(val) {
  if (!Array.isArray(val)) {
    return [val];
  } else {
    return val;
  }
}
function traverseDataNodes(treeNodes, callback) {
  const processNode = (node, ind, parent) => {
    const children = node ? node.children : treeNodes;
    let item = null;
    if (node) {
      const key = parent ? getPosition(parent.key, ind) : `${ind}`;
      item = {
        data: Object.assign({}, node),
        ind,
        key,
        level: parent ? parent.level + 1 : 0,
        parentKey: parent ? parent.key : null,
        path: parent ? [...parent.path, key] : [key],
        valuePath: parent ? [...parent.valuePath, node.value] : [node.value]
      };
      callback(item);
    }
    if (children) {
      children.forEach((subNode, subIndex) => {
        processNode(subNode, subIndex, item);
      });
    }
  };
  processNode(null);
}
function convertDataToEntities(dataNodes) {
  const keyEntities = {};
  traverseDataNodes(dataNodes, (data) => {
    const {
      key,
      parentKey
    } = data;
    const entity = Object.assign({}, data);
    keyEntities[key] = entity;
    entity.parent = keyEntities[parentKey];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }
  });
  return keyEntities;
}
function findKeysForValues(value, keyEntities) {
  const valuePath = normalizedArr(value);
  const res = Object.values(keyEntities).filter((item) => (0, import_isEqual.default)(item.valuePath, valuePath)).map((item) => item.key);
  return res;
}
function calcMergeType(autoMergeValue, leafOnly) {
  let mergeType;
  if (leafOnly) {
    mergeType = strings.LEAF_ONLY_MERGE_TYPE;
  } else if (autoMergeValue) {
    mergeType = strings.AUTO_MERGE_VALUE_MERGE_TYPE;
  } else {
    mergeType = strings.NONE_MERGE_TYPE;
  }
  return mergeType;
}

export {
  isValid,
  normalizedArr,
  convertDataToEntities,
  findKeysForValues,
  calcMergeType
};
//# sourceMappingURL=chunk-4FFWUF5H.js.map
