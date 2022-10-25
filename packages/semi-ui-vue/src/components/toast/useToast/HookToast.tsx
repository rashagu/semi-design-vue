import Toast from '../toast';
import { ToastInstance } from '@douyinfe/semi-foundation/toast/toastFoundation';
import {defineComponent, h, ref, useSlots, watch} from "vue";

interface HookToastProps extends ToastInstance{
    afterClose: (id: string) => void;
}

export const vuePropsType = {
    afterClose: Function
}
const HookToast = defineComponent<HookToastProps>((props, {attrs}) => {
    const slots = useSlots()
    const config:any = attrs

    const visible = ref()

    const close = () => {
        visible.value = false
    };

    // React.useImperativeHandle(ref, () => ({
    //     close: () => {
    //         visible.value = false
    //     }
    // }));

    watch(visible, ()=>{
        if (!visible.value) {
            props.afterClose(config.id);
        }
    })
    return () => {
        return visible ? (
          <Toast
            {...config}
            close={close}
          />
        ) : null;
    }
})

HookToast.props = vuePropsType
HookToast.name = 'HookToast'

export default HookToast