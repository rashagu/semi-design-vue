
import { Locale } from '../locale/interface';

export interface ContextValue {
    direction?: 'ltr' | 'rtl';
    timeZone?: string | number;
    locale?: Locale;
    children?: JSX.Element;
    getPopupContainer?(): HTMLElement;
}

const ConfigContext:ContextValue = {};

export default ConfigContext;
