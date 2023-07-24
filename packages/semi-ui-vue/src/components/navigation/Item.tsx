import {BaseProps, useBaseComponent} from '../_base/baseComponent';
import * as PropTypes from '../PropTypes';
import cls from 'classnames';
import {noop, times} from 'lodash';

import isNullOrUndefined from '@douyinfe/semi-foundation/utils/isNullOrUndefined';
import {cloneDeep, isSemiIcon} from '../_utils';
import ItemFoundation, {
    ItemAdapter,
    ItemProps,
    SelectedItemProps
} from '@douyinfe/semi-foundation/navigation/itemFoundation';
import {cssClasses, strings} from '@douyinfe/semi-foundation/navigation/constants';

import Tooltip from '../tooltip';
import Dropdown, {DropdownItem} from '../dropdown';
import {
    AnchorHTMLAttributes,
    cloneVNode,
    defineComponent,
    h,
    reactive,
    VNode,
    Fragment,
    ComponentObjectPropsOptions, PropType
} from "vue";
import {useNavContext} from "./nav-context/Consumer";
import {VueJsxNode} from "../interface";

const clsPrefix = `${cssClasses.PREFIX}-item`;

export interface NavItemProps extends ItemProps, BaseProps {
    disabled?: boolean;
    forwardRef?: (ele: HTMLLIElement) => void;
    icon?: VNode;
    itemKey?: string | number;
    level?: number;
    link?: string;
    linkOptions?: AnchorHTMLAttributes;
    text?: VueJsxNode;
    tooltipHideDelay?: number;
    tooltipShowDelay?: number;
    onClick?(clickItems: SelectedData): void;
    onMouseEnter?: any;
    onMouseLeave?: any;

    items?: any
}

export interface SelectedData extends SelectedItemProps<NavItemProps> {
    text?: VNode;
}

export interface NavItemState {
    tooltipShow: boolean;
}


