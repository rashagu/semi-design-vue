import { noop } from '@douyinfe/semi-foundation/utils/function';

export interface ContextType{
    siderHook: {
        addSider: (id: string) => void;
        removeSider: (id: string) => void;
    };
}

const LayoutContext = {
    siderHook: {
        addSider: noop,
        removeSider: noop,
    },
}

export default LayoutContext;
