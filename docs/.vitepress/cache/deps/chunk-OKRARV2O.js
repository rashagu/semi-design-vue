import {
  Logger_default
} from "./chunk-2BEXMFB4.js";
import {
  require_baseEach,
  require_filter
} from "./chunk-JWS2E6MO.js";
import {
  numbers,
  strings
} from "./chunk-IIDJ3K4P.js";
import {
  require_find,
  require_findIndex
} from "./chunk-FEMUKZWK.js";
import {
  require_baseIteratee
} from "./chunk-VPJII4ZW.js";
import {
  require_includes
} from "./chunk-GRE7MUIS.js";
import {
  require_isIterateeCall
} from "./chunk-EGPIATU2.js";
import {
  require_arrayEach
} from "./chunk-VS2OXD4D.js";
import {
  require_arraySome,
  require_baseIsEqual
} from "./chunk-HPYJEDL6.js";
import {
  isNullOrUndefined
} from "./chunk-6OL7JQEH.js";
import {
  require_identity
} from "./chunk-3ISLXTGF.js";
import {
  require_get
} from "./chunk-HGGG6L4M.js";
import {
  require_toString
} from "./chunk-ZZORV55O.js";
import {
  require_isFunction
} from "./chunk-X27LVEKC.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseSome.js
var require_baseSome = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseSome.js"(exports, module) {
    var baseEach = require_baseEach();
    function baseSome(collection, predicate) {
      var result;
      baseEach(collection, function(value, index, collection2) {
        result = predicate(value, index, collection2);
        return !result;
      });
      return !!result;
    }
    module.exports = baseSome;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/some.js
var require_some = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/some.js"(exports, module) {
    var arraySome = require_arraySome();
    var baseIteratee = require_baseIteratee();
    var baseSome = require_baseSome();
    var isArray = require_isArray();
    var isIterateeCall = require_isIterateeCall();
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = void 0;
      }
      return func(collection, baseIteratee(predicate, 3));
    }
    module.exports = some;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castFunction.js
var require_castFunction = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castFunction.js"(exports, module) {
    var identity = require_identity();
    function castFunction(value) {
      return typeof value == "function" ? value : identity;
    }
    module.exports = castFunction;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/forEach.js
var require_forEach = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/forEach.js"(exports, module) {
    var arrayEach = require_arrayEach();
    var baseEach = require_baseEach();
    var castFunction = require_castFunction();
    var isArray = require_isArray();
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, castFunction(iteratee));
    }
    module.exports = forEach;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/each.js
