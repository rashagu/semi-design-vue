import Provider from "./context/Provider";
import Consumer from "./context/Consumer";


export type DescriptionsAlign = 'center' | 'justify' | 'left' | 'plain';

export interface DescriptionsContextValue {
    align?: DescriptionsAlign
}

const DescriptionsContext = {
    Provider,
    Consumer
}

export default DescriptionsContext;
