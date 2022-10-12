import {
  defineComponent,
  ref,
  h,
  Fragment,
  reactive,
  watchEffect,
  watch,
  VNode,
  isVNode,
  useSlots,
  CSSProperties, WatchStopHandle, nextTick, unref
} from 'vue'
import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import {noop, get, isEqual} from 'lodash';

import NavigationFoundation, {NavigationAdapter} from '@douyinfe/semi-foundation/navigation/foundation';
import {strings, cssClasses, numbers} from '@douyinfe/semi-foundation/navigation/constants';

import SubNav from './SubNav';
import Item from './Item';
import Footer from './Footer';
import Header from './Header';
import NavContext from './nav-context';
import '@douyinfe/semi-foundation/navigation/navigation.scss';
import {Motion} from '../_base/base';
import {vuePropsMake} from "../PropTypes";
import LocaleConsumer_ from "../locale/localeConsumer";
const LocaleConsumer = LocaleConsumer_()
import type {CollapseButtonProps} from './CollapseButton';
import type {NavFooterProps} from './Footer';
import type {NavHeaderProps} from './Header';
import type {NavItemProps} from './Item';
import type {OpenIconTransitionProps} from './OpenIconTransition';
import type {ToggleIcon, SubNavProps} from './SubNav';
import type {SubNavTransitionProps} from './SubNavTransition';
export type Mode = 'vertical' | 'horizontal';
export {
  NavFooterProps,
  NavHeaderProps,
  OpenIconTransitionProps,
  ToggleIcon, SubNavProps,
  SubNavTransitionProps
}

export interface OnSelectedData {
  itemKey: string | number;
  selectedKeys: (string | number)[];
  selectedItems: (NavItemProps | SubNavProps)[];
  domEvent: MouseEvent;
  isOpen: boolean;
}

export interface SubNavPropsWithItems extends SubNavProps {
  items?: (SubNavPropsWithItems | string)[];
}

export interface NavItemPropsWithItems extends NavItemProps {
  items?: (NavItemPropsWithItems | string)[];
}

export type NavItems = (string | SubNavPropsWithItems | NavItemPropsWithItems)[];

export interface NavProps extends BaseProps {
  bodyStyle?: CSSProperties;
  children?: VNode;
  defaultIsCollapsed?: boolean;
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  footer?: VNode | NavFooterProps;
  header?: VNode | NavHeaderProps;
  isCollapsed?: boolean;
  items?: NavItems;
  limitIndent?: boolean;
  mode?: Mode;
  multiple?: boolean;
  openKeys?: string[];
  prefixCls?: string;
  selectedKeys?: string[];
  subNavCloseDelay?: number;
  subNavMotion?: Motion;
  subNavOpenDelay?: number;
  toggleIconPosition?: string;
  tooltipHideDelay?: number;
  tooltipShowDelay?: number;
  onClick?: (data: { itemKey: string; domEvent: MouseEvent; isOpen: boolean }) => void;
  onCollapseChange?: (isCollapse: boolean) => void;
  onDeselect?: (data?: any) => void;
  onOpenChange?: (data: { itemKey: (string | number); openKeys: (string | number)[]; domEvent: MouseEvent; isOpen: boolean }) => void;
  onSelect?: (data: OnSelectedData) => void;
}

export interface NavState {
  isCollapsed: boolean;
  // calc state
  openKeys: (string | number)[];
  items: any[];
  itemKeysMap: { [itemKey: string]: (string | number)[] };
  selectedKeys: (string | number)[];
}

const {hasOwnProperty} = Object.prototype;

const propTypes = {
  // Initial expanded SubNav navigation key array
  defaultOpenKeys: Array,
  openKeys: Array,
  // Initial selected navigation key array
  defaultSelectedKeys: Array,
  selectedKeys: Array,
  // Navigation type, now supports vertical, horizontal
  mode: String,
  // Triggered when selecting a navigation item
  onSelect: PropTypes.func,
  // Triggered when clicking a navigation item
  onClick: PropTypes.func,
  // SubNav expand/close callback
  onOpenChange: PropTypes.func,
  // Array of options (nested options can continue)
  items: PropTypes.array,
  // Is it in the state of being stowed to the sidebar
  isCollapsed: {
    type: PropTypes.bool,
    default: undefined
  },
  defaultIsCollapsed: {
    type: PropTypes.bool,
    default: undefined
  },
  onCollapseChange: PropTypes.func,
  multiple: {
    type: PropTypes.bool,
    default: undefined
  },
  onDeselect: PropTypes.func,
  subNavMotion: [PropTypes.bool, PropTypes.object, PropTypes.func],
  subNavCloseDelay: PropTypes.number,
  subNavOpenDelay: PropTypes.number,
  tooltipShowDelay: PropTypes.number,
  tooltipHideDelay: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.object,
  bodyStyle: PropTypes.object,
  className: PropTypes.string,
  toggleIconPosition: PropTypes.string,
  prefixCls: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  limitIndent: {
    type: PropTypes.bool,
    default: undefined
  },
};

