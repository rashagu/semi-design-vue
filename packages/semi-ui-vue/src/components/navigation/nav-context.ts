

import { NavProps } from './index';
import { Locale } from '../locale/interface';
import Consumer from "./nav-context/Consumer";
import Provider from "./nav-context/Provider";
export interface NavContextType {
    isCollapsed?: boolean;
    mode?: NavProps['mode'];
    openKeys?: string[];
    onCollapseChange?: NavProps['onCollapseChange'];
    prefixCls?: string;
    selectedKeys?: string[];
    toggleIconPosition?: string;
    selectedKeysIsControlled?: boolean;
    openKeysIsControlled?: boolean;
    limitIndent?: boolean;
    isInSubNav?: boolean;
    locale?: Locale['Navigation'];
    subNavMotion?: NavProps['subNavMotion'];
    subNavCloseDelay?: NavProps['subNavCloseDelay'];
    subNavOpenDelay?: NavProps['subNavOpenDelay'];
    canUpdateOpenKeys?: boolean;
}

const NavContext = {
    Consumer: Consumer,
    Provider: Provider,
};

export default NavContext;
