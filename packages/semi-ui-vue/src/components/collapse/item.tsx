import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses } from '@douyinfe/semi-foundation/collapse/constants';
import Collapsible from '../collapsible';
import { IconChevronDown, IconChevronUp } from '@kousum/semi-icons-vue';
import { getUuidShort } from '@douyinfe/semi-foundation/utils/uuid';
import { CSSProperties, defineComponent, Fragment, h, onMounted, ref, useSlots, VNode } from 'vue';
import { useCollapseContext } from './context/Consumer';
import { vuePropsMake } from '../PropTypes';
import { VueJsxNode } from '../interface';

export interface CollapsePanelProps {
  itemKey: string;
  extra?: VueJsxNode;
  header?: VueJsxNode;
  className?: string;
  children?: VNode[];
  reCalcKey?: number | string;
  style?: CSSProperties;
  showArrow?: boolean;
  disabled?: boolean;
  onMotionEnd?: () => void;
}

const propTypes = {
  itemKey: PropTypes.string,
  extra: PropTypes.node,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  reCalcKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showArrow: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  showArrow: true,
  disabled: false,
};

export const vuePropsType = vuePropsMake<CollapsePanelProps>(propTypes, defaultProps);
const CollapsePanel = defineComponent(
  (props, {}) => {
    let ariaID: string = '';
    onMounted(() => {
      ariaID = getUuidShort({});
    });
    const slots = useSlots();

    const headerExpandIconTriggerRef = ref();
    const { context } = useCollapseContext();
    function renderHeader(active: boolean, expandIconEnable = true) {
      const { showArrow, header, extra } = props;
      let { expandIcon, collapseIcon } = context.value;
      const { expandIconPosition } = context.value;
      if (typeof expandIcon === 'undefined') {
        expandIcon = <IconChevronDown />;
      }
      if (typeof collapseIcon === 'undefined') {
        collapseIcon = <IconChevronUp />;
      }
      const icon = (
        <span
          ref={headerExpandIconTriggerRef}
          aria-hidden="true"
          class={cls([
            `${cssClasses.PREFIX}-header-icon`,
            { [`${cssClasses.PREFIX}-header-iconDisabled`]: !expandIconEnable },
          ])}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {expandIconEnable ? (active ? collapseIcon : expandIcon) : expandIcon}
        </span>
      );
      const iconPosLeft = expandIconPosition === 'left';
      if (typeof header === 'string') {
        return (
          <>
            {showArrow && (iconPosLeft ? icon : null)}
            <span>{header}</span>
            <span class={`${cssClasses.PREFIX}-header-right`}>
              <span>{extra}</span>
              {showArrow && (iconPosLeft ? null : icon)}
            </span>
          </>
        );
      }
      return (
        <Fragment>
          {showArrow && (iconPosLeft ? icon : null)}
          {header}
          {showArrow && (iconPosLeft ? null : icon)}
        </Fragment>
      );
    }

    const handleClick = (itemKey: string, e: MouseEvent) => {
      // Judge user click Icon or Header
      // Don't mount this func into icon span wrapper, or get triggered twice because of event propagation
      if (context.value.clickHeaderToExpand || headerExpandIconTriggerRef.value?.contains(e.target as HTMLElement)) {
        context.value.onClick(itemKey, e);
      }
    };

    return () => {
      const children = slots.default?.();
      const { className, itemKey, reCalcKey, header, extra, showArrow, disabled, ...restProps } = props;
      const { keepDOM, expandIconPosition, activeSet, motion, lazyRender } = context.value;
      const active = activeSet.has(itemKey);
      const itemCls = cls(className, {
        [`${cssClasses.PREFIX}-item`]: true,
      });
      const headerCls = cls({
        [`${cssClasses.PREFIX}-header`]: true,
        [`${cssClasses.PREFIX}-header-disabled`]: disabled,
        [`${cssClasses.PREFIX}-header-iconLeft`]: expandIconPosition === 'left',
      });
      const contentCls = cls({
        [`${cssClasses.PREFIX}-content`]: true,
      });
      return (
        <div class={itemCls} {...restProps}>
          <div
            role="button"
            tabindex={0}
            class={headerCls}
            aria-disabled={disabled}
            aria-expanded={active ? 'true' : 'false'}
            aria-owns={ariaID}
            onClick={(e) => !disabled && handleClick(itemKey, e)}
          >
            {renderHeader(active, children !== undefined && !disabled)}
          </div>
          {children && (
            <Collapsible
              lazyRender={lazyRender}
              isOpen={active}
              keepDOM={keepDOM}
              motion={motion}
              reCalcKey={reCalcKey}
              onMotionEnd={props.onMotionEnd}
            >
              <div class={contentCls} aria-hidden={!active} id={ariaID}>
                <div class={`${cssClasses.PREFIX}-content-wrapper`}>{children}</div>
              </div>
            </Collapsible>
          )}
        </div>
      );
    };
  },
  {
    props: vuePropsType,
    name: 'CollapsePanel',
  }
);

export default CollapsePanel;
