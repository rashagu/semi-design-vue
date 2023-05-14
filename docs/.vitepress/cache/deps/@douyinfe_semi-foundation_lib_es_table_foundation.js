import {
  filterColumns,
  flattenColumns,
  mergeQueries,
  require_each,
  require_some
} from "./chunk-OKRARV2O.js";
import "./chunk-2BEXMFB4.js";
import {
  require_baseFor,
  require_filter
} from "./chunk-JWS2E6MO.js";
import {
  numbers,
  strings
} from "./chunk-IIDJ3K4P.js";
import {
  require_slice
} from "./chunk-OJLRPMES.js";
import {
  require_find
} from "./chunk-FEMUKZWK.js";
import "./chunk-VPJII4ZW.js";
import {
  require_isPlainObject
} from "./chunk-ZYO65OIS.js";
import "./chunk-4QI5OKLV.js";
import {
  require_createAssigner
} from "./chunk-E7UCLVRE.js";
import "./chunk-GRE7MUIS.js";
import "./chunk-OL7AAX6S.js";
import "./chunk-KOVH33RT.js";
import "./chunk-EGPIATU2.js";
import {
  require_cloneBuffer,
  require_cloneTypedArray,
  require_copyObject,
  require_initCloneObject,
  require_keysIn
} from "./chunk-GQLLYC3E.js";
import {
  require_isMap
} from "./chunk-RFWJA27S.js";
import {
  require_copyArray
} from "./chunk-D6QY5MM6.js";
import {
  require_isSet
} from "./chunk-UTEL65GX.js";
import "./chunk-VS2OXD4D.js";
import "./chunk-XKTW6BSF.js";
import {
  require_isEqual
} from "./chunk-34JO2KAW.js";
import "./chunk-HPYJEDL6.js";
import {
  require_Stack
} from "./chunk-IGKIE6XV.js";
import "./chunk-CUWPCCUM.js";
import {
  require_baseRest,
  require_isArrayLikeObject
} from "./chunk-YD5NMOCL.js";
import {
  require_baseIndexOf
} from "./chunk-SKUJYBVG.js";
import "./chunk-PTHRDZX2.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import {
  require_isUndefined
} from "./chunk-V52XL574.js";
import "./chunk-6OL7JQEH.js";
import "./chunk-KPUGFIAL.js";
import {
  require_isBuffer,
  require_isTypedArray
} from "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import {
  require_baseUnary
} from "./chunk-BVRSW63P.js";
import "./chunk-QWVJ4J4X.js";
import "./chunk-JZBNO6DV.js";
import "./chunk-RZZPN2AN.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import {
  require_isArguments
} from "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import "./chunk-NQE5YR5Y.js";
import {
  require_baseAssignValue
} from "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import {
  require_get
} from "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import {
  require_arrayMap
} from "./chunk-JVA7ONT2.js";
import {
  require_eq
} from "./chunk-TY6AJI44.js";
import {
  require_isFunction,
  require_isObject
} from "./chunk-X27LVEKC.js";
import {
  require_isArray
} from "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIndexOfWith.js
var require_baseIndexOfWith = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIndexOfWith.js"(exports, module) {
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    module.exports = baseIndexOfWith;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePullAll.js
var require_basePullAll = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePullAll.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseIndexOf = require_baseIndexOf();
    var baseIndexOfWith = require_baseIndexOfWith();
    var baseUnary = require_baseUnary();
    var copyArray = require_copyArray();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values.length, seen = array;
      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value;
        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }
    module.exports = basePullAll;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/pullAll.js
var require_pullAll = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/pullAll.js"(exports, module) {
    var basePullAll = require_basePullAll();
    function pullAll3(array, values) {
      return array && array.length && values && values.length ? basePullAll(array, values) : array;
    }
    module.exports = pullAll3;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/pull.js
var require_pull = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/pull.js"(exports, module) {
    var baseRest = require_baseRest();
    var pullAll3 = require_pullAll();
    var pull = baseRest(pullAll3);
    module.exports = pull;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignMergeValue.js
var require_assignMergeValue = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignMergeValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    function assignMergeValue(object, key, value) {
      if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignMergeValue;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_safeGet.js
var require_safeGet = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_safeGet.js"(exports, module) {
    function safeGet(object, key) {
      if (key === "constructor" && typeof object[key] === "function") {
        return;
      }
      if (key == "__proto__") {
        return;
      }
      return object[key];
    }
    module.exports = safeGet;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toPlainObject.js
var require_toPlainObject = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toPlainObject.js"(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    module.exports = toPlainObject;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMergeDeep.js
var require_baseMergeDeep = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMergeDeep.js"(exports, module) {
    var assignMergeValue = require_assignMergeValue();
    var cloneBuffer = require_cloneBuffer();
    var cloneTypedArray = require_cloneTypedArray();
    var copyArray = require_copyArray();
    var initCloneObject = require_initCloneObject();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLikeObject = require_isArrayLikeObject();
    var isBuffer = require_isBuffer();
    var isFunction = require_isFunction();
    var isObject = require_isObject();
    var isPlainObject = require_isPlainObject();
    var isTypedArray = require_isTypedArray();
    var safeGet = require_safeGet();
    var toPlainObject = require_toPlainObject();
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
      var isCommon = newValue === void 0;
      if (isCommon) {
        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack["delete"](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }
    module.exports = baseMergeDeep;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMerge.js
var require_baseMerge = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMerge.js"(exports, module) {
    var Stack = require_Stack();
    var assignMergeValue = require_assignMergeValue();
    var baseFor = require_baseFor();
    var baseMergeDeep = require_baseMergeDeep();
    var isObject = require_isObject();
    var keysIn = require_keysIn();
    var safeGet = require_safeGet();
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack());
        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
          if (newValue === void 0) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }
    module.exports = baseMerge;
  }
});

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/merge.js"(exports, module) {
    var baseMerge = require_baseMerge();
    var createAssigner = require_createAssigner();
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });
    module.exports = merge;
  }
});

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/table/foundation.js
var import_isUndefined = __toESM(require_isUndefined());
var import_isEqual = __toESM(require_isEqual());
var import_slice = __toESM(require_slice());
var import_isMap = __toESM(require_isMap());
var import_filter = __toESM(require_filter());
var import_isSet2 = __toESM(require_isSet());
var import_pull = __toESM(require_pull());
var import_some = __toESM(require_some());
var import_find = __toESM(require_find());
var import_each = __toESM(require_each());
var import_isFunction = __toESM(require_isFunction());
var import_merge = __toESM(require_merge());
var import_get = __toESM(require_get());