var require_each = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/each.js"(exports, module) {
    module.exports = require_forEach();
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqualWith.js
var require_isEqualWith = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqualWith.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == "function" ? customizer : void 0;
      var result = customizer ? customizer(value, other) : void 0;
      return result === void 0 ? baseIsEqual(value, other, void 0, customizer) : !!result;
    }
    module.exports = isEqualWith;
  }
});

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/table/utils.js
var import_isFunction = __toESM(require_isFunction());
var import_toString = __toESM(require_toString());
var import_includes = __toESM(require_includes());
var import_some = __toESM(require_some());
var import_findIndex = __toESM(require_findIndex());
var import_each = __toESM(require_each());
var import_find = __toESM(require_find());
var import_filter = __toESM(require_filter());
var import_get = __toESM(require_get());
var import_isEqualWith = __toESM(require_isEqualWith());
function equalWith(value, other, customizer) {
  return (0, import_isEqualWith.default)(value, other, function(objVal, othVal) {
    if (typeof objVal === "function" && typeof othVal === "function") {
      return (0, import_toString.default)(objVal) === (0, import_toString.default)(othVal);
    }
    if (typeof customizer === "function") {
      for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }
      return customizer(objVal, othVal, ...rest);
    }
    return void 0;
  });
}
function getColumnKey(column, keyPropNames) {
  keyPropNames = Array.isArray(keyPropNames) ? keyPropNames : ["key", "dataIndex"];
  let key = null;
  (0, import_each.default)(keyPropNames, (propName) => {
    key = (0, import_get.default)(column, propName);
    if (key != null) {
      return false;
    }
    return void 0;
  });
  return key;
}
function arrayAdd() {
  let arr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  let beginIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  let endIndex = arguments.length > 2 ? arguments[2] : void 0;
  beginIndex = beginIndex < 0 || typeof beginIndex !== "number" ? 0 : beginIndex;
  endIndex = endIndex > arr.length || typeof endIndex !== "number" ? arr.length : endIndex;
  let result = 0;
  (0, import_each.default)(arr, (value, index) => {
    if (index >= beginIndex && index < endIndex) {
      result += typeof value === "number" && !isNaN(value) ? value : 0;
    }
  });
  return result;
}
function isLastLeftFixed(columns, column) {
  let checkKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ["key"];
  const leftFixedColumns = (0, import_filter.default)(columns, (col) => col.fixed === true || col.fixed === "left");
  const index = (0, import_findIndex.default)(leftFixedColumns, (col) => checkKeys.every((key) => col[key] != null && col[key] === column[key]));
  return leftFixedColumns.length > 0 && index === leftFixedColumns.length - 1;
}
function isFirstFixedRight(columns, column) {
  let checkKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ["key"];
  const rightFixedColumns = (0, import_filter.default)(columns, (col) => col.fixed === "right");
  const index = (0, import_findIndex.default)(rightFixedColumns, (col) => checkKeys.every((key) => col[key] != null && col[key] === column[key]));
  return rightFixedColumns.length > 0 && index === 0;
}
function isAnyFixed(columns) {
  let fixedSet = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["left", true, "right"];
  if (typeof fixedSet === "string" || typeof fixedSet === "boolean") {
    fixedSet = [fixedSet];
  }
  return fixedSet.length > 0 && (0, import_some.default)(columns, (col) => fixedSet.includes(col.fixed));
}
function isAnyFixedRight(columns) {
  return (0, import_some.default)(columns, (col) => col.fixed === "right");
}
function isFixedLeft(column) {
  return ["left", true].includes((0, import_get.default)(column, "fixed"));
}
function isFixedRight(column) {
  return ["right"].includes((0, import_get.default)(column, "fixed"));
}
function isFixed(column) {
  return isFixedLeft(column) || isFixedRight(column);
}
function isInnerColumnKey(key) {
  return [strings.DEFAULT_KEY_COLUMN_EXPAND, strings.DEFAULT_KEY_COLUMN_SCROLLBAR, strings.DEFAULT_KEY_COLUMN_SELECTION].includes(key);
}
function isExpandedColumn(column) {
  return (0, import_get.default)(column, "key") === strings.DEFAULT_KEY_COLUMN_EXPAND;
}
function isScrollbarColumn(column) {
  return (0, import_get.default)(column, "key") === strings.DEFAULT_KEY_COLUMN_SCROLLBAR;
}
function isSelectionColumn(column) {
  return (0, import_get.default)(column, "key") === strings.DEFAULT_KEY_COLUMN_SELECTION;
}
function filterColumns(columns) {
  let ignoreKeys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [strings.DEFAULT_KEY_COLUMN_SCROLLBAR];
  return (0, import_filter.default)(columns, (col) => !ignoreKeys.includes(col.key));
}
function getScrollbarColumnWidth() {
  let columns = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const len = columns.length;
  if (len) {
    const lastColumn = columns[len - 1];
    if ((0, import_get.default)(lastColumn, "key") === strings.DEFAULT_KEY_COLUMN_SCROLLBAR) {
      return (0, import_get.default)(lastColumn, "width", 0);
    }
  }
}
function getRecordKey(record, rowKey) {
  if (rowKey === void 0) {
    rowKey = "key";
  }
  return typeof rowKey === "function" ? rowKey(record) : (0, import_get.default)(record, rowKey);
}
function isExpanded(expandedRowKeys, key) {
  return key != null && (0, import_includes.default)(expandedRowKeys, key);
}
function isSelected(selectedRowKeysSet, key) {
  return key !== null && selectedRowKeysSet.has(key);
}
function isDisabled(disabledRowKeysSet, key) {
  return key !== null && disabledRowKeysSet.has(key);
}
function getRecord(data, recordKey, rowKey) {
  if (rowKey === void 0) {
    rowKey = "key";
  }
  return (0, import_find.default)(data, (record) => recordKey != null && recordKey !== "" && getRecordKey(record, rowKey) === recordKey);
}
function getRecordChildren(record, childrenRecordName) {
  if (childrenRecordName === void 0) {
    childrenRecordName = "children";
  }
  return (0, import_get.default)(record, childrenRecordName);
}
function genExpandedRowKey() {
  let recordKey = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let suffix = arguments.length > 1 ? arguments[1] : void 0;
  if (suffix === void 0) {
    suffix = "__expanded_row";
  }
  return recordKey + suffix;
}
function getDefaultVirtualizedRowConfig() {
  let size = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let sectionRow = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const config = {};
  if (size === "small") {
    config.height = sectionRow ? numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_SMALL_HEIGHT : numbers.DEFAULT_VIRTUALIZED_ROW_SMALL_HEIGHT;
    config.minHeight = numbers.DEFAULT_VIRTUALIZED_ROW_SMALL_MIN_HEIGHT;
  } else if (size === "middle") {
    config.height = sectionRow ? numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_MIDDLE_HEIGHT : numbers.DEFAULT_VIRTUALIZED_ROW_MIDDLE_HEIGHT;
    config.minHeight = numbers.DEFAULT_VIRTUALIZED_ROW_MIDDLE_MIN_HEIGHT;
  } else {
    config.height = sectionRow ? numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_HEIGHT : numbers.DEFAULT_VIRTUALIZED_ROW_HEIGHT;
    config.minHeight = numbers.DEFAULT_VIRTUALIZED_ROW_MIN_HEIGHT;
  }
  return config;
}
function flattenColumns(cols) {
  let childrenColumnName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "children";
  const list = [];
  if (Array.isArray(cols) && cols.length) {
    for (const col of cols) {
      if (Array.isArray(col[childrenColumnName]) && col[childrenColumnName].length) {
        list.push(...flattenColumns(col[childrenColumnName], childrenColumnName));
      } else {
        warnIfNoDataIndex(col);
        list.push(col);
      }
    }
  }
  return list;
}
function assignColumnKeys(columns) {
  let childrenColumnName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "children";
  let level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const sameLevelCols = [];
  (0, import_each.default)(columns, (column, index) => {
    if (column.key == null) {
      const _index = column.dataIndex || index;
      column.key = `${level}-${_index}`;
    }
    if (Array.isArray(column[childrenColumnName]) && column[childrenColumnName].length) {
      sameLevelCols.push(...column[childrenColumnName]);
    }
  });
  if (sameLevelCols.length) {
    assignColumnKeys(sameLevelCols, childrenColumnName, level + 1);
  }
  return columns;
}
function sliceColumnsByLevel(columns) {
  let targetLevel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  let childrenColumnName = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "children";
  let currentLevel = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  const slicedColumns = [];
  if (Array.isArray(columns) && columns.length && currentLevel <= targetLevel) {
    columns.forEach((column) => {
      const children = column[childrenColumnName];
      if (Array.isArray(children) && children.length && currentLevel < targetLevel) {
        slicedColumns.push(...sliceColumnsByLevel(children, targetLevel, childrenColumnName, currentLevel + 1));
      } else {
        slicedColumns.push(column);
      }
    });
  }
  return slicedColumns;
}
function getColumnsByLevel(columns) {
  let targetLevel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  let targetColumns = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  let currentLevel = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  let childrenColumnName = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "children";
  if (Array.isArray(columns) && columns.length) {
    if (targetLevel === currentLevel) {
      targetColumns.push(...columns);
    } else {
      columns.forEach((column) => {
        getColumnsByLevel(column[childrenColumnName], targetLevel, targetColumns, currentLevel + 1, childrenColumnName);
      });
    }
  }
  return targetColumns;
}
function getAllLevelColumns(columns) {
  let childrenColumnName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "children";
  const all = [];
  if (Array.isArray(columns) && columns.length) {
    all.push([...columns]);
    const sameLevelColumns = [];
    columns.forEach((column) => {
      const children = column[childrenColumnName];
      if (Array.isArray(children) && children.length) {
        sameLevelColumns.push(...children);
      }
    });
    if (sameLevelColumns.length) {
      all.push(sameLevelColumns);
    }
  }
  return all;
}
function getColumnByLevelIndex(columns, index) {
  let level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  let childrenColumnName = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "children";
  const allLevelColumns = getAllLevelColumns(columns, childrenColumnName);
  return allLevelColumns[level][index];
}
function findColumn(columns, column) {
  let childrenColumnName = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "children";
  let found;
  (0, import_each.default)(columns, (item) => {
    if (item && item.key != null && !found) {
      if (item.key === column.key) {
        found = item;
      }
    }
    if (item && Array.isArray(item[childrenColumnName]) && !found) {
      found = findColumn(item[childrenColumnName], column, childrenColumnName);
    }
    if (found) {
      return false;
    }
    return void 0;
  });
  return found;
}
function expandBtnShouldInRow(props) {
  const {
    expandedRowRender,
    dataSource,
    hideExpandedColumn,
    childrenRecordName,
    rowExpandable
  } = props;
  const hasExpandedRowRender = typeof expandedRowRender === "function";
  return hideExpandedColumn && hasExpandedRowRender || !hasExpandedRowRender && dataSource.some((record) => {
    const children = (0, import_get.default)(record, childrenRecordName);
    if (Array.isArray(children) && children.length || rowExpandable(record)) {
      return true;
    } else {
      return false;
    }
  });
}
function mergeQueries(query) {
  let queries = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  let _mergedQuery;
  const idx = queries.findIndex((item) => {
    if (query.dataIndex === item.dataIndex) {
      _mergedQuery = Object.assign(Object.assign({}, item), query);
      return true;
    }
    return false;
  });
  if (idx > -1) {
    queries.splice(idx, 1, _mergedQuery);
  } else {
    queries.push(_mergedQuery);
  }
  return [...queries];
}
function withResizeWidth(columns, newColumns) {
  const _newColumns = Object.assign({}, newColumns);
  for (const column of columns) {
    if (!isNullOrUndefined(column.width)) {
      const currentColumn = column.key;
      const columnIndex = (0, import_findIndex.default)(_newColumns, (item) => item.key === currentColumn);
      if (columnIndex !== -1) {
        _newColumns[columnIndex].width = (0, import_get.default)(column, "width");
      }
    }
  }
  return _newColumns;
}
function getAllDisabledRowKeys(_ref) {
  let {
    dataSource,
    getCheckboxProps,
    childrenRecordName,
    rowKey
  } = _ref;
  const disabledRowKeys = [];
  if (Array.isArray(dataSource) && dataSource.length && typeof getCheckboxProps === "function") {
    for (const record of dataSource) {
      const props = getCheckboxProps(record);
      const recordKey = typeof rowKey === "function" ? rowKey(record) : (0, import_get.default)(record, rowKey);
      if (props && props.disabled) {
        disabledRowKeys.push(recordKey);
      }
      const children = (0, import_get.default)(record, childrenRecordName);
      if (Array.isArray(children) && children.length) {
        const keys = getAllDisabledRowKeys({
          dataSource: children,
          getCheckboxProps
        });
        disabledRowKeys.push(...keys);
      }
    }
  }
  return disabledRowKeys;
}
function warnIfNoDataIndex(column) {
  if (typeof column === "object" && column !== null) {
    const {
      filters,
      sorter,
      dataIndex,
      onFilter
    } = column;
    const logger = new Logger_default("[@douyinfe/semi-ui Table]");
    if ((Array.isArray(filters) || (0, import_isFunction.default)(onFilter) || (0, import_isFunction.default)(sorter)) && isNullOrUndefined(dataIndex)) {
      logger.warn(`The column with sorter or filter must pass the 'dataIndex' prop`);
    }
  }
}
function isTreeTable(_ref2) {
  let {
    dataSource,
    childrenRecordName = "children"
  } = _ref2;
  let flag = false;
  if (Array.isArray(dataSource)) {
    for (const data of dataSource) {
      const children = (0, import_get.default)(data, childrenRecordName);
      if (Array.isArray(children) && children.length) {
        flag = true;
        break;
      }
    }
  }
  return flag;
}
function getRTLAlign(align, direction) {
  if (direction === "rtl") {
    switch (align) {
      case "left":
        return "right";
      case "right":
        return "left";
      default:
        return align;
    }
  }
  return align;
}
function shouldShowEllipsisTitle(ellipsis) {
  const shouldShowTitle = ellipsis === true || (0, import_get.default)(ellipsis, "showTitle", true);
  return shouldShowTitle;
}

export {
  require_some,
  require_each,
  equalWith,
  getColumnKey,
  arrayAdd,
  isLastLeftFixed,
  isFirstFixedRight,
  isAnyFixed,
  isAnyFixedRight,
  isFixedLeft,
  isFixedRight,
  isFixed,
  isInnerColumnKey,
  isExpandedColumn,
  isScrollbarColumn,
  isSelectionColumn,
  filterColumns,
  getScrollbarColumnWidth,
  getRecordKey,
  isExpanded,
  isSelected,
  isDisabled,
  getRecord,
  getRecordChildren,
  genExpandedRowKey,
  getDefaultVirtualizedRowConfig,
  flattenColumns,
  assignColumnKeys,
  sliceColumnsByLevel,
  getColumnsByLevel,
  getAllLevelColumns,
  getColumnByLevelIndex,
  findColumn,
  expandBtnShouldInRow,
  mergeQueries,
  withResizeWidth,
  getAllDisabledRowKeys,
  warnIfNoDataIndex,
  isTreeTable,
  getRTLAlign,
  shouldShowEllipsisTitle
};
//# sourceMappingURL=chunk-OKRARV2O.js.map
