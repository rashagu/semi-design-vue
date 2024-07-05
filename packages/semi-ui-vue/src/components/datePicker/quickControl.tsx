import {defineComponent, ref, h, Fragment, useSlots, PropType} from 'vue'
import classNames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/datePicker/constants';
import Button from '../button/index';
import {TypographyText} from '../typography/index';
import { noop } from '@douyinfe/semi-foundation/utils/function';
import { PresetsType, PresetType } from '@douyinfe/semi-foundation/datePicker/foundation';
import { DateInputFoundationProps } from '@douyinfe/semi-foundation/datePicker/inputFoundation';
import * as PropTypes from '../PropTypes'
import {vuePropsMake} from "../PropTypes";

import {ComponentObjectPropsOptions} from "vue";
const prefixCls = cssClasses.PREFIX;
export interface QuickControlProps {
  presets: PresetsType;
  presetPosition: typeof strings.PRESET_POSITION_SET[number];
  onPresetClick: (preset: PresetType, e: MouseEvent) => void;
  type: string;
  insetInput: DateInputFoundationProps['insetInput']
  locale: any
}
const propTypes:ComponentObjectPropsOptions<QuickControlProps> = {
  presets: PropTypes.array,
  presetPosition: PropTypes.string as PropType<QuickControlProps['presetPosition']>,
  onPresetClick: PropTypes.func as PropType<QuickControlProps['onPresetClick']>,
  type: PropTypes.string,
  insetInput: [PropTypes.bool, PropTypes.object],
  locale: PropTypes.object,
};

const defaultProps = {
  presets: [] as PresetsType,
  presetPosition: 'bottom',
  onPresetClick: noop,
};
export const vuePropsType = vuePropsMake<QuickControlProps>(propTypes, defaultProps)
const quickControl = defineComponent((props, {}) => {
  const slots = useSlots()

  return () => {
    const { presets, onPresetClick, type, presetPosition, insetInput, locale } = props;
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
        { !isPanelTopAndBottom && <div class={headerCls}>{locale.presets}</div>}
        <div class={contentWrapperCls}>
          <div class={contentCls}>
            {presets.map((item, index) => {
              const _item: PresetType = typeof item === 'function' ? item() : item;
              return (
                <Button size="small" type="primary" onClick={e => onPresetClick(typeof item === 'function' ? item() : item, e)} key={index}>
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
}, {
  props: vuePropsType,
  name: 'DatePicker_quickControl'
})

export default quickControl

