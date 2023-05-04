import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/image/imageFoundation.js
var import_isObject = __toESM(require_isObject());
var ImageFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleClick = (e) => {
      const {
        imageID,
        preview
      } = this.getProps();
      if (!preview) {
        return;
      }
      if (this._adapter.getIsInGroup()) {
        const {
          setCurrentIndex,
          handleVisibleChange
        } = this._adapter.getContexts();
        setCurrentIndex(imageID);
        handleVisibleChange(true);
      } else {
        this.handlePreviewVisibleChange(true);
      }
    };
    this.handleLoaded = (e) => {
      const {
        onLoad
      } = this.getProps();
      onLoad && onLoad(e);
      this.setState({
        loadStatus: "success"
      });
    };
    this.handleError = (e) => {
      const {
        onError
      } = this.getProps();
      onError && onError(e);
      this.setState({
        loadStatus: "error"
      });
    };
    this.handlePreviewVisibleChange = (newVisible) => {
      const {
        preview
      } = this.getProps();
      if ((0, import_isObject.default)(preview)) {
        const {
          onVisibleChange
        } = preview;
        onVisibleChange && onVisibleChange(newVisible);
        if (!("visible" in preview)) {
          this.setState({
            previewVisible: newVisible
          });
        }
      } else {
        this.setState({
          previewVisible: newVisible
        });
      }
    };
  }
};
export {
  ImageFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_image_imageFoundation.js.map
