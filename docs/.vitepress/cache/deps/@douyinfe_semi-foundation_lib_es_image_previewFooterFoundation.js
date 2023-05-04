import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/image/previewFooterFoundation.js
var PreviewFooterFoundation = class extends foundation_default {
  constructor() {
    super(...arguments);
    this.changeSliderValue = (type) => {
      const {
        zoom,
        step,
        min,
        max
      } = this.getProps();
      let newValue = type === "plus" ? zoom + step : zoom - step;
      if (newValue > max) {
        newValue = max;
      } else if (newValue < min) {
        newValue = min;
      }
      this.handleValueChange(newValue);
    };
    this.handleValueChange = (value) => {
      const {
        onZoomIn,
        onZoomOut,
        zoom
      } = this.getProps();
      if (value > zoom) {
        onZoomIn(Number((value / 100).toFixed(2)));
      } else {
        onZoomOut(Number((value / 100).toFixed(2)));
      }
      this._adapter.setStartMouseOffset(value);
    };
    this.handleRatioClick = () => {
      const {
        ratio,
        onAdjustRatio
      } = this.getProps();
      const type = ratio === "adaptation" ? "realSize" : "adaptation";
      onAdjustRatio(type);
    };
    this.handleRotate = (direction) => {
      const {
        onRotate
      } = this.getProps();
      onRotate && onRotate(direction);
    };
  }
};
export {
  PreviewFooterFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_image_previewFooterFoundation.js.map
