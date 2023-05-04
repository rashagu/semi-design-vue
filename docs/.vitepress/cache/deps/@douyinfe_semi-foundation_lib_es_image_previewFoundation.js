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

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/image/previewFoundation.js
var PreviewFoundation = class extends foundation_default {
  constructor() {
    super(...arguments);
    this.handleVisibleChange = (newVisible) => {
      const {
        visible,
        onVisibleChange
      } = this.getProps();
      if (!(visible in this.getProps())) {
        this.setState({
          visible: newVisible
        });
      }
      onVisibleChange && onVisibleChange(newVisible);
    };
    this.handleCurrentIndexChange = (index) => {
      const {
        currentIndex,
        onChange
      } = this.getProps();
      if (!(currentIndex in this.getProps())) {
        this.setState({
          currentIndex: index
        });
      }
      onChange && onChange(index);
    };
  }
};
export {
  PreviewFoundation as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_image_previewFoundation.js.map
