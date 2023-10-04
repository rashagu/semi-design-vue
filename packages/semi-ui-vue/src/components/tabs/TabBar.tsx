import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/tabs/constants';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import OverflowList from '../overflowList';
import Dropdown, {DropdownItem, DropdownMenu} from '../dropdown';
import Button from '../button';
import { TabBarProps, PlainTab } from './interface';
import { isEmpty, pick } from 'lodash';
import { IconChevronRight, IconChevronLeft, IconClose } from '@kousum/semi-icons-vue';
import { getUuidv4 } from '@douyinfe/semi-foundation/utils/uuid';
import TabItem from './TabItem';
import {ComponentObjectPropsOptions, defineComponent, h, onMounted, PropType, reactive, useSlots, VNode} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { VueJsxNode } from '../interface';

export interface TabBarState {
  endInd: number;
  rePosKey: number;
  startInd: number;
  uuid: string;
}

export interface OverflowItem extends PlainTab {
  key: string;
  active: boolean;
}
const propTypes:ComponentObjectPropsOptions<TabBarProps> = {
  activeKey: PropTypes.string,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  list: PropTypes.array,
  onTabClick: PropTypes.func as PropType<TabBarProps['onTabClick']>,
  size: PropTypes.string as PropType<TabBarProps['size']>,
  style: PropTypes.object,
  tabBarExtraContent: PropTypes.node,
  tabPosition: PropTypes.string as PropType<TabBarProps['tabPosition']>,
  type: PropTypes.string as PropType<TabBarProps['type']>,
  closable: PropTypes.bool,
  deleteTabItem: PropTypes.func as PropType<TabBarProps['deleteTabItem']>,
  handleKeyDown: PropTypes.func as PropType<TabBarProps['handleKeyDown']>,
};

