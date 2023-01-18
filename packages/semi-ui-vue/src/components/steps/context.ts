import Provider from "./context/Provider";
import Consumer from "./context/Consumer";

export interface ContextValue {
    type?: 'nav' | 'fill' | 'basic'
}

export default {
    Provider,
    Consumer
};
