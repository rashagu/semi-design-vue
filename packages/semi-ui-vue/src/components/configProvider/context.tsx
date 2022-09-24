import { Locale } from '../locale/interface';
import Provider from './context/Provider'
import Consumer from './context/Consumer'
export interface ContextValue {
    direction?: 'ltr' | 'rtl';
    timeZone?: string | number;
    locale?: Locale;
    getPopupContainer?(): HTMLElement;
}

const ConfigContext = {
    Provider,
    Consumer
};

export default ConfigContext;
