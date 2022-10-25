import Notice from '../notice';
import { NoticeInstance } from '@douyinfe/semi-foundation/notification/notificationFoundation';
import {defineComponent, h, ref, useSlots, watch} from "vue";

export interface HookNoticeProps extends NoticeInstance{
    afterClose: (id: string) => void;
}

export const vuePropsType = {
    afterClose: Function,
    motion: [Object, String, Boolean,]
}
const HookNotice = defineComponent<HookNoticeProps>((props, {expose}) => {

    const slots = useSlots()
    const visible = ref(true);

    function setVisible(val:boolean) {
        visible.value = val
    }
    const close = () => {
        setVisible(false);
    };
    watch(visible, ()=>{
        if (!visible.value) {
            props.afterClose(String(props.id));
        }
    }, {immediate:true})

    return () => {

        const { afterClose, ...config } = props

        return visible ? (
          <Notice
            {...config}
            onHookClose={close}
          />
        ) : null;
    }
})

HookNotice.props = vuePropsType
HookNotice.name = 'HookNotice'

export default HookNotice

