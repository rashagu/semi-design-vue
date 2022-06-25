import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import classNames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/datePicker/constants';
import Button from '../button/index';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import { PresetsType, PresetType } from '@douyinfe/semi-foundation/datePicker/foundation';
import * as PropTypes from '../PropTypes'
import {vuePropsMake} from "../PropTypes";
const prefixCls = cssClasses.PREFIX;
export interface QuickControlProps {
  presets: PresetsType;
  onPresetClick: (preset: PresetType, e: MouseEvent) => void;
  type: string;
}
const propTypes = {
  presets: PropTypes.array,
  onPresetClick: PropTypes.func,
  type: PropTypes.string
};

const defaultProps = {
  presets: [] as PresetsType,
  onPresetClick: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const quickControl = defineComponent<QuickControlProps>((props, {}) => {
  const slots = useSlots()

  return () => {
    const { presets, onPresetClick, type } = props;
    const wrapperCls = classNames(`${prefixCls}-quick-control`, {
      [`${prefixCls}-quick-control-${type}`]: type
    });
    const itemCls = classNames(`${prefixCls}-quick-control-item`);
    if (!presets.length) {
      return null;
    }
    return (
      <div class={wrapperCls}>
        {presets.map((item, index) => {
          const _item: PresetType = typeof item === 'function' ? item() : item;
          return (
            <div class={itemCls} onClick={e => onPresetClick(_item, e)} key={index}>
              <Button size="small" theme="borderless" type="primary">
                <span>{_item.text}</span>
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
})

quickControl.props = vuePropsType

export default quickControl

