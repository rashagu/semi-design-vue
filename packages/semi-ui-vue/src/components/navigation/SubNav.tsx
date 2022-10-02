
import BaseComponent, {BaseProps, useBaseComponent} from '../_base/baseComponent';
import * as PropTypes from '../PropTypes';
import cls from 'classnames';

import '@douyinfe/semi-foundation/navigation/navigation.scss';

import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import SubNavFoundation, { SubNavAdapter } from '@douyinfe/semi-foundation/navigation/subNavFoundation';
import { strings, numbers } from '@douyinfe/semi-foundation/navigation/constants';
import { IconChevronDown, IconChevronUp, IconChevronRight } from '@kousum/semi-icons-vue';

// @ts-ignore
import NavItem from './Item';
// @ts-ignore
import type {NavItemProps, NavItemState} from './Item'
import Dropdown, {DropdownMenu} from '../dropdown';
import type {DropdownProps} from '../dropdown';
import NavContext, { NavContextType } from './nav-context';

import { times, get } from 'lodash';

// @ts-ignore
import SubNavTransition from './SubNavTransition';
// @ts-ignore
import OpenIconTransition from './OpenIconTransition';
import {cloneVNode, CSSProperties, defineComponent, h, isVNode, reactive, ref, useSlots, VNode} from "vue";
import {useNavContext} from "./nav-context/Consumer";
import {vuePropsMake} from "../PropTypes";

export interface ToggleIcon {
    open?: string;
    closed?: string;
}

export interface SubNavProps extends BaseProps {
    disabled?: boolean;
    dropdownStyle?: CSSProperties;
    icon?: VNode;
    indent?: boolean | number;
    isCollapsed?: boolean;
    isOpen?: boolean;
    itemKey?: string | number;
    level?: number;
    maxHeight?: number;
    onMouseEnter?: any;
    onMouseLeave?: any;
    text?: VNode;
    toggleIcon?: ToggleIcon;
}

export interface SubNavState {
    isHovered: boolean;
}


const propTypes = {
    /**
     * Unique identification
     */
    itemKey: [PropTypes.string, PropTypes.number],
    /**
     * Copywriting
     */
    text: PropTypes.node,
    /**
     * Whether child navigation is expanded
     */
    isOpen: PropTypes.bool,
    /**
     * Whether it is in the state of being stowed to the sidebar
     */
    isCollapsed: PropTypes.bool,
    /**
     * Whether to keep the left Icon placeholder
     */
    indent: [PropTypes.bool, PropTypes.number],
    /**
     * The icon name of the right control switch (on and off status)
     */
    toggleIcon: PropTypes.any,
    style: PropTypes.object,
    /**
     * Icon name on the left
     */
    icon: PropTypes.node,
    /**
     * Maximum height (for animation)
     */
    maxHeight: PropTypes.number,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    // Is it disabled
    disabled: PropTypes.bool,
    level: PropTypes.number
};