export const vuePropsType = vuePropsMake(propTypes, {});
const TabBar = defineComponent<TabBarProps>((props, {}) => {
  const slots = useSlots();
  const state = reactive({
    endInd: props.list.length,
    rePosKey: 0,
    startInd: 0,
    uuid: '',
  });

  onMounted(() => {
    state.uuid = getUuidv4();
  });

  function renderIcon(icon: VueJsxNode): VueJsxNode {
    return <span>{icon}</span>;
  }

  function renderExtra(): VueJsxNode {
    const { tabBarExtraContent, type, size } = props;
    const tabBarExtraContentDefaultStyle = { float: 'right' };
    const tabBarExtraContentStyle =
      tabBarExtraContent && (tabBarExtraContent as VNode).props
        ? (tabBarExtraContent as VNode).props.style
        : {};
    const extraCls = cls(cssClasses.TABS_BAR_EXTRA, {
      [`${cssClasses.TABS_BAR}-${type}-extra`]: type,
      [`${cssClasses.TABS_BAR}-${type}-extra-${size}`]: size,
    });
    if (tabBarExtraContent) {
      const tabBarStyle = { ...tabBarExtraContentDefaultStyle, ...tabBarExtraContentStyle };
      return (
        <div class={extraCls} style={tabBarStyle} x-semi-prop="tabBarExtraContent">
          {tabBarExtraContent}
        </div>
      );
    }
    return null;
  }

  const handleItemClick = (itemKey: string, e: MouseEvent): void => {
    props.onTabClick(itemKey, e);
    if (props.collapsible) {
      const key = _getItemKey(itemKey);
      // eslint-disable-next-line max-len
      const tabItem = document.querySelector(
        `[data-uuid="${state.uuid}"] .${cssClasses.TABS_TAB}[data-scrollkey="${key}"]`
      );
      tabItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  };

  const handleKeyDown = (event: KeyboardEvent, itemKey: string, closable: boolean) => {
    props.handleKeyDown(event, itemKey, closable);
  };

  const renderTabItem = (panel: PlainTab): VueJsxNode => {
    const { size, type, deleteTabItem, handleKeyDown, tabPosition } = props;
    const isSelected = _isActive(panel.itemKey);

    return (
      <TabItem
        {...pick(panel, ['disabled', 'icon', 'itemKey', 'tab', 'closable'])}
        key={_getItemKey(panel.itemKey)}
        selected={isSelected}
        size={size}
        type={type}
        tabPosition={tabPosition}
        handleKeyDown={handleKeyDown}
        deleteTabItem={deleteTabItem}
        onClick={handleItemClick}
      />
    );
  };

  const renderTabComponents = (list: Array<PlainTab>): Array<VueJsxNode> => list.map((panel) => renderTabItem(panel));

  const handleArrowClick = (items: Array<OverflowItem>, pos: 'start' | 'end'): void => {
    const lastItem = pos === 'start' ? items.pop() : items.shift();
    if (!lastItem) {
      return;
    }
    const key = _getItemKey(lastItem.itemKey);
    // eslint-disable-next-line max-len
    const tabItem = document.querySelector(
      `[data-uuid="${state.uuid}"] .${cssClasses.TABS_TAB}[data-scrollkey="${key}"]`
    );
    tabItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  };

  const renderCollapse = (items: Array<OverflowItem>, icon: VueJsxNode, pos: 'start' | 'end'): VueJsxNode => {
    if (isEmpty(items)) {
      return <Button disabled={true} icon={icon} theme="borderless" />;
    }
    const { dropdownClassName, dropdownStyle } = props;
    const { rePosKey } = state;
    const disabled = !items.length;

    const menu = (
      <DropdownMenu>
        {items.map((panel) => {
          const { icon: i, tab, itemKey } = panel;
          const panelIcon = i ? renderIcon(panel.icon) : null;
          return (
            <DropdownItem key={itemKey} onClick={(e): void => handleItemClick(itemKey, e)} active={_isActive(itemKey)}>
              {panelIcon}
              {tab}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    );

    const arrowCls = cls({
      [`${cssClasses.TABS_BAR}-arrow-${pos}`]: pos,
      [`${cssClasses.TABS_BAR}-arrow`]: true,
    });

    const dropdownCls = cls(dropdownClassName, {
      [`${cssClasses.TABS_BAR}-dropdown`]: true,
    });

    return (
      <Dropdown
        className={dropdownCls}
        clickToHide
        clickTriggerToHide
        key={`${rePosKey}-${pos}`}
        position={pos === 'start' ? 'bottomLeft' : 'bottomRight'}
        render={disabled ? null : menu}
        showTick
        style={dropdownStyle}
        trigger={'hover'}
        disableFocusListener // prevent the panel from popping up again after clicking
      >
        <div role="presentation" class={arrowCls} onClick={(e): void => handleArrowClick(items, pos)}>
          <Button
            disabled={disabled}
            icon={icon}
            // size="small"
            theme="borderless"
          />
        </div>
      </Dropdown>
    );
  };

  const renderOverflow = (items: any[]): Array<VueJsxNode> =>
    items.map((item, ind) => {
      const icon = ind === 0 ? <IconChevronLeft /> : <IconChevronRight />;
      const pos = ind === 0 ? 'start' : 'end';
      return renderCollapse(item, icon, pos);
    });

  const renderCollapsedTab = (): VueJsxNode => {
    const { list } = props;
    const renderedList = list.map((item) => {
      const { itemKey } = item;
      return { key: _getItemKey(itemKey), active: _isActive(itemKey), ...item };
    });
    return (
      <OverflowList
        items={renderedList}
        overflowRenderer={renderOverflow}
        renderMode="scroll"
        className={`${cssClasses.TABS_BAR}-overflow-list`}
        visibleItemRenderer={renderTabItem as any}
      />
    );
  };

  const _isActive = (key: string): boolean => key === props.activeKey;

  const _getItemKey = (key: string): string => `${key}-bar`;
  return () => {
    const { type, style, className, list, tabPosition, collapsible, handleKeyDown, ...restProps } = props;
    const classNames = cls(className, {
      [cssClasses.TABS_BAR]: true,
      [cssClasses.TABS_BAR_LINE]: type === 'line',
      [cssClasses.TABS_BAR_CARD]: type === 'card',
      [cssClasses.TABS_BAR_BUTTON]: type === 'button',
      [`${cssClasses.TABS_BAR}-${tabPosition}`]: tabPosition,
      [`${cssClasses.TABS_BAR}-collapse`]: collapsible,
    });

    const extra = renderExtra();
    const contents = collapsible ? renderCollapsedTab() : renderTabComponents(list);

    return (
      <div
        role="tablist"
        aria-orientation={tabPosition === 'left' ? 'vertical' : 'horizontal'}
        class={classNames}
        style={style}
        {...getDataAttr(restProps)}
        data-uuid={state.uuid}
      >
        {contents}
        {extra}
      </div>
    );
  };
}, {
  props: vuePropsType,
  name: 'TabBar'
});


export default TabBar;
