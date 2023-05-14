import {
  expandBtnShouldInRow,
  genExpandedRowKey,
  getRecordChildren,
  getRecordKey
} from "./chunk-OKRARV2O.js";
import "./chunk-2BEXMFB4.js";
import "./chunk-JWS2E6MO.js";
import {
  strings
} from "./chunk-IIDJ3K4P.js";
import "./chunk-FEMUKZWK.js";
import {
  require_baseIteratee
} from "./chunk-VPJII4ZW.js";
import {
  require_includes
} from "./chunk-GRE7MUIS.js";
import "./chunk-OL7AAX6S.js";
import {
  require_toInteger
} from "./chunk-KOVH33RT.js";
import "./chunk-EGPIATU2.js";
import {
  require_isMap
} from "./chunk-RFWJA27S.js";
import "./chunk-VS2OXD4D.js";
import "./chunk-XKTW6BSF.js";
import "./chunk-HPYJEDL6.js";
import "./chunk-IGKIE6XV.js";
import "./chunk-CUWPCCUM.js";
import "./chunk-SKUJYBVG.js";
import {
  require_baseFindIndex
} from "./chunk-PTHRDZX2.js";
import "./chunk-WZVIFC3L.js";
import "./chunk-IBVGRLMF.js";
import "./chunk-6OL7JQEH.js";
import "./chunk-KPUGFIAL.js";
import "./chunk-LI3LUTH5.js";
import "./chunk-TSZXP53R.js";
import "./chunk-BVRSW63P.js";
import "./chunk-QWVJ4J4X.js";
import "./chunk-JZBNO6DV.js";
import "./chunk-3ISLXTGF.js";
import "./chunk-AFEGDMIW.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import "./chunk-NQE5YR5Y.js";
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
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import {
  require_isObject
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/findLastIndex.js
var require_findLastIndex = __commonJS({
  "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/findLastIndex.js"(exports, module) {
    var baseFindIndex = require_baseFindIndex();
    var baseIteratee = require_baseIteratee();
    var toInteger = require_toInteger();
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== void 0) {
        index = toInteger(fromIndex);
        index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
    }
    module.exports = findLastIndex;
  }
});

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/table/bodyFoundation.js
var import_isObject = __toESM(require_isObject());
var import_findLastIndex = __toESM(require_findLastIndex());
var import_isMap = __toESM(require_isMap());
var import_includes = __toESM(require_includes());
var import_get = __toESM(require_get());
var TableBodyFoundation = class extends foundation_default {
  init() {
    this.initVirtualizedData();
    this.initExpandBtnShouldInRow();
  }
  destroy() {
    this.unobserveBodyResize();
  }
  initVirtualizedData(cb) {
    this._adapter.setVirtualizedData(this.flattenData(this.getProp("dataSource")), cb);
  }
  initExpandBtnShouldInRow(newExpandRelatedProps) {
    const props = this.getProps();
    const cachedExpandBtnShouldInRow = expandBtnShouldInRow(props);
    this._adapter.setCachedExpandBtnShouldInRow(cachedExpandBtnShouldInRow);
    if (!(0, import_isObject.default)(newExpandRelatedProps) && !newExpandRelatedProps) {
      const expandRelatedProps = strings.EXPAND_RELATED_PROPS;
      newExpandRelatedProps = expandRelatedProps.map((key) => (0, import_get.default)(props, key, void 0));
    }
    this._adapter.setCachedExpandRelatedProps(newExpandRelatedProps);
  }
  flattenData() {
    let dataSource = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    let parentKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    let childrenKeys = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [];
    const flattenData = [];
    const {
      rowKey,
      childrenRecordName,
      expandedRowRender,
      expandedRowKeys,
      groups
    } = this.getProps();
    if (level === 0 && (0, import_isMap.default)(groups)) {
      groups.forEach((set, key) => {
        const firstIndex = dataSource.findIndex((record) => set.has(getRecordKey(record, rowKey)));
        if (firstIndex > -1) {
          const lastIndex = (0, import_findLastIndex.default)(dataSource, (record) => set.has(getRecordKey(record, rowKey)));
          const expanded = (0, import_includes.default)(expandedRowKeys, key);
          flattenData.push({
            key,
            level,
            sectionRow: true,
            group: set,
            groupKey: key,
            expanded
          });
          if (expanded) {
            flattenData.push(...this.flattenData(dataSource.slice(firstIndex, lastIndex + 1), level + 1, [...parentKeys], [...childrenKeys]));
          }
        }
      });
    } else {
      dataSource.forEach((record, index) => {
        const recordKey = getRecordKey(record, rowKey);
        const children = getRecordChildren(record, childrenRecordName);
        if (level) {
          childrenKeys.push(recordKey);
        }
        const item = {
          key: recordKey,
          record,
          level,
          parentKeys: [...parentKeys],
          childrenKeys: [...childrenKeys]
        };
        flattenData.push(item);
        const extras = [];
        if ((0, import_includes.default)(expandedRowKeys, recordKey)) {
          if (Array.isArray(children) && children.length) {
            extras.push(...this.flattenData(children, level + 1, [...item.parentKeys], [...item.childrenKeys]));
          } else if (expandedRowRender) {
            extras.push({
              key: genExpandedRowKey(recordKey),
              level,
              expandedRow: true,
              record
            });
          }
          flattenData.push(...extras);
        }
      });
    }
    return flattenData;
  }
  /**
   * Use ResizeObserver to monitor changes in the size of the body content area, and notify Table to recalculate if it changes. columns #1219
   * (Only monitor the scroll.y scene, other scenes are not monitored, because the header of the scroll.y scene is a separate table, and a scrollbar column will be inserted)
   */
  observeBodyResize(bodyDOM) {
    const {
      scroll
    } = this.getProps();
    if ((0, import_get.default)(scroll, "y")) {
      return this._adapter.observeBodyResize(bodyDOM);
    }
  }
  unobserveBodyResize() {
    return this._adapter.unobserveBodyResize();
  }
};
export {
  TableBodyFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_table_bodyFoundation.js.map
