import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import classNames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/datePicker/constants';
import Button from '../button/index';
import {TypographyText} from '../typography/index';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import { PresetsType, PresetType } from '@douyinfe/semi-foundation/datePicker/foundation';
import * as PropTypes from '../PropTypes'
import {vuePropsMake} from "../PropTypes";
import navigation from "./navigation";
const prefixCls = cssClasses.PREFIX;
export interface QuickControlProps {
  presets: PresetsType;
  presetPosition: typeof strings.PRESET_POSITION_SET[number];
  onPresetClick: (preset: PresetType, e: MouseEvent) => void;
  type: string;
  insetInput: boolean
}
const propTypes = {
  presets: PropTypes.array,
  presetPosition: PropTypes.string,
  onPresetClick: PropTypes.func,
  type: PropTypes.string,
  insetInput: PropTypes.bool
};

const defaultProps = {
  presets: [] as PresetsType,
  presetPosition: 'bottom',
  onPresetClick: noop,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const quickControl = defineComponent<QuickControlProps>((props, {}) => {
  const slots = useSlots()

  return () => {
    const { presets, onPresetClick, type, presetPosition, insetInput } = props;
    const isTypeRange = type === 'dateRange' || type === 'dateTimeRange';
    const isPanelTopAndBottom = presetPosition === 'top' || presetPosition === 'bottom';
    const isMonth = type === 'month';
    const isTopAndBottomRange = isPanelTopAndBottom && isTypeRange;
    const isTopAndBottomMonth = isPanelTopAndBottom && isMonth;

    const wrapperCls = classNames(`${prefixCls}-quick-control`, {
      [`${prefixCls}-quick-control-${type}`]: type,
      [`${prefixCls}-quick-control-${presetPosition}`]: true,
    });
    const headerCls = classNames({
      [`${prefixCls}-quick-control-header`]: true,
    });
    const contentWrapperCls = classNames({
      [`${prefixCls}-quick-control-${presetPosition}-content-wrapper`]: true,
    });
    const contentCls = classNames({
      [`${prefixCls}-quick-control-${presetPosition}-content`]: !isTopAndBottomRange && !isTopAndBottomMonth,
      [`${prefixCls}-quick-control-${presetPosition}-range-content`]: isTopAndBottomRange,
      [`${prefixCls}-quick-control-${presetPosition}-month-content`]: isTopAndBottomMonth,
    });
    const itemCls = classNames({
      [`${prefixCls}-quick-control-${presetPosition}-content-item`]: !isTopAndBottomRange && !isTopAndBottomMonth,
      [`${prefixCls}-quick-control-${presetPosition}-range-content-item`]: isTopAndBottomRange,
      [`${prefixCls}-quick-control-${presetPosition}-month-content-item`]: isTopAndBottomMonth,
    });
    const ellipsisCls = classNames({
      [`${prefixCls}-quick-control-${presetPosition}-content-item-ellipsis`]: !isTopAndBottomRange && !isTopAndBottomMonth,
      [`${prefixCls}-quick-control-${presetPosition}-range-content-item-ellipsis`]: isTopAndBottomRange,
      [`${prefixCls}-quick-control-${presetPosition}-month-content-item-ellipsis`]: isTopAndBottomMonth,
    });


    if (!presets.length) {
      return null;
    }
    return (
      <div class={wrapperCls} x-insetinput={insetInput ? "true" : "false"}>
        { !isPanelTopAndBottom && <div class={headerCls}>快捷选择</div>}
        <div class={contentWrapperCls}>
          <div class={contentCls}>
            {presets.map((item, index) => {
              const _item: PresetType = typeof item === 'function' ? item() : item;
              return (
                <Button size="small" type="primary" onClick={e => onPresetClick(_item, e)} key={index}>
                  <div class={itemCls}>
                    <TypographyText
                      ellipsis={{ showTooltip: true }}
                      class={ellipsisCls}
                    >
                      {_item.text}
                    </TypographyText>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
})

quickControl.props = vuePropsType
quickControl.name = "DatePicker_quickControl"

export default quickControl

