import { defineComponent, ref, h, Fragment, VNode, CSSProperties, ComponentObjectPropsOptions, PropType } from 'vue';

import * as PropTypes from '../PropTypes';
import { noop } from 'lodash';

import IconButton from '../iconButton';
import Button from '../button';
import { cssClasses, strings } from '@douyinfe/semi-foundation/datePicker/constants';
import {
  IconChevronLeft,
  IconChevronRight,
  IconDoubleChevronLeft,
  IconDoubleChevronRight,
} from '@kousum/semi-icons-vue';
import { PanelType } from '@douyinfe/semi-foundation/datePicker/monthsGridFoundation';
import { CombineProps } from '../interface';

const prefixCls = cssClasses.NAVIGATION;

interface NavigationProps {
  forwardRef?: any;
  monthText?: string;
  density?: string;
  onMonthClick?: (e: MouseEvent) => void;
  onNextMonth?: () => void;
  onPrevMonth?: () => void;
  onNextYear?: () => void;
  onPrevYear?: () => void;
  navPrev?: VNode;
  navNext?: VNode;
  // Whether to switch synchronously for two panels
  shouldBimonthSwitch?: boolean;
  // Panel type, divided into left panel and right panel
  panelType?: PanelType;
}

export const vuePropsType: CombineProps<NavigationProps> = {
  monthText: { type: PropTypes.string, default: '' },
  density: PropTypes.string,
  onMonthClick: {
    type: PropTypes.func as PropType<NavigationProps['onMonthClick']>,
    default: noop,
  },
  onNextMonth: {
    type: PropTypes.func as PropType<NavigationProps['onNextMonth']>,
    default: noop,
  },
  onPrevMonth: {
    type: PropTypes.func as PropType<NavigationProps['onPrevMonth']>,
    default: noop,
  },
  onNextYear: {
    type: PropTypes.func as PropType<NavigationProps['onNextYear']>,
    default: noop,
  },
  onPrevYear: {
    type: PropTypes.func as PropType<NavigationProps['onPrevYear']>,
    default: noop,
  },
  navPrev: PropTypes.node as PropType<NavigationProps['navPrev']>,
  navNext: PropTypes.node as PropType<NavigationProps['navNext']>,
  // Whether to switch synchronously for two panels
  shouldBimonthSwitch: PropTypes.bool,
  // Panel type, divided into left panel and right panel
  panelType: PropTypes.string as PropType<NavigationProps['panelType']>,
  forwardRef: [PropTypes.object, PropTypes.func]
};
const navigation = defineComponent({
  props: { ...vuePropsType },
  name: 'DatePickerNavigation',
  setup(props, { slots }) {
    const navRef = ref();

    return () => {
      const {
        forwardRef,
        monthText,
        onMonthClick,
        onNextMonth,
        onPrevMonth,
        onPrevYear,
        onNextYear,
        density,
        shouldBimonthSwitch,
        panelType,
      } = props;

      const btnTheme = 'borderless';
      const iconBtnSize = density === 'compact' ? 'default' : 'large';
      const btnNoHorizontalPadding = true;
      const buttonSize = density === 'compact' ? 'small' : 'default';
      const isLeftPanel = panelType === strings.PANEL_TYPE_LEFT;
      const isRightPanel = panelType === strings.PANEL_TYPE_RIGHT;

      // syncSwitchMonth and the current panel is the left
      const hiddenLeftPanelRightButtons = shouldBimonthSwitch && isLeftPanel;
      // syncSwitchMonth and the current panel is the right
      const hiddenRightPanelLeftButtons = shouldBimonthSwitch && isRightPanel;
      // `visibility: hidden` will keep the icon in position
      const leftButtonStyle: CSSProperties = {};
      const rightButtonStyle: CSSProperties = {};
      if (hiddenRightPanelLeftButtons) {
        leftButtonStyle.visibility = 'hidden';
      }
      if (hiddenLeftPanelRightButtons) {
        rightButtonStyle.visibility = 'hidden';
      }

      const ref = forwardRef || navRef;
      return (
        <div class={prefixCls} ref={ref}>
          <IconButton
            key="double-chevron-left"
            aria-label="Previous year"
            icon={<IconDoubleChevronLeft aria-hidden size={iconBtnSize} />}
            size={buttonSize}
            theme={btnTheme}
            noHorizontalPadding={btnNoHorizontalPadding}
            onClick={onPrevYear}
            style={leftButtonStyle}
          />
          <IconButton
            key="chevron-left"
            aria-label="Previous month"
            icon={<IconChevronLeft aria-hidden size={iconBtnSize} />}
            size={buttonSize}
            onClick={onPrevMonth}
            theme={btnTheme}
            noHorizontalPadding={btnNoHorizontalPadding}
            style={leftButtonStyle}
          />
          <div class={`${prefixCls}-month`}>
            <Button onClick={onMonthClick} theme={btnTheme} size={buttonSize}>
              <span>{monthText}</span>
            </Button>
          </div>
          <IconButton
            key="chevron-right"
            aria-label="Next month"
            icon={<IconChevronRight aria-hidden size={iconBtnSize} />}
            size={buttonSize}
            onClick={onNextMonth}
            theme={btnTheme}
            noHorizontalPadding={btnNoHorizontalPadding}
            style={rightButtonStyle}
          />
          <IconButton
            key="double-chevron-right"
            aria-label="Next year"
            icon={<IconDoubleChevronRight aria-hidden size={iconBtnSize} />}
            size={buttonSize}
            theme={btnTheme}
            noHorizontalPadding={btnNoHorizontalPadding}
            onClick={onNextYear}
            style={rightButtonStyle}
          />
        </div>
      );
    };
  },
});

export default navigation;