const defaultProps = {
    level: 0,
    indent: false,
    isCollapsed: false,
    isOpen: false,
    maxHeight: numbers.DEFAULT_SUBNAV_MAX_HEIGHT,
    toggleIcon: {
        open: <IconChevronUp />,
        closed: <IconChevronDown />,
    },
    disabled: false,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const SubNav = defineComponent<SubNavProps>((props, {slots}) => {

    const {context} = useNavContext()

    const titleRef = ref();
    const itemRef = ref();

    const state = reactive<SubNavState>({
        isHovered: false,
    })

    const {cache, adapter: adapterInject, log, context: context_, isControlled} = useBaseComponent<SubNavProps>(props, state)

    const foundation = new SubNavFoundation(adapter());
    const setItemRef = (ref: any) => {
        itemRef.value = ref;
    };

    const setTitleRef = (ref: any) => {
        titleRef.value = ref
    };

    function _invokeContextFunc(funcName: string, ...args: any[]) {
        // console.log(funcName, args)
        if (funcName && context.value && typeof context.value[funcName] === 'function') {
            return context.value[funcName](...args);
        }
        return null;
    }


    function adapter(): SubNavAdapter<SubNavProps, SubNavState> {
        return {
            ...adapterInject<SubNavProps, SubNavState>(),
            updateIsHovered: isHovered => state.isHovered = isHovered,
            getOpenKeys: () => context.value && context.value.openKeys,
            getOpenKeysIsControlled: () => context.value && context.value.openKeysIsControlled,
            getCanUpdateOpenKeys: () => context.value && context.value.canUpdateOpenKeys,
            updateOpen: isOpen =>{
                return _invokeContextFunc(isOpen ? 'addOpenKeys' : 'removeOpenKeys', props.itemKey)
            },
            notifyGlobalOpenChange: (...args) => _invokeContextFunc('onOpenChange', ...args),
            notifyGlobalOnSelect: (...args) => _invokeContextFunc('onSelect', ...args),
            notifyGlobalOnClick: (...args) => _invokeContextFunc('onClick', ...args),
            getIsSelected: itemKey => Boolean(!isNullOrUndefined(itemKey) && get(context.value, 'selectedKeys', []).includes(String(itemKey))),
            getIsOpen: () =>{
                // console.log(Boolean(context.value && context.value.openKeys && context.value.openKeys.includes(String(props.itemKey))))
                return Boolean(context.value && context.value.openKeys && context.value.openKeys.includes(String(props.itemKey)))
            },
        };
    }




    const handleClick = (e: MouseEvent) => {
        // console.log(titleRef.value.contains(e.target))
        foundation.handleClick(e, titleRef.value);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        foundation.handleKeyPress(e, titleRef.value);
    }

    const handleDropdownVisible = (visible: boolean) => foundation.handleDropdownVisibleChange(visible);

    function renderIcon(icon: VNode | string, pos: string, withTransition?: boolean, isToggleIcon = false, key: number | string = 0) {
        const { prefixCls } = context.value;

        let iconSize = 'large';
        if (pos === strings.ICON_POS_RIGHT) {
            iconSize = 'default';
        }

        const className = cls(`${prefixCls}-item-icon`, {
            [`${prefixCls}-item-icon-toggle-${context.value.toggleIconPosition}`]: isToggleIcon,
            [`${prefixCls}-item-icon-info`]: !isToggleIcon
        });

        const isOpen = adapter().getIsOpen();

        // console.log(isVNode(icon))
        const iconElem = isVNode(icon) ? (withTransition ? (
          <OpenIconTransition isOpen={isOpen}>
              {cloneVNode(icon, { size: iconSize })}
          </OpenIconTransition>
        ) : cloneVNode(icon, { size: iconSize })) : null;

        return <i key={key} class={className}>{iconElem}</i>;
    }

    function renderTitleDiv() {
        const { text, icon, itemKey, indent, disabled, level } = props;

        const { mode, isInSubNav, isCollapsed, prefixCls, subNavMotion, limitIndent } = context.value;

        const titleCls = cls(`${prefixCls}-sub-title`, {
            [`${prefixCls}-sub-title-selected`]: adapter().getIsSelected(itemKey),
            [`${prefixCls}-sub-title-disabled`]: disabled,
        });

        let withTransition = false;
        let toggleIconType: VNode | string = '';

        if (isCollapsed) {
            if (isInSubNav) {
                toggleIconType = <IconChevronRight />;
            } else {
                toggleIconType = null;
            }
        } else if (mode === strings.MODE_HORIZONTAL) {
            if (isInSubNav) {
                toggleIconType = <IconChevronRight />;
            } else {
                toggleIconType = <IconChevronDown />;
                // Horizontal mode does not require animation fix#1198
                // withTransition = true;
            }
        } else {
            if (subNavMotion) {
                withTransition = true;
            }
            toggleIconType = <IconChevronDown />;
        }

        let placeholderIcons = null;
        if (mode === strings.MODE_VERTICAL && !limitIndent && !isCollapsed) {
            /* Different icons' amount means different indents.*/
            const iconAmount = (icon && !indent) ? level : level - 1;
            placeholderIcons = times(iconAmount, index => renderIcon(null, strings.ICON_POS_RIGHT, false, false, index));
        }

        const titleDiv = (
          <div
            role="menuitem"
            tabindex={-1}
            ref={setTitleRef as any}
            class={titleCls}
            onClick={handleClick}
            onKeypress={handleKeyPress}
          >
              <div class={`${prefixCls}-item-inner`}>
                  {placeholderIcons}
                  {context.value.toggleIconPosition === strings.TOGGLE_ICON_LEFT && renderIcon(toggleIconType, strings.ICON_POS_RIGHT, withTransition, true, 'key-toggle-position-left')}
                  {icon || indent || (isInSubNav && mode !== strings.MODE_HORIZONTAL)
                    ? renderIcon(icon, strings.ICON_POS_LEFT, false, false, 'key-inSubNav-position-left')
                    : null}
                  <span class={`${prefixCls}-item-text`}>{text}</span>
                  {context.value.toggleIconPosition === strings.TOGGLE_ICON_RIGHT && renderIcon(toggleIconType, strings.ICON_POS_RIGHT, withTransition, true, 'key-toggle-position-right')}
              </div>
          </div>
        );

        return titleDiv;
    }

    function renderSubUl() {
        const { maxHeight } = props;

        const { isCollapsed, mode, subNavMotion, prefixCls } = context.value;

        const isOpen = adapter().getIsOpen();

        const isHorizontal = mode === strings.MODE_HORIZONTAL;

        const subNavCls = cls(`${prefixCls}-sub`, {
            [`${prefixCls}-sub-open`]: isOpen,
            [`${prefixCls}-sub-popover`]: isCollapsed || isHorizontal,
        });

        console.log(subNavMotion)
        // TODO 没有动画
        const ulWithMotion = (
          <SubNavTransition motion={subNavMotion} isCollapsed={isCollapsed} maxHeight={maxHeight}>
              {{
                  default: !isCollapsed && isOpen
                    ? (transitionStyle: any) => (
                      <ul
                        style={{ ...transitionStyle, visibility: isCollapsed ? 'hidden' : 'visible' }}
                        class={subNavCls}
                      >
                          {useSlots().default?.()}
                      </ul>
                    )
                    : ()=>null
              }}
          </SubNavTransition>
        );
        // console.log(ulWithMotion)

        const finalDom = isHorizontal ? null : subNavMotion ? (
          ulWithMotion
        ) : isOpen && !isCollapsed ? (
          <ul class={subNavCls}>{useSlots().default?.()}</ul>
        ) : null;

        return finalDom;
    }

    function wrapDropdown(elem: VNode | string = '') {
        let _elem: VNode | string = elem;
        const children = useSlots().default?.()
        const { dropdownStyle, disabled } = props;

        const { mode, isInSubNav, isCollapsed, subNavCloseDelay, subNavOpenDelay, prefixCls } = context.value;

        const isOpen = adapter().getIsOpen();
        const openKeysIsControlled = adapter().getOpenKeysIsControlled();

        const subNavCls = cls({
            [`${prefixCls}-popover`]: isCollapsed,
        });

        const dropdownProps: DropdownProps = {
            trigger: 'hover',
            style: dropdownStyle,
        };

        if (openKeysIsControlled) {
            dropdownProps.trigger = 'custom';
            dropdownProps.visible = isOpen;
        }

        if (isCollapsed || mode === strings.MODE_HORIZONTAL) {
            console.log(dropdownProps, _elem)
            // Do not show dropdown when disabled
            return !disabled ? (
              <Dropdown
                className={subNavCls}
                render={(
                  <DropdownMenu>
                      <li class={`${prefixCls}-popover-crumb`} />
                      {children}
                  </DropdownMenu>
                )}
                position={mode === strings.MODE_HORIZONTAL && !isInSubNav ? 'bottomLeft' : 'rightTop'}
                mouseEnterDelay={subNavOpenDelay}
                mouseLeaveDelay={subNavCloseDelay}
                onVisibleChange={handleDropdownVisible}
                {...dropdownProps}
                trigger="click"
              >
                  <div>{_elem}</div>
              </Dropdown>
            ) : _elem;
        }
        return _elem;
    }



    return () => {
        const { itemKey, style, onMouseEnter, onMouseLeave, disabled, text } = props;

        const { mode, isCollapsed, prefixCls } = context.value;

        let titleDiv: VNode | string = renderTitleDiv();
        const subUl = renderSubUl();

        // When mode=horizontal, it is displayed in Dropdown
        if (isCollapsed || mode === strings.MODE_HORIZONTAL) {
            titleDiv = wrapDropdown(titleDiv);
        }

        return (
          <NavItem
            style={style}
            isSubNav={true}
            itemKey={itemKey}
            forwardRef={setItemRef}
            isCollapsed={isCollapsed}
            className={`${prefixCls}-sub-wrap`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            disabled={disabled}
            text={text}
          >
              <NavContext.Provider value={{ ...context.value, isInSubNav: true }}>
                  {{
                      default: ()=>[
                          titleDiv,
                          subUl
                      ]
                  }}
              </NavContext.Provider>
          </NavItem>
        );
    }
})

SubNav.props = vuePropsType

export default SubNav

