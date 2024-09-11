import { Motion } from '../_base/base';
import TabBar, { OverflowItem } from './TabBar';
import {VueJsxNode} from "../interface";
import { CSSProperties, VNode } from 'vue';
import { DropdownProps } from "../dropdown";
import { OverflowListProps } from "../overflowList";

export type TabType = 'line' | 'card' | 'button' | 'slash';
export type TabSize = 'small' | 'medium' | 'large';
export type TabPosition = 'top' | 'left';

export interface PlainTab {
    disabled?: boolean;
    icon?: VueJsxNode;
    itemKey: string;
    tab?: VueJsxNode | (()=>VueJsxNode);
    closable?: boolean
}

export interface TabsDropDownProps {
    start: DropdownProps;
    end: DropdownProps
}

export interface TabsProps {
    activeKey?: string;
    // children?: VueJsxNode | Array<VueJsxNode>;
    className?: string;
    collapsible?: boolean;
    contentStyle?: CSSProperties;
    defaultActiveKey?: string;
    keepDOM?: boolean;
    lazyRender?: boolean;
    onChange?: (activeKey: string) => void;
    onTabClick?: (activeKey: string, e: MouseEvent) => void;
    renderTabBar?: (tabBarProps: TabBarProps, defaultTabBar: typeof TabBar) => VueJsxNode;
    showRestInDropdown?: boolean;
    size?: TabSize;
    style?: CSSProperties;
    tabBarClassName?: string;
    tabBarExtraContent?: VueJsxNode;
    tabBarStyle?: CSSProperties;
    tabList?: PlainTab[];
    tabPaneMotion?: boolean;
    tabPosition?: TabPosition;
    type?: TabType;
    onTabClose?: (tabKey: string) => void;
    preventScroll?: boolean;
    more?: number | { count: number; render?: () => VNode; dropdownProps?: DropdownProps };
    onVisibleTabsChange?: TabBarProps["onVisibleTabsChange"];
    visibleTabsStyle?: TabBarProps['visibleTabsStyle'];
    arrowPosition?: TabBarProps['arrowPosition'];
    renderArrow?: TabBarProps['renderArrow'];
    dropdownProps?: TabsDropDownProps
}

export interface TabBarProps {
    activeKey?: string;
    className?: string;
    collapsible?: boolean;
    list?: PlainTab[];
    onTabClick?: (activeKey: string, event: MouseEvent) => void;
    showRestInDropdown?: boolean;
    size?: TabSize;
    style?: CSSProperties;
    tabBarExtraContent?: VueJsxNode;
    tabPosition?: TabPosition;
    type?: TabType;
    dropdownClassName?: string;
    dropdownStyle?: CSSProperties;
    closable?: boolean;
    deleteTabItem?: (tabKey: string, event: MouseEvent) => void;
    handleKeyDown?: (event: KeyboardEvent, itemKey: string, closable: boolean) => void;
    more?: TabsProps['more'];
    onVisibleTabsChange?: (visibleState: Map<string, boolean>) => void;
    visibleTabsStyle?: CSSProperties;
    arrowPosition?: OverflowListProps['overflowRenderDirection'];
    renderArrow?: (items: OverflowItem[], pos: "start"|"end", handleArrowClick: () => void, defaultNode: VueJsxNode) => VNode;
    dropdownProps?: TabsDropDownProps
}

export interface TabPaneProps {
    className?: string;
    children?: VueJsxNode | undefined;
    disabled?: boolean;
    icon?: VueJsxNode;
    itemKey?: string;
    style?: CSSProperties;
    tab?: VueJsxNode;
    closable?: boolean;
    tabIndex?: number
}

export interface TabPaneTransitionProps {
    [key: string]: any;

    children?: ((p: { transform?: string; opacity: number }) => VueJsxNode | undefined) | undefined;
    direction?: boolean;
    mode?: 'vertical' | 'horizontal';
    motion?: Motion
}

export interface TabContextValue {
    activeKey?: string;
    lazyRender?: boolean;
    panes?: PlainTab[];
    tabPaneMotion?: boolean;
    tabPosition?: TabPosition;
    prevActiveKey?: string | null;
    forceDisableMotion?: boolean
}
