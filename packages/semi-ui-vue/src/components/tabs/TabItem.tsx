import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/tabs/constants';
import { IconClose } from '@kousum/semi-icons-vue';
import { TabType, TabSize, TabPosition } from './interface';
import { ComponentObjectPropsOptions, computed, defineComponent, h, PropType, useSlots } from 'vue';
import { CombineProps, VueJsxNode } from '../interface';
import { vuePropsMake } from '../PropTypes';

export interface TabItemProps {
  tab?: VueJsxNode;
  icon?: VueJsxNode;
  size?: TabSize;
  type?: TabType;
  tabPosition?: TabPosition;
  selected?: boolean;
  closable?: boolean;
  disabled?: boolean;
  itemKey?: string;
  handleKeyDown?: (event: KeyboardEvent, itemKey: string, closable: boolean) => void;
  deleteTabItem?: (tabKey: string, event: MouseEvent) => void;
  onClick?: (itemKey: string, e: MouseEvent) => void;
  forwardRef?: any;
}
const propTypes: CombineProps<TabItemProps> = {
  tab: PropTypes.node,
  icon: PropTypes.node,
  size: PropTypes.string as PropType<TabItemProps['size']>,
  type: PropTypes.string as PropType<TabItemProps['type']>,
  tabPosition: PropTypes.string as PropType<TabItemProps['tabPosition']>,
  selected: PropTypes.bool,
  closable: PropTypes.bool,
  disabled: PropTypes.bool,
  itemKey: PropTypes.string,
  handleKeyDown: PropTypes.func as PropType<TabItemProps['handleKeyDown']>,
  deleteTabItem: PropTypes.func as PropType<TabItemProps['deleteTabItem']>,
  onClick: PropTypes.func as PropType<TabItemProps['onClick']>,
  forwardRef: [PropTypes.object, PropTypes.func],
};
export const vuePropsType = vuePropsMake(propTypes, {});
const TabItem = defineComponent({
  props: { ...vuePropsType },
  name: 'Tabs.TabItem',
  setup(props, { attrs }) {
    const slots = useSlots();

    const closableIcon = computed(() => {
      return props.type === 'card' && props.closable ? (
        <IconClose
          aria-label="Close"
          role="button"
          className={`${cssClasses.TABS_TAB}-icon-close`}
          onClick={(e: MouseEvent) => props.deleteTabItem(props.itemKey, e)}
        />
      ) : null;
    });

    const renderIcon = (icon: any) => <span>{icon}</span>;

    const handleKeyDownInItem = (event: KeyboardEvent) => {
      props.handleKeyDown && props.handleKeyDown(event, props.itemKey, props.closable);
    };

    const handleItemClick = (e: MouseEvent) => {
      !props.disabled && props.onClick && props.onClick(props.itemKey, e);
    };
    return () => {
      const {
        tab,
        size,
        type,
        icon,
        selected,
        closable,
        disabled,
        itemKey,
        deleteTabItem,
        tabPosition,
        handleKeyDown,
        onClick,
        ...restProps
      } = props;

      const panelIcon = icon ? renderIcon(icon) : null;
      const className = cls(
        cssClasses.TABS_TAB,
        `${cssClasses.TABS_TAB}-${type}`,
        `${cssClasses.TABS_TAB}-${tabPosition}`,
        `${cssClasses.TABS_TAB}-single`,

        {
          [cssClasses.TABS_TAB_ACTIVE]: selected,
          [cssClasses.TABS_TAB_DISABLED]: disabled,
          [`${cssClasses.TABS_TAB}-small`]: size === 'small',
          [`${cssClasses.TABS_TAB}-medium`]: size === 'medium',
        }
      );
      return (
        <div
          role="tab"
          id={`semiTab${itemKey}`}
          data-tabkey={`semiTab${itemKey}`}
          aria-controls={`semiTabPanel${itemKey}`}
          aria-disabled={disabled ? 'true' : 'false'}
          aria-selected={selected ? 'true' : 'false'}
          tabindex={selected ? 0 : -1}
          onKeydown={handleKeyDownInItem}
          onClick={handleItemClick}
          class={className}
          {...restProps}
          ref={props.forwardRef}
        >
          {panelIcon}
          {tab}
          {closableIcon.value}
        </div>
      );
    };
  },
});

export default TabItem;