// node_modules/.pnpm/memoize-one@5.2.1/node_modules/memoize-one/dist/memoize-one.esm.js
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
      return lastResult;
    }
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }
  return memoized;
}
var memoize_one_esm_default = memoizeOne;

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/set.js
var import_isSet = __toESM(require_isSet());
function copySet(setA) {
  return new Set(setA);
}
function pullAll(setA, setB) {
  if (setA === setB) {
    setB = copySet(setB);
  }
  if ((0, import_isSet.default)(setA) && setA.size && (0, import_isSet.default)(setB) && setB.size) {
    for (const item of setB) {
      if (setA.has(item)) {
        setA.delete(item);
      }
    }
    return setA;
  }
  return setA;
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/array.js
function pullAll2(arrayA, arrayB) {
  if (arrayA !== null && arrayA.length && arrayB !== null && arrayB.length) {
    const setA = new Set(arrayA);
    const setB = new Set(arrayB);
    const resultSet = pullAll(setA, setB);
    return Array.from(resultSet);
  }
  return arrayA;
}
function withOrderSort(fn) {
  let order = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "ascend";
  switch (order) {
    case "descend":
      return (a, b) => {
        const result = Number(fn(a, b));
        return result !== 0 ? -result : result;
      };
    case "ascend":
    default:
      return fn;
  }
}

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/table/foundation.js
var TableFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.setPage = (currentPage, currentPageSize) => {
      currentPage = currentPage || this._adapter.getCurrentPage();
      const currentPagination = this.getState("pagination");
      const {
        dataSource,
        pagination,
        disabledRowKeys,
        allRowKeys
      } = this.getCurrentPageData(null, Object.assign(Object.assign({}, currentPagination), {
        currentPage,
        pageSize: currentPageSize
      }));
      if (!this._pagerIsControlled() && currentPage > 0) {
        this._adapter.setDisabledRowKeys(disabledRowKeys);
        this._adapter.setAllRowKeys(allRowKeys);
        this._adapter.setPagination(pagination);
        this._adapter.setDataSource(dataSource);
      }
      this._notifyChange(pagination);
    };
    this.setCachedFilteredSortedDataSource = (filteredSortedDataSource) => {
      this._adapter.setCachedFilteredSortedDataSource(filteredSortedDataSource);
      const filteredSortedRowKeys = this.getAllRowKeys(filteredSortedDataSource);
      this._adapter.setCachedFilteredSortedRowKeys(filteredSortedRowKeys);
    };
    this.isSortOrderValid = (sortOrder) => strings.SORT_DIRECTIONS.includes(sortOrder) || sortOrder === false;
    const handleColumns = this._adapter.getHandleColumns();
    const mergePagination = this._adapter.getMergePagination();
    this.memoizedWithFnsColumns = memoize_one_esm_default(handleColumns, import_isEqual.default);
    this.memoizedFilterColumns = memoize_one_esm_default(filterColumns);
    this.memoizedFlattenFnsColumns = memoize_one_esm_default(flattenColumns);
    this.memoizedPagination = memoize_one_esm_default(mergePagination, import_isEqual.default);
  }
  /**
   * update columns in place, and use default values as initial values if the sorting and filtering columns have no values
   */
  static initColumnsFilteredValueAndSorterOrder(columns) {
    columns.forEach((column) => {
      TableFoundation.initFilteredValue(column);
      TableFoundation.initSorterOrder(column);
    });
    return columns;
  }
  /**
   * init filteredValue of filtering column, use defaultFilteredValue or [] when it is undefined
   */
  static initFilteredValue(column) {
    const {
      defaultFilteredValue,
      filteredValue,
      onFilter
    } = column;
    const hasFilter = (0, import_isFunction.default)(onFilter);
    if (hasFilter && (0, import_isUndefined.default)(filteredValue)) {
      if (Array.isArray(defaultFilteredValue) && defaultFilteredValue.length) {
        column.filteredValue = defaultFilteredValue;
      } else {
        column.filteredValue = [];
      }
    }
  }
  /**
   * init sortOrder of sorting column, use defaultSortOrder or [] when it is undefined
   */
  static initSorterOrder(column) {
    const {
      defaultSortOrder,
      sortOrder,
      sorter
    } = column;
    if (sorter && (0, import_isUndefined.default)(sortOrder)) {
      if (!(0, import_isUndefined.default)(defaultSortOrder)) {
        column.sortOrder = defaultSortOrder;
      } else {
        column.sortOrder = false;
      }
    }
  }
  init() {
    const dataSource = [...this.getProp("dataSource")];
    const {
      queries
    } = this._adapter.getStates();
    const filteredSortedDataSource = this.getFilteredSortedDataSource(dataSource, queries);
    const allDataDisabledRowKeys = this.getAllDisabledRowKeys(filteredSortedDataSource);
    const pageData = this.getCurrentPageData(filteredSortedDataSource);
    this.setAdapterPageData(pageData);
    this.initExpandedRowKeys(pageData);
    this.initSelectedRowKeys(pageData);
    this.setCachedFilteredSortedDataSource(filteredSortedDataSource);
    this.setAllDisabledRowKeys(allDataDisabledRowKeys);
  }
  initExpandedRowKeys() {
    let {
      groups
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      defaultExpandAllRows,
      defaultExpandedRowKeys = [],
      expandedRowKeys: propExpandedRowKeys = [],
      dataSource = [],
      expandAllRows,
      defaultExpandAllGroupRows,
      expandAllGroupRows
    } = this.getProps();
    const expandedRowKeys = [];
    if (defaultExpandAllRows || expandAllRows) {
      this._addNoDuplicatedItemsToArr(expandedRowKeys, this.getAllRowKeys(dataSource), groups && (0, import_isMap.default)(groups) && groups.size ? Array.from(groups.keys()) : []);
    } else if (defaultExpandAllGroupRows || expandAllGroupRows) {
      this._addNoDuplicatedItemsToArr(expandedRowKeys, groups && (0, import_isMap.default)(groups) && groups.size ? Array.from(groups.keys()) : []);
    } else if (Array.isArray(defaultExpandedRowKeys) && defaultExpandedRowKeys.length) {
      this._addNoDuplicatedItemsToArr(expandedRowKeys, defaultExpandedRowKeys);
    } else if (Array.isArray(propExpandedRowKeys) && propExpandedRowKeys.length) {
      this._addNoDuplicatedItemsToArr(expandedRowKeys, propExpandedRowKeys);
    }
    this._adapter.setExpandedRowKeys(expandedRowKeys);
  }
  initSelectedRowKeys(_ref) {
    let {
      disabledRowKeys
    } = _ref;
    const rowSelection = this.getProp("rowSelection");
    const rowKeys = [];
    if (rowSelection) {
      const selectedRowKeys = (0, import_get.default)(rowSelection, "selectedRowKeys");
      const defaultSelectedRowKeys = (0, import_get.default)(rowSelection, "defaultSelectedRowKeys");
      if (Array.isArray(selectedRowKeys)) {
        this._addNoDuplicatedItemsToArr(rowKeys, selectedRowKeys);
      } else if (Array.isArray(defaultSelectedRowKeys)) {
        this._addNoDuplicatedItemsToArr(rowKeys, defaultSelectedRowKeys);
      }
      if (Array.isArray(disabledRowKeys) && disabledRowKeys.length) {
        (0, import_pull.default)(rowKeys, ...disabledRowKeys);
      }
      this._adapter.setSelectedRowKeys(rowKeys);
    }
  }
  /**
   * Get filtered and sorted data
   * @param {Object[]} dataSource
   * @param {Object[]} queries
   * @returns {Object[]} sortedDataSource
   */
  getFilteredSortedDataSource(dataSource, queries) {
    const filteredDataSource = this.filterDataSource(dataSource, queries.filter((query) => {
      const currentFilteredValue = query.filteredValue ? query.filteredValue : query.defaultFilteredValue;
      return (0, import_isFunction.default)(query.onFilter) && Array.isArray(currentFilteredValue) && currentFilteredValue.length;
    }));
    const sortedDataSource = this.sortDataSource(filteredDataSource, queries.filter((query) => query && (0, import_isFunction.default)(query.sorter)));
    return sortedDataSource;
  }
  /**
   * get current page data
   *
   * @param {Array} dataSource
   * @param {object} pagination
   * @param {object} queries
   * @returns {{dataSource: RecordType[], groups: Map<string, Set<string>>, pagination: object, disabledRowKeys: string[], queries: BaseColumnProps[], allRowKeys: string[]}}
   */
  getCurrentPageData(dataSource, pagination, queries) {
    const filteredSortedDataSource = this._adapter.getCachedFilteredSortedDataSource();
    dataSource = dataSource == null ? [...filteredSortedDataSource] : dataSource;
    pagination = pagination == null ? this.getState("pagination") && Object.assign({}, this.getState("pagination")) : pagination;
    queries = queries == null ? [...this.getState("queries")] : queries;
    let groups;
    if (this.getProp("groupBy") != null) {
      const {
        groups: groupedGroups,
        dataSource: groupedData
      } = this.groupDataSource(dataSource);
      dataSource = groupedData;
      groups = groupedGroups;
    }
    pagination = this.normalizePagination(pagination, dataSource);
    dataSource = this.limitPageDataSource(dataSource, pagination);
    const disabledRowKeys = this.getAllDisabledRowKeys(dataSource);
    const allRowKeys = this.getAllRowKeys(dataSource);
    const pageData = {
      dataSource,
      groups,
      pagination,
      disabledRowKeys,
      allRowKeys,
      queries
    };
    return pageData;
  }
  /**
   * group dataSource, return grouped row keys
   *
   * @param {*[]} dataSource
   * @param {Function|string} groupBy
   */
  groupDataSource(dataSource, groupBy) {
    groupBy = groupBy == null ? this.getProp("groupBy") : groupBy;
    const groups = /* @__PURE__ */ new Map();
    const newDataSource = [];
    if (groupBy != null) {
      (0, import_each.default)(dataSource, (record, index) => {
        const groupKey = typeof groupBy === "function" ? groupBy(record) : (0, import_get.default)(record, groupBy);
        if (groupKey != null && groupKey !== "") {
          const recordKey = this.getRecordKey(record);
          let group = groups.get(groupKey);
          if (!(0, import_isSet2.default)(group)) {
            group = /* @__PURE__ */ new Set([recordKey]);
            groups.set(groupKey, group);
          } else {
            group.add(recordKey);
          }
        }
      });
    }
    if (groups && groups.size) {
      groups.forEach((set, key) => {
        if ((0, import_isSet2.default)(set)) {
          set.forEach((realKey) => {
            newDataSource.push(this._getRecord(realKey));
          });
        }
      });
    } else {
      newDataSource.push(...dataSource);
    }
    return {
      groups,
      dataSource: newDataSource
    };
  }
  /**
   * sort data
   *
   * @param {Array} dataSource
   * @param {Array} sorters
   * @returns {Array}
   */
  sortDataSource(dataSource, sorters) {
    (0, import_each.default)(sorters, (sorterObj) => {
      const {
        sorter,
        sortOrder,
        defaultSortOrder,
        sortChildrenRecord
      } = sorterObj;
      const currentSortOrder = this.isSortOrderValid(sortOrder) ? sortOrder : defaultSortOrder;
      if ((0, import_isFunction.default)(sorter) && currentSortOrder && strings.SORT_DIRECTIONS.includes(currentSortOrder)) {
        if (sortChildrenRecord) {
          const childrenRecordName = this.getProp("childrenRecordName");
          dataSource = dataSource && dataSource.map((record) => {
            const children = this._getRecordChildren(record);
            if (Array.isArray(children) && children.length) {
              return Object.assign(Object.assign({}, record), {
                [childrenRecordName]: this.sortDataSource(children, [sorterObj])
              });
            }
            return record;
          });
        }
        dataSource.sort(withOrderSort(sorter, currentSortOrder));
        return false;
      }
      return void 0;
    });
    return dataSource;
  }
  /**
   * filter data source
   *
   * @param {*[]} dataSource
   * @param {*[]} filters
   * @returns {*[]}
   */
  filterDataSource(dataSource, filters) {
    let filteredData = null;
    let hasValidFilters = false;
    const childrenRecordName = this.getProp("childrenRecordName");
    (0, import_each.default)(filters, (filterObj) => {
      const {
        onFilter,
        filteredValue,
        filterChildrenRecord,
        defaultFilteredValue
      } = filterObj;
      const currentFilteredValue = Array.isArray(filteredValue) ? filteredValue : defaultFilteredValue;
      if (typeof onFilter === "function" && Array.isArray(currentFilteredValue) && currentFilteredValue.length) {
        hasValidFilters = true;
        if (filteredData === null) {
          filteredData = /* @__PURE__ */ new Map();
        } else {
          dataSource = Array.from(filteredData && filteredData.values());
          filteredData = /* @__PURE__ */ new Map();
        }
        (0, import_each.default)(dataSource, (record) => {
          (0, import_each.default)(currentFilteredValue, (value) => {
            const childrenRecords = (0, import_get.default)(record, childrenRecordName);
            const recordKey = this.getRecordKey(record);
            let filteredChildren;
            if (Array.isArray(childrenRecords) && childrenRecords.length && filterChildrenRecord) {
              filteredChildren = this.filterDataSource(childrenRecords, [filterObj]);
            }
            if (Array.isArray(filteredChildren) && filteredChildren.length) {
              if (recordKey != null) {
                const children = (0, import_get.default)(filteredData.get(recordKey), childrenRecordName, []);
                filteredData.set(recordKey, Object.assign(Object.assign({}, record), {
                  [childrenRecordName]: filteredChildren.reduce((arr, cur) => {
                    if (arr.find((item) => this.getRecordKey(item) === this.getRecordKey(cur)) == null) {
                      arr.push(cur);
                    }
                    return arr;
                  }, [...children])
                }));
              }
            } else if (onFilter(value, record)) {
              filteredData.set(recordKey, record);
            }
          });
        });
      }
    });
    if (hasValidFilters) {
      dataSource = Array.from(filteredData && filteredData.values());
    }
    return dataSource;
  }
  limitPageDataSource(dataSource, pagination) {
    dataSource = dataSource == null ? this.getProp("dataSource") : dataSource;
    pagination = pagination == null ? this.getState("pagination") : pagination;
    let pageData = dataSource;
    const pageNo = (0, import_get.default)(pagination, "currentPage");
    if (this.getProp("pagination") !== false && pageNo && dataSource && pagination && !this._pagerIsControlled()) {
      const {
        pageSize = numbers.DEFAULT_PAGE_SIZE
      } = pagination;
      const start = (pageNo - 1) * pageSize;
      const end = pageNo * pageSize;
      pageData = (0, import_slice.default)(dataSource, start, end);
    }
    return pageData;
  }
  normalizePagination(pagination, dataSource) {
    pagination = pagination == null ? this._getPagination() : pagination;
    dataSource = dataSource == null ? this._getDataSource() : dataSource;
    const propPagination = this.getProp("pagination");
    if (pagination) {
      pagination = typeof pagination === "object" ? Object.assign({}, pagination) : {};
      pagination = (0, import_merge.default)({
        total: dataSource && dataSource.length || 0,
        pageSize: numbers.DEFAULT_PAGE_SIZE,
        currentPage: (0, import_get.default)(propPagination, "defaultCurrentPage", 1),
        position: strings.PAGINATION_POSITIONS[0]
      }, pagination);
      if (!this._pagerIsControlled()) {
        const total = (0, import_get.default)(propPagination, "total", dataSource.length);
        const pageSize = (0, import_get.default)(propPagination, "pageSize", pagination.pageSize);
        const {
          currentPage
        } = pagination;
        const realTotalPage = Math.ceil(total / pageSize);
        pagination.total = total;
        if (currentPage > realTotalPage) {
          pagination.currentPage = 1;
        }
      }
    }
    return pagination;
  }
  setAdapterPageData() {
    let pageData = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      pagination,
      dataSource,
      disabledRowKeys,
      allRowKeys,
      groups
    } = pageData;
    this._adapter.setDisabledRowKeys(disabledRowKeys);
    this._adapter.setAllRowKeys(allRowKeys);
    this._adapter.setPagination(pagination);
    this._adapter.setGroups(groups);
    this._adapter.setDataSource(dataSource);
  }
  destroy() {
  }
  setAllDisabledRowKeys(disabledRowKeys) {
    this._adapter.setAllDisabledRowKeys(disabledRowKeys);
  }
  handleClick(e) {
  }
  handleMouseEnter(e) {
  }
  handleMouseLeave(e) {
  }
  stopPropagation(e) {
    this._adapter.stopPropagation(e);
  }
  /**
   * Add non-repeating elements to the array itself
   * @param {Array} srcArr
   * @param {Object} objArrs
   */
  _addNoDuplicatedItemsToArr() {
    let srcArr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    for (var _len = arguments.length, objArrs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      objArrs[_key - 1] = arguments[_key];
    }
    for (const objArr of objArrs) {
      if (Array.isArray(objArr)) {
        for (const item of objArr) {
          if (!srcArr.includes(item)) {
            srcArr.push(item);
          }
        }
      }
    }
    return srcArr;
  }
  _notifyChange(pagination, filters, sorter, extra) {
    pagination = pagination == null ? this._getPagination() : pagination;
    filters = filters == null ? this._getAllFilters() : filters;
    sorter = sorter == null ? this._getAllSorters()[0] : sorter;
    if ((0, import_get.default)(this.getProp("scroll"), "scrollToFirstRowOnChange")) {
      this._adapter.resetScrollY();
    }
    this._adapter.notifyChange({
      pagination: Object.assign({}, pagination),
      filters: [...filters],
      sorter,
      extra: Object.assign({}, extra)
    });
  }
  _rowExpansionIsControlled() {
    return Array.isArray(this.getProp("expandedRowKeys"));
  }
  _pagerIsControlled() {
    return (0, import_get.default)(this.getProp("pagination"), "currentPage") != null;
  }
  _selectionIsControlled() {
    return Array.isArray((0, import_get.default)(this.getProp("rowSelection"), "selectedRowKeys"));
  }
  /**
   * Determine whether the column sorting is controlled
   * Controlled: the column passed the sortOrder prop
   * @param {String} dataIndex
   * @returns {Boolean}
   */
  _sorterIsControlled(dataIndex) {
    const query = dataIndex && this.getQuery(dataIndex, this.getState("flattenColumns"));
    return Boolean(query && query.sortOrder != null);
  }
  /**
   * Determine whether the column is filtered and controlled
   * Controlled: the column passed the filteredValue prop
   * @param {String} dataIndex
   * @returns {Boolean}
   */
  _filterIsControlled(dataIndex) {
    const query = dataIndex && this.getQuery(dataIndex, this.getState("flattenColumns"));
    return Boolean(query && Array.isArray(query.filteredValue));
  }
  _filterShowIsControlled(dataIndex) {
    const query = dataIndex && this.getQuery(dataIndex, this.getState("flattenColumns"));
    return Boolean(query && (query.filterDropdownVisible === true || query.filterDropdownVisible === false));
  }
  _getSelectedRowKeys() {
    const rowSelection = this.getState("rowSelection");
    const selectedRowKeys = (0, import_get.default)(rowSelection, "selectedRowKeys", []);
    return [...selectedRowKeys];
  }
  _getSelectedRowKeysSet() {
    const rowSelection = this.getState("rowSelection");
    const selectedRowKeysSet = (0, import_get.default)(rowSelection, "selectedRowKeysSet", /* @__PURE__ */ new Set());
    return selectedRowKeysSet;
  }
  _getDataSource() {
    return this.getProp("dataSource") || [];
  }
  _getRecord(realKey) {
    return (0, import_find.default)(this.getProp("dataSource"), (record) => realKey != null && realKey !== "" && this.getRecordKey(record) === realKey);
  }
  _getRecordChildren(record) {
    return (0, import_get.default)(record, this.getProp("childrenRecordName"));
  }
  _getPagination() {
    return this.getState("pagination") || {};
  }
  _getAllFilters(queries) {
    queries = queries || this.getState("queries");
    const filters = [];
    (0, import_each.default)(queries, (query) => {
      if (Array.isArray(query.filteredValue) && (query.filteredValue.length || this._filterIsControlled(query.dataIndex))) {
        filters.push(query);
      }
    });
    return filters;
  }
  _getAllSorters(queries) {
    queries = queries || this.getState("queries");
    return (0, import_filter.default)(queries, (query) => query.sorter && query.sortOrder);
  }
  _filterQueries(targetQuery, queries) {
    let keys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ["dataIndex"];
    queries = queries == null ? this.getState("queries") : queries;
    const filteredQueries = [];
    const filteredIndexes = [];
    (0, import_each.default)(queries, (itQuery, index) => {
      const flag = (0, import_some.default)(keys, (k) => k && targetQuery[k] != null && targetQuery[k] === itQuery[k]);
      if (flag) {
        filteredQueries.push(itQuery);
        filteredIndexes.push(index);
      }
    });
    return {
      filteredQueries,
      filteredIndexes
    };
  }
  _mergeToQueries(query, queries) {
    let keys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ["dataIndex"];
    queries = queries == null ? this.getState("queries") : queries;
    queries = [...queries];
    query = Object.assign({}, query);
    const {
      filteredQueries,
      filteredIndexes
    } = this._filterQueries(query, queries, keys);
    (0, import_each.default)(filteredQueries, (curQuery, idx) => {
      queries[filteredIndexes[idx]] = Object.assign({}, query);
    });
    return queries;
  }
  /**
   * get record real key
   * @param {RecordType} record
   * @returns {string}
   */
  getRecordKey(record) {
    if (!record) {
      return void 0;
    }
    const rowKey = this.getProp("rowKey");
    return typeof rowKey === "function" ? rowKey(record) : (0, import_get.default)(record, rowKey);
  }
  isEmpty(dataSource) {
    dataSource = dataSource == null ? this.getProp("dataSource") : dataSource;
    return !(Array.isArray(dataSource) && dataSource.length > 0);
  }
  handleSelectRow(realKey, selected, e) {
    this.stopPropagation(e);
    if (typeof selected === "boolean" && realKey != null) {
      const selectedRowKeys = this._getSelectedRowKeys();
      let foundIdx = -1;
      const selectedRow = this.getSelectedRows(null, [realKey])[0];
      let selectedRows;
      if ((foundIdx = selectedRowKeys.indexOf(realKey)) > -1 && selected === false) {
        selectedRowKeys.splice(foundIdx, 1);
        selectedRows = this.getSelectedRows(null, selectedRowKeys);
        if (!this._selectionIsControlled()) {
          this._adapter.setSelectedRowKeys(selectedRowKeys);
        }
        this._adapter.notifySelect(selectedRow, selected, selectedRows, e);
        this._adapter.notifySelectionChange(selectedRowKeys, selectedRows);
      } else if (selectedRowKeys.indexOf(realKey) === -1 && selected === true) {
        selectedRowKeys.push(realKey);
        selectedRows = this.getSelectedRows(null, selectedRowKeys);
        if (!this._selectionIsControlled()) {
          this._adapter.setSelectedRowKeys(selectedRowKeys);
        }
        this._adapter.notifySelect(selectedRow, selected, selectedRows, e);
        this._adapter.notifySelectionChange(selectedRowKeys, selectedRows);
      }
    }
  }
  /**
   * select all rows
   * @param {*} selected The future state of the select all button
   * @param {*} e
   */
  handleSelectAllRow(selected, e) {
    this.stopPropagation(e);
    if (typeof selected === "boolean") {
      const curSelectedRowKeys = this._getSelectedRowKeys();
      let selectedRowKeys = [...curSelectedRowKeys];
      const selectedRowKeysSet = this._getSelectedRowKeysSet();
      let allRowKeys = [...this._adapter.getCachedFilteredSortedRowKeys()];
      const disabledRowKeys = this._adapter.getAllDisabledRowKeys();
      const disabledRowKeysSet = this._adapter.getAllDisabledRowKeysSet();
      let changedRowKeys;
      if (selected) {
        for (const key of allRowKeys) {
          if (!disabledRowKeysSet.has(key) && !selectedRowKeysSet.has(key)) {
            selectedRowKeys.push(key);
          }
        }
        allRowKeys = pullAll2(allRowKeys, [...disabledRowKeys, ...curSelectedRowKeys]);
        changedRowKeys = [...allRowKeys];
      } else {
        selectedRowKeys = pullAll2(selectedRowKeys, allRowKeys);
        changedRowKeys = [...curSelectedRowKeys];
      }
      const changedRows = this.getSelectedRows(null, changedRowKeys || []);
      const selectedRows = this.getSelectedRows(null, selectedRowKeys || []);
      if (!this._selectionIsControlled()) {
        this._adapter.setSelectedRowKeys(selectedRowKeys);
      }
      this._adapter.notifySelectAll(selected, selectedRows, changedRows, e);
      this._adapter.notifySelectionChange(selectedRowKeys, selectedRows);
    }
  }
  /**
   * row keys => rows
   * @param {*} dataSource
   * @param {*} selectedRowKeys
   * @param {*} selectedRowKeysSet Recursive optimization
   */
  getSelectedRows(dataSource, selectedRowKeys, selectedRowKeysSet) {
    dataSource = dataSource == null ? this._getDataSource() : dataSource;
    selectedRowKeys = selectedRowKeys == null ? this._getSelectedRowKeys() : selectedRowKeys;
    if (!(0, import_isSet2.default)(selectedRowKeysSet)) {
      selectedRowKeysSet = new Set(selectedRowKeys);
    }
    const childrenRecordName = this.getProp("childrenRecordName");
    const selectedRows = [];
    if ((0, import_isSet2.default)(selectedRowKeysSet) && selectedRowKeysSet.size && Array.isArray(dataSource) && dataSource.length) {
      selectedRows.push(...dataSource.filter((data) => selectedRowKeysSet.has(this.getRecordKey(data))));
      if (selectedRows.length < selectedRowKeys.length) {
        for (const item of dataSource) {
          const children = (0, import_get.default)(item, childrenRecordName);
          if (Array.isArray(children) && children.length) {
            const rows = this.getSelectedRows(children, selectedRowKeys, selectedRowKeysSet);
            selectedRows.push(...rows);
          }
        }
      }
    }
    return selectedRows;
  }
  getAllDisabledRowKeys(dataSource, getCheckboxProps) {
    dataSource = dataSource == null ? this._getDataSource() : dataSource;
    getCheckboxProps = getCheckboxProps == null ? (0, import_get.default)(this.getProp("rowSelection"), "getCheckboxProps") : getCheckboxProps;
    const childrenRecordName = this.getProp("childrenRecordName");
    const disabledRowKeys = [];
    if (Array.isArray(dataSource) && dataSource.length && typeof getCheckboxProps === "function") {
      for (const record of dataSource) {
        const props = getCheckboxProps(record);
        if (props && props.disabled) {
          disabledRowKeys.push(this.getRecordKey(record));
        }
        const children = (0, import_get.default)(record, childrenRecordName);
        if (Array.isArray(children) && children.length) {
          const keys = this.getAllDisabledRowKeys(children, getCheckboxProps);
          disabledRowKeys.push(...keys);
        }
      }
    }
    return disabledRowKeys;
  }
  getAllRowKeys(dataSource) {
    dataSource = dataSource == null ? this._getDataSource() : dataSource;
    const childrenRecordName = this.getProp("childrenRecordName");
    const allRowKeys = [];
    if (Array.isArray(dataSource) && dataSource.length) {
      for (const record of dataSource) {
        const childrenRowKeys = [];
        const children = (0, import_get.default)(record, childrenRecordName);
        if (Array.isArray(children) && children.length) {
          childrenRowKeys.push(...this.getAllRowKeys(children));
        }
        allRowKeys.push(this.getRecordKey(record), ...childrenRowKeys);
      }
    }
    return allRowKeys;
  }
  /**
   * Check if the selected item is in allRowKeysSet
   * @param {Array} selectedRowKeys
   * @param {Set} allRowKeysSet
   */
  hasRowSelected(selectedRowKeys, allRowKeysSet) {
    return Boolean(Array.isArray(selectedRowKeys) && selectedRowKeys.length && (0, import_isSet2.default)(allRowKeysSet) && allRowKeysSet.size && selectedRowKeys.filter((key) => allRowKeysSet.has(key)).length);
  }
  /**
   * expand processing function
   * @param {Boolean} expanded
   * @param {String} realKey
   * @param {Event} domEvent
   */
  handleRowExpanded(expanded, realKey, domEvent) {
    this.stopPropagation(domEvent);
    const expandedRowKeys = [...this.getState("expandedRowKeys")];
    const index = expandedRowKeys.indexOf(realKey);
    const keyIsValid = typeof realKey === "string" || typeof realKey === "number";
    if (keyIsValid && expanded && index === -1) {
      expandedRowKeys.push(realKey);
    } else if (keyIsValid && !expanded && index > -1) {
      expandedRowKeys.splice(index, 1);
    }
    if (!this._rowExpansionIsControlled()) {
      this._adapter.setExpandedRowKeys(expandedRowKeys);
    }
    const expandedRows = this.getSelectedRows(null, expandedRowKeys);
    let expandedRow = this.getSelectedRows(null, [realKey])[0];
    const groups = this._getGroups();
    if (groups) {
      if (groups.has(realKey)) {
        expandedRow = {
          groupKey: realKey
        };
      }
      for (let i = 0, len = expandedRowKeys.length; i < len; i++) {
        if (groups.has(realKey)) {
          expandedRows.push({
            groupKey: expandedRowKeys[i]
          });
        }
      }
    }
    this._adapter.notifyExpand(expanded, expandedRow, domEvent);
    this._adapter.notifyExpandedRowsChange(expandedRows);
  }
  /**
   * get state.groups
   * @returns {Map|Null}
   */
  _getGroups() {
    const groupBy = this._adapter.getProp("groupBy");
    if (groupBy !== null) {
      const groups = this._adapter.getState("groups");
      return groups;
    }
    return null;
  }
  /**
   * Determine whether you have selected all except for disabled
   * @param {Set} selectedRowKeysSet
   * @param {Set} disabledRowKeysSet
   * @param {Array} allKeys keys after sorted and filtered
   */
  allIsSelected(selectedRowKeysSet, disabledRowKeysSet, allKeys) {
    const filteredAllKeys = (0, import_filter.default)(allKeys, (key) => key != null && !disabledRowKeysSet.has(key));
    if (filteredAllKeys && filteredAllKeys.length) {
      for (const key of filteredAllKeys) {
        if (key != null && !selectedRowKeysSet.has(key)) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  /**
   * This function is not used yet
   * @param {*} selectedRowKeys
   * @param {*} allKeys
   */
  allIsNotSelected(selectedRowKeys, allKeys) {
    for (const key of allKeys) {
      if (key != null && Array.isArray(selectedRowKeys) && selectedRowKeys.includes(key)) {
        return true;
      }
    }
    return false;
  }
  formatPaginationInfo() {
    let pagination = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let defaultPageText = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    let info = "";
    const formatPageText = (0, import_get.default)(this.getProp("pagination"), "formatPageText");
    const {
      total,
      pageSize,
      currentPage
    } = pagination;
    const currentStart = Math.min((currentPage - 1) * pageSize + 1, total);
    const currentEnd = Math.min(currentPage * pageSize, total);
    if (formatPageText || formatPageText !== false && defaultPageText && total > 0) {
      info = typeof formatPageText === "function" ? formatPageText({
        currentStart,
        currentEnd,
        total
      }) : defaultPageText.replace("${currentStart}", currentStart).replace("${currentEnd}", currentEnd).replace("${total}", total);
    }
    return info;
  }
  toggleShowFilter(dataIndex, visible) {
    let filterObj = this.getQuery(dataIndex);
    const filterDropdownVisible = visible;
    filterObj = Object.assign(Object.assign({}, filterObj), {
      filterDropdownVisible
    });
    if (!this._filterShowIsControlled()) {
    }
    this._adapter.notifyFilterDropdownVisibleChange(filterDropdownVisible, dataIndex);
  }
  /**
   * Called when the filter changes
   * @param {*} dataIndex
   * @param {*} data
   */
  handleFilterSelect(dataIndex) {
    let data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let query = this.getQuery(dataIndex);
    let queries = [...this._adapter.getState("queries")];
    const {
      filteredValue
    } = data;
    query = Object.assign(Object.assign({}, query), {
      filteredValue
    });
    queries = mergeQueries(query, queries);
    const mergedQueries = this._mergeToQueries(query, null);
    const filters = this._getAllFilters(mergedQueries);
    if (!this._filterIsControlled(dataIndex)) {
      this._adapter.setQueries(queries);
      this.handleClickFilterOrSorter(queries);
    }
    this._notifyChange(null, filters);
  }
  /**
   * Click the sort button to call
   * @param {*} column
   * @param {*} e
   */
  handleSort() {
    let column = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let e = arguments.length > 1 ? arguments[1] : void 0;
    this.stopPropagation(e);
    const {
      dataIndex
    } = column;
    let queries = this.getState("queries");
    let curQuery = null;
    queries = [...queries];
    (0, import_each.default)(queries, (query, idx, arr) => {
      if (query.sorter) {
        const sorterObj = Object.assign({}, query);
        const stateSortOrder = (0, import_get.default)(sorterObj, "sortOrder");
        const defaultSortOrder = (0, import_get.default)(sorterObj, "defaultSortOrder", false);
        let querySortOrder = this.isSortOrderValid(stateSortOrder) ? stateSortOrder : defaultSortOrder;
        if (dataIndex && dataIndex === sorterObj.dataIndex) {
          if (querySortOrder === strings.SORT_DIRECTIONS[0]) {
            querySortOrder = strings.SORT_DIRECTIONS[1];
          } else if (querySortOrder === strings.SORT_DIRECTIONS[1]) {
            querySortOrder = false;
          } else {
            querySortOrder = strings.SORT_DIRECTIONS[0];
          }
        } else {
          querySortOrder = false;
        }
        arr[idx] = Object.assign(Object.assign({}, sorterObj), {
          sortOrder: querySortOrder
        });
        if (dataIndex === sorterObj.dataIndex) {
          curQuery = arr[idx];
        }
      }
    });
    if (!this._sorterIsControlled(dataIndex)) {
      this._adapter.setQueries(queries);
      this.handleClickFilterOrSorter(queries);
    }
    this._notifyChange(null, null, curQuery, null);
  }
  /**
   * Recalculate the cached data after clicking filter or sorter
   * @param {*} queries
   */
  handleClickFilterOrSorter(queries) {
    const dataSource = [...this.getProp("dataSource")];
    const sortedDataSource = this.getFilteredSortedDataSource(dataSource, queries);
    const allDataDisabledRowKeys = this.getAllDisabledRowKeys(sortedDataSource);
    this.setCachedFilteredSortedDataSource(sortedDataSource);
    this.setAllDisabledRowKeys(allDataDisabledRowKeys);
    const pageData = this.getCurrentPageData(sortedDataSource);
    this.setAdapterPageData(pageData);
  }
  getQuery(dataIndex, queries) {
    queries = queries || this.getState("queries");
    if (dataIndex != null) {
      return (0, import_find.default)(queries, (query) => query.dataIndex === dataIndex);
    }
    return void 0;
  }
  getCellWidths(flattenedColumns, flattenedWidths, ignoreScrollBarKey) {
    return this._adapter.getCellWidths(flattenedColumns, flattenedWidths, ignoreScrollBarKey);
  }
  setHeadWidths(headWidths, index) {
    return this._adapter.setHeadWidths(headWidths, index);
  }
  getHeadWidths(index) {
    return this._adapter.getHeadWidths(index);
  }
  mergedRowExpandable(record) {
    return this._adapter.mergedRowExpandable(record);
  }
  setBodyHasScrollbar(bodyHasScrollbar) {
    this._adapter.setBodyHasScrollbar(bodyHasScrollbar);
  }
};
var foundation_default2 = TableFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_table_foundation.js.map
