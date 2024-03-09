import Provider from "./context/Provider";
import Consumer from "./context/Consumer";


export type DescriptionsAlign = 'center' | 'justify' | 'left' | 'plain';
export type DescriptionLayout = 'horizontal' | 'vertical'

export interface DescriptionsContextValue {
    align?: DescriptionsAlign;
    layout?: DescriptionLayout
}

const DescriptionsContext = {
    Provider,
    Consumer
}

export default DescriptionsContext;
