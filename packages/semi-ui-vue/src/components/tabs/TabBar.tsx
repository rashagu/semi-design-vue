import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/tabs/constants';
import getDataAttr from '@douyinfe/semi-foundation/utils/getDataAttr';
import OverflowList from '../overflowList';
import Dropdown, { DropdownItem, DropdownMenu, DropDownMenuItem, type DropdownProps } from '../dropdown';
import Button from '../button';
import { TabBarProps, PlainTab } from './interface';
import { isEmpty, pick } from 'lodash';
import { IconChevronRight, IconChevronLeft, IconClose, IconChevronDown } from '@kousum/semi-icons-vue';
import { getUuidv4 } from '@douyinfe/semi-foundation/utils/uuid';
import TabItem from './TabItem';
import {
  ComponentObjectPropsOptions,
  defineComponent,
  h,
  onMounted,
  PropType,
  reactive, ref,
  useSlots,
  VNode,
  watch,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { VueJsxNode } from '../interface';
import { Locale } from '../locale/interface';
import LocaleConsumer from '../locale/localeConsumer';

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

const propTypes: ComponentObjectPropsOptions<TabBarProps> = {
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
  more: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  handleKeyDown: PropTypes.func as PropType<TabBarProps['handleKeyDown']>,
};

export const vuePropsType = vuePropsMake(propTypes, {});
const TabBar = defineComponent<TabBarProps>((props, { attrs }) => {
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

  watch(()=>props.activeKey, ()=>{
    if (props.collapsible) {
      scrollActiveTabItemIntoView()
    }
  })

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
  };

  const handleKeyDown = (event: KeyboardEvent, itemKey: string, closable: boolean) => {
    props.handleKeyDown(event, itemKey, closable);
  };

  const renderTabItem = (panel: PlainTab): VNode => {
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

  const tabListNode = ref()
  const scrollTabItemIntoViewByKey = (key: string, logicalPosition: ScrollLogicalPosition = 'nearest') => {
    const tabItem = (tabListNode.value as HTMLElement).querySelector(`[data-uuid="${state.uuid}"] .${cssClasses.TABS_TAB}[data-scrollkey=${JSON.stringify(key)}]`);
    tabItem?.scrollIntoView({ behavior: 'smooth', block: logicalPosition, inline: logicalPosition });
  }

  const scrollActiveTabItemIntoView = (logicalPosition?: ScrollLogicalPosition) => {
    const key = _getItemKey(props.activeKey);
    scrollTabItemIntoViewByKey(key, logicalPosition)
  }

  const renderTabComponents = (list: Array<PlainTab>): Array<VueJsxNode> => list.map((panel) => renderTabItem(panel));

  const handleArrowClick = (items: Array<OverflowItem>, pos: 'start' | 'end'): void => {
    const lastItem = pos === 'start' ? items.pop() : items.shift();
    if (!lastItem) {
      return;
    }
    const key = _getItemKey(lastItem.itemKey);
    scrollTabItemIntoViewByKey(key)
  };

  const renderCollapse = (items: Array<OverflowItem>, icon: VueJsxNode, pos: 'start' | 'end'): VueJsxNode => {
    const arrowCls = cls({
      [`${cssClasses.TABS_BAR}-arrow-${pos}`]: pos,
      [`${cssClasses.TABS_BAR}-arrow`]: true,
    });

    if (isEmpty(items)) {
      return <Button disabled={true} icon={icon} theme="borderless" />
      //TODO next vision
      // return (
      //   <div role="presentation" class={arrowCls}>
      //     <Button disabled={true} icon={icon} theme="borderless" />
      //   </div>
      // );
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


  const renderWithMoreTrigger = (): VNode => {
    const { list, more } = props;
    let tabElements: VNode[] = [];
    let moreTrigger: VNode = <div class={cls({
      [`${cssClasses.TABS_BAR}-more-trigger`]: true,
      [`${cssClasses.TABS_BAR}-more-trigger-${props.type}`]: true,
    })}>
      <LocaleConsumer componentName="Tabs">
        {(locale: Locale['Tabs'], localeCode: Locale['code']) => (
          <div class={`${cssClasses.TABS_BAR}-more-trigger-content`}>
            <div>{locale.more}</div>
            <IconChevronDown className={`${cssClasses.TABS_BAR}-more-trigger-content-icon`} />
          </div>
        )}
      </LocaleConsumer>
    </div>;
    let keepCount: number;
    if (typeof more === 'number') {
      keepCount = list.length - Math.min(more, list.length);
      tabElements = list.slice(0, keepCount).map(panel => renderTabItem(panel));
    } else if (typeof more === 'object') {
      keepCount = list.length - Math.min(more.count, list.length);
      tabElements = list.slice(0, keepCount).map(panel => renderTabItem(panel));
      if (more.render) {
        moreTrigger = more.render();
      }

    } else if (more !== undefined) {
      throw new Error('[Semi Tabs]: invalid tab props format: more');
    }

    return <>
      {tabElements}
      {renderMoreDropdown(list.slice(keepCount), more?.['dropdownProps'], moreTrigger)}
    </>;
  };

  const renderMoreDropdown = (panels: PlainTab[], dropDownProps: DropdownProps, trigger: VNode): VNode => {

    return <Dropdown
      trigger={'hover'}
      showTick
      position={'bottomLeft'}
      className={`${cssClasses.TABS_BAR}-more-dropdown-${props.type}`}
      clickToHide={true}
      menu={panels.map(panel => ({
        node: 'item',
        name: panel.tab as string,
        icon: panel.icon,
        onClick: (e) => props.onTabClick(panel.itemKey, e),
        active: props.activeKey === panel.itemKey,
      })) as DropDownMenuItem[]}
      {...dropDownProps}
    >
      {trigger}
    </Dropdown>;
  };


  return () => {
    const { type, style, className, list, tabPosition, more, collapsible, handleKeyDown, ...restProps } = props;
    const classNames = cls(className, {
      [cssClasses.TABS_BAR]: true,
      [cssClasses.TABS_BAR_LINE]: type === 'line',
      [cssClasses.TABS_BAR_CARD]: type === 'card',
      [cssClasses.TABS_BAR_BUTTON]: type === 'button',
      [`${cssClasses.TABS_BAR}-${tabPosition}`]: tabPosition,
      [`${cssClasses.TABS_BAR}-collapse`]: collapsible,
    });

    const extra = renderExtra();
    const contents = collapsible ? renderCollapsedTab() : (more ? renderWithMoreTrigger() : renderTabComponents(list));
    return (
      <div
        role="tablist"
        ref={tabListNode}
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
  name: 'TabBar',
});


export default TabBar;
