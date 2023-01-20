import Provider from "./context/Provider";
import Consumer from "./context/Consumer";

export interface ContextType{
    siderHook: {
        addSider: (id: string) => void;
        removeSider: (id: string) => void;
    };
}

const LayoutContext = {
    Provider,
    Consumer
}

export default LayoutContext;
