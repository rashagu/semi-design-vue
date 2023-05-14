import {
  require_cloneDeep
} from "./chunk-7KJ33JEY.js";
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
import "./chunk-AFEGDMIW.js";
import "./chunk-54BFKMM2.js";
import "./chunk-XGO3WBYR.js";
import "./chunk-OGZSSVRW.js";
import "./chunk-W3G4FQR2.js";
import "./chunk-T6W56XAT.js";
import {
  warning
} from "./chunk-K7DSZPDE.js";
import "./chunk-TY6AJI44.js";
import {
  require_isObject
} from "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/getMotionObjFromProps.js
var import_isObject = __toESM(require_isObject());
var import_cloneDeep = __toESM(require_cloneDeep());
function getMotionObjFromProps(props) {
  if (typeof props !== "object" || props === null) {
    throw new TypeError(`props should be object type, got ${typeof props}`);
  }
  const MOTION_PROPS = ["willEnter", "didEnter", "willLeave", "didLeave", "onStart", "onRest", "state"];
  const {
    motion: motionProp = {}
  } = props;
  let motion = {};
  if ((0, import_isObject.default)(motionProp)) {
    motion = (0, import_cloneDeep.default)(motionProp);
    for (const key of Object.keys(motionProp)) {
      const handler = motionProp[key];
      if (typeof handler === "function") {
        if (key in props) {
          motion[key] = () => {
            props[key]();
            handler();
          };
        }
      } else {
        warning(true, `[Semi] duplicate motion key '${key}' from motion prop and props`);
      }
    }
  } else if (typeof motionProp === "function") {
    const motionFnResult = motionProp(props);
    motion = (0, import_isObject.default)(motionFnResult) ? motionFnResult : {};
  }
  if ((0, import_isObject.default)(motion)) {
    for (const key of MOTION_PROPS) {
      if (key in props && !(key in motion)) {
        motion[key] = props[key];
      }
    }
  }
  return motion;
}
export {
  getMotionObjFromProps as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_utils_getMotionObjFromProps.js.map