export const vuePropsType:ComponentObjectPropsOptions<NavItemProps> = {
    text: PropTypes.node,
    itemKey: [PropTypes.string, PropTypes.number],
    onClick: {
        type: PropTypes.func as PropType<NavItemProps['onClick']>,
        default: noop
    },
    onMouseEnter: {
        type: PropTypes.func,
        default: noop
    },
    onMouseLeave: {
        type: PropTypes.func,
        default: noop
    },
    icon: PropTypes.node as PropType<NavItemProps['icon']>,
    className: PropTypes.string,
    toggleIcon: PropTypes.string,
    style: PropTypes.object,
    forwardRef: {
        type: PropTypes.func as PropType<NavItemProps['forwardRef']>,
        default: noop
    },
    indent: {
        type: [PropTypes.bool, PropTypes.number],
        default: false
    },
    isCollapsed: {
        type: PropTypes.bool,
        default: false
    }, // Is it in a state of folding to the side
    isSubNav: {
        type: PropTypes.bool,
        default: false
    }, // Whether to navigate for children
    link: PropTypes.string,
    linkOptions: PropTypes.object,
    disabled: {
        type: PropTypes.bool,
        default: false
    },



    items: Array as PropType<NavItemProps['items']>,
    level: Number
}
const NavItem = defineComponent<NavItemProps>((props, {attrs, slots}) => {

    const {context} = useNavContext()
    const state = reactive<NavItemState>({
        tooltipShow: false,
    })
    const {adapter: adapterInject} = useBaseComponent<NavItemProps>(props, state)

    const foundation = new ItemFoundation(adapter());

    function adapter(): ItemAdapter<NavItemProps, NavItemState> {
        return {
            ...adapterInject<NavItemProps, NavItemState>(),
            cloneDeep,
            updateTooltipShow: tooltipShow => state.tooltipShow = tooltipShow,
            updateSelected: _selected => _invokeContextFunc('updateSelectedKeys', [props.itemKey]),
            updateGlobalSelectedKeys: keys => _invokeContextFunc('updateSelectedKeys', [...keys]),
            getSelectedKeys: () => context.value && context.value.selectedKeys,
            getSelectedKeysIsControlled: () => context.value && context.value.selectedKeysIsControlled,
            notifyGlobalOnSelect: (...args) => _invokeContextFunc('onSelect', ...args),
            notifyGlobalOnClick: (...args) => _invokeContextFunc('onClick', ...args),
            notifyClick: (...args) => props.onClick(...args),
            notifyMouseEnter: (...args) => props.onMouseEnter(...args),
            notifyMouseLeave: (...args) => props.onMouseLeave(...args),
            getIsCollapsed: () => props.isCollapsed || Boolean(context.value && context.value.isCollapsed) || false,
            getSelected: () =>
              Boolean(context.value && context.value.selectedKeys && context.value.selectedKeys.includes(props.itemKey as string)),
            getIsOpen: () =>
              Boolean(context.value && context.value.openKeys && context.value.openKeys.includes(props.itemKey as string)),
        };
    }
    function _invokeContextFunc(funcName: string, ...args: any[]) {
        if (funcName && context.value && typeof context.value[funcName] === 'function') {
            return context.value[funcName](...args);
        }
        return null;
    }



    function renderIcon(icon: VNode | string, pos: string, isToggleIcon = false, key: number | string = 0) {
        if (props.isSubNav) {
            return null;
        }

        if (!icon && context.value.mode === strings.MODE_HORIZONTAL) {
            return null;
        }

        let iconSize = 'large';
        if (pos === strings.ICON_POS_RIGHT) {
            iconSize = 'default';
        }

        const className = cls(`${clsPrefix}-icon`, {
            [`${clsPrefix}-icon-toggle-${context.value.toggleIconPosition}`]: isToggleIcon,
            [`${clsPrefix}-icon-info`]: !isToggleIcon
        });

        return (
          <i class={className} key={key}>
              {isSemiIcon(icon) ? cloneVNode((icon as VNode), iconSize?{ size: iconSize }:{}) : icon}
          </i>
        );
    }

    const setItemRef = (ref: any) => {
        // console.log('Item - setItemRef()', ref);
        props.forwardRef && props.forwardRef(ref);
    };

    const wrapTooltip = (node: VNode) => {
        const { text, tooltipHideDelay, tooltipShowDelay } = props;
        const hideDelay = tooltipHideDelay ?? context.value.tooltipHideDelay;
        const showDelay = tooltipShowDelay ?? context.value.tooltipShowDelay;

        return (
          <Tooltip
            content={text}
            position="right"
            trigger={'hover'}
            mouseEnterDelay={showDelay}
            mouseLeaveDelay={hideDelay}
          >
              <Fragment>{node}</Fragment>
          </Tooltip>
        );
    };

    const handleClick = (e: MouseEvent) => foundation.handleClick(e);
    const handleKeyPress = (e: KeyboardEvent) => foundation.handleKeyPress(e);

    return () => {
        const {
            text,
            icon,
            toggleIcon,
            className,
            isSubNav,
            style,
            indent,
            onMouseEnter,
            onMouseLeave,
            link,
            linkOptions,
            disabled,
            level = 0,
        } = props;

        const children = slots.default?.()
        const { mode, isInSubNav, prefixCls, limitIndent } = context.value;

        const isCollapsed = adapter().getIsCollapsed();

        const selected = adapter().getSelected();


        let itemChildren = null;
        if (!isNullOrUndefined(children)) {
            itemChildren = children;
        } else {
            let placeholderIcons = null;
            if (mode === strings.MODE_VERTICAL && !limitIndent && !isCollapsed) {
                const iconAmount = (icon && !indent) ? level : level - 1;
                placeholderIcons = times(iconAmount, (index) => renderIcon(null, strings.ICON_POS_RIGHT, false, index));
            }
            itemChildren = (
              <>
                  {placeholderIcons}
                  {context.value.toggleIconPosition === strings.TOGGLE_ICON_LEFT && renderIcon(toggleIcon, strings.ICON_POS_RIGHT, true, 'key-toggle-pos-right')}
                  {icon || indent || isInSubNav ? renderIcon(icon, strings.ICON_POS_LEFT, false, 'key-position-left') : null}
                  {!isNullOrUndefined(text) ? <span class={`${cssClasses.PREFIX}-item-text`}>{text}</span> : ''}
                  {context.value.toggleIconPosition === strings.TOGGLE_ICON_RIGHT && renderIcon(toggleIcon, strings.ICON_POS_RIGHT, true, 'key-toggle-pos-right')}
              </>
            );
        }


        if (typeof link === 'string') {
            itemChildren = (
              <a class={`${prefixCls}-item-link`} href={link} {...(linkOptions as any)}>
                  {itemChildren}
              </a>
            );
        }

        let itemDom: VNode | string = '';

        if (isInSubNav && (isCollapsed || mode === strings.MODE_HORIZONTAL)) {
            const popoverItemCls = cls({
                [clsPrefix]: true,
                [`${clsPrefix}-sub`]: isSubNav,
                [`${clsPrefix}-selected`]: selected,
                [`${clsPrefix}-collapsed`]: isCollapsed,
                [`${clsPrefix}-disabled`]: disabled,
            });

            itemDom = (
              <DropdownItem
                selected={selected}
                active={selected}
                ref={setItemRef}
                className={popoverItemCls}
                onClick={handleClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                disabled={disabled}
              >
                  {itemChildren}
              </DropdownItem>
            );
        } else {
            // Items are divided into normal and sub-wrap
            const popoverItemCls = cls(`${className || `${clsPrefix}-normal`}`, {
                [clsPrefix]: true,
                [`${clsPrefix}-sub`]: isSubNav,
                [`${clsPrefix}-selected`]: selected && !isSubNav,
                [`${clsPrefix}-collapsed`]: isCollapsed,
                [`${clsPrefix}-disabled`]: disabled,
            });
            const ariaProps = {
                'aria-disabled': disabled,
            };
            if (isSubNav) {
                const isOpen = adapter().getIsOpen();
                ariaProps['aria-expanded'] = isOpen;
            }

            itemDom = (
              <li
                role="menuitem"
                tabindex={-1}
                {...ariaProps}
                style={style}
                ref={setItemRef}
                class={popoverItemCls}
                onClick={handleClick}
                onMouseenter={onMouseEnter}
                onMouseleave={onMouseLeave}
                onKeypress={handleKeyPress}
              >
                  {itemChildren}
              </li>
            );
        }

        // Display Tooltip when disabled and SubNav
        if (isCollapsed && !isInSubNav && !isSubNav || isCollapsed && isSubNav && disabled) {
            itemDom = wrapTooltip(itemDom);
        }

        return itemDom;
    }
}, {
    props: vuePropsType,
    name: 'NavItem'
})



export default NavItem