const defaultProps = {
  subNavCloseDelay: numbers.DEFAULT_SUBNAV_CLOSE_DELAY,
  subNavOpenDelay: numbers.DEFAULT_SUBNAV_OPEN_DELAY,
  tooltipHideDelay: numbers.DEFAULT_TOOLTIP_HIDE_DELAY,
  tooltipShowDelay: numbers.DEFAULT_TOOLTIP_SHOW_DELAY,
  onCollapseChange: noop,
  onSelect: noop,
  onClick: noop,
  onOpenChange: noop,
  toggleIconPosition: 'right',
  limitIndent: true,
  prefixCls: cssClasses.PREFIX,
  subNavMotion: true,
  // isOpen: false,
  mode: strings.MODE_VERTICAL,
  // defaultOpenKeys: [],
  // defaultSelectedKeys: [],
  // items: [],
};

export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const index = defineComponent<NavProps>((props, {slots}) => {
  const slots_ = useSlots()
  let itemsChanged: boolean = true;


  const state = reactive<NavState>(
    {
      isCollapsed: false,
      itemKeysMap: {},
      items: [],
      openKeys: [],
      selectedKeys: []
    });

  const {cache, adapter: adapterInject, log, context: context_, isControlled} = useBaseComponent<NavProps>(props, state)


  let initState = {
    isCollapsed: Boolean(isControlled('isCollapsed') ? props.isCollapsed : props.defaultIsCollapsed),
    // calc state
    openKeys: [],
    items: [],
    itemKeysMap: {}, // itemKey to parentKeys
    selectedKeys: [],
  };

  Object.keys(initState).forEach(key => {
    state[key] = initState[key]
  })


  function createAddKeysFn(keyName: string | number) {
    return function (...keys: (string | number)[]) {
      const handleKeys = new Set(state[keyName]);

      keys.forEach(key => key && handleKeys.add(key));

      state[keyName] = Array.from(handleKeys)
    };
  }

  function createRemoveKeysFn(keyName: string) {
    return function (...keys: string[]) {
      const handleKeys = new Set(state[keyName]);

      keys.forEach(key => key && handleKeys.delete(key));

      state[keyName] = Array.from(handleKeys)
    };
  }


  function adapter_(): NavigationAdapter<NavProps, NavState> {
    return {
      ...adapterInject<NavProps, NavState>(),
      notifySelect: (...args) => props.onSelect(...args),
      notifyOpenChange: (...args) => props.onOpenChange(...args),
      setIsCollapsed: isCollapsed => {
        return state.isCollapsed = isCollapsed
      },
      notifyCollapseChange: (...args) => {
        props.onCollapseChange(...args)
      },
      updateItems: items => state.items = [...items],
      setItemKeysMap: itemKeysMap => state.itemKeysMap = {...itemKeysMap},
      addSelectedKeys: createAddKeysFn('selectedKeys'),
      removeSelectedKeys: createRemoveKeysFn( 'selectedKeys'),
      updateSelectedKeys: selectedKeys => state.selectedKeys = [...selectedKeys],
      updateOpenKeys: openKeys => state.openKeys = [...openKeys],
      addOpenKeys: createAddKeysFn('openKeys'),
      removeOpenKeys: createRemoveKeysFn( 'openKeys'),
      setItemsChanged: isChanged => {
        itemsChanged = isChanged;
      },
    };
  }

  const adapter = adapter_()

  const foundation = new NavigationFoundation(adapter);
  if (props.items && props.items.length || slots_.default?.()) {
    const calcState = foundation.init('constructor');
    let newInitState = {
      ...initState,
      ...calcState,
    };

    Object.keys(newInitState).forEach(key => {
      state[key] = newInitState[key]
    })
  }


  // getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state
  watch(()=>props.isCollapsed, (val)=>{
    state.isCollapsed = val;
  })




  watch(() => props.selectedKeys, (value) => {
    if (value){
      adapter.updateSelectedKeys(props.selectedKeys);
    }
  })
  watch(() => props.openKeys, (value) => {
    if (value){
      // console.log(props.openKeys)
      adapter.updateOpenKeys(props.openKeys);
    }
  })

  watch(() => state.selectedKeys, (value,oldValue) => {
    if (!isEqual(value,oldValue)){
      const parentSelectKeys = foundation.selectLevelZeroParentKeys(null, ...state.selectedKeys);
      adapter.addSelectedKeys(...parentSelectKeys);
    }
  })

  watch(() => props.items, (value, oldValue, onCleanup) => {
    foundation.init('');
  }, {deep: true, immediate: true})

  // watch([
  //   // () => state.selectedKeys,// 0
  //   () => props.openKeys, // 1
  //   // () => props.selectedKeys, // 2
  // ], (value, oldValue, onCleanup) => {
  //   console.log(value)
  // })


  /**
   * Render navigation items recursively
   *
   * @param {NavItem[]} items
   * @param level
   * @returns {JSX.Element}
   */
  function renderItems(items: (SubNavPropsWithItems | NavItemPropsWithItems)[] = [], level = 0) {
    const finalDom = (
      <>
        {items.map((item, idx) => {
          if (Array.isArray(item.items) && item.items.length) {
            return (
              <SubNav key={item.itemKey || String(level) + idx} {...item as SubNavPropsWithItems} level={level}>
                {renderItems(item.items as (SubNavPropsWithItems | NavItemPropsWithItems)[], level + 1)}
              </SubNav>
            );
          } else {
            return <Item key={item.itemKey || String(level) + idx} {...item as NavItemPropsWithItems} level={level} />;
          }
        })}
      </>
    );
    // console.log(state)
    return finalDom;
  }

  const onCollapseChange = () => {
    foundation.handleCollapseChange();
  };


  return () => {
    const originChildren = slots.default?.()
    const {
      mode,
      onOpenChange,
      onSelect,
      onClick,
      style,
      className,
      subNavCloseDelay,
      subNavOpenDelay,
      subNavMotion,
      tooltipShowDelay,
      tooltipHideDelay,
      prefixCls,
      bodyStyle,
      footer,
      header,
      toggleIconPosition,
      limitIndent
    } = props;

    const { selectedKeys, openKeys, items, isCollapsed } = state;

    const {
      updateOpenKeys,
      addOpenKeys,
      removeOpenKeys,
      updateSelectedKeys,
      addSelectedKeys,
      removeSelectedKeys,
    } = adapter;

    const finalStyle = { ...style };

    let children: VNode[] = originChildren;

    const footers: VNode[] = [];
    const headers: VNode[] = [];

    if (isVNode(footer)) {
      footers.push(<Footer key={0}>{footer}</Footer>);
    } else if (footer && typeof footer === 'object') {
      footers.push(<Footer key={0} {...footer} />);
    }

    if (isVNode(header)) {
      headers.push(<Header key={0}>{header}</Header>);
    } else if (header && typeof header === 'object') {
      headers.push(<Header key={0} {...header} />);
    }

    if (Array.isArray(children) && children.length) {
      children = [...children];
      let childrenLength = children.length;
      for (let i = 0; i < childrenLength; i++) {
        const child = children[i];

        if ((child as any).type === Footer || get(child, 'type.name') === 'NavFooter') {
          footers.push(child);
          children.splice(i, 1);
          i--;
          childrenLength--;
        } else if ((child as any).type === Header || get(child, 'type.name') === 'NavHeader') {
          headers.push(child);
          children.splice(i, 1);
          i--;
          childrenLength--;
        }
      }
    }

    const finalCls = cls(prefixCls, className, {
      [`${prefixCls}-collapsed`]: isCollapsed,
      [`${prefixCls}-horizontal`]: mode === 'horizontal',
      [`${prefixCls}-vertical`]: mode === 'vertical',
    });

    const headerListOuterCls = cls(`${prefixCls}-header-list-outer`, {
      [`${prefixCls}-header-list-outer-collapsed`]: isCollapsed,
    });

    if (itemsChanged) {
      adapter.setCache('itemElems', renderItems(items));
    }

    return (
      <LocaleConsumer componentName="Navigation">
        {locale => (
          <NavContext.Provider
            value={{
              subNavCloseDelay,
              subNavOpenDelay,
              subNavMotion,
              tooltipShowDelay,
              tooltipHideDelay,
              openKeys,
              openKeysIsControlled: isControlled('openKeys') && mode === 'vertical' && !isCollapsed,
              // canUpdateOpenKeys: mode === 'vertical' && !isCollapsed,
              canUpdateOpenKeys: true,
              selectedKeys,
              selectedKeysIsControlled: isControlled('selectedKeys'),
              isCollapsed,
              onCollapseChange: onCollapseChange,
              mode,
              onSelect,
              onOpenChange,
              updateOpenKeys,
              addOpenKeys,
              removeOpenKeys,
              updateSelectedKeys,
              addSelectedKeys,
              removeSelectedKeys,
              onClick,
              locale,
              prefixCls,
              toggleIconPosition,
              limitIndent
            } as any}
          >
            <div class={finalCls} style={finalStyle}>
              <div class={`${prefixCls}-inner`}>
                <div class={headerListOuterCls}>
                  {headers}
                  <div style={bodyStyle} class={`${prefixCls}-list-wrapper`}>
                    <ul role="menu" aria-orientation={mode} class={`${prefixCls}-list`}>
                      {adapter.getCache('itemElems')}
                      {children}
                    </ul>
                  </div>
                </div>
                {footers}
              </div>
            </div>
          </NavContext.Provider>
        )}
      </LocaleConsumer>
    );
  }
})

index.props = vuePropsType

export default index

