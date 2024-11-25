import Consumer from "./context/Consumer";
import Provider from "./context/Provider";
import type { Ref } from 'vue';
import type { ResizeCallback, ResizeStartCallback } from '@douyinfe/semi-foundation/resizable/types';


export interface ResizeContextProps {
    direction: 'horizontal' | 'vertical';
    registerItem: (ref: Ref<HTMLDivElement>,
                   min: string, max: string, defaultSize: string|number,
                   onResizeStart: ResizeStartCallback,
                   onChange: ResizeCallback,
                   onResizeEnd: ResizeCallback
    ) => number;
    registerHandler: (ref: Ref<HTMLDivElement>) => number;
    notifyResizeStart: (handlerIndex: number, e: MouseEvent) => void;
    getGroupSize: () => number
}


const ResizeContext = {
    Consumer: Consumer,
    Provider: Provider,
}
export {
    ResizeContext
};



